/* ============================================
 * SHENGSHUI i18n 词库（纯数据，勿在此写逻辑）
 *
 * 语言顺序即语言切换菜单顺序：
 * 中文 → English → Español → Deutsch → العربية
 * → Русский → 한국어 → Português → Français → 日本語
 *
 * 新增语言：在 I18N_LANGS 追加条目，并在 I18N_LOCALES 补齐同名 key，
 * 缺失的 key 会自动回退到英文、再回退到中文。
 * ============================================ */

window.I18N_LANGS = [
    { code: 'zh', htmlLang: 'zh-CN', native: '中文', short: '中', dir: 'ltr' },
    { code: 'en', htmlLang: 'en', native: 'English', short: 'EN', dir: 'ltr' },
    { code: 'es', htmlLang: 'es', native: 'Español', short: 'ES', dir: 'ltr' },
    { code: 'de', htmlLang: 'de', native: 'Deutsch', short: 'DE', dir: 'ltr' },
    { code: 'ar', htmlLang: 'ar', native: 'العربية', short: 'AR', dir: 'rtl' },
    { code: 'ru', htmlLang: 'ru', native: 'Русский', short: 'RU', dir: 'ltr' },
    { code: 'ko', htmlLang: 'ko', native: '한국어', short: 'KO', dir: 'ltr' },
    { code: 'pt', htmlLang: 'pt', native: 'Português', short: 'PT', dir: 'ltr' },
    { code: 'fr', htmlLang: 'fr', native: 'Français', short: 'FR', dir: 'ltr' },
    { code: 'ja', htmlLang: 'ja', native: '日本語', short: 'JA', dir: 'ltr' }
];

