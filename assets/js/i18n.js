/**
 * Kima Academy i18n (Internationalization) System
 * Handles English, Arabic, and Hebrew translations
 * No build step required - pure client-side
 */
(function () {
    'use strict';

    const DEFAULT_LANG = 'en';
    const SUPPORTED_LANGS = ['en', 'ar', 'he'];
    const RTL_LANGS = ['ar', 'he'];
    const STORAGE_KEY = 'kimaLang';

    let currentLang = DEFAULT_LANG;
    let translations = {};

    // Inline translations data (avoid CORS issues for static sites)
    const TRANSLATIONS_DATA = {
        en: {
            "site": { "title": "Kima Academy - Program for Entrepreneurial Leadership Management (ELM)" },
            "nav": { "home": "Home", "academy": "Academy", "contact": "Contact" },
            "hamburger": { "contact_info": "Contact info", "email": "Email", "location": "Location", "location_text": "Herzliya, Israel", "follow_us": "Follow us" },
            "hero": {
                "headline": "Lead With Influence",
                "headline_accent": "Build With Impact",
                "description": "Bridge your Executive Leadership Experience gap to Expand your influence and accelerate your growth.. Become a Kima Fellow and get certified in Entrepreneurial Leadership Management at the level of real-world impact.",
                "cta_enroll": "Enroll",
                "cta_contact": "Contact Us"
            },
            "philosophy": {
                "quote": "Great leaders learn from experience. Exceptional leaders learn from others",
                "subquote": "What experience takes years to build, focused learning delivers now."
            },
            "pillars": {
                "title": "The Three Pillars",
                "intro": "Through Kima's ELM Three-Pillar Framework, you will develop executive presence, master adaptive leadership, and cultivate an entrepreneurial opportunity-driven mindset, strengthening the professional capabilities required to deliver with precision and impact.",
                "pillar1_title": "Conscious Leadership",
                "pillar1_desc": "Leadership isn't inherited. It's built. Master frameworks and transition from manager to conscious leader.",
                "pillar2_title": "Value-Driven Entrepreneurship",
                "pillar2_desc": "Entrepreneurship is a mindset of creating value. Develop opportunity recognition and drive innovation in any context.",
                "pillar3_title": "Professional Management",
                "pillar3_desc": "Your vision means nothing if you can't communicate it. Perfect storytelling, persuasion, and executive presence.",
                "learn_more": "Learn more"
            },
            "outcomes": {
                "heading": "The KIMA-ACADEMY ELM Promise",
                "promise_line1": "ELM is not another leadership program. It is a structured acceleration of executive capability.",
                "promise_line2": "You won't just learn frameworks, you will reshape how you think, decide, and lead in complex environments.",
                "by_end": "By the end of the program, you will:",
                "outcome1": "Command executive presence in high-stakes environments",
                "outcome2": "Make complex decisions with clarity and confidence",
                "outcome3": "Identify and shape opportunities others overlook",
                "outcome4": "Translate strategy into measurable execution",
                "outcome5": "Lead adaptive change inside real-world constraints",
                "outcome6": "Operate with methodologies inspired by leading global institutions",
                "outcome7": "Expand your strategic network and utilize the KIMA Collective network at the executive level",
                "certification_statement": "Achieve ELM Certification and join the KIMA Collective, advancing a new standard of Multiplying Leadership that creates exponential impact.",
                "closing_statement": "This is where ambition turns into structured execution, and experience becomes influence."
            },
            "leadership_levels": {
                "section_title": "Find your ELM Pathway",
                "level1_label": "ELM1",
                "level1_title": "Industry Expert to Executive",
                "level1_subtitle": "Shift from being a subject matter expert to leading strategic organizational initiatives.",
                "level1_desc": "Transition from being a subject matter expert to leading strategic organizational initiatives.",
                "level1_focus_title": "KEY FOCUS AREAS",
                "level1_focus1": "Lead without official Authority",
                "level1_focus2": "Develop strategic thinking and vision",
                "level1_focus3": "Learn to delegate technical work",
                "level1_focus4": "Build cross-functional relationships",
                "level1_focus5": "Focus on organizational impact",
                "level1_focus6": "Mentor emerging talent in your field",
                "level2_label": "ELM2",
                "level2_title": "Mid-Level Manager to C-Level",
                "level2_subtitle": "Move from managing teams to enterprise-wide leadership and strategic decision-making.",
                "level2_desc": "Move from managing teams to enterprise-wide leadership and strategic decision-making.",
                "level2_focus1": "Master enterprise-wide strategic planning",
                "level2_focus2": "Develop C-suite communication skills",
                "level2_focus3": "Build executive presence and influence",
                "level2_focus4": "Lead organizational transformation",
                "level2_focus5": "Navigate complex stakeholder dynamics",
                "level3_label": "ELM3",
                "level3_title": "C-Level to CEO",
                "level3_subtitle": "Advance to ultimate organizational responsibility and vision setting.",
                "level3_desc": "Advance to ultimate organizational responsibility and vision setting.",
                "level3_focus1": "Define organizational vision and culture",
                "level3_focus2": "Master board-level communication",
                "level3_focus3": "Drive long-term strategic growth",
                "level3_focus4": "Build high-performing executive teams",
                "level3_focus5": "Navigate market transformation",
                "level4_label": "ELM4",
                "level4_title": "Founder to Leader",
                "level4_subtitle": "Transition from creating to leading",
                "level4_desc": "Transition from creating to leading, scaling your vision through others.",
                "level4_focus1": "Build scalable leadership systems",
                "level4_focus2": "Delegate operational responsibilities",
                "level4_focus3": "Develop strategic partnerships",
                "level4_focus4": "Create sustainable growth frameworks",
                "level4_focus5": "Mentor and empower team leaders",
                "level4_focus6": "Operate with methodologies inspired by leading global institutions",
                "level5_label": "ELM5",
                "level5_title": "Becoming a Leader",
                "level5_subtitle": "Prepare to step into management by building the internal operating system of leadership, before the title arrives.",
                "level5_desc": "Prepare to step into management by building the internal operating system of leadership, before the title arrives.",
                "level5_focus_title": "KEY FOCUS AREAS",
                "level5_focus1": "Develop leadership presence and personal credibility",
                "level5_focus2": "Make structured decisions in uncertain environments",
                "level5_focus3": "Influence across teams without formal authority",
                "level5_focus4": "Translate strategy into team-level execution",
                "level5_focus5": "Build trust, accountability, and performance standards",
                "level5_focus6": "Position yourself as promotion-ready",
                "level6_label": "ELM6",
                "level6_title": "Partner Accelerators",
                "level6_subtitle": "Join Kima accelerators and partners",
                "level6_desc": "Connect with our network of world-class accelerators and strategic partners to amplify your leadership journey.",
                "level6_focus_title": "OUR PARTNERS",
                "learn_more": "Learn More",
                "enroll_now": "Enroll now"
            },
            "accelerate": {
                "section_title": "The ELM Operating System",
                "section_desc": "ELM Operates on strategic rigor, hands-on application, and executive-level exposure to accelerate capability in practice, not theory, all while using:",
                "item1_title": "Ivy-League Strategic Frameworks",
                "item1_desc": "Global frameworks and methodologies adapted to local complexity and real business constraints.",
                "item2_title": "Hands-On Case Studies & Real-World Scenarios",
                "item2_desc": "Work through live challenges, decision simulations, and applied strategic exercises.",
                "item3_title": "Practice-Driven Learning",
                "item3_desc": "Simulate complexity, test decision-making, and refine performance in real-world scenarios.",
                "item4_title": "Inspirational Executive Sessions",
                "item4_desc": "Exposure to leaders operating at the highest levels, expanding perspective and standards.",
                "item5_title": "The KIMA Collective & Network",
                "item5_desc": "Access to a curated executive community that extends beyond the classroom, creating long-term strategic leverage."
            },
            "enroll_now": {
                "section_title": "Enroll Now",
                "section_desc": "Take the first step toward transforming your leadership journey. Fill out the form below to secure your spot in our Entrepreneurial Leadership Management program."
            },
            "register_elm": {
                "section_title": "ELM - Mini Program",
                "section_desc": "Transform your leadership journey with our comprehensive mini program. Everything you need to accelerate your growth.",
                "location_label": "Location",
                "location_text": "Herzliya, an inspiring tech environment designed to foster creativity and focused learning",
                "investment_label": "Investment",
                "investment_price": "6,500 ILS",
                "investment_promo": "with Promo code HASUB",
                "investment_desc": "Comprehensive training including all external sessions, personal mentoring, and program materials",
                "outcome_label": "Outcome",
                "outcome_text": "Advancing to executive leadership level, equipped to build and expand successful ventures",
                "startdate_label": "Start Date",
                "startdate_text": "The program begins on February 16, 2025",
                "startdate_schedule": "Meetings twice a month on Monday.",
                "tagline": "Don't let lack of experience hold you back. Your entrepreneurial journey starts here."
            },
            "modals": {
                "module1_title": "Module 1: Conscious Leadership",
                "module1_intro": "Leadership isn't inherited. It's built.",
                "module1_desc": "The world's top institutions—Harvard, MIT—have proven that leadership is a learnable skill. We bring their proven methodologies to you, adapted for real-world application.",
                "module1_what_title": "What You'll Master:",
                "module1_point1": "Technical and adaptive leadership frameworks",
                "module1_point2": "Decision-making under uncertainty and the 5 laws of leadership",
                "module1_point3": "Building influence and driving organizational change",
                "module1_point4": "Transitioning from manager to conscious leader",
                "module1_bottom": "Bottom line: Lead with clarity, purpose, and measurable impact.",
                "module2_title": "Module 2: Entrepreneurial Thinking",
                "module2_intro": "Entrepreneurship isn't about startups. It's a mindset of creating value.",
                "module2_desc": "True entrepreneurs see what others miss: the gap between problems and solutions. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.",
                "module2_what_title": "What You'll Develop:",
                "module2_point1": "Problem-solving frameworks that create value",
                "module2_point2": "Opportunity recognition and strategic execution",
                "module2_point3": "Building solutions collaboratively",
                "module2_point4": "Driving innovation in any context",
                "module2_bottom": "Bottom line: Think like an entrepreneur. Lead like a changemaker.",
                "module3_title": "Module 3: Professional Impact",
                "module3_intro": "Your vision means nothing if you can't communicate it.",
                "module3_desc": "Professionalism is the bridge between ideas and execution. It's how you persuade stakeholders, attract partners, build credibility, and inspire action. It's the skill that transforms potential into performance.",
                "module3_what_title": "What You'll Perfect:",
                "module3_point1": "Compelling storytelling and presentation",
                "module3_point2": "Strategic business communication and persuasion",
                "module3_point3": "Building executive presence",
                "module3_point4": "Converting vision into actionable strategy",
                "module3_bottom": "Bottom line: Communicate with power. Execute with precision.",
                "enrollment_title": "Enroll in ELM Program",
                "enrollment_intro": "Transform your leadership journey.",
                "enrollment_desc": "Fill out the form below to secure your spot in our Entrepreneurial Leadership Management program.",
                "program_modal1_title": "Industry Expert to Executive",
                "program_modal1_subtitle": "Shift from specialized expertise to executive oversight",
                "program_modal1_benefit_title": "What You'll Get",
                "program_modal1_benefit1_title": "Intensive Leadership Sessions",
                "program_modal1_benefit1_desc": "6 high-impact sessions at Herzliya",
                "program_modal1_benefit2_title": "Personal Mentoring",
                "program_modal1_benefit2_desc": "8 individual trainings designed for you",
                "program_modal1_benefit3_title": "LEM Certificate",
                "program_modal1_benefit3_desc": "Join the KIMA LEM Leadership network",
                "program_modal1_benefit4_title": "Executive Presence",
                "program_modal1_benefit4_desc": "Build strategic oversight frameworks",
                "accelerators_modal_title": "Join Kima Accelerators & Partners",
                "accelerators_modal_desc": "Connect with our network of world-class accelerators and strategic partners to amplify your leadership journey.",
                "accelerators_benefit_title": "Partnership Benefits",
                "accelerators_benefit1_title": "Network Access",
                "accelerators_benefit1_desc": "Connect with industry leaders",
                "accelerators_benefit2_title": "Funding Opportunities",
                "accelerators_benefit2_desc": "Access to capital & investors",
                "accelerators_benefit3_title": "Mentorship",
                "accelerators_benefit3_desc": "Guidance from successful founders",
                "accelerators_benefit4_title": "Resources",
                "accelerators_benefit4_desc": "Tools, training & support",
                "accelerators_partners_title": "Our Partner Network"
            },
            "footer": {
                "footer_desc": "Transforming corporate professionals into visionary leaders through proven Entrepreneurial Leadership Management programs.",
                "quick_links": "Quick Links",
                "get_in_touch": "Get in Touch",
                "copyright": "© 2026 Kima Academy All right reserved.",
                "policy_privacy": "Policy & privacy",
                "terms_conditions": "Terms & conditions",
                "gotop": "GOTOP"
            },
            "contact": {
                "breadcrumb_home": "Home",
                "breadcrumb_contact": "Contact",
                "page_title": "Contact",
                "section_heading": "CONTACT US",
                "section_title": "Get in touch with us",
                "form_title_part1": "Contact Us",
                "form_name": "Full name*",
                "form_email": "Email address*",
                "form_phone": "Phone number*",
                "form_select_default": "Choose a option",
                "form_option1": "ELM Program",
                "form_option2": "Leadership Coaching",
                "form_option3": "Entrepreneurship Training",
                "form_option4": "General Inquiry",
                "form_message": "Type message",
                "form_submit": "Send message"
            },
            "enroll": {
                "page_title": "Enroll Now",
                "breadcrumb_home": "Home",
                "breadcrumb_enroll": "Enroll"
            }
        },
        ar: {
            "site": { "title": "أكاديمية كيما - برنامج إدارة القيادة الريادية (ELM)" },
            "nav": { "home": "الرئيسية", "academy": "الأكاديمية", "contact": "اتصل بنا" },
            "hamburger": { "contact_info": "معلومات الاتصال", "email": "البريد الإلكتروني", "location": "الموقع", "location_text": "هرتسليا، إسرائيل", "follow_us": "تابعنا" },
            "hero": {
                "headline": "قُد بتأثير",
                "headline_accent": "ابنِ بتأثير",
                "description": "سد فجوة خبرتك القيادية التنفيذية لتوسيع تأثيرك وتسريع نموك. كن زميلاً في كيما واحصل على شهادة في إدارة القيادة الريادية على مستوى التأثير الواقعي.",
                "cta_enroll": "سجل",
                "cta_contact": "اتصل بنا"
            },
            "philosophy": {
                "quote": "القادة العظماء يتعلمون من التجربة. القادة الاستثنائيون من الآخرين",
                "subquote": "ما تستغرقه التجربة سنوات لبنائها، يقدمه التعلم المركز الآن."
            },
            "pillars": {
                "title": "الركائز الثلاث",
                "intro": "من خلال إطار عمل ELM الثلاثي لكيما، ستطور الحضور التنفيذي، وتتقن القيادة التكيفية، وتزرع عقلية ريادية موجهة نحو الفرص، مما يعزز القدرات المهنية المطلوبة للتنفيذ بدقة وتأثير.",
                "pillar1_title": "القيادة الواعية",
                "pillar1_desc": "Leadership لا تُورث. إنها تُبنى. أتقن الأطر وانتقل من مدير إلى قائد واعٍ.",
                "pillar2_title": "ريادة الأعمال القائمة على القيمة",
                "pillar2_desc": "ريادة الأعمال هي عقلية خلق القيمة. طور التعرف على الفرص واقد الابتكار في أي سياق.",
                "pillar3_title": "الإدارة المهنية",
                "pillar3_desc": "رؤيتك لا تعني شيئًا إذا لم تستطع توصيلها. أتقن سرد القصص والإقناع والحضور التنفيذي.",
                "learn_more": "اعرف المزيد"
            },
            "outcomes": {
                "heading": "وعد KIMA-ACADEMY ELM",
                "promise_line1": "ELM ليس مجرد برنامج قيادة آخر. إنه تسريع منظم للقدرة التنفيذية.",
                "promise_line2": "لن تتعلم الأطر فقط، بل ستعيد تشكيل كيفية تفكيرك واتخاذ قراراتك وقيادتك في بيئات معقدة.",
                "by_end": "بحلول نهاية البرنامج، ستكون قادرًا على:",
                "outcome1": "قيادة بحضور تنفيذي في بيئات عالية المخاطر",
                "outcome2": "اتخاذ قرارات معقدة بوضوح وثقة",
                "outcome3": "تحديد وتشكيل الفرص التي يتجاهلها الآخرون",
                "outcome4": "ترجمة الاستراتيجية إلى تنفيذ قابل للقياس",
                "outcome5": "قيادة التغيير التكيفي ضمن القيود الواقعية",
                "outcome6": "العمل بمنهجيات مستوحاة من المؤسسات العالمية الرائدة",
                "outcome7": "توسيع شبكتك الاستراتيجية واستخدام شبكة KIMA Collective على المستوى التنفيذي",
                "certification_statement": "احصل على شهادة ELM وانضم إلى KIMA Collective، لتطوير معيار جديد من القيادة المضاعفة التي تصنع تأثيرًا أسيًا.",
                "closing_statement": "هنا حيث يتحول الطموح إلى تنفيذ منظم، وتصبح الخبرة تأثيرًا."
            },
            "leadership_levels": {
                "section_title": "اعثر على مسار ELM الخاص بك",
                "level1_label": "ELM1",
                "level1_title": "من خبير صناعي إلى تنفيذي",
                "level1_subtitle": "انتقل من كونك خبيرًا موضوعيًا إلى قيادة المبادرات التنظيمية الاستراتيجية.",
                "level1_desc": "انتقل من كونك خبيرًا موضوعيًا إلى قيادة المبادرات التنظيمية الاستراتيجية.",
                "level1_focus_title": "مجالات التركيز الرئيسية",
                "level1_focus1": "القيادة بدون سلطة رسمية",
                "level1_focus2": "تطوير التفكير الاستراتيجي والرؤية",
                "level1_focus3": "تعلم تفويض العمل التقني",
                "level1_focus4": "بناء علاقات متعددة الوظائف",
                "level1_focus5": "التركيز على التأثير التنظيمي",
                "level1_focus6": "توجيه المواهب الناشئة في مجالك",
                "level2_label": "ELM2",
                "level2_title": "من مدير متوسط المستوى إلى المستوى التنفيذي",
                "level2_subtitle": "انتقل من إدارة الفرق إلى القيادة على مستوى المؤسسة واتخاذ القرارات الاستراتيجية.",
                "level2_desc": "انتقل من إدارة الفرق إلى القيادة على مستوى المؤسسة واتخاذ القرارات الاستراتيجية.",
                "level2_focus1": "إتقان التخطيط الاستراتيجي على مستوى المؤسسة",
                "level2_focus2": "تطوير مهارات التواصل على مستوى C-suite",
                "level2_focus3": "بناء الحضور التنفيذي والتأثير",
                "level2_focus4": "قيادة التحول التنظيمي",
                "level2_focus5": "التنقل في ديناميكيات أصحاب المصلحة المعقدة",
                "level3_label": "ELM3",
                "level3_title": "من المستوى التنفيذي إلى الرئيس التنفيذي",
                "level3_subtitle": "التقدم إلى المسؤولية التنظيمية النهائية ووضع الرؤية.",
                "level3_desc": "التقدم إلى المسؤولية التنظيمية النهائية ووضع الرؤية.",
                "level3_focus1": "تحديد رؤية وثقافة المؤسسة",
                "level3_focus2": "إتقان التواصل على مستوى مجلس الإدارة",
                "level3_focus3": "قيادة النمو الاستراتيجي طويل الأجل",
                "level3_focus4": "بناء فرق تنفيذية عالية الأداء",
                "level3_focus5": "التنقل في تحول السوق",
                "level4_label": "ELM4",
                "level4_title": "من مؤسس إلى قائد",
                "level4_subtitle": "الانتقال من الإنشاء إلى القيادة",
                "level4_desc": "الانتقال من الإنشاء إلى القيادة، وتوسيع رؤيتك من خلال الآخرين.",
                "level4_focus1": "بناء أنظمة قيادة قابلة للتوسع",
                "level4_focus2": "تفويض المسؤوليات التشغيلية",
                "level4_focus3": "تطوير الشراكات الاستراتيجية",
                "level4_focus4": "إنشاء أطر نمو مستدام",
                "level4_focus5": "توجيه وتمكين قادة الفرق",
                "level5_label": "ELM5",
                "level5_title": "أن تصبح قائدًا",
                "level5_subtitle": "استعد للدخول في الإدارة من خلال بناء نظام التشغيل الداخلي للقيادة، قبل وصول اللقب.",
                "level5_desc": "استعد للدخول في الإدارة من خلال بناء نظام التشغيل الداخلي للقيادة، قبل وصول اللقب.",
                "level5_focus_title": "مجالات التركيز الرئيسية",
                "level5_focus1": "تطوير الحضور القيادي والمصداقية الشخصية",
                "level5_focus2": "اتخاذ قرارات منظمة في بيئات غير مؤكدة",
                "level5_focus3": "التأثير عبر الفرق بدون سلطة رسمية",
                "level5_focus4": "ترجمة الاستراتيجية إلى تنفيذ على مستوى الفريق",
                "level5_focus5": "بناء الثقة والمساءلة ومعايير الأداء",
                "level5_focus6": "ضع نفسك كمستعد للترقية",
                "level6_label": "ELM6",
                "level6_title": "مسرعات الشركاء",
                "level6_subtitle": "انضم إلى مسرعات وشركاء Kima",
                "level6_desc": "تواصل مع شبكتنا من المسرعات والشركاء الاستراتيجيين ذوي المستوى العالمي لتضخيم رحلة قيادتك.",
                "level6_focus_title": "شركاؤنا",
                "learn_more": "اعرف المزيد",
                "enroll_now": "سجل الآن"
            },
            "accelerate": {
                "section_title": "نظام التشغيل ELM",
                "section_desc": "يعمل ELM على الصرامة الاستراتيجية والتطبيق العملي والتعرض على المستوى التنفيذي لتسريع القدرة في الممارسة وليس النظرية، كل ذلك باستخدام:",
                "item1_title": "أطر استراتيجية من Ivy League",
                "item1_desc": "أطر ومنهجيات عالمية مكيفة للتعقيد المحلي وقيود الأعمال الحقيقية.",
                "item2_title": "دراسات حالة عملية وسيناريوهات واقعية",
                "item2_desc": "اعمل من خلال تحديات حية ومحاكاة قرارات وتمارين استراتيجية تطبيقية.",
                "item3_title": "التعلم القائم على الممارسة",
                "item3_desc": "محاكاة التعقيد واختبار اتخاذ القرارات وتحسين الأداء في سيناريوهات واقعية.",
                "item4_title": "جلسة تنفيذية ملهمة",
                "item4_desc": "التعرض لقادة يعملون على أعلى المستويات، مما يوسع المنظور والمعايير.",
                "item5_title": "KIMA Collective والشبكة",
                "item5_desc": "الوصول إلى مجتمع تنفيذي منسق يمتد خارج الفصل الدراسي، مما يصنع رافعة استراتيجية ארוך الأجل."
            },
            "enroll_now": {
                "section_title": "سجل الآن",
                "section_desc": "اتخذ الخطوة الأولى نحو تحويل رحلتك القيادية. املأ النموذج أدناه لتأمين مكانك في برنامج إدارة القيادة الريادية."
            },
            "register_elm": {
                "section_title": "برنامج ELM المصغر",
                "section_desc": "حوّل رحلتك القيادية مع برنامجنا المصغر الشامل. كل ما تحتاجه لتسريع نموك.",
                "location_label": "الموقع",
                "location_text": "هرتسليا، بيئة تقنية ملهمة مصممة لتعزيز الإبداع والتعلم المركز",
                "investment_label": "الاستثمار",
                "investment_price": "6,500 شيكل",
                "investment_promo": "مع رمز الترويج HASUB",
                "investment_desc": "الكفاءة الكاملة تشمل جميع الجلسات الخارجية والتوجيه الشخصي ومواد البرنامج",
                "outcome_label": "النتيجة",
                "outcome_text": "التقدم إلى مستوى القيادة التنفيذية، مجهز لبناء وتوسيع المشاريع الناجحة",
                "startdate_label": "تاريخ البدء",
                "startdate_text": "يبدأ البرنامج في 16 فبراير 2025",
                "startdate_schedule": "اجتماعات مرتين في الشهر يوم الاثنين.",
                "tagline": "لا تدع نقص الخبرة يوقفك. رحلتك الريادية تبدأ هنا."
            },
            "modals": {
                "module1_title": "الوحدة 1: القيادة الواعية",
                "module1_intro": "القيادة لا تُورث. إنها تُبنى.",
                "module1_desc": "أثبتت أفضل المؤسسات في العالم - هارفارد، MIT - أن القيادة مهارة قابلة للتعلم. نقدم لك منهجياتهم المثبتة، المكيفة للتطبيق في العالم الحقيقي.",
                "module1_what_title": "ما ستتقنه:",
                "module1_point1": "أطر القيادة التقنية والتكيفية",
                "module1_point2": "اتخاذ القرارات في ظل عدم اليقين وقوانين القيادة الخمسة",
                "module1_point3": "بناء التأثير وقيادة التغيير التنظيمي",
                "module1_point4": "ال-transition من مدير إلى قائد واعٍ",
                "module1_bottom": "النتيجة النهائية: قُد بوضوح وهدف وتأثير قابل للقياس.",
                "module2_title": "الوحدة 2: التفكير الريادي",
                "module2_intro": "ريادة الأعمال ليست عن الشركات الناشئة. إنها عقلية خلق القيمة.",
                "module2_desc": "رواد الأعمال الحقيقيون يرون ما يفوته الآخرون: الفجوة بين المشاكل والحلول. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.",
                "module2_what_title": "ما ستطوره:",
                "module2_point1": "أطر حل المشكلات التي تصنع قيمة",
                "module2_point2": "التعرف على الفرص والتنفيذ الاستراتيجي",
                "module2_point3": "بناء الحلول بشكل تعاوني",
                "module2_point4": "دفع الابتكار في أي سياق",
                "module2_bottom": "النتيجة النهائية: فكر كرائد أعمال. قُد كصانع تغيير.",
                "module3_title": "الوحدة 3: التأثير المهني",
                "module3_intro": "رؤيتك لا تعني شيئًا إذا لم تستطع توصيلها.",
                "module3_desc": "الاحترافية هي الجسر بين الأفكار والتنفيذ. إنها الطريقة التي تقنع بها أصحاب المصلحة، وتجذب الشركاء، وتبني المصداقية، وتلهم العمل. إنها المهارة التي تحول الإمكانات إلى أداء.",
                "module3_what_title": "ما ستتقنه:",
                "module3_point1": "سرد القصص والعرض المقنع",
                "module3_point2": "التواصل التجاري الاستراتيجي والإقناع",
                "module3_point3": "بناء الحضور التنفيذي",
                "module3_point4": "تحويل الرؤية إلى استراتيجية قابلة للتنفيذ",
                "module3_bottom": "النتيجة النهائية: تواصل بقوة. Nفذ بدقة.",
                "enrollment_title": "التسجيل في برنامج ELM",
                "enrollment_intro": "حوّل رحلتك القيادية.",
                "enrollment_desc": "املأ النموذج أدناه لتأمين مكانك في برنامج إدارة القيادة الريادية.",
                "program_modal1_title": "Mختص تجاري إلى تنفيذي",
                "program_modal1_subtitle": "التحول من التخصص إلى الإشراف التنفيذي",
                "program_modal1_benefit_title": "ما ستحصل عليه",
                "program_modal1_benefit1_title": "جلسات قيادية مكثفة",
                "program_modal1_benefit1_desc": "6 جلسات عالية التأثير في هرتسليا",
                "program_modal1_benefit2_title": "الإرشاد الشخصي",
                "program_modal1_benefit2_desc": "8 تدريبات فردية مصممة لك",
                "program_modal1_benefit3_title": "شهادة LEM",
                "program_modal1_benefit3_desc": "انضم إلى شبكة KIMA LEM للقيادة",
                "program_modal1_benefit4_title": "الحضور التنفيذي",
                "program_modal1_benefit4_desc": "بناء أطر الإشراف الاستراتيجي",
                "accelerators_modal_title": "انضم إلى مسرعات وشركاء Kima",
                "accelerators_modal_desc": "تواصل مع شبكتنا من المسرعات العالمية والشركاء الاستراتيجيين لتضخيم رحلتك القيادية.",
                "accelerators_benefit_title": "فوائد الشراكة",
                "accelerators_benefit1_title": "وصول لنظمة",
                "accelerators_benefit1_desc": "تواصل مع قادة الصناعة",
                "accelerators_benefit2_title": "فرص التمويل",
                "accelerators_benefit2_desc": "الوصول إلى رأس المال والمستثمرين",
                "accelerators_benefit3_title": "الإرشاد",
                "accelerators_benefit3_desc": "التوجيه من مؤسسين ناجحين",
                "accelerators_benefit4_title": "الموارد",
                "accelerators_benefit4_desc": "الأدوات والتدريب والתמיכה",
                "accelerators_partners_title": "شبكة شركائنا"
            },
            "footer": {
                "footer_desc": "تحويل المهنيين في الشركات إلى قادة ذوي رؤية من خلال برامج إدارة القيادة الريادية المثبتة.",
                "quick_links": "روابط سريعة",
                "get_in_touch": "تواصل معنا",
                "copyright": "© 2026 أكاديمية كيما جميع الحقوق محفوظة.",
                "policy_privacy": "السياسة والخصوصية",
                "terms_conditions": "الشروط والأحكام",
                "gotop": "للأعلى"
            },
            "contact": {
                "breadcrumb_home": "الرئيسية",
                "breadcrumb_contact": "اتصل",
                "page_title": "اتصل",
                "section_heading": "اتصل بنا",
                "section_title": "تواصل معنا",
                "form_title_part1": "اتصل بنا",
                "form_name": "الاسم الكامل*",
                "form_email": "عنوان البريد الإلكتروني*",
                "form_phone": "رقم الهاتف*",
                "form_select_default": "اختر خيارًا",
                "form_option1": "برنامج ELM",
                "form_option2": "تدريب القيادة",
                "form_option3": "تدريب ريادة الأعمال",
                "form_option4": "استفسار عام",
                "form_message": "اكتب الرسالة",
                "form_submit": "إرسال الرسالة"
            },
            "enroll": {
                "page_title": "سجل الآن",
                "breadcrumb_home": "الرئيسية",
                "breadcrumb_enroll": "سجل"
            }
        },
        he: {
            "site": { "title": "אקדמיית קימא - תוכנית ניהול מנהיגות יזמית (ELM)" },
            "nav": { "home": "בית", "academy": "האקדמיה", "contact": "צור קשר" },
            "hamburger": { "contact_info": "פרטי התקשרות", "email": "אימייל", "location": "מיקום", "location_text": "הרצליה, ישראל", "follow_us": "עקבו אחרינו" },
            "hero": {
                "headline": "הובל בהשפעה",
                "headline_accent": "בנה בהשפעה",
                "description": "גשר על פער ניסיון המנהיגות המנהלתית שלך כדי להרחיב את ההשפעה שלך ולהאיץ את הצמיחה שלך. הפוך לעמית קימא וקבל הסמכה בניהול מנהיגות יזמית ברמת ההשפעה בעולם האמיתי.",
                "cta_enroll": "הירשם",
                "cta_contact": "צור קשר"
            },
            "philosophy": {
                "quote": "מנהיגים גדולים לומדים מניסיון. מנהיגים יוצאי דופן לומדים מאחרים",
                "subquote": "מה שהניסיון לוקח שנים לבנות, למידה ממוקדת מספקת עכשיו."
            },
            "pillars": {
                "title": "שלושת העמודים",
                "intro": "דרך מסגרת שלושת העמודים ELM של קימא, תפתח נוכחות מנהלתית, תשלוט במנהיגות הסתגלותית, ותטפח חשיבה יזמית מונחית הזדמנויות, תוך חיזוק היכולות המקצועיות הנדרשות לביצוע בדיוק ובהשפעה.",
                "pillar1_title": "Conscious Leadership",
                "pillar1_desc": "Leadership isn't inherited. It's built. Master frameworks and transition from manager to conscious leader.",
                "pillar2_title": "Value-Driven Entrepreneurship",
                "pillar2_desc": "Entrepreneurship is a mindset of creating value. Develop opportunity recognition and drive innovation in any context.",
                "pillar3_title": "Professional Management",
                "pillar3_desc": "Your vision means nothing if you can't communicate it. Perfect storytelling, persuasion, and executive presence.",
                "learn_more": "למד עוד"
            },
            "outcomes": {
                "heading": "ההבטחת של KIMA-ACADEMY ELM",
                "promise_line1": "ELM אינה עוד תוכנית מנהיגות. זוהי האצת מובנית של יכולת מנהיגותית.",
                "promise_line2": "לא רק תלמד מסגרות, אלא תעצב מחדש כיצד אתה חושב, מחליט ומוביל בסביבות מורכבות.",
                "by_end": "עד סוף התוכנית, תוכל:",
                "outcome1": "לפקד על נוכחות מנהלתית בסביבות עם סיכון גבוה",
                "outcome2": "לקבל החלטות מורכבות בבהירות ובثقة",
                "outcome3": "לזהות ולעצב הזדמנויות שאחרים מתעלמים מהן",
                "outcome4": "לתרגם אסטרטגיה לביצוע ניתן למדידה",
                "outcome5": "להוביל שינוי הסתגלותי בתוך מגבלות עולם אמיתי",
                "outcome6": "לפעול עם מתודולוגיות בהשראת מוסדות גלובליים מובילים",
                "outcome7": "להרחיב את הרשת האסטרטגית שלך ולהשתמש ברשת KIMA Collective ברמה המנהלתית",
                "certification_statement": "השג הסמכת ELM והצטרף ל-KIMA Collective, תוך קידום תקן חדש של מנהיגות מכפילה שיוצרת השפעה מעריכית.",
                "closing_statement": "זוהי הנקודה בו שאיפה הופכת לביצוע מובנה, וניסיון הופך להשפעה."
            },
            "leadership_levels": {
                "section_title": "מצא את מסלול ה-ELM שלך",
                "level1_label": "ELM1",
                "level1_title": "מומחה תעשייה למנהל",
                "level1_subtitle": "מעבר ממומחה תחום להובלת יוזמות ארגוניות אסטרטגיות.",
                "level1_desc": "מעבר ממומחה תחום להובלת יוזמות ארגוניות אסטרטגיות.",
                "level1_focus_title": "תחומי התמקדות מרכזיים",
                "level1_focus1": "הובלה ללא סמכות רשמית",
                "level1_focus2": "פיתוח חשיבה אסטרטגית וחזון",
                "level1_focus3": "לימוד האצלת עבודה טכנית",
                "level1_focus4": "בניית קשרים חוצי ארגון",
                "level1_focus5": "התמקדות בהשפעה ארגונית",
                "level1_focus6": "ליווי כישרונות מתפתחים בתחומך",
                "level2_label": "ELM2",
                "level2_title": "ממנהל בדרג בינוני ל-C-Level",
                "level2_subtitle": "מעבר מניהול צוותים למנהיגות ברמת הארגון וקבלת החלטות אסטרטגיות.",
                "level2_desc": "מעבר מניהול צוותים למנהיגות ברמת הארגון וקבלת החלטות אסטרטגיות.",
                "level2_focus1": "שליטה בתכנון אסטרטגי ברמת הארגון",
                "level2_focus2": "פיתוח מיומנויות תקשורת ברמת C-suite",
                "level2_focus3": "בניית נוכחות והשפעה מנהלתית",
                "level2_focus4": "הובלת שינוי ארגוני",
                "level2_focus5": "ניווט בדינמיקות מורכבות של בעלי עניין",
                "level3_label": "ELM3",
                "level3_title": "מ-C-Level ל-CEO",
                "level3_subtitle": "התקדמות לאחריות ארגונית מלאה וקביעת חזון.",
                "level3_desc": "התקדמות לאחריות ארגונית מלאה וקביעת חזון.",
                "level3_focus1": "הגדרת חזון ותרבות ארגונית",
                "level3_focus2": "שליטה בתקשורת ברמת דירקטוריון",
                "level3_focus3": "הובלת צמיחה אסטרטגית ארוכת טווח",
                "level3_focus4": "בניית צוותי הנהלה בעלי ביצועים גבוהים",
                "level3_focus5": "ניווט בשינוי שוק",
                "level4_label": "ELM4",
                "level4_title": "ממייסד למנהיג",
                "level4_subtitle": "מעבר מיצירה להובלה",
                "level4_desc": "מעבר מיצירה להובלה, הרחבת החזון שלך באמצעות אחרים.",
                "level4_focus1": "בניית מערכות מנהיגות ניתנות להרחבה",
                "level4_focus2": "האצלת אחריות תפעולית",
                "level4_focus3": "פיתוח שותפויות אסטרטגיות",
                "level4_focus4": "יצירת מסגרות צמיחה ברות קיימא",
                "level4_focus5": "ליווי והעצמת מנהיגי צוות",
                "level5_label": "ELM5",
                "level5_title": "הופך למנהיג",
                "level5_subtitle": "הכנה לכניסה לניהול באמצעות בניית מערכת ההפעלה הפנימית של מנהיגות, לפני הכותרת.",
                "level5_desc": "הכנה לכניסה לניהול באמצעות בניית מערכת ההפעלה הפנימית של מנהיגות, לפני הכותרת.",
                "level5_focus_title": "תחומי התמקדות מרכזיים",
                "level5_focus1": "פיתוח נוכחות מנהיגותית ואמינות אישית",
                "level5_focus2": "קבלת החלטות מובנות בסביבות לא וודאיות",
                "level5_focus3": "השפעה על פני צוותים ללא סמכות רשמית",
                "level5_focus4": "תרגום אסטרטגיה לביצוע ברמת הצוות",
                "level5_focus5": "בניית אמון, אחריות ותקני ביצוע",
                "level5_focus6": "מיצוב עצמך כמוכן לקידום",
                "level6_label": "ELM6",
                "level6_title": "מאיצי שותפים",
                "level6_subtitle": "הצטרף למאיצים ושותפי Kima",
                "level6_desc": "התחבר לרשת המאיצים והשותפים האסטרטגיים מהשורה הראשונה שלנו כדי להגביר את מסע המנהיגות שלך.",
                "level6_focus_title": "השותפים שלנו",
                "learn_more": "למד עוד",
                "enroll_now": "הירשם עכשיו"
            },
            "accelerate": {
                "section_title": "מערכת ההפעלה של ELM",
                "section_desc": "ELM פועלת על קפדנות אסטרטגית, יישום מעשי וחשיפה ברמה מנהלתית כדי להאיץ יכולת בפרקטיקה, לא בתיאוריה, הכל תוך שימוש ב:",
                "item1_title": "מסגרות אסטרטגיות של Ivy League",
                "item1_desc": "מסגרות ומתודולוגיות גלובליות מותאמות למורכבות מקומית ולמגבלות עסקיות אמיתיות.",
                "item2_title": "מחקרי מקרה מעשיים ותרחישי عולם אמיתי",
                "item2_desc": "עבוד דרך אתגרים חיים, סימולציות החלטות ותרגילים אסטרטגיים יישומיים.",
                "item3_title": "למידה מונעת תרגול",
                "item3_desc": "סמלץ מורכבות, בדוק קבלת החלטות ושכלל ביצועים בתרחישי عולם אמיתי.",
                "item4_title": "פגישות מנהלים מעוררי השראה",
                "item4_desc": "חשיפה למנהיגים הפועלים ברמות הגבוהות ביותר, תוך הרחבת פרספקטיבה ותקנים.",
                "item5_title": "KIMA Collective והרשת",
                "item5_desc": "גישה לקהילת מנהרים מאורגנת שמתרחבת מעבר לכיתה, תוך יצירת מינוף אסטרטגי ארוך טווח."
            },
            "enroll_now": {
                "section_title": "הירשם עכשיו",
                "section_desc": "קח את הצעד הראשון לקראת שינוי מסע המנהיגות שלך. מלא את הטופס למטה כדי להבטיח את מקומך בתוכנית ניהול המנהיגות היזמית."
            },
            "register_elm": {
                "section_title": "תוכנית ELM מיני",
                "section_desc": "שנה את מסע המנהיגות שלך עם התוכנית המיני המקיפה שלנו. כל מה שאתה צריך כדי להאיץ את הצמיחה שלך.",
                "location_label": "מיקום",
                "location_text": "הרצליה, סביבת טכנולוגיה מעוררת השראה שנועדה לטפח יצירתיות ולמידה ממוקדת",
                "investment_label": "투자",
                "investment_price": "6,500 ש\"ח",
                "investment_promo": "עם קוד פרומו HASUB",
                "investment_desc": "הכשרה מקיפה כוללת את כל המפגשים החיצוניים, הדרכה אישית וחומרי התוכנית",
                "outcome_label": "תוצאה",
                "outcome_text": "התקדמות לרמת מנהיגות מנהלתית, מצויד לבניית והרחבת מיזמים מצליחים",
                "startdate_label": "תאריך התחלה",
                "startdate_text": "התוכנית מתחילה ב-16 בפברואר 2025",
                "startdate_schedule": "פגישות פעמיים בחודש ביום שני.",
                "tagline": "אל תיתן לחוסר ניסיון לעצור אותך. המסע היזמי שלך מתחיל כאן."
            },
            "modals": {
                "module1_title": "מודול 1: מנהיגות מודעת",
                "module1_intro": "מנהיגות אינה תורשתית. היא נבנית.",
                "module1_desc": "המוסדות המובילים בעולם - הרווארד, MIT - הוכיחו שמנהיגות היא מיומנות ניתנת ללמידה. אנו מביאים לך את המתודולוגיות המוכחות שלהם, מותאמות ליישום בעולם האמיתי.",
                "module1_what_title": "מה תשלוט:",
                "module1_point1": "מסגרות מנהיגות טכנית והסתגלותית",
                "module1_point2": "קבלת החלטות בתנאי אי-ודאות וחמשת חוקי המנהיגות",
                "module1_point3": "בניית השפעה והנעת שינוי ארגוני",
                "module1_point4": "ה-transition מנהל ל-Leader מודע",
                "module1_bottom": "שורה תחתונה: הנהג בבהירות, תכלית והשפעה ניתנת למדידה.",
                "module2_title": "מודול 2: חשיבה יזמית",
                "module2_intro": "יזמות אינה עוסקת בסטארטאפים. זו מנטליות של יצירת ערך.",
                "module2_desc": "יזמים אמיתיים רואים מה שאחרים מפספסים: הפער בין בעיות לפתרונות. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.",
                "module2_what_title": "מה תפתח:",
                "module2_point1": "מסגרות פתרון בעיות שיוצרות ערך",
                "module2_point2": "זיהוי הזדמנויות וביצוע אסטרטגי",
                "module2_point3": "בניית פתרונות בשיתוף פעולה",
                "module2_point4": "הנעת חדשנות בכל הקשר",
                "module2_bottom": "שורה תחתונה: חשוב כיזם. הוביל כיוצר שינוי.",
                "module3_title": "מודול 3: השפעה מקצועית",
                "module3_intro": "החזון שלך לא שווה כלום אם אתה לא יכול לתקשר אותו.",
                "module3_desc": "מקצועיות היא הגשר בין רעיונות לביצוע. זו הדרך בה אתה משכנע בעלי עניין, מושך שותפים, בונה אמינות ומעורר פעולה. זו המיומנות שהופכת פוטנציאל לביצועים.",
                "module3_what_title": "מה תשכלל:",
                "module3_point1": "סיפור قصةים והצגה משכנעת",
                "module3_point2": "תקשורת עסקית אסטרטגית ושכנוע",
                "module3_point3": "בניית נוכחות מנהלתית",
                "module3_point4": "המרת חזון לאסטרטגיה ניתנת לביצוע",
                "module3_bottom": "שורה תחתונה: תקשר בכוח. בצע בדיוק.",
                "enrollment_title": "تسجيل لתוכנית ELM",
                "enrollment_intro": "שנה את מסע המנהיגות שלך.",
                "enrollment_desc": "املأ النموذج أدناه כדי להבטיח את מקומך בתוכנית ניהול המנהיגות היזמית.",
                "program_modal1_title": "Mختص تجاري إلى تنفيذي",
                "program_modal1_subtitle": "التحول من التخصص إلى الإشراف التنفيذي",
                "program_modal1_benefit_title": "ما ستحصل عليه",
                "program_modal1_benefit1_title": "جلسات قيادية مكثفة",
                "program_modal1_benefit1_desc": "6 جلسات عالية التأثير في هرتسليا",
                "program_modal1_benefit2_title": "الإرشاد الشخصي",
                "program_modal1_benefit2_desc": "8 تدريبات فردية مصممة لك",
                "program_modal1_benefit3_title": "شهادة LEM",
                "program_modal1_benefit3_desc": "انضم إلى شبكة KIMA LEM للقيادة",
                "program_modal1_benefit4_title": "נוכחות מנהלתית",
                "program_modal1_benefit4_desc": "בניית מסגרות פיקוח אסטרטגי",
                "accelerators_modal_title": "הצטרף למאיצים ושותפי Kima",
                "accelerators_modal_desc": "התחבר לרשת המאיצים והשותפים האסטרטגיים מהשורה הראשונה שלנו כדי להגביר את מסע המנהיגות שלך.",
                "accelerators_benefit_title": "יתרונות שותפות",
                "accelerators_benefit1_title": "גישה לרשת",
                "accelerators_benefit1_desc": "התחברות עם מובילי תעשייה",
                "accelerators_benefit2_title": "הזדמנויות מימון",
                "accelerators_benefit2_desc": "גישה להון ולמשקיעים",
                "accelerators_benefit3_title": "הדרכה",
                "accelerators_benefit3_desc": "הנחייה ממייסדים מצליחים",
                "accelerators_benefit4_title": "משאבים",
                "accelerators_benefit4_desc": "כלים, הכשרה ותמיכה",
                "accelerators_partners_title": "רשת השותפים שלנו"
            },
            "footer": {
                "footer_desc": "הופכים אנשי מקצוע ארגוניים למנהיגים בעלי חזון דרך תוכניות ניהול מנהיגות יזמית מוכחות.",
                "quick_links": "קישורים מהירים",
                "get_in_touch": "צור קשר",
                "copyright": "© 2026 אקדמיית קימא כל הזכויות שמורות.",
                "policy_privacy": "سياسة ופרטיות",
                "terms_conditions": "תנאים והגבלות",
                "gotop": "למעלה"
            },
            "contact": {
                "breadcrumb_home": "בית",
                "breadcrumb_contact": "צור קשר",
                "page_title": "צור קשר",
                "section_heading": "צור קשר",
                "section_title": "צור איתנו קשר",
                "form_title_part1": "צור קשר",
                "form_name": "שם מלא*",
                "form_email": "כתובת אימייל*",
                "form_phone": "מספר טלפון*",
                "form_select_default": "בחר אפשרות",
                "form_option1": "תוכנית ELM",
                "form_option2": "אימון מנהיגות",
                "form_option3": "הכשרה ביזמות",
                "form_option4": "פנייה כללית",
                "form_message": "הקלד הודעה",
                "form_submit": "שלח הודעה"
            },
            "enroll": {
                "page_title": "הירשם עכשיו",
                "breadcrumb_home": "בית",
                "breadcrumb_enroll": "הרשמה"
            }
        }
    };

    /**
     * Detect language from URL, localStorage, or browser
     */
    function detectLanguage() {
        // Priority 1: URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
            return urlLang;
        }

        // Priority 2: localStorage
        const storedLang = localStorage.getItem(STORAGE_KEY);
        if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
            return storedLang;
        }

        // Priority 3: Browser language
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }

        // Default: English
        return DEFAULT_LANG;
    }

    /**
     * Get translated text with fallback to English
     */
    function t(key, lang = currentLang) {
        const keys = key.split('.');
        let value = translations[lang];

        // Navigate through nested keys
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to English
                value = translations[DEFAULT_LANG];
                for (const fk of keys) {
                    if (value && value[fk] !== undefined) {
                        value = value[fk];
                    } else {
                        // If not found in English either, return the key
                        console.warn(`Translation key not found: ${key}`);
                        return key;
                    }
                }
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    /**
     * Apply translations to DOM elements with data-i18n attribute
     */
    function applyTranslations() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);

            // Handle different element types
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                // For input elements, update placeholder
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translation;
                } else {
                    el.value = translation;
                }
            } else if (el.tagName === 'IMG') {
                // For images, update alt text
                el.alt = translation;
            } else {
                // For all other elements, update text content
                el.textContent = translation;
            }
        });

        // Update page title
        const titleKey = 'site.title';
        if (translations[currentLang] && translations[currentLang]['site'] && translations[currentLang]['site']['title']) {
            document.title = t(titleKey);
        }

        // Update HTML lang and dir attributes
        const htmlEl = document.documentElement;
        htmlEl.setAttribute('lang', currentLang);

        // Apply RTL layout for Arabic and Hebrew
        if (RTL_LANGS.includes(currentLang)) {
            htmlEl.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl-layout');

            // Load RTL stylesheet if not already loaded
            const rtlLink = document.getElementById('rtl-stylesheet');
            if (!rtlLink) {
                const link = document.createElement('link');
                link.id = 'rtl-stylesheet';
                link.rel = 'stylesheet';
                link.href = './assets/css/main-rtl.css';
                document.head.appendChild(link);
            }
        } else {
            htmlEl.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl-layout');

            // Remove RTL stylesheet if exists
            const rtlLink = document.getElementById('rtl-stylesheet');
            if (rtlLink) {
                rtlLink.remove();
            }
        }

        // Update URL without reload
        updateURL(currentLang);

        // Store preference
        localStorage.setItem(STORAGE_KEY, currentLang);
    }

    /**
     * Update URL with language parameter
     */
    function updateURL(lang) {
        const url = new URL(window.location);
        if (lang === DEFAULT_LANG) {
            // Remove lang parameter for default language
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', lang);
        }
        window.history.replaceState({}, '', url);
    }

    /**
     * Switch to a different language
     */
    function switchLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }

        currentLang = lang;
        applyTranslations();

        // Dispatch custom event for other scripts to react
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    /**
     * Get current language
     */
    function getCurrentLanguage() {
        return currentLang;
    }

    /**
     * Check if current language is RTL
     */
    function isRTL() {
        return RTL_LANGS.includes(currentLang);
    }

    /**
     * Create language switcher UI (optional)
     */
    function createLanguageSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('kima-lang-switcher')) {
            return;
        }

        // Find suitable place to insert switcher (e.g., in header)
        const header = document.querySelector('.header-wrapper');
        if (!header) return;

        const switcher = document.createElement('div');
        switcher.id = 'kima-lang-switcher';
        switcher.className = 'kima-language-selector';
        switcher.innerHTML = `
      <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" aria-label="Switch to English">EN</button>
      <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar" aria-label="Switch to Arabic">عربى</button>
      <button class="lang-btn ${currentLang === 'he' ? 'active' : ''}" data-lang="he" aria-label="Switch to Hebrew">עברית</button>
    `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
      .kima-language-selector {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
        margin-left: 1rem;
      }
      .kima-language-selector .lang-btn {
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: #fff;
        padding: 0.375rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      .kima-language-selector .lang-btn:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.5);
      }
      .kima-language-selector .lang-btn.active {
        background: #D1B59C;
        border-color: #D1B59C;
        color: #fff;
      }
      @media (max-width: 991px) {
        .kima-language-selector {
          margin-left: 0;
          margin-top: 1rem;
        }
      }
    `;
        document.head.appendChild(style);

        // Insert switcher
        header.appendChild(switcher);

        // Add click handlers
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetLang = btn.getAttribute('data-lang');

                // Update active state
                switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Switch language
                switchLanguage(targetLang);
            });
        });
    }

    /**
     * Load translations from inlined data
     */
    function loadTranslations() {
        translations = TRANSLATIONS_DATA;
        return Object.keys(translations).length > 0;
    }

    /**
     * Initialize i18n system
     */
    function init() {
        // Detect language
        currentLang = detectLanguage();

        // Load translations (now synchronous)
        const loaded = loadTranslations();

        if (loaded && translations[currentLang]) {
            // Apply translations to the page
            applyTranslations();

            // Listen for manual language switches
            document.querySelectorAll('[data-lang-switch]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetLang = btn.getAttribute('data-lang-switch');
                    switchLanguage(targetLang);
                });
            });

            console.log(`Kima i18n initialized (${currentLang})`);
        } else {
            console.error('Failed to initialize i18n system');
        }
    }

    // Expose public API
    window.KimaI18n = {
        init,
        t,
        switchLanguage,
        getCurrentLanguage,
        isRTL,
        createLanguageSwitcher
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
