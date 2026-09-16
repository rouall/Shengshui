/**
 * RippleDistortion —— 水波纹扭曲背景特效（原生 WebGL2 实现）
 *
 * 移植自 React Bits 的 RippleDistortion 组件（JavaScript + CSS 变体），
 * 去除 React 与 ogl 依赖，改为零依赖原生实现，适合静态站点直接引入。
 *
 * 交互：指针划过时在图片表面产生扩散涟漪（trigger: 'hover'），
 *       点击产生更强涟漪（trigger: 'click'），'both' 两者同时生效。
 * 增强：图片切换时着色器内交叉溶解（setImage）；静止时轻微"水面呼吸"（ambient）。
 * 兼容：支持 WebGL2 的现代浏览器；不支持、页面隐藏或系统开启
 *       「减弱动态效果」（prefers-reduced-motion）时静默降级，不影响原页面。
 *
 * 用法：
 *   const fx = new RippleDistortion(mountEl, { src: 'a.jpg', ... });
 *   fx.setImage('b.jpg');   // 切换图片（带交叉溶解）
 *   fx.setTint('#00d2ff');  // 更新扰动水域着色
 *   fx.destroy();
 */
(function (global) {
    'use strict';

    var MAX_WAVES = 100;
    var QUALITY_SCALE = { low: 0.4, medium: 0.7, high: 1 };
    var START_SCALE = 1.5;
    var LIFE_CONSTANT = Math.log(500);
    var TRANSITION_DURATION = 1.2; // 图片切换交叉溶解时长（秒）

    var WAVE_VERTEX = [
        'precision highp float;',
        '',
        'attribute vec2 position;',
        'attribute vec2 uv;',
        'attribute vec2 iOffset;',
        'attribute vec2 iScale;',
        'attribute float iOpacity;',
        '',
        'varying vec2 vUv;',
        'varying float vOpacity;',
        '',
        'void main() {',
        '  vUv = uv;',
        '  vOpacity = iOpacity;',
        '  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);',
        '}'
    ].join('\n');

    var WAVE_FRAGMENT = [
        'precision highp float;',
        '',
        'varying vec2 vUv;',
        'varying float vOpacity;',
        '',
        'uniform float uRings;',
        '',
        'const float PI = 3.141592653589793;',
        'const float EDGE = 0.006737947;',
        '',
        'void main() {',
        '  vec2 p = vUv * 2.0 - 1.0;',
        '  float r = dot(p, p);',
        '  if (r > 1.0) discard;',
        '',
        '  float brush = (exp(-r * 5.0) - EDGE) / (1.0 - EDGE);',
        '',
        '  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2.0 * uRings);',
        '',
        '  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);',
        '}'
    ].join('\n');

    var SCREEN_VERTEX = [
        'precision highp float;',
        'attribute vec2 position;',
        'attribute vec2 uv;',
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = uv;',
        '  gl_Position = vec4(position, 0.0, 1.0);',
        '}'
    ].join('\n');

    // 相比原版：uTexture 拆为 uTexA/uTexB + uMix（图片切换交叉溶解），并新增环境微动 uAmbient/uTime
    var COMPOSITE_FRAGMENT = [
        'precision highp float;',
        '',
        'varying vec2 vUv;',
        '',
        'uniform sampler2D uTexA;',
        'uniform sampler2D uTexB;',
        'uniform sampler2D uDisplacement;',
        'uniform vec2 uResolution;',
        'uniform vec2 uSizeA;',
        'uniform vec2 uSizeB;',
        'uniform vec2 uTexel;',
        'uniform vec3 uTint;',
        'uniform vec3 uHighlight;',
        'uniform float uMix;',
        'uniform float uStrength;',
        'uniform float uSwirl;',
        'uniform float uDispersion;',
        'uniform float uGlint;',
        'uniform float uTintAmount;',
        'uniform float uGrayscale;',
        'uniform float uAmbient;',
        'uniform float uTime;',
        '',
        'const float TAU = 6.283185307179586;',
        '',
        'vec2 coverUV(vec2 uv, vec2 safe) {',
        '  safe = max(safe, vec2(1.0));',
        '  vec2 s = uResolution / safe;',
        '  vec2 scaledSize = safe * max(s.x, s.y);',
        '  vec2 offset = (uResolution - scaledSize) * 0.5;',
        '  return (uv * uResolution - offset) / scaledSize;',
        '}',
        '',
        'vec3 sampleRefracted(sampler2D tex, vec2 base, vec2 push, float split) {',
        '  if (split > 0.001) {',
        '    return vec3(',
        '      texture2D(tex, base + push * (1.0 + split)).r,',
        '      texture2D(tex, base + push).g,',
        '      texture2D(tex, base + push * (1.0 - split)).b',
        '    );',
        '  }',
        '  return texture2D(tex, base + push).rgb;',
        '}',
        '',
        'void main() {',
        '  float amount = texture2D(uDisplacement, vUv).r;',
        '',
        '  vec2 amb = vec2(0.0);',
        '  if (uAmbient > 0.0) {',
        '    float damp = 1.0 - min(amount * 2.2, 1.0);',
        '    amb = vec2(',
        '      sin(vUv.y * 9.0 + uTime * 0.45) + 0.6 * sin(vUv.y * 16.0 - uTime * 0.31 + vUv.x * 6.0),',
        '      cos(vUv.x * 8.0 + uTime * 0.38) + 0.6 * cos(vUv.x * 14.0 - uTime * 0.27 + vUv.y * 5.0)',
        '    ) * (uAmbient * damp);',
        '  }',
        '',
        '  float theta = amount * uSwirl * TAU;',
        '  vec2 dir = vec2(sin(theta), cos(theta));',
        '  vec2 push = dir * amount * uStrength;',
        '  float split = uDispersion * 0.25;',
        '',
        '  vec2 baseA = coverUV(vUv + amb, uSizeA);',
        '  vec2 baseB = coverUV(vUv + amb, uSizeB);',
        '  vec3 colorA = sampleRefracted(uTexA, baseA, push, split);',
        '  vec3 colorB = sampleRefracted(uTexB, baseB, push, split);',
        '  vec3 color = mix(colorA, colorB, uMix);',
        '',
        '  if (uGrayscale > 0.001) {',
        '    color = mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), uGrayscale);',
        '  }',
        '',
        '  if (uTintAmount > 0.001) {',
        '    color = mix(color, color * uTint * 1.9, clamp(amount * 1.6, 0.0, 1.0) * uTintAmount);',
        '  }',
        '',
        '  if (uGlint > 0.001) {',
        '    float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;',
        '    float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;',
        '    vec3 normal = normalize(vec3(-ex * 26.0, -ey * 26.0, 1.0));',
        '    vec3 light = normalize(vec3(-0.35, 0.55, 1.0));',
        '    float raw = pow(max(dot(normal, light), 0.0), 22.0);',
        '    float flatSpec = pow(max(light.z, 0.0), 22.0);',
        '    color += uHighlight * clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0) * uGlint;',
        '  }',
        '',
        '  gl_FragColor = vec4(color, 1.0);',
        '}'
    ].join('\n');

    var QUAD_POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    var QUAD_UV = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

    function hexToRGB(hex) {
        var clean = String(hex || '').replace('#', '');
        var full = clean.length === 3
            ? clean.split('').map(function (c) { return c + c; }).join('')
            : clean;
        var n = parseInt(full, 16);
        if (Number.isNaN(n)) return [1, 1, 1];
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    }

    function compileShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error('[RippleDistortion] shader compile failed: ' + info);
        }
        return shader;
    }

    function createProgram(gl, vertexSrc, fragmentSrc) {
        var vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
        var fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error('[RippleDistortion] program link failed: ' + info);
        }
        return program;
    }

    function getUniforms(gl, program) {
        var uniforms = {};
        var count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < count; i++) {
            var name = gl.getActiveUniform(program, i).name;
            uniforms[name] = gl.getUniformLocation(program, name);
        }
        return uniforms;
    }

    function RippleDistortion(mount, options) {
        if (!mount || mount.nodeType !== 1) {
            throw new Error('[RippleDistortion] mount element required');
        }
        this.mount = mount;
        this.opts = Object.assign({
            src: '',
            brushSize: 150,
            strength: 0.2,
            swirl: 1,
            rings: 4,
            spread: 5,
            fade: 3,
            spacing: 15,
            dispersion: 0,
            glint: 0,
            tint: '#a855f7',
            tintAmount: 0.1,
            grayscale: true,
            highlightColor: '#ffffff',
            trigger: 'hover',
            clickStrength: 2,
            quality: 'low',
            ambient: 0,
            enabled: true,
            dprCap: 2,
            maxPixels: 4.0e6,      // 画布像素预算，超出自动降低 DPR，保证低端设备流畅
            onReady: null,         // 首张纹理就绪（可安全显示特效层）
            onFallback: null       // WebGL 不可用/上下文丢失，需回退到原背景
        }, options || {});

        this.supported = false;
        this.enabled = this.opts.enabled !== false;
        this._disposed = false;
        this._ready = false;
        this._running = false;
        this._raf = 0;
        this._lastFrame = 0;
        this._time = 0;
        this._mix = 1;
        this._mixing = false;
        this._prevTex = null;
        this._prevSize = [1, 1];
        this._currentTex = null;
        this._currentSize = [1, 1];
        this._width = 1;
        this._height = 1;

        var reduceMotion = global.matchMedia &&
            global.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        try {
            this._initGL();
            if (this.supported) {
                this._initBuffers();
                this._initPrograms();
                this._initTarget();
                this._resize();
                this._bindEvents();
                this._start();
                if (this.opts.src) this.setImage(this.opts.src);
            }
        } catch (err) {
            console.warn(err && err.message || err);
            this.destroy();
        }
    }

    RippleDistortion.prototype._initGL = function () {
        var canvas = document.createElement('canvas');
        canvas.style.cssText = 'display:block;width:100%;height:100%;';
        this.mount.appendChild(canvas);
        this.canvas = canvas;

        var gl = canvas.getContext('webgl2', {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: 'high-performance'
        });
        if (!gl) return;

        this.gl = gl;
        this.supported = true;
        gl.clearColor(0, 0, 0, 1);

        var self = this;
        this._onContextLost = function (e) {
            e.preventDefault();
            console.warn('[RippleDistortion] WebGL context lost, falling back.');
            self._stop();
            self.supported = false;
            if (self.opts.onFallback) self.opts.onFallback();
        };
        canvas.addEventListener('webglcontextlost', this._onContextLost, false);
    };

    RippleDistortion.prototype._initBuffers = function () {
        var gl = this.gl;
        this._posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, QUAD_POSITIONS, gl.STATIC_DRAW);

        this._uvBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuf);
        gl.bufferData(gl.ARRAY_BUFFER, QUAD_UV, gl.STATIC_DRAW);

        this._offsets = new Float32Array(MAX_WAVES * 2);
        this._scales = new Float32Array(MAX_WAVES * 2);
        this._opacities = new Float32Array(MAX_WAVES);

        this._offsetBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._offsetBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._offsets, gl.DYNAMIC_DRAW);

        this._scaleBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._scaleBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._scales, gl.DYNAMIC_DRAW);

        this._opacityBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._opacityBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._opacities, gl.DYNAMIC_DRAW);

        this._waves = [];
        for (var i = 0; i < MAX_WAVES; i++) {
            this._waves.push({ x: 0, y: 0, scale: START_SCALE, target: START_SCALE, size: 1, opacity: 0 });
        }
        this._currentWave = 0;
        this._prevPointer = { x: 0, y: 0 };
    };

    RippleDistortion.prototype._makeQuadVAO = function (program, instanced) {
        var gl = this.gl;
        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        var posLoc = gl.getAttribLocation(program, 'position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this._posBuf);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        var uvLoc = gl.getAttribLocation(program, 'uv');
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuf);
        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

        if (instanced) {
            var offLoc = gl.getAttribLocation(program, 'iOffset');
            gl.bindBuffer(gl.ARRAY_BUFFER, this._offsetBuf);
            gl.enableVertexAttribArray(offLoc);
            gl.vertexAttribPointer(offLoc, 2, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(offLoc, 1);

            var scaleLoc = gl.getAttribLocation(program, 'iScale');
            gl.bindBuffer(gl.ARRAY_BUFFER, this._scaleBuf);
            gl.enableVertexAttribArray(scaleLoc);
            gl.vertexAttribPointer(scaleLoc, 2, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(scaleLoc, 1);

            var opacityLoc = gl.getAttribLocation(program, 'iOpacity');
            gl.bindBuffer(gl.ARRAY_BUFFER, this._opacityBuf);
            gl.enableVertexAttribArray(opacityLoc);
            gl.vertexAttribPointer(opacityLoc, 1, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(opacityLoc, 1);
        }

        gl.bindVertexArray(null);
        return vao;
    };

    RippleDistortion.prototype._initPrograms = function () {
        var gl = this.gl;

        this.waveProgram = createProgram(gl, WAVE_VERTEX, WAVE_FRAGMENT);
        this.waveUniforms = getUniforms(gl, this.waveProgram);
        this.waveVAO = this._makeQuadVAO(this.waveProgram, true);

        this.compositeProgram = createProgram(gl, SCREEN_VERTEX, COMPOSITE_FRAGMENT);
        this.compositeUniforms = getUniforms(gl, this.compositeProgram);
        this.compositeVAO = this._makeQuadVAO(this.compositeProgram, false);
    };

    RippleDistortion.prototype._initTarget = function () {
        var gl = this.gl;
        this._fieldTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._fieldTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        this._fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._fieldTex, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    RippleDistortion.prototype._resize = function () {
        var w = Math.max(1, this.mount.clientWidth || global.innerWidth);
        var h = Math.max(1, this.mount.clientHeight || global.innerHeight);
        var dpr = Math.min(global.devicePixelRatio || 1, this.opts.dprCap || 2);
        if (w * h * dpr * dpr > this.opts.maxPixels) {
            dpr = Math.max(1, Math.sqrt(this.opts.maxPixels / (w * h)));
        }
        this._width = w;
        this._height = h;
        this._dpr = dpr;

        var cw = Math.round(w * dpr);
        var ch = Math.round(h * dpr);
        if (this.canvas.width !== cw) this.canvas.width = cw;
        if (this.canvas.height !== ch) this.canvas.height = ch;

        var scale = QUALITY_SCALE[this.opts.quality] || QUALITY_SCALE.high;
        var fw = Math.max(2, Math.round(w * scale));
        var fh = Math.max(2, Math.round(h * scale));
        this._fieldW = fw;
        this._fieldH = fh;

        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._fieldTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, fw, fh, 0, gl.RED, gl.UNSIGNED_BYTE, null);
        this._texel = [1 / fw, 1 / fh];
    };

    RippleDistortion.prototype._bindEvents = function () {
        var self = this;

        this._onMove = function (event) {
            if (!self.enabled || self.opts.trigger === 'click') return;
            var point = self._localPoint(event.clientX, event.clientY);
            if (!point) return;
            var step = Math.max(1, self.opts.spacing);
            if (Math.abs(point[0] - self._prevPointer.x) > step ||
                Math.abs(point[1] - self._prevPointer.y) > step) {
                self._setNewWave(point[0], point[1], 1);
                self._prevPointer.x = point[0];
                self._prevPointer.y = point[1];
            }
        };

        this._onDown = function (event) {
            if (!self.enabled || self.opts.trigger === 'hover') return;
            // 与站点全局行为一致：交互元素上的点击不产生涟漪
            if (event.target && event.target.closest &&
                event.target.closest('nav, a, button')) return;
            var point = self._localPoint(event.clientX, event.clientY);
            if (!point) return;
            self._setNewWave(point[0], point[1], Math.max(1, self.opts.clickStrength));
        };

        this._onResize = function () { self._resize(); };

        this._onVisibility = function () {
            if (document.hidden) self._stop();
            else self._start();
        };

        global.addEventListener('pointermove', this._onMove, { passive: true });
        global.addEventListener('pointerdown', this._onDown, { passive: true });

        if (typeof ResizeObserver === 'function') {
            this._ro = new ResizeObserver(function () { self._resize(); });
            this._ro.observe(this.mount);
        } else {
            global.addEventListener('resize', this._onResize, { passive: true });
        }

        document.addEventListener('visibilitychange', this._onVisibility);
    };

    RippleDistortion.prototype._localPoint = function (clientX, clientY) {
        var rect = this.mount.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return null;
        if (clientX < rect.left || clientX > rect.right ||
            clientY < rect.top || clientY > rect.bottom) {
            return null;
        }
        return [clientX - rect.left, rect.height - (clientY - rect.top)];
    };

    RippleDistortion.prototype._setNewWave = function (x, y, power) {
        var cfg = this.opts;
        var wave = this._waves[this._currentWave];
        this._currentWave = (this._currentWave + 1) % MAX_WAVES;
        wave.x = x;
        wave.y = y;
        wave.scale = START_SCALE * power;
        wave.target = START_SCALE * Math.max(1, cfg.spread) * power;
        wave.size = Math.max(1, cfg.brushSize);
        wave.opacity = 1;
    };

    RippleDistortion.prototype._start = function () {
        if (this._running || !this.supported || this._disposed) return;
        this._running = true;
        this._lastFrame = 0;
        var self = this;
        var loop = function (now) {
            if (!self._running) return;
            self._raf = requestAnimationFrame(loop);
            self._frame(now);
        };
        this._raf = requestAnimationFrame(loop);
    };

    RippleDistortion.prototype._stop = function () {
        if (!this._running) return;
        this._running = false;
        if (this._raf) {
            cancelAnimationFrame(this._raf);
            this._raf = 0;
        }
    };

    RippleDistortion.prototype._frame = function (now) {
        var delta = this._lastFrame ? Math.min(0.05, (now - this._lastFrame) / 1000) : 0;
        this._lastFrame = now;
        if (!this._ready) return; // 纹理未就绪时不渲染（特效层仍透明，显示原背景）

        this._time += delta;
        var cfg = this.opts;

        // 交叉溶解推进
        if (this._mixing) {
            this._mix += delta / TRANSITION_DURATION;
            if (this._mix >= 1) {
                this._mix = 1;
                this._mixing = false;
                if (this._prevTex && this._prevTex !== this._currentTex) {
                    this.gl.deleteTexture(this._prevTex);
                }
                this._prevTex = this._currentTex;
                this._prevSize = this._currentSize;
            }
        }

        // 波纹演化（与原组件一致的生长/衰减模型）
        var reduceMotion = false;
        var growth = reduceMotion ? 0 : 1 - Math.exp(-delta * 1.09);
        var decay = Math.exp((-delta * LIFE_CONSTANT) / Math.max(0.15, cfg.fade));

        var offsets = this._offsets;
        var scales = this._scales;
        var opacities = this._opacities;
        var waves = this._waves;

        for (var i = 0; i < MAX_WAVES; i++) {
            var wave = waves[i];
            if (wave.opacity <= 0) {
                opacities[i] = 0;
                continue;
            }
            wave.opacity *= decay;
            wave.scale += (wave.target - wave.scale) * growth;
            if (wave.opacity < 0.002) {
                wave.opacity = 0;
                opacities[i] = 0;
                continue;
            }
            var half = (wave.scale * wave.size) / 2;
            offsets[i * 2] = (wave.x / this._width) * 2 - 1;
            offsets[i * 2 + 1] = (wave.y / this._height) * 2 - 1;
            scales[i * 2] = (half / this._width) * 2;
            scales[i * 2 + 1] = (half / this._height) * 2;
            opacities[i] = wave.opacity;
        }

        var gl = this.gl;

        // Pass 1：渲染位移场到 FBO（叠加混合）
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        gl.viewport(0, 0, this._fieldW, this._fieldH);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.waveProgram);
        gl.uniform1f(this.waveUniforms.uRings, cfg.rings);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._offsetBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, offsets);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._scaleBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, scales);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._opacityBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, opacities);

        gl.bindVertexArray(this.waveVAO);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, MAX_WAVES);
        gl.disable(gl.BLEND);
        gl.bindVertexArray(null);

        // Pass 2：合成到屏幕
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.useProgram(this.compositeProgram);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._fieldTex);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this._prevTex);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this._currentTex);

        var u = this.compositeUniforms;
        gl.uniform1i(u.uDisplacement, 0);
        gl.uniform1i(u.uTexA, 1);
        gl.uniform1i(u.uTexB, 2);
        gl.uniform2f(u.uResolution, this._width, this._height);
        gl.uniform2f(u.uSizeA, this._prevSize[0], this._prevSize[1]);
        gl.uniform2f(u.uSizeB, this._currentSize[0], this._currentSize[1]);
        gl.uniform2f(u.uTexel, this._texel[0], this._texel[1]);
        var tint = hexToRGB(cfg.tint);
        var highlight = hexToRGB(cfg.highlightColor);
        gl.uniform3f(u.uTint, tint[0], tint[1], tint[2]);
        gl.uniform3f(u.uHighlight, highlight[0], highlight[1], highlight[2]);
        gl.uniform1f(u.uMix, this._mix);
        gl.uniform1f(u.uStrength, cfg.strength);
        gl.uniform1f(u.uSwirl, cfg.swirl);
        gl.uniform1f(u.uDispersion, cfg.dispersion);
        gl.uniform1f(u.uGlint, cfg.glint);
        gl.uniform1f(u.uTintAmount, cfg.tintAmount);
        gl.uniform1f(u.uGrayscale, cfg.grayscale ? 1 : 0);
        gl.uniform1f(u.uAmbient, cfg.ambient || 0);
        gl.uniform1f(u.uTime, this._time);

        gl.bindVertexArray(this.compositeVAO);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindVertexArray(null);
    };

    /** 切换/设置图片（自动交叉溶解）。本地同源图片无需 crossOrigin。 */
    RippleDistortion.prototype.setImage = function (src) {
        if (!this.supported || this._disposed || !src) return;
        var self = this;
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
            if (self._disposed) return;
            self._onImageLoaded(img);
        };
        img.onerror = function () {
            console.warn('[RippleDistortion] image load failed:', src);
        };
        img.src = src;
    };

    RippleDistortion.prototype._onImageLoaded = function (img) {
        var gl = this.gl;
        var tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        var w = img.naturalWidth || 1;
        var h = img.naturalHeight || 1;

        if (!this._currentTex) {
            // 首张图片：直接显示并通知上层淡入特效层
            this._currentTex = tex;
            this._currentSize = [w, h];
            this._prevTex = tex;
            this._prevSize = [w, h];
            this._mix = 1;
            this._ready = true;
            if (this.opts.onReady) this.opts.onReady();
        } else {
            // 后续图片：当前目标图退为 A，新图作为 B，从 0 溶解到 1
            // 若上一次溶解尚未完成，先释放被中途淘汰的旧纹理，避免显存泄漏
            if (this._mixing && this._prevTex && this._prevTex !== this._currentTex) {
                gl.deleteTexture(this._prevTex);
            }
            this._prevTex = this._currentTex;
            this._prevSize = this._currentSize;
            this._currentTex = tex;
            this._currentSize = [w, h];
            this._mix = 0;
            this._mixing = true;
        }
    };

    /** 更新扰动水域着色（联动站点主题色）。 */
    RippleDistortion.prototype.setTint = function (hex) {
        this.opts.tint = hex;
    };

    /** 开关特效（关闭后停止涟漪生成与演化，但保留最后一帧画面）。 */
    RippleDistortion.prototype.setEnabled = function (v) {
        this.enabled = !!v;
    };

    /** 销毁：释放 GL 资源、解绑事件、移除画布。 */
    RippleDistortion.prototype.destroy = function () {
        if (this._disposed) return;
        this._disposed = true;
        this._stop();

        global.removeEventListener('pointermove', this._onMove);
        global.removeEventListener('pointerdown', this._onDown);
        document.removeEventListener('visibilitychange', this._onVisibility);
        if (this._ro) {
            this._ro.disconnect();
            this._ro = null;
        } else {
            global.removeEventListener('resize', this._onResize);
        }

        var gl = this.gl;
        if (gl) {
            try {
                gl.deleteTexture(this._fieldTex);
                gl.deleteTexture(this._prevTex);
                if (this._currentTex !== this._prevTex) gl.deleteTexture(this._currentTex);
                gl.deleteFramebuffer(this._fbo);
                gl.deleteBuffer(this._posBuf);
                gl.deleteBuffer(this._uvBuf);
                gl.deleteBuffer(this._offsetBuf);
                gl.deleteBuffer(this._scaleBuf);
                gl.deleteBuffer(this._opacityBuf);
                gl.deleteVertexArray(this.waveVAO);
                gl.deleteVertexArray(this.compositeVAO);
                gl.deleteProgram(this.waveProgram);
                gl.deleteProgram(this.compositeProgram);
                var ext = gl.getExtension('WEBGL_lose_context');
                if (ext) ext.loseContext();
            } catch (e) { /* 忽略销毁阶段的异常 */ }
        }

        this.supported = false;
        this._ready = false;
        this._prevTex = null;
        this._currentTex = null;
        if (this.canvas && this.canvas.parentNode === this.mount) {
            this.mount.removeChild(this.canvas);
        }
        this.canvas = null;
        this.gl = null;
    };

    global.RippleDistortion = RippleDistortion;

})(window);