window.I18N_LOCALES = {

    /* ---------------- 中文 ---------------- */
    zh: {
        meta: {
            home: 'SHENGSHUI | 发现每一滴的价值',
            products: 'SHENGSHUI | 产品'
        },
        nav: {
            backHome: '返回首页',
            coop: '合作'
        },
        hero: {
            desc: '发现每一滴的价值。'
        },
        modes: {
            desert: { sub: '· 感受生命的极度渴望 ·', desc: '当世界干涸，唯有一滴纯净，值得你不远万里。' },
            dew: { sub: '· 沉浸自然的极致滋养 ·', desc: '源自晨曦微露的刹那，让每一个细胞重新呼吸。' },
            ice: { sub: '· 体验极地的纯净力量 ·', desc: '来自冰原深处的馈赠，历经千年淬炼的极致纯净。' },
            water: { sub: '· 源自自然的圣水 ·', desc: '以矿物与时间雕刻的层次感，入口即是高级的宁静。' },
            star: { sub: '· 汲取星辰的永恒之水 ·', desc: '如同夜空中的璀璨星河，每一滴都承载着宇宙的深邃与神秘。' }
        },
        featured: {
            aria: '精选好物',
            name: '百岁山天然矿泉水',
            desc: '1L × 30瓶 整箱装 · 天然好水',
            cta: '去看看'
        },
        coop: {
            title: '域名合作',
            text1: '域名有自身价值，此域名可租用也可出售，有意向直接报价，真诚，互不墨迹。',
            text2: '如果您对域名合作、品牌联名或投资意向感兴趣，请通过以下邮箱与我们建立连接。',
            copy: '复制邮箱',
            close: '关闭',
            copied: '邮箱已复制',
            copyFail: '复制失败，请手动复制'
        },
        productsPage: {
            kicker: 'Products',
            tagline: 'Discover The Value In Every Drop',
            heading: '发现每一滴的价值',
            status: '共 {n} 条精选，展示前 {m} 条。',
            collection: '精选',
            view: '查看',
            noImage: '暂无图片'
        },
        navPanel: {
            close: '关闭',
            source: {
                kicker: 'THE SOURCE',
                title: '以水源定义奢侈标准',
                lead: '一瓶水的价值，从来不止于解渴，而在于它所承载的地貌、时间与纯度。',
                body: [
                    '我们以“源头可追溯”为第一原则：从产地环境、矿物结构到微量元素比例，形成稳定且可被验证的风味与口感轮廓。',
                    '真正的奢侈，是选择更少的干预，让自然完成更多的工作——让每一滴都拥有清晰的身份。'
                ]
            },
            purification: {
                kicker: 'PURIFICATION',
                title: '净化，是对纯度的敬畏',
                lead: '纯净不是“无”，而是“恰到好处的保留”：去除杂质，保留自然的矿物秩序。',
                body: [
                    '我们采用多重物理净化与精密过滤策略，重点控制异味、浑浊与微粒，确保入口的清澈与层次。',
                    '每一次处理都以“低干预”为前提：不改变水的原生结构与风味骨架，让纯净回归本来。'
                ]
            },
            lifestyle: {
                kicker: 'LIFESTYLE',
                title: '把喝水变成你的奢华生活方式',
                lead: '水是你每天最稳定的投入，也是最容易被忽略的升级项。让它成为你生活质感的底色。',
                body: [
                    '从清晨第一口到夜晚收尾，我们建议以不同矿物轮廓匹配不同场景：醒脑、舒缓、搭配轻食或社交。',
                    '一个更好的饮水系统，意味着更清晰的节律与更高级的自我照顾：少而精，稳定且可持续。'
                ]
            }
        },
        lang: {
            label: '语言'
        },
        notFound: {
            title: '页面未找到 | SHENGSHUI',
            msg: '这一滴水，流去了别处。',
            home: '回到首页'
        }
    },

    /* ---------------- English ---------------- */
    en: {
        meta: {
            home: 'SHENGSHUI | Discover the Value in Every Drop',
            products: 'SHENGSHUI | Products'
        },
        nav: {
            backHome: 'Home',
            coop: 'PARTNER'
        },
        hero: {
            desc: 'Discover the value in every drop.'
        },
        modes: {
            desert: { sub: "· FEEL LIFE'S DEEPEST LONGING ·", desc: 'When the world runs dry, one pure drop is worth the journey.' },
            dew: { sub: "· IMMERSE IN NATURE'S FINEST NOURISHMENT ·", desc: 'Born from the first light of dawn, every cell breathes anew.' },
            ice: { sub: '· THE PURE POWER OF THE POLAR ·', desc: 'A gift from the heart of ancient ice, refined over a thousand years.' },
            water: { sub: '· HOLY WATER, GIFTED BY NATURE ·', desc: 'Minerals and time carve its layers — serenity from the first sip.' },
            star: { sub: '· ETERNAL WATER, DRAWN FROM THE STARS ·', desc: 'Like a galaxy across the night sky, each drop holds the depth of the cosmos.' }
        },
        featured: {
            aria: 'Featured Selection',
            name: 'Ganten Natural Mineral Water',
            desc: '1L × 30 Bottles · Naturally Pure',
            cta: 'View'
        },
        coop: {
            title: 'Domain Partnership',
            text1: 'This domain carries intrinsic value and is available for lease or purchase. If interested, make your offer directly — sincerity over small talk.',
            text2: 'For domain partnerships, brand collaborations, or investment inquiries, please connect with us via the email below.',
            copy: 'Copy Email',
            close: 'Close',
            copied: 'Email copied',
            copyFail: 'Copy failed — please copy manually'
        },
        productsPage: {
            kicker: 'Products',
            tagline: 'Discover The Value In Every Drop',
            heading: 'Discover the Value in Every Drop',
            status: 'Showing {m} of {n} curated products.',
            collection: 'Collection',
            view: 'View',
            noImage: 'No Image'
        },
        navPanel: {
            close: 'Close',
            source: {
                kicker: 'THE SOURCE',
                title: 'Where the Source Defines the Standard of Luxury',
                lead: 'The value of a bottle of water is never just about quenching thirst; it lies in the landscape, time, and purity it carries.',
                body: [
                    'Our first principle is traceability to the source: from the environment of origin and mineral structure to trace-element ratios, we shape a stable and verifiable flavor and mouthfeel profile.',
                    'True luxury is choosing less intervention and letting nature do more — giving every drop a clear identity.'
                ]
            },
            purification: {
                kicker: 'PURIFICATION',
                title: 'Purification Is a Reverence for Purity',
                lead: 'Purity is not “nothing”; it is “exactly the right retention”: removing impurities while preserving nature’s mineral order.',
                body: [
                    'We use multi-stage physical purification and precision filtration, focusing on off-notes, turbidity, and particles to ensure clarity and layered depth on the palate.',
                    'Every process begins with low intervention: we preserve the water’s original structure and flavor backbone, returning purity to what it always was.'
                ]
            },
            lifestyle: {
                kicker: 'LIFESTYLE',
                title: 'Make Drinking Water Your Luxury Lifestyle',
                lead: 'Water is your most consistent daily investment and the easiest upgrade to overlook. Let it become the foundation of your quality of life.',
                body: [
                    'From the first sip at dawn to the last at night, we suggest matching different mineral profiles to different moments: awakening, soothing, pairing with light food, or socializing.',
                    'A better hydration system means a clearer rhythm and more refined self-care: less but better, steady and sustainable.'
                ]
            }
        },
        lang: {
            label: 'Language'
        },
        notFound: {
            title: 'Page Not Found | SHENGSHUI',
            msg: 'This drop has flowed elsewhere.',
            home: 'Back to Home'
        }
    },

    /* ---------------- Español ---------------- */
    es: {
        meta: {
            home: 'SHENGSHUI | Descubre el valor de cada gota',
            products: 'SHENGSHUI | Productos'
        },
        nav: {
            backHome: 'Inicio',
            coop: 'COLABORAR'
        },
        hero: {
            desc: 'Descubre el valor de cada gota.'
        },
        modes: {
            desert: { sub: '· SIENTE EL ANHELO PROFUNDO DE LA VIDA ·', desc: 'Cuando el mundo se seca, una sola gota pura merece el viaje.' },
            dew: { sub: '· SUMÉRJETE EN EL NUTRIR SUPREMO DE LA NATURALEZA ·', desc: 'Nacida con la primera luz del alba, cada célula vuelve a respirar.' },
            ice: { sub: '· EL PODER PURO DEL POLO ·', desc: 'Un regalo del corazón del hielo milenario, refinado durante siglos.' },
            water: { sub: '· AGUA SAGRADA, DON DE LA NATURALEZA ·', desc: 'Los minerales y el tiempo esculpen sus matices: serenidad desde el primer sorbo.' },
            star: { sub: '· AGUA ETERNA, TRAÍDA DE LAS ESTRELLAS ·', desc: 'Como una galaxia en la noche, cada gota guarda la profundidad del cosmos.' }
        },
        featured: {
            aria: 'Selección destacada',
            name: 'Agua mineral natural Ganten',
            desc: '1 L × 30 botellas · Pureza natural',
            cta: 'Ver'
        },
        coop: {
            title: 'Colaboración de dominio',
            text1: 'Este dominio tiene un valor intrínseco y está disponible para alquiler o venta. Si le interesa, haga su oferta directamente: preferimos la sinceridad a las vueltas.',
            text2: 'Para colaboraciones de dominio, alianzas de marca o consultas de inversión, póngase en contacto con nosotros a través del correo electrónico indicado.',
            copy: 'Copiar correo',
            close: 'Cerrar',
            copied: 'Correo copiado',
            copyFail: 'No se pudo copiar; cópielo manualmente'
        },
        productsPage: {
            kicker: 'PRODUCTOS',
            tagline: 'Descubre el valor de cada gota',
            heading: 'Descubre el valor de cada gota',
            status: 'Mostrando {m} de {n} productos seleccionados.',
            collection: 'Colección',
            view: 'Ver',
            noImage: 'Sin imagen'
        },
        navPanel: {
            close: 'Cerrar',
            source: {
                kicker: 'EL ORIGEN',
                title: 'Donde el origen define el estándar del lujo',
                lead: 'El valor de una botella de agua nunca se limita a saciar la sed: reside en el paisaje, el tiempo y la pureza que lleva consigo.',
                body: [
                    'Nuestro primer principio es la trazabilidad hasta el origen: desde el entorno de procedencia y la estructura mineral hasta la proporción de oligoelementos, definimos un perfil de sabor y textura estable y verificable.',
                    'El verdadero lujo es elegir menos intervención y dejar que la naturaleza haga más: dar a cada gota una identidad clara.'
                ]
            },
            purification: {
                kicker: 'PURIFICACIÓN',
                title: 'Purificar es reverenciar la pureza',
                lead: 'La pureza no es «nada», sino «la retención justa»: eliminar impurezas y conservar el orden mineral de la naturaleza.',
                body: [
                    'Aplicamos purificación física multietapa y filtración de precisión, controlando olores, turbidez y partículas para garantizar claridad y matices en boca.',
                    'Cada proceso parte de una baja intervención: no alteramos la estructura original ni el esqueleto de sabor del agua, devolviendo la pureza a su esencia.'
                ]
            },
            lifestyle: {
                kicker: 'ESTILO DE VIDA',
                title: 'Convierte el agua en tu estilo de vida de lujo',
                lead: 'El agua es tu inversión diaria más constante y la mejora más fácil de pasar por alto. Deja que sea la base de tu calidad de vida.',
                body: [
                    'Desde el primer sorbo al amanecer hasta el último de la noche, sugerimos combinar distintos perfiles minerales con distintos momentos: despertar, calma, comida ligera o vida social.',
                    'Un mejor sistema de hidratación significa un ritmo más claro y un autocuidado más refinado: menos pero mejor, constante y sostenible.'
                ]
            }
        },
        lang: {
            label: 'Idioma'
        },
        notFound: {
            title: 'Página no encontrada | SHENGSHUI',
            msg: 'Esta gota ha fluido hacia otro lugar.',
            home: 'Volver al inicio'
        }
    },

    /* ---------------- Deutsch ---------------- */
    de: {
        meta: {
            home: 'SHENGSHUI | Den Wert jedes Tropfens entdecken',
            products: 'SHENGSHUI | Produkte'
        },
        nav: {
            backHome: 'Startseite',
            coop: 'PARTNER'
        },
        hero: {
            desc: 'Den Wert jedes Tropfens entdecken.'
        },
        modes: {
            desert: { sub: '· DIE TIEFE SEHNSUCHT DES LEBENS SPÜREN ·', desc: 'Wenn die Welt vertrocknet, ist ein einziger reiner Tropfen die Reise wert.' },
            dew: { sub: '· IN DIE KÖSTLICHE NAHRUNG DER NATUR EINTAUCHEN ·', desc: 'Im ersten Licht der Morgendämmerung geboren, atmet jede Zelle neu.' },
            ice: { sub: '· DIE REINE KRAFT DER POLARREGIONEN ·', desc: 'Ein Geschenk aus dem Herzen uralten Eises, über Jahrtausende veredelt.' },
            water: { sub: '· HEILIGES WASSER, EIN GESCHENK DER NATUR ·', desc: 'Mineralien und Zeit formen seine Nuancen – Gelassenheit ab dem ersten Schluck.' },
            star: { sub: '· EWIGES WASSER, AUS DEN STERNEN GESCHÖPFT ·', desc: 'Wie eine Galaxie am Nachthimmel trägt jeder Tropfen die Tiefe des Kosmos.' }
        },
        featured: {
            aria: 'Ausgewählte Empfehlungen',
            name: 'Ganten natürliches Mineralwasser',
            desc: '1 L × 30 Flaschen · Natürlich rein',
            cta: 'Ansehen'
        },
        coop: {
            title: 'Domain-Kooperation',
            text1: 'Diese Domain hat einen eigenen Wert und steht zur Miete oder zum Kauf. Bei Interesse machen Sie bitte direkt ein Angebot – Ehrlichkeit statt Smalltalk.',
            text2: 'Für Domain-Kooperationen, Markenkooperationen oder Investitionsanfragen kontaktieren Sie uns bitte über die unten stehende E-Mail.',
            copy: 'E-Mail kopieren',
            close: 'Schließen',
            copied: 'E-Mail kopiert',
            copyFail: 'Kopieren fehlgeschlagen – bitte manuell kopieren'
        },
        productsPage: {
            kicker: 'PRODUKTE',
            tagline: 'Den Wert jedes Tropfens entdecken',
            heading: 'Den Wert jedes Tropfens entdecken',
            status: '{m} von {n} ausgewählten Produkten werden angezeigt.',
            collection: 'Kollektion',
            view: 'Ansehen',
            noImage: 'Kein Bild'
        },
        navPanel: {
            close: 'Schließen',
            source: {
                kicker: 'DIE QUELLE',
                title: 'Wo die Quelle den Luxusstandard definiert',
                lead: 'Der Wert einer Flasche Wasser liegt nie nur im Löschen des Durstes, sondern in der Landschaft, der Zeit und der Reinheit, die sie trägt.',
                body: [
                    'Unser erster Grundsatz ist die Rückverfolgbarkeit bis zur Quelle: von der Umgebung des Ursprungs und der Mineralstruktur bis zu den Spurenelementverhältnissen formen wir ein stabiles und überprüfbares Geschmacks- und Mundgefühlprofil.',
                    'Wahrer Luxus bedeutet, weniger Eingriff zu wählen und die Natur mehr arbeiten zu lassen – jedem Tropfen eine klare Identität zu geben.'
                ]
            },
            purification: {
                kicker: 'REINIGUNG',
                title: 'Reinigung ist Ehrfurcht vor der Reinheit',
                lead: 'Reinheit ist nicht „nichts“, sondern „genau die richtige Bewahrung“: Verunreinigungen entfernen und die natürliche Mineralordnung erhalten.',
                body: [
                    'Wir setzen auf mehrstufige physikalische Reinigung und Präzisionsfiltration, kontrollieren Fehlaromen, Trübung und Partikel und sichern Klarheit und Tiefe am Gaumen.',
                    'Jeder Prozess beginnt mit geringem Eingriff: Wir verändern die ursprüngliche Struktur und das Geschmacksgerüst des Wassers nicht und geben der Reinheit ihre Natur zurück.'
                ]
            },
            lifestyle: {
                kicker: 'LEBENSSTIL',
                title: 'Machen Sie Wassertrinken zu Ihrem luxuriösen Lebensstil',
                lead: 'Wasser ist Ihre beständigste tägliche Investition und das am leichtesten übersehene Upgrade. Lassen Sie es zur Grundlage Ihrer Lebensqualität werden.',
                body: [
                    'Vom ersten Schluck am Morgen bis zum letzten am Abend empfehlen wir, verschiedene Mineralprofile mit verschiedenen Momenten zu verbinden: Wachheit, Ruhe, leichte Küche oder Geselligkeit.',
                    'Ein besseres Trinksystem bedeutet einen klareren Rhythmus und eine kultiviertere Selbstfürsorge: weniger, aber besser – beständig und nachhaltig.'
                ]
            }
        },
        lang: {
            label: 'Sprache'
        },
        notFound: {
            title: 'Seite nicht gefunden | SHENGSHUI',
            msg: 'Dieser Tropfen ist woandershin geflossen.',
            home: 'Zurück zur Startseite'
        }
    },

    /* ---------------- العربية ---------------- */
    ar: {
        meta: {
            home: 'SHENGSHUI | اكتشف قيمة كل قطرة',
            products: 'SHENGSHUI | المنتجات'
        },
        nav: {
            backHome: 'العودة إلى الرئيسية',
            coop: 'شراكة'
        },
        hero: {
            desc: 'اكتشف قيمة كل قطرة.'
        },
        modes: {
            desert: { sub: '· اشعر بشوق الحياة العميق ·', desc: 'حين يجفّ العالم، تكفي قطرة نقيّة واحدة لتستحق الرحلة.' },
            dew: { sub: '· انغمس في ألطفِ ما تمنحه الطبيعة ·', desc: 'وُلدت من أول ضوء الفجر، فتعود كل خلية إلى التنفس.' },
            ice: { sub: '· القوة النقيّة للقطب ·', desc: 'هدية من قلب الجليد القديم، صقلتها آلاف السنين إلى نقاء مطلق.' },
            water: { sub: '· ماء مقدّس، من عطاء الطبيعة ·', desc: 'تشكّل المعادن والزمن طبقاته — سكينة من أول رشفة.' },
            star: { sub: '· ماء أبدي، من نور النجوم ·', desc: 'ككوكبة تعبر سماء الليل، تحمل كل قطرة عمق الكون.' }
        },
        featured: {
            aria: 'مختارات مميّزة',
            name: 'مياه غانتن الطبيعية المعدنية',
            desc: '1 لتر × 30 زجاجة · نقاء طبيعي',
            cta: 'عرض'
        },
        coop: {
            title: 'شراكة النطاق',
            text1: 'لهذا النطاق قيمة ذاتية، وهو متاح للإيجار أو البيع. إن كنت مهتمًا، قدّم عرضك مباشرة — نفضّل الصدق على الكلام الفارغ.',
            text2: 'لشراكات النطاق أو التعاون مع العلامة التجارية أو الاستفسار عن الاستثمار، تواصل معنا عبر البريد الإلكتروني أدناه.',
            copy: 'نسخ البريد',
            close: 'إغلاق',
            copied: 'تم نسخ البريد',
            copyFail: 'فشل النسخ — يرجى النسخ يدويًا'
        },
        productsPage: {
            kicker: 'المنتجات',
            tagline: 'اكتشف قيمة كل قطرة',
            heading: 'اكتشف قيمة كل قطرة',
            status: 'عرض {m} من {n} منتجًا مختارًا.',
            collection: 'مختارات',
            view: 'عرض',
            noImage: 'لا توجد صورة'
        },
        navPanel: {
            close: 'إغلاق',
            source: {
                kicker: 'المصدر',
                title: 'حيث يحدّد المصدر معيار الفخامة',
                lead: 'قيمة زجاجة الماء لا تقتصر أبدًا على إطفاء العطش، بل تكمن في المنظر والزمن والنقاء الذي تحمله.',
                body: [
                    'مبدؤنا الأول هو التتبّع حتى المصدر: من بيئة المنشأ والبنية المعدنية إلى نسب العناصر النادرة، نشكّل ملامح مذاق وملمس ثابتة وقابلة للتحقق.',
                    'الفخامة الحقيقية هي اختيار تدخّل أقل وترك الطبيعة تفعل المزيد — لمنح كل قطرة هوية واضحة.'
                ]
            },
            purification: {
                kicker: 'التنقية',
                title: 'التنقية تبجيلٌ للنقاء',
                lead: 'النقاء ليس «لا شيء»، بل «الاحتفاظ المناسب تمامًا»: إزالة الشوائب مع الحفاظ على النظام المعدني الطبيعي.',
                body: [
                    'نستخدم تنقية فيزيائية متعددة المراحل وترشيحًا دقيقًا، ونركّز على الروائح الغريبة والعكارة والجزيئات لضمان الصفاء والعمق في المذاق.',
                    'تبدأ كل عملية بتدخّل منخفض: لا نغيّر البنية الأصلية للماء أو هيكل مذاقه، ونعيد النقاء إلى أصله.'
                ]
            },
            lifestyle: {
                kicker: 'أسلوب الحياة',
                title: 'اجعل شرب الماء أسلوب حياتك الفاخر',
                lead: 'الماء هو أكثر استثماراتك اليومية ثباتًا، وأسهل ترقية قد تغفل عنها. دعه يصبح أساس جودة حياتك.',
                body: [
                    'من أول رشفة عند الفجر إلى آخر رشفة في الليل، نقترح مطابقة ملامح معدنية مختلفة للحظات مختلفة: التنبّه، الهدوء، الطعام الخفيف أو الاجتماع.',
                    'نظام شرب أفضل يعني إيقاعًا أوضح وعناية بالذات أرقى: أقل لكن أفضل، ثابت ومستدام.'
                ]
            }
        },
        lang: {
            label: 'اللغة'
        },
        notFound: {
            title: 'الصفحة غير موجودة | SHENGSHUI',
            msg: 'هذه القطرة جرت إلى مكان آخر.',
            home: 'العودة إلى الرئيسية'
        }
    },

    /* ---------------- Русский ---------------- */
    ru: {
        meta: {
            home: 'SHENGSHUI | Откройте ценность каждой капли',
            products: 'SHENGSHUI | Продукция'
        },
        nav: {
            backHome: 'На главную',
            coop: 'СОТРУДНИЧЕСТВО'
        },
        hero: {
            desc: 'Откройте ценность каждой капли.'
        },
        modes: {
            desert: { sub: '· ПОЧУВСТВУЙТЕ ГЛУБОКУЮ ЖАЖДУ ЖИЗНИ ·', desc: 'Когда мир пересыхает, одна чистая капля стоит долгого пути.' },
            dew: { sub: '· ПОГРУЗИТЕСЬ В ИЗЫСКАННЫЙ ДАР ПРИРОДЫ ·', desc: 'Рождённая в первом свете рассвета, каждая клетка дышит заново.' },
            ice: { sub: '· ЧИСТАЯ СИЛА ПОЛЮСА ·', desc: 'Дар из сердца древнего льда, очищенный тысячелетиями.' },
            water: { sub: '· СВЯЩЕННАЯ ВОДА, ДАР ПРИРОДЫ ·', desc: 'Минералы и время создают её оттенки — безмятежность с первого глотка.' },
            star: { sub: '· ВЕЧНАЯ ВОДА, ПОЧЕРПНУТАЯ ИЗ ЗВЁЗД ·', desc: 'Словно галактика в ночном небе, каждая капля хранит глубину космоса.' }
        },
        featured: {
            aria: 'Избранные предложения',
            name: 'Природная минеральная вода Ganten',
            desc: '1 л × 30 бутылок · Природная чистота',
            cta: 'Смотреть'
        },
        coop: {
            title: 'Сотрудничество по домену',
            text1: 'Этот домен обладает собственной ценностью и доступен для аренды или покупки. Если вам интересно, предлагайте цену напрямую — мы ценим искренность.',
            text2: 'По вопросам сотрудничества по домену, партнёрства с брендом или инвестиций свяжитесь с нами по указанной ниже электронной почте.',
            copy: 'Скопировать адрес',
            close: 'Закрыть',
            copied: 'Адрес скопирован',
            copyFail: 'Не удалось скопировать — скопируйте вручную'
        },
        productsPage: {
            kicker: 'ПРОДУКЦИЯ',
            tagline: 'Откройте ценность каждой капли',
            heading: 'Откройте ценность каждой капли',
            status: 'Показано {m} из {n} отобранных продуктов.',
            collection: 'Коллекция',
            view: 'Смотреть',
            noImage: 'Нет изображения'
        },
        navPanel: {
            close: 'Закрыть',
            source: {
                kicker: 'ИСТОЧНИК',
                title: 'Где источник задаёт стандарт роскоши',
                lead: 'Ценность бутылки воды никогда не сводится к утолению жажды — она в ландшафте, времени и чистоте, которые она несёт.',
                body: [
                    'Наш первый принцип — прослеживаемость до источника: от среды происхождения и минеральной структуры до соотношения микроэлементов мы формируем стабильный и проверяемый профиль вкуса и текстуры.',
                    'Настоящая роскошь — выбирать меньше вмешательства и позволять природе делать больше, давая каждой капле ясную идентичность.'
                ]
            },
            purification: {
                kicker: 'ОЧИСТКА',
                title: 'Очистка — это благоговение перед чистотой',
                lead: 'Чистота — не «ничто», а «точное сохранение»: удалить примеси, сохранив естественный минеральный порядок.',
                body: [
                    'Мы применяем многоступенчатую физическую очистку и точную фильтрацию, контролируя посторонние запахи, мутность и частицы, чтобы обеспечить прозрачность и глубину вкуса.',
                    'Каждый этап начинается с низкого вмешательства: мы не меняем исходную структуру воды и её вкусовой каркас, возвращая чистоте её природу.'
                ]
            },
            lifestyle: {
                kicker: 'ОБРАЗ ЖИЗНИ',
                title: 'Сделайте воду частью вашего роскошного образа жизни',
                lead: 'Вода — ваша самая стабильная ежедневная инвестиция и самое незаметное улучшение. Пусть она станет основой качества вашей жизни.',
                body: [
                    'От первого глотка на рассвете до последнего вечером мы советуем подбирать разные минеральные профили к разным моментам: бодрость, покой, лёгкая еда или общение.',
                    'Лучшая система питья — это более ясный ритм и более изысканная забота о себе: меньше, но лучше, стабильно и устойчиво.'
                ]
            }
        },
        lang: {
            label: 'Язык'
        },
        notFound: {
            title: 'Страница не найдена | SHENGSHUI',
            msg: 'Эта капля утекла в другое место.',
            home: 'Вернуться на главную'
        }
    },

    /* ---------------- 한국어 ---------------- */
    ko: {
        meta: {
            home: 'SHENGSHUI | 한 방울의 가치를 발견하세요',
            products: 'SHENGSHUI | 제품'
        },
        nav: {
            backHome: '홈으로',
            coop: '협업'
        },
        hero: {
            desc: '한 방울의 가치를 발견하세요.'
        },
        modes: {
            desert: { sub: '· 생명의 깊은 갈망을 느껴보세요 ·', desc: '세상이 메말라도, 단 한 방울의 순수함은 그 여정을 가치 있게 합니다.' },
            dew: { sub: '· 자연의 극상의 영양에 빠져보세요 ·', desc: '새벽의 첫 빛에서 태어나, 모든 세포가 다시 숨을 쉽니다.' },
            ice: { sub: '· 극지의 순수한 힘을 경험하세요 ·', desc: '고대 빙하 깊은 곳의 선물, 천 년의 시간이 다듬은 극치의 순수함.' },
            water: { sub: '· 자연이 내린 성수 ·', desc: '미네랄과 시간이 빚어낸 층위 — 첫 모금부터 깊은 고요함.' },
            star: { sub: '· 별에서 길어 올린 영원의 물 ·', desc: '밤하늘의 은하수처럼, 한 방울마다 우주의 깊이를 담고 있습니다.' }
        },
        featured: {
            aria: '추천 상품',
            name: '간텐 천연 미네랄 워터',
            desc: '1L × 30병 · 자연 그대로의 순수함',
            cta: '보기'
        },
        coop: {
            title: '도메인 협업',
            text1: '이 도메인은 고유한 가치가 있으며 임대 또는 판매가 가능합니다. 관심이 있으시면 바로 제안해 주세요 — 진심을 중요하게 생각합니다.',
            text2: '도메인 협업, 브랜드 제휴 또는 투자 문의는 아래 이메일로 연락해 주세요.',
            copy: '이메일 복사',
            close: '닫기',
            copied: '이메일이 복사되었습니다',
            copyFail: '복사하지 못했습니다 — 직접 복사해 주세요'
        },
        productsPage: {
            kicker: '제품',
            tagline: '한 방울의 가치를 발견하세요',
            heading: '한 방울의 가치를 발견하세요',
            status: '총 {n}개 중 {m}개를 표시합니다.',
            collection: '컬렉션',
            view: '보기',
            noImage: '이미지 없음'
        },
        navPanel: {
            close: '닫기',
            source: {
                kicker: '수원',
                title: '수원이 럭셔리의 기준을 정의합니다',
                lead: '물 한 병의 가치는 갈증을 해소하는 데 그치지 않고, 그것이 담고 있는 지형과 시간, 순수함에 있습니다.',
                body: [
                    '우리의 첫 번째 원칙은 수원까지의 추적 가능성입니다. 산지 환경과 미네랄 구조, 미량원소 비율까지 안정적이고 검증 가능한 풍미와 질감의 윤곽을 만들어냅니다.',
                    '진정한 럭셔리는 더 적은 개입을 택하고 자연이 더 많은 일을 하도록 두는 것 — 한 방울마다 명확한 정체성을 부여하는 것입니다.'
                ]
            },
            purification: {
                kicker: '정화',
                title: '정화는 순수함에 대한 경외입니다',
                lead: '순수함은 "없음"이 아니라 "정확한 보존"입니다. 불순물은 제거하고 자연의 미네랄 질서는 지킵니다.',
                body: [
                    '우리는 다단계 물리 정화와 정밀 여과를 통해 이취, 탁도, 미립자를 중점적으로 관리하여 입안의 맑음과 층위를 보장합니다.',
                    '모든 공정은 낮은 개입을 전제로 합니다. 물의 원래 구조와 풍미의 골격을 바꾸지 않고 순수함을 본래대로 되돌립니다.'
                ]
            },
            lifestyle: {
                kicker: '라이프스타일',
                title: '물을 당신의 럭셔리 라이프스타일로 만드세요',
                lead: '물은 당신이 매일 가장 꾸준히 하는 투자이자 가장 쉽게 놓치는 업그레이드입니다. 삶의 질감을 이루는 바탕이 되게 하세요.',
                body: [
                    '새벽의 첫 모금부터 밤의 마지막 모금까지, 각성, 휴식, 가벼운 식사, 사교 등 상황에 맞춰 서로 다른 미네랄 프로필을 추천합니다.',
                    '더 나은 음수 시스템은 더 명확한 리듬과 더 세련된 자기 돌봄을 의미합니다. 적지만 좋게, 꾸준하고 지속 가능하게.'
                ]
            }
        },
        lang: {
            label: '언어'
        },
        notFound: {
            title: '페이지를 찾을 수 없습니다 | SHENGSHUI',
            msg: '이 물방울은 다른 곳으로 흘러갔습니다.',
            home: '홈으로 돌아가기'
        }
    },

    /* ---------------- Português ---------------- */
    pt: {
        meta: {
            home: 'SHENGSHUI | Descubra o valor de cada gota',
            products: 'SHENGSHUI | Produtos'
        },
        nav: {
            backHome: 'Início',
            coop: 'PARCERIA'
        },
        hero: {
            desc: 'Descubra o valor de cada gota.'
        },
        modes: {
            desert: { sub: '· SINTA O DESEJO PROFUNDO DA VIDA ·', desc: 'Quando o mundo seca, uma única gota pura vale a viagem.' },
            dew: { sub: '· MERGULHE NO MELHOR ALIMENTO DA NATUREZA ·', desc: 'Nascida na primeira luz da aurora, cada célula respira de novo.' },
            ice: { sub: '· O PODER PURO DO POLO ·', desc: 'Um presente do coração do gelo antigo, refinado por milênios.' },
            water: { sub: '· ÁGUA SAGRADA, DÁDIVA DA NATUREZA ·', desc: 'Minerais e tempo esculpem suas camadas — serenidade desde o primeiro gole.' },
            star: { sub: '· ÁGUA ETERNA, COLHIDA DAS ESTRELAS ·', desc: 'Como uma galáxia no céu noturno, cada gota guarda a profundidade do cosmos.' }
        },
        featured: {
            aria: 'Seleção especial',
            name: 'Água mineral natural Ganten',
            desc: '1 L × 30 garrafas · Pureza natural',
            cta: 'Ver'
        },
        coop: {
            title: 'Parceria de domínio',
            text1: 'Este domínio tem valor próprio e está disponível para locação ou venda. Se tiver interesse, faça sua oferta diretamente — preferimos sinceridade a rodeios.',
            text2: 'Para parcerias de domínio, colaborações de marca ou interesse em investimento, fale conosco pelo e-mail abaixo.',
            copy: 'Copiar e-mail',
            close: 'Fechar',
            copied: 'E-mail copiado',
            copyFail: 'Falha ao copiar — copie manualmente'
        },
        productsPage: {
            kicker: 'PRODUTOS',
            tagline: 'Descubra o valor de cada gota',
            heading: 'Descubra o valor de cada gota',
            status: 'Mostrando {m} de {n} produtos selecionados.',
            collection: 'Coleção',
            view: 'Ver',
            noImage: 'Sem imagem'
        },
        navPanel: {
            close: 'Fechar',
            source: {
                kicker: 'A ORIGEM',
                title: 'Onde a origem define o padrão de luxo',
                lead: 'O valor de uma garrafa de água nunca está apenas em matar a sede: está na paisagem, no tempo e na pureza que ela carrega.',
                body: [
                    'Nosso primeiro princípio é a rastreabilidade até a origem: do ambiente de procedência e da estrutura mineral à proporção de oligoelementos, formamos um perfil de sabor e textura estável e verificável.',
                    'O verdadeiro luxo é escolher menos intervenção e deixar a natureza fazer mais — dar a cada gota uma identidade clara.'
                ]
            },
            purification: {
                kicker: 'PURIFICAÇÃO',
                title: 'Purificar é reverenciar a pureza',
                lead: 'Pureza não é «nada», mas «a retenção exata»: remover impurezas e preservar a ordem mineral da natureza.',
                body: [
                    'Usamos purificação física em várias etapas e filtração de precisão, controlando odores, turbidez e partículas para garantir clareza e camadas no paladar.',
                    'Cada processo parte da baixa intervenção: não alteramos a estrutura original nem a base de sabor da água, devolvendo a pureza ao que ela sempre foi.'
                ]
            },
            lifestyle: {
                kicker: 'ESTILO DE VIDA',
                title: 'Faça de beber água o seu estilo de vida de luxo',
                lead: 'A água é o seu investimento diário mais constante e a melhoria mais fácil de ignorar. Deixe que ela seja a base da sua qualidade de vida.',
                body: [
                    'Do primeiro gole ao amanhecer ao último à noite, sugerimos combinar diferentes perfis minerais com diferentes momentos: despertar, acalmar, refeições leves ou convívio.',
                    'Um sistema de hidratação melhor significa um ritmo mais claro e um autocuidado mais refinado: menos, porém melhor — constante e sustentável.'
                ]
            }
        },
        lang: {
            label: 'Idioma'
        },
        notFound: {
            title: 'Página não encontrada | SHENGSHUI',
            msg: 'Esta gota fluiu para outro lugar.',
            home: 'Voltar ao início'
        }
    },

    /* ---------------- Français ---------------- */
    fr: {
        meta: {
            home: 'SHENGSHUI | Découvrez la valeur de chaque goutte',
            products: 'SHENGSHUI | Produits'
        },
        nav: {
            backHome: 'Accueil',
            coop: 'PARTENARIAT'
        },
        hero: {
            desc: 'Découvrez la valeur de chaque goutte.'
        },
        modes: {
            desert: { sub: '· RESSENTEZ LE DÉSIR PROFOND DE LA VIE ·', desc: 'Quand le monde se dessèche, une seule goutte pure mérite le voyage.' },
            dew: { sub: '· PLONGEZ DANS LE MEILLEUR DON DE LA NATURE ·', desc: 'Née de la première lumière de l’aube, chaque cellule respire à nouveau.' },
            ice: { sub: '· LA PUISSANCE PURE DU PÔLE ·', desc: 'Un présent du cœur des glaces anciennes, affiné pendant des millénaires.' },
            water: { sub: '· EAU SACRÉE, DON DE LA NATURE ·', desc: 'Les minéraux et le temps sculptent ses nuances — sérénité dès la première gorgée.' },
            star: { sub: '· EAU ÉTERNELLE, PUISÉE DANS LES ÉTOILES ·', desc: 'Telle une galaxie dans la nuit, chaque goutte porte la profondeur du cosmos.' }
        },
        featured: {
            aria: 'Sélection',
            name: 'Eau minérale naturelle Ganten',
            desc: '1 L × 30 bouteilles · Pureté naturelle',
            cta: 'Voir'
        },
        coop: {
            title: 'Partenariat de domaine',
            text1: 'Ce domaine a une valeur intrinsèque et est disponible à la location ou à la vente. Si vous êtes intéressé, faites votre offre directement — nous préférons la sincérité aux détours.',
            text2: 'Pour les partenariats de domaine, les collaborations de marque ou les demandes d’investissement, contactez-nous via l’e-mail ci-dessous.',
            copy: 'Copier l’e-mail',
            close: 'Fermer',
            copied: 'E-mail copié',
            copyFail: 'Échec de la copie — veuillez copier manuellement'
        },
        productsPage: {
            kicker: 'PRODUITS',
            tagline: 'Découvrez la valeur de chaque goutte',
            heading: 'Découvrez la valeur de chaque goutte',
            status: 'Affichage de {m} sur {n} produits sélectionnés.',
            collection: 'Collection',
            view: 'Voir',
            noImage: 'Aucune image'
        },
        navPanel: {
            close: 'Fermer',
            source: {
                kicker: 'LA SOURCE',
                title: 'Là où la source définit le standard du luxe',
                lead: 'La valeur d’une bouteille d’eau ne se limite jamais à étancher la soif : elle réside dans le paysage, le temps et la pureté qu’elle porte.',
                body: [
                    'Notre premier principe est la traçabilité jusqu’à la source : de l’environnement d’origine et de la structure minérale au rapport des oligo-éléments, nous façonnons un profil de goût et de texture stable et vérifiable.',
                    'Le vrai luxe, c’est de choisir moins d’intervention et de laisser la nature en faire davantage — donner à chaque goutte une identité claire.'
                ]
            },
            purification: {
                kicker: 'PURIFICATION',
                title: 'Purifier, c’est révérer la pureté',
                lead: 'La pureté n’est pas « rien », mais « la juste rétention » : éliminer les impuretés tout en préservant l’ordre minéral de la nature.',
                body: [
                    'Nous utilisons une purification physique multi-étapes et une filtration de précision, en contrôlant les odeurs, la turbidité et les particules pour garantir clarté et profondeur en bouche.',
                    'Chaque traitement repose sur une faible intervention : nous ne modifions ni la structure originelle ni la charpente aromatique de l’eau, rendant la pureté à sa nature.'
                ]
            },
            lifestyle: {
                kicker: 'ART DE VIVRE',
                title: 'Faites de l’eau votre art de vivre luxueux',
                lead: 'L’eau est votre investissement quotidien le plus constant et l’amélioration la plus facile à négliger. Laissez-la devenir le socle de votre qualité de vie.',
                body: [
                    'De la première gorgée à l’aube à la dernière le soir, nous suggérons d’associer différents profils minéraux à différents moments : éveil, apaisement, repas léger ou convivialité.',
                    'Un meilleur système d’hydratation signifie un rythme plus clair et des soins de soi plus raffinés : moins mais mieux, stable et durable.'
                ]
            }
        },
        lang: {
            label: 'Langue'
        },
        notFound: {
            title: 'Page introuvable | SHENGSHUI',
            msg: 'Cette goutte s’est écoulée ailleurs.',
            home: 'Retour à l’accueil'
        }
    },

    /* ---------------- 日本語 ---------------- */
    ja: {
        meta: {
            home: 'SHENGSHUI | 一滴の価値を発見する',
            products: 'SHENGSHUI | 製品'
        },
        nav: {
            backHome: 'ホームへ戻る',
            coop: '提携'
        },
        hero: {
            desc: '一滴の価値を発見する。'
        },
        modes: {
            desert: { sub: '· 生命の深い渇望を感じて ·', desc: '世界が乾ききったとき、たった一滴の純粋さが旅の価値になる。' },
            dew: { sub: '· 自然の極上の恵みに浸る ·', desc: '夜明けの最初の光から生まれ、すべての細胞が再び息づく。' },
            ice: { sub: '· 極地の純粋な力を体験する ·', desc: '古い氷の奥深くからの贈り物、千年の時を経て磨かれた究極の純粋さ。' },
            water: { sub: '· 自然が授けた聖なる水 ·', desc: 'ミネラルと時間が刻む層 — 最初の一口から深い静けさ。' },
            star: { sub: '· 星から汲み上げた永遠の水 ·', desc: '夜空に輝く銀河のように、一滴一滴に宇宙の深さが宿る。' }
        },
        featured: {
            aria: 'おすすめ商品',
            name: 'ガンテン天然ミネラルウォーター',
            desc: '1L × 30本 · 天然の良水',
            cta: '見る'
        },
        coop: {
            title: 'ドメイン提携',
            text1: 'このドメインには固有の価値があり、賃貸または販売が可能です。ご興味があれば直接オファーをお寄せください。誠実さを大切にしています。',
            text2: 'ドメイン提携、ブランドコラボレーション、投資に関するお問い合わせは、下記のメールアドレスまでご連絡ください。',
            copy: 'メールをコピー',
            close: '閉じる',
            copied: 'メールをコピーしました',
            copyFail: 'コピーに失敗しました — 手動でコピーしてください'
        },
        productsPage: {
            kicker: '製品',
            tagline: '一滴の価値を発見する',
            heading: '一滴の価値を発見する',
            status: '全 {n} 件中 {m} 件を表示しています。',
            collection: 'コレクション',
            view: '見る',
            noImage: '画像なし'
        },
        navPanel: {
            close: '閉じる',
            source: {
                kicker: '水源',
                title: '水源がラグジュアリーの基準を定義する',
                lead: '一本の水の価値は、渇きを癒すだけではありません。それが運ぶ地形、時間、そして純粋さにあります。',
                body: [
                    '私たちの第一原則は「水源まで遡れること」。産地の環境、ミネラル構造、微量元素の比率まで、安定して検証可能な風味と口当たりの輪郭を形づくります。',
                    '真のラグジュアリーとは、より少ない介入を選び、自然により多くの仕事を委ねること — 一滴一滴に明確なアイデンティティを与えることです。'
                ]
            },
            purification: {
                kicker: '浄化',
                title: '浄化は純粋さへの敬意',
                lead: '純粋とは「無」ではなく「ちょうどよい保持」。不純物を取り除き、自然のミネラルの秩序を保ちます。',
                body: [
                    '多段階の物理浄化と精密ろ過を採用し、異臭、濁り、微粒子を重点的に管理して、口当たりの透明感と層の深さを確保します。',
                    'すべての工程は「低介入」を前提とします。水の本来の構造と風味の骨格を変えず、純粋さをあるべき姿に戻します。'
                ]
            },
            lifestyle: {
                kicker: 'ライフスタイル',
                title: '水を飲むことを、あなたのラグジュアリーなライフスタイルに',
                lead: '水は毎日もっとも安定した投資であり、もっとも見落とされやすいアップグレードです。生活の質感の基盤にしましょう。',
                body: [
                    '夜明けの最初の一口から夜の最後の一口まで、目覚め、くつろぎ、軽食、社交など、場面に合わせて異なるミネラルプロファイルを提案します。',
                    'より良い飲水システムは、より明確なリズムと、より洗練されたセルフケアを意味します。少なく、しかし良く、安定して持続可能に。'
                ]
            }
        },
        lang: {
            label: '言語'
        },
        notFound: {
            title: 'ページが見つかりません | SHENGSHUI',
            msg: 'この一滴は、どこかへ流れていきました。',
            home: 'ホームへ戻る'
        }
    }
};
