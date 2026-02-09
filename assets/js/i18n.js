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
        en: { "site": { "title": "Kima Academy - Program for Entrepreneurial Leadership Management (ELM)" }, "nav": { "home": "Home", "academy": "Academy", "contact": "Contact", "menu": "Menu" }, "hamburger": { "contact_info": "Contact info", "email": "Email", "location": "Location", "location_text": "Herzliya, Israel", "follow_us": "Follow us" }, "hero": { "watermark": "KIMA ACADEMY", "social_badge": "Thousands Join KIMA", "headline": "Build Exceptional Leaders", "headline_accent": "Through Proven ELM Programs", "description": "Kima Academy's Entrepreneurial Leadership Management program transforms corporate professionals into visionary leaders. Master Ivy League methodologies and accelerate your path to executive excellence.", "cta_enroll": "Enroll", "cta_contact": "Contact Us" }, "philosophy": { "quote": "Lead with Confidence. Build with Impact.", "subquote": "A wise person learns from experience. A wiser one learns from others. What experience takes years to build, focused learning delivers now." }, "pillars": { "title": "Three core pillars", "intro": "Our intensive Leadership Entrepreneurial Management program bridges the gap between potential and performance through three core pillars:", "pillar1_title": "Conscious Leadership", "pillar1_desc": "Leadership isn't inherited. It's built. Master frameworks and transition from manager to conscious leader.", "pillar2_title": "Value-Driven Entrepreneurship", "pillar2_desc": "Entrepreneurship is a mindset of creating value. Develop opportunity recognition and drive innovation in any context.", "pillar3_title": "Professional Management", "pillar3_desc": "Your vision means nothing if you can't communicate it. Perfect storytelling, persuasion, and executive presence.", "learn_more": "Learn more" }, "outcomes": { "heading": "OUTCOMES & ELM", "gain_title": "What You'll Gain", "gain_p1": "KIMA ELM program doesn't just train. It transforms how you think and the way you drive change.", "gain_p2": "Kima Academy accelerates your growth, turning ambition into execution, potential into results, and managers into leaders who create lasting value.", "benefit1": "Practical tools and strategic frameworks developed by IVY-league schools while adapted to local culture", "benefit2": "Confidence to make complex decisions from day one", "benefit3": "Proven methodologies adapted for real-world challenges", "benefit4": "A clear path from manager to impactful leader", "certified_title": "Become ELM Certified", "certified_p1": "KIMA ELM program doesn't just train. It transforms how you think and the way you drive change.", "certified_p2": "Kima Academy accelerates your growth, turning ambition into execution, potential into results, and managers into leaders who create lasting value." }, "leadership_levels": { "section_title": "What is your next leadership Level?", "level1_label": "Level 1", "level1_title": "Industry Expert to Executive", "level1_subtitle": "Shift from specialized to executive oversight", "level1_desc": "Transition from being a subject matter expert to leading strategic organizational initiatives.", "level1_focus_title": "KEY FOCUS AREAS", "level1_focus1": "Develop strategic thinking and vision", "level1_focus2": "Learn to delegate technical work", "level1_focus3": "Build cross-functional relationships", "level1_focus4": "Focus on organizational impact", "level1_focus5": "Mentor emerging talent in your field", "level2_label": "Level 2", "level2_title": "Mid-Level Manager to C-Level", "level2_subtitle": "Move from team to enterprise leadership and strategic decision-making.", "level2_desc": "Move from managing teams to enterprise-wide leadership and strategic decision-making.", "level2_focus1": "Master enterprise-wide strategic planning", "level2_focus2": "Develop C-suite communication skills", "level2_focus3": "Build executive presence and influence", "level2_focus4": "Lead organizational transformation", "level2_focus5": "Navigate complex stakeholder dynamics", "level3_label": "Level 3", "level3_title": "C-Level to CEO", "level3_subtitle": "Advance to ultimate organizational responsibility and vision setting.", "level3_desc": "Advance to ultimate organizational responsibility and vision setting.", "level3_focus1": "Define organizational vision and culture", "level3_focus2": "Master board-level communication", "level3_focus3": "Drive long-term strategic growth", "level3_focus4": "Build high-performing executive teams", "level3_focus5": "Navigate market transformation", "level4_label": "Level 4", "level4_title": "Founder to Leader", "level4_subtitle": "Transition from creating to leading", "level4_desc": "Transition from creating to leading, scaling your vision through others.", "level4_focus1": "Build scalable leadership systems", "level4_focus2": "Delegate operational responsibilities", "level4_focus3": "Develop strategic partnerships", "level4_focus4": "Create sustainable growth frameworks", "level4_focus5": "Mentor and empower team leaders", "level5_label": "Level 5", "level5_title": "Accelerators & Partners", "level5_subtitle": "Join Kima accelerators and partners", "level5_desc": "Connect with our network of world-class accelerators and strategic partners to amplify your leadership journey.", "level5_focus_title": "OUR PARTNERS", "learn_more": "Learn More" }, "accelerate": { "section_title": "Accelerate Your Ascent to Proactive Professional Leadership", "service1_title": "Executive Leadership Fundamentals", "service1_desc": "Mastering Ivy League methodologies and strategic business planning to build a solid leadership foundation.", "service2_title": "Advanced Entrepreneurial Strategic Thinking", "service2_desc": "Develop insight to identify unique opportunities and innovative solutions, thinking outside the box.", "service3_title": "Practical Application", "service3_desc": "Translating theory into practice through guided exercises, collaborative projects, and real-world challenges supported by mentors.", "service4_title": "Preparation for the Highest Executive Level", "service4_desc": "Gaining the confidence, experience, and essential network for success at the executive management level, whether launching a new project or expanding an existing one." }, "register_elm": { "section_title": "ELM -Mini Program", "section_desc": "Transform your leadership journey with our comprehensive mini program. Everything you need to accelerate your growth.", "location_label": "Location", "location_text": "Herzliya, an inspiring tech environment designed to foster creativity and focused learning", "investment_label": "Investment", "investment_price": "6,500 ILS", "investment_promo": "with Promo code HASUB", "investment_desc": "Comprehensive training including all external sessions, personal mentoring, and program materials", "outcome_label": "Outcome", "outcome_text": "Advancing to executive leadership level, equipped to build and expand successful ventures", "startdate_label": "Start Date", "startdate_text": "The program begins on February 16, 2025", "startdate_schedule": "Meetings twice a month on Monday.", "tagline": "Don't let lack of experience hold you back. Your entrepreneurial journey starts here.", "cta_label": "Register Now:", "cta_title": "Kima Academy Program for Entrepreneurial Leadership Management", "cta_button": "Fill out the form" }, "modals": { "module1_title": "Module 1: Conscious Leadership", "module1_intro": "Leadership isn't inherited. It's built.", "module1_desc": "The world's top institutions—Harvard, MIT—have proven that leadership is a learnable skill. We bring their proven methodologies to you, adapted for real-world application.", "module1_what_title": "What You'll Master:", "module1_point1": "Technical and adaptive leadership frameworks", "module1_point2": "Decision-making under uncertainty and the 5 laws of leadership", "module1_point3": "Building influence and driving organizational change", "module1_point4": "Transitioning from manager to conscious leader", "module1_bottom": "Bottom line: Lead with clarity, purpose, and measurable impact.", "module2_title": "Module 2: Entrepreneurial Thinking", "module2_intro": "Entrepreneurship isn't about startups. It's a mindset of creating value.", "module2_desc": "True entrepreneurs see what others miss: the gap between problems and solutions. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.", "module2_what_title": "What You'll Develop:", "module2_point1": "Problem-solving frameworks that create value", "module2_point2": "Opportunity recognition and strategic execution", "module2_point3": "Building solutions collaboratively", "module2_point4": "Driving innovation in any context", "module2_bottom": "Bottom line: Think like an entrepreneur. Lead like a changemaker.", "module3_title": "Module 3: Professional Impact", "module3_intro": "Your vision means nothing if you can't communicate it.", "module3_desc": "Professionalism is the bridge between ideas and execution. It's how you persuade stakeholders, attract partners, build credibility, and inspire action. It's the skill that transforms potential into performance.", "module3_what_title": "What You'll Perfect:", "module3_point1": "Compelling storytelling and presentation", "module3_point2": "Strategic business communication and persuasion", "module3_point3": "Building executive presence", "module3_point4": "Converting vision into actionable strategy", "module3_bottom": "Bottom line: Communicate with power. Execute with precision.", "enrollment_title": "Enroll in ELM Program", "enrollment_intro": "Transform your leadership journey.", "enrollment_desc": "Fill out the form below to secure your spot in our Entrepreneurial Leadership Management program.", "program_modal1_title": "Industry Expert to Executive", "program_modal1_subtitle": "Shift from specialized expertise to executive oversight", "program_modal1_benefit_title": "What You'll Get", "program_modal1_benefit1_title": "Intensive Leadership Sessions", "program_modal1_benefit1_desc": "6 high-impact sessions at Herzliya", "program_modal1_benefit2_title": "Personal Mentoring", "program_modal1_benefit2_desc": "8 individual trainings designed for you", "program_modal1_benefit3_title": "LEM Certificate", "program_modal1_benefit3_desc": "Join the KIMA LEM Leadership network", "program_modal1_benefit4_title": "Executive Presence", "program_modal1_benefit4_desc": "Build strategic oversight frameworks", "accelerators_modal_title": "Join Kima Accelerators & Partners", "accelerators_modal_desc": "Connect with our network of world-class accelerators and strategic partners to amplify your leadership journey.", "accelerators_benefit_title": "Partnership Benefits", "accelerators_benefit1_title": "Network Access", "accelerators_benefit1_desc": "Connect with industry leaders", "accelerators_benefit2_title": "Funding Opportunities", "accelerators_benefit2_desc": "Access to capital & investors", "accelerators_benefit3_title": "Mentorship", "accelerators_benefit3_desc": "Guidance from successful founders", "accelerators_benefit4_title": "Resources", "accelerators_benefit4_desc": "Tools, training & support", "accelerators_partners_title": "Our Partner Network" }, "footer": { "work_together": "Lets work together?", "call_kima": "Call Kima Academy Now", "operations": "Operations - Israel", "address": "Suite 452 8082 Boner Parge, Herzliya, Israel", "company_title": "Our company", "company_desc": "Our mission is to empowers businesses off our all size too thrive in an businesses ever changing marketplaces.", "follow_us": "Follow us", "copyright": "© 2025 Kima Academy All right reserved.", "policy_privacy": "Policy & privacy", "terms_conditions": "Terms & conditions", "gotop": "GOTOP" }, "contact": { "breadcrumb_home": "Home", "breadcrumb_contact": "Contact", "page_title": "Contact", "section_heading": "CONTACT US", "section_title": "Get in touch with us", "form_title_part1": "Feel free to ", "form_title_part2": "get in touch", "form_title_part3": " or visit our location.", "form_name": "Full name*", "form_email": "Email address*", "form_phone": "Phone number*", "form_select_default": "Choose a option", "form_option1": "ELM Program", "form_option2": "Leadership Coaching", "form_option3": "Entrepreneurship Training", "form_option4": "General Inquiry", "form_message": "Type message", "form_submit": "Send message", "info_heading": "REACH US", "info_title": "Our contact information", "email_title": "Email us", "call_title": "Call us", "location_title": "Our Location", "location_text": "Suite 452, 8082 Boner Parge Herzliya, Israel", "hours_title": "Working Hours", "hours_weekdays": "Mon - Fri: 9:00 - 18:00", "hours_sunday": "Sunday: By appointment" } },
        ar: { "site": { "title": "[AR] Kima Academy - Program for Entrepreneurial Leadership Management (ELM)" }, "nav": { "home": "الرئيسية", "academy": "الأكاديمية", "contact": "اتصل بنا", "menu": "القائمة" }, "hamburger": { "contact_info": "معلومات الاتصال", "email": "البريد الإلكتروني", "location": "الموقع", "location_text": "هرتسليا، إسرائيل", "follow_us": "تابعنا" }, "hero": { "watermark": "KIMA ACADEMY", "social_badge": "الآلاف ينضمون إلى KIMA", "headline": "بناء قادة استثنائيين", "headline_accent": "من خلال برامج ELM المثبتة", "description": "يحول برنامج إدارة القيادة الريادية في أكاديمية كيما المحترفين في الشركات إلى قادة ذوي رؤية. أتقن منهجيات Ivy League وسرّع مسارك نحو التميز التنفيذي.", "cta_enroll": "سجل الآن", "cta_contact": "اتصل بنا" }, "philosophy": { "quote": "قُد بثقة. ابنِ بتأثير.", "subquote": "الشخص الحكيم يتعلم من التجربة. والأكثر حكمة يتعلم من الآخرين. ما تستغرقه التجربة سنوات لبنائه، يقدمه التعلم المركز الآن." }, "pillars": { "title": "ثلاث ركائز أساسية", "intro": "يسد برنامج إدارة القيادة الريادية المكثف لدينا الفجوة بين الإمكانات والأداء من خلال ثلاث ركائز أساسية:", "pillar1_title": "القيادة الواعية", "pillar1_desc": "القيادة لا تُورث. إنها تُبنى. أتقن الأطر وانتقل من مدير إلى قائد واعٍ.", "pillar2_title": "ريادة الأعمال القائمة على القيمة", "pillar2_desc": "ريادة الأعمال هي عقلية خلق القيمة. طور التعرف على الفرص واقد الابتكار في أي سياق.", "pillar3_title": "الإدارة المهنية", "pillar3_desc": "رؤيتك لا تعني شيئًا إذا لم تستطع توصيلها. أتقن سرد القصص والإقناع والحضور التنفيذي.", "learn_more": "اعرف المزيد" }, "outcomes": { "heading": "النتائج و ELM", "gain_title": "ما ستكتسبه", "gain_p1": "برنامج KIMA ELM لا يدرب فقط. إنه يحول طريقة تفكيرك والطريقة التي تقود بها التغيير.", "gain_p2": "تسرّع أكاديمية كيما نموك، محولة الطموح إلى تنفيذ، والإمكانات إلى نتائج، والمديرين إلى قادة يصنعون قيمة دائمة.", "benefit1": "أدوات عملية وأطر استراتيجية طورتها مدارس Ivy League مع تكييفها للثقافة المحلية", "benefit2": "الثقة في اتخاذ قرارات معقدة من اليوم الأول", "benefit3": "منهجيات مثبتة مكيفة للتحديات الواقعية", "benefit4": "مسار واضح من مدير إلى قائد مؤثر", "certified_title": "احصل على شهادة ELM", "certified_p1": "برنامج KIMA ELM لا يدرب فقط. إنه يحول طريقة تفكيرك والطريقة التي تقود بها التغيير.", "certified_p2": "تسرّع أكاديمية كيما نموك، محولة الطموح إلى تنفيذ، والإمكانات إلى نتائج، والمديرين إلى قادة يصنعون قيمة دائمة." }, "leadership_levels": { "section_title": "ما هو مستوى القيادة التالي لك؟", "level1_label": "المستوى 1", "level1_title": "مختص تجاري إلى تنفيذي", "level1_subtitle": "التحول من التخصص إلى الإشراف التنفيذي", "level1_desc": "الانتقال من كونك خبيرًا في الموضوع إلى قيادة مبادرات تنظيمية استراتيجية.", "level1_focus_title": "مجالات التركيز الرئيسية", "level1_focus1": "تطوير التفكير الاستراتيجي والرؤية", "level1_focus2": "تعلم تفويض العمل الفني", "level1_focus3": "بناء علاقات متعددة الوظائف", "level1_focus4": "التركيز على التأثير التنظيمي", "level1_focus5": "إرشاد المواهب الناشئة في مجالك", "level2_label": "المستوى 2", "level2_title": "مدير بدرج בינוני إلى مستوى C", "level2_subtitle": "الانتقال من الفريق إلى قيادة المؤسسة واتخاذ القرارات الاستراتيجية.", "level2_desc": "الانتقال من إدارة الفرق إلى القيادة على مستوى المؤسسة واتخاذ القرارات الاستراتيجية.", "level2_focus1": "إتقان التخطيط الاستراتيجي على مستوى المؤسسة", "level2_focus2": "تطوير مهارات التواصل على مستوى C", "level2_focus3": "بناء الحضور التنفيذي والتأثير", "level2_focus4": "قيادة التحول التنظيمي", "level2_focus5": "التنقل في ديناميكيות أصحاب المصلحة المعقدة", "level3_label": "المستوى 3", "level3_title": "من مستوى C إلى الرئيس التنفيذي", "level3_subtitle": "التقدم إلى المسؤولية التنظيمية النهائية ووضع الرؤية.", "level3_desc": "التقدم إلى المسؤولية التنظيمية النهائية ووضع الرؤية.", "level3_focus1": "تحديد الرؤية والثقافة التنظيمية", "level3_focus2": "إتقان التواصل على مستوى مجلس الإدارة", "level3_focus3": "قيادة النمو الاستراتيجي طويل الأجل", "level3_focus4": "بناء فرق تنفيذية عالية الأداء", "level3_focus5": "التنقل في تحول السوق", "level4_label": "المستوى 4", "level4_title": "من المؤسس إلى القائد", "level4_subtitle": "الانتقال من الإنشاء إلى القيادة", "level4_desc": "الانتقال من الإنشاء إلى القيادة، وتوسيع رؤيتك من خلال الآخرين.", "level4_focus1": "בניית أنظمة قيادة قابلة للتوسع", "level4_focus2": "تفويض المسؤوليات التشغيلية", "level4_focus3": "تطوير الشراكات الاستراتيجية", "level4_focus4": "יצירת מסגרות צמיחה בת-קיימא", "level4_focus5": "إرشاد וتمكين قادة الفرق", "level5_label": "المستوى 5", "level5_title": "المسرعات والشركاء", "level5_subtitle": "انضم إلى مسرعات وشركاء كيما", "level5_desc": "تواصل مع شبكتنا من المسرعات العالمية والشركاء الاستراتيجيين لتضخيم رحلتك القيادية.", "level5_focus_title": "شركاؤنا", "learn_more": "اعرف المزيد" }, "accelerate": { "section_title": "سرّع صعودك إلى القيادة المهنية الاستباقية", "service1_title": "أساسيات القيادة التنفيذية", "service1_desc": "إتقان منهجيات Ivy League والتخطيط الاستراتيجي للأعمال لبناء أساس قيادي متين.", "service2_title": "التفكير الاستراتيجي الريادي المتقدم", "service2_desc": "تطوير البصيرة لتحديد الفرص الفريدة والحلول المبتكرة، والتفكير خارج الصندوق.", "service3_title": "التطبيق العملي", "service3_desc": "ترجمة النظرية إلى ممارسة من خلال تمارين موجهة ومشاريع تعاونية وتحديات واقعية بدعم من الموجهين.", "service4_title": "الإعداد لأعلى مستوى تنفيذي", "service4_desc": "اكتساب الثقة والخبرة والشبكة الأساسية للنجاح على مستوى الإدارة التنفيذية، سواء لإطلاق مشروع جديد أو توسيع مشروع قائم." }, "register_elm": { "section_title": "برنامج ELM المصغر", "section_desc": "حوّل رحلتك القيادية مع התוכנית המקיפה שלנו. כל מה שאתה צריך כדי להאיץ את הצמיחה שלך.", "location_label": "الموقع", "location_text": "هرتسليا، بيئة تقنية ملهمة مصممة لتعزيز الإبداع والتعلم المركز", "investment_label": " الاستثمار", "investment_price": "6,500 شيكل", "investment_promo": "مع رمز الترويج HASUB", "investment_desc": "הכשרה מקיפה כוללת את כל המפגשים החיצוניים, הדרכה אישית וחומרי התוכנית", "outcome_label": "النتيجة", "outcome_text": "התקדמות לרמת מנהיגות MANAGEMENTית, מצויד לבניית והרחבת מיזמים מצליחים", "startdate_label": "تاريخ البدء", "startdate_text": "התוכנית מתחילה ב-16 בפברואר 2025", "startdate_schedule": "פגישות פעמיים בחודש ביום שני.", "tagline": "אל תיתן לחוסר ניסיון לעצור אותך. המסע היזמי שלך מתחיל כאן.", "cta_label": "הירשם עכשיו:", "cta_title": "תוכנית אקדמיית קימא לניהול מנהיגות", "cta_button": "מלא את הטופס" }, "modals": { "module1_title": "الوحدة 1: القيادة الواعية", "module1_intro": "القيادة لا تُورث. إنها تُبنى.", "module1_desc": "أثبتت أفضل المؤسسات في العالم - هارفارد، MIT - أن القيادة مهارة قابلة للتعلم. نقدم لك منهجياتهم المثبتة، المكيفة للتطبيق في العالم الحقيقي.", "module1_what_title": "ما ستتقنه:", "module1_point1": "أطر القيادة التقنية والتكيفية", "module1_point2": "اتخاذ القرارات في ظل عدم اليقين وقوانين القيادة الخمسة", "module1_point3": "بناء التأثير وقيادة التغيير التنظيمي", "module1_point4": "الانتقال من مدير إلى قائد واعٍ", "module1_bottom": "النتيجة النهائية: قُد بوضوح وهدف وتأثير قابل للقياس.", "module2_title": "الوحدة 2: التفكير الريادي", "module2_intro": "ريادة الأعمال ليست عن الشركات الناشئة. إنها عقلية خلق القيمة.", "module2_desc": "رواد الأعمال الحقيقيون يرون מה שאחרים מפספסים: الفجوة بين المشاكل לפתרונות. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.", "module2_what_title": "ما ستطوره:", "module2_point1": "مسגרות حل المشكلات التي تخلق قيمة", "module2_point2": "التعرف على الفرص والتنفيذ الاستراتيجي", "module2_point3": "בניית פתרונות בשיתוף פעולה", "module2_point4": "دفع الابتكار في أي سياق", "module2_bottom": "النتيجة النهائية: فكر כرائد أعمال. قُد كصانع تغيير.", "module3_title": "الوحدة 3: التأثير المهني", "module3_intro": "رؤيتك لا تعني شيئًا إذا لم تستطع توصيلها.", "module3_desc": "الاحترافية هي הגשר בין רעיונות לביצוע. إنها الطريقة التي تقنع بها أصحاب المصلحة، וتجذב الشركاء، וتبني المصداقية، وتלhem العمل. إنها المهارة التي تحول פוטנציאל לביצועים.", "module3_what_title": "ما תשכלל:", "module3_point1": "סיפור והצגה משכנעים", "module3_point2": "التواصل التجاري والإقناع الاستراتيجي", "module3_point3": "בניית נוכחות MANAGEMENTית", "module3_point4": "המרת חזון לאסטרטגיה ניתנת לביצוע", "module3_bottom": "النتيجة النهائية: תקשר בכוח. בצע בדיוק.", "enrollment_title": "التسجيل في برنامج ELM", "enrollment_intro": "حوّل رحلتك القيادية.", "enrollment_desc": "املأ النموذج أدناه لتأمين مكانك في برنامج إدارة القيادة الريادية.", "program_modal1_title": "مختص تجاري إلى تنفيذي", "program_modal1_subtitle": "التحول من التخصص إلى الإشراف التنفيذي", "program_modal1_benefit_title": "ما ستحصل عليه", "program_modal1_benefit1_title": "جلسات قيادية مكثفة", "program_modal1_benefit1_desc": "6 جلسات عالية التأثير في هرتسليا", "program_modal1_benefit2_title": "الإرشاد الشخصي", "program_modal1_benefit2_desc": "8 تدريبات אישية מעוצבות لك", "program_modal1_benefit3_title": "شهادة LEM", "program_modal1_benefit3_desc": "انضم إلى شبكة KIMA LEM للقيادة", "program_modal1_benefit4_title": "نוכחות MANAGEMENTية", "program_modal1_benefit4_desc": "בניית מסגרות פיקוח أستراتيجي", "accelerators_modal_title": "انضم إلى مسرعات وشركاء كيما", "accelerators_modal_desc": "تواصل مع شبكتنا من المسرعات العالمية والشركاء الاستراتيجيين لتضخيم رحلتك القيادية.", "accelerators_benefit_title": "فوائد الشراكة", "accelerators_benefit1_title": "وصول לרשת", "accelerators_benefit1_desc": "تواصل مع قادة الصناعة", "accelerators_benefit2_title": "فرص التمويل", "accelerators_benefit2_desc": "الوصول להון ומשקיעים", "accelerators_benefit3_title": "الإرشاد", "accelerators_benefit3_desc": "التوجيه ממייסדים מצליחים", "accelerators_benefit4_title": "משאבים", "accelerators_benefit4_desc": "כלים, הכשרה ותמיכה", "accelerators_partners_title": "شبكة شركائنا" }, "footer": { "work_together": "لنعمل معًا؟", "call_kima": "اتصل بأكاديمية كيما الآن", "operations": "العمليات - إسرائيل", "address": "جناح 452 8082 بونر بارج، هرتسليا، إسرائيل", "company_title": "شركتنا", "company_desc": "مهمتنا هي تمكين الشركات من جميع الأحجام للازدهار في سوق متغير باستمرار.", "follow_us": "تابعنا", "copyright": "© 2025 أكاديمية كيما جميع الحقوق محفوظة.", "policy_privacy": "سياسة وخصوصية", "terms_conditions": "الأحكام والشروط", "gotop": "للأعلى" }, "contact": { "breadcrumb_home": "בית", "breadcrumb_contact": "צור קשר", "page_title": "צור קשר", "section_heading": "צור קשר", "section_title": "צור איתנו קשר", "form_title_part1": "אנא ", "form_title_part2": "צור קשר", "form_title_part3": " או בקר במיקום שלנו.", "form_name": "الاسم الكامل*", "form_email": "عنوان البريد الإلكتروني*", "form_phone": "رقم الهاتف*", "form_select_default": "اختر אפשרות", "form_option1": "برنامج ELM", "form_option2": "تدريب القيادة", "form_option3": "הכשרה ביזמות", "form_option4": "פנייה כללית", "form_message": "اكتب الرسالة", "form_submit": "שלח הודעה", "info_heading": "צור קשר", "info_title": "פרטי הקשר שלנו", "email_title": "שלח לנו אימייל", "call_title": "اتصل بنا", "location_title": "המיקום שלנו", "location_text": "גנו 452, 8082 בונר פארג', הרצליה, ישראל", "hours_title": "שעות פעילות", "hours_weekdays": "ב' - ו': 9:00 - 18:00", "hours_sunday": "ראשון: לפי תיאום" } },
        he: { "site": { "title": "[HE] Kima Academy - Program for Entrepreneurial Leadership Management (ELM)" }, "nav": { "home": "בית", "academy": "האקדמיה", "contact": "צור קשר", "menu": "תפריט" }, "hamburger": { "contact_info": "פרטי התקשרות", "email": "אימייל", "location": "מיקום", "location_text": "הרצליה, ישראל", "follow_us": "עקבו אחרינו" }, "hero": { "watermark": "KIMA ACADEMY", "social_badge": "אלפים מצטרפים ל-KIMA", "headline": "בניית מנהיגים יוצאי דופן", "headline_accent": "באמצעות תוכניות ELM מוכחות", "description": "תוכנית ניהול מנהיגות יזמית של אקדמיית קימא הופכת אנשי מקצוע ארגוניים למנהיגים בעלי חזון. שלוט במתודולוגיות של Ivy League והאץ את הדרך שלך למצוינות MANAGEMENTית.", "cta_enroll": "הירשם", "cta_contact": "צור קשר" }, "philosophy": { "quote": "הנהג בביטחון. בנה עם השפעה.", "subquote": "אדם חכם לומד מניסיון. החכם יותר לומד מאחרים. מה שהניסיון לוקח שנים לבנות, למידה ממוקדת מספקת עכשיו." }, "pillars": { "title": "שלושה עמודי תווך מרכזיים", "intro": "תוכנית ניהול המנהיגות היזמית האינטנסיבית שלנו מגשרת על הפער בין פוטנציאל לביצועים באמצעות שלושה עמודי תווך מרכזיים:", "pillar1_title": "מנהיגות מודעת", "pillar1_desc": "מנהיגות אינה תורשתית. היא נבנית. שלוטאף ועבור מנהל למנהיג מודע.", "pillar2_title": "יזמות מונחית ערך", "pillar2_desc": "יזמות היא מצב רוח של יצירת ערך. פתח זיהוי הזדמנויות והנע חדשנות בכל הקשר.", "pillar3_title": "ניהול מקצועי", "pillar3_desc": "החזון שלך לא שווה כלום אם אתה לא יכול לתקשר אותו. שכלל סיפור, שכנוע ונוכחות MANAGEMENTית.", "learn_more": "למד עוד" }, "outcomes": { "heading": "תוצאות ו-ELM", "gain_title": "מה תרוויח", "gain_p1": "תוכנית KIMA ELM לא רק מאמנת. היא משנה את הדרך שבה אתה חושב ואת הדרך שבה אתה מוביל שינוי.", "gain_p2": "אקדמיית קימא מאיצה את הצמיחה שלך, הופכת שאיפה לביצוע, פוטנציאל לתוצאות, ומנהלים למנהיגים שיוצרים ערך מתמשך.", "benefit1": "כלים מעשיים ומסגרות אסטרטגיות שפותחו על ידי בתי ספר של Ivy League תוך התאמה לתרבות המקומית", "benefit2": "ביטחון לקבל החלטות מורכבות מהיום הראשון", "benefit3": "מתודולוגיות מוכחות מותאמות לאתגרים בעולם האמיתי", "benefit4": "נתיב ברור מנהל למנהיג בעל השפעה", "certified_title": "קבל הסמכת ELM", "certified_p1": "תוכנית KIMA ELM לא רק מאמנת. היא משנה את הדרך שבה אתה חושב ואת הדרך שבה אתה מוביל שינוי.", "certified_p2": "אקדמיית קימא מאיצה את הצמיחה שלך, הופכת שאיפה לביצוע, פוטנציאל לתוצאות, ומנהלים למנהיגים שיוצרים ערך מתמשך." }, "leadership_levels": { "section_title": "מהי רמת המנהיגות הבאה שלך?", "level1_label": "רמה 1", "level1_title": "מختص תجاري לבכיר", "level1_subtitle": "מעבר מהתמחות לפיקוח ניהולי", "level1_desc": "الانتقال من كونك خبيرًا في الموضوع להובלת יוזמות ארגוניות אסטרטגיות.", "level1_focus_title": "תחומי מיקוד מרכזיים", "level1_focus1": "تطوير חשיבה אסטרטגית וחזון", "level1_focus2": "تعلم تفويض العمل الفني", "level1_focus3": "בניית קשרים בין-תפקודיים", "level1_focus4": "התמקדות בהשפעה ארגונית", "level1_focus5": "הleitung כישרונות מתפתחים בתחומך", "level2_label": "רמה 2", "level2_title": "מدير בדרגה בינוני ל-C-Level", "level2_subtitle": "الانتقال من الفريق إلى قيادة المؤسسة וקבלת החלטות אסטרטגיות.", "level2_desc": "الانتقال מניהול צוותים להנהגת ארגון וקבלת החלטות אסטרטגיות.", "level2_focus1": "שליטה בתכנון אסטרטגי ארגוני", "level2_focus2": "פיתוח כישורי תקשורת ברמת C", "level2_focus3": "בניית נוכחות והשפעה MANAGEMENTית", "level2_focus4": "قيادة טרנספורמציה ארגונית", "level2_focus5": "ניווט בדינמיקות מורכבות של בעלי עניין", "level3_label": "רמה 3", "level3_title": "מ-C-Level ל-CEO", "level3_subtitle": "التقدم إلى المسؤولية التنظימية النهائية וקביעת חזון.", "level3_desc": "التقدم إلى المسؤولية التنظימية النهائية וקביעת חזון.", "level3_focus1": "הגדרת חזון ותרבות ארגונית", "level3_focus2": "שליטה בתקשורת ברמת דירקטוריון", "level3_focus3": "הנעת צמיחה אסטרטגית ארוכת טווח", "level3_focus4": "בניית צוותי הנהלה בעלי ביצועים��", "level3_focus5": "ניווט בשינויי שוק", "level4_label": "רמה 4", "level4_title": "ממייסד למנהיג", "level4_subtitle": "الانتقال من الإنشاء إلى القيادة", "level4_desc": "الانتقال من الإنشاء إلى القيادة، وتوسيع رؤيتك من خلال الآخرين.", "level4_focus1": "בניית מערכות הנהגה להרחבה", "level4_focus2": "האצלת אחריות תפעולית", "level4_focus3": "تطوير שותפויות אסטרטגיות", "level4_focus4": "יצירת מסגרות צמיחה בת-קיימא", "level4_focus5": "הכוונה והעצמת מנהיגי צוותים", "level5_label": "רמה 5", "level5_title": "מאיצים ושותפים", "level5_subtitle": "הצטרף למאיצים ושותפי Kima", "level5_desc": "התחבר לרשת המאיצים והשותפים האסטרטגיים שלנו כדי להגביר את מסע המנהיגות שלך.", "level5_focus_title": "השותפים שלנו", "learn_more": "למד עוד" }, "accelerate": { "section_title": "האץ את העלייה שלך למנהיגות מקצועית פרואקטיבית", "service1_title": "יסודות מנהיגות ניהולית", "service1_desc": "שליטה במתודולוגיות Ivy League ותכנון עסקי אסטרטגי לבניית בסיס מנהיגות איתן.", "service2_title": "חשיבה אסטרטגית יזמית מתקדמת", "service2_desc": "פיתוח תובנה לזיהוי הזדמנויות ייחודיות ופתרונות חדשניים, חשיבה מחוץ לקופסה.", "service3_title": "יישום מעשי", "service3_desc": "תרגום תיאוריה לפרקטיקה דרך תרגילים מונחים, פרויקטים שיתופיים ואתגרים מהעולם האמיתי בתמיכת מנטורים.", "service4_title": "הכנה לרמה ניהולית הגבוהה ביותר", "service4_desc": "רכישת הביטחון, הניסיון והרשת החיונית להצלחה ברמת הניהול הבכיר, בין אם משיקים פרויקט חדש או מרחיבים פרויקט קיים." }, "register_elm": { "section_title": "תוכנית ELM מיני", "section_desc": "שנה את מסע המנהיגות שלך עם התוכנית המקיפה שלנו. כל מה שאתה צריך כדי להאיץ את הצמיחה שלך.", "location_label": "מיקום", "location_text": "הרצליה, סביבת טכנולוגיה מעוררת השראה שנועדה לטפח יצירתיות ולמידה ממוקדת", "investment_label": "השקעה", "investment_price": "6,500 ש\"ח", "investment_promo": "עם קוד פרומו HASUB", "investment_desc": "הכשרה מקיפה כוללת את כל המפגשים החיצוניים, הדרכה אישית וחומרי התוכנית", "outcome_label": "תוצאה", "outcome_text": "התקדמות לרמת מנהיגות MANAGEMENTית, מצויד לבניית והרחבת מיזמים מצליחים", "startdate_label": "תאריך התחלה", "startdate_text": "התוכנית מתחילה ב-16 בפברואר 2025", "startdate_schedule": "פגישות פעמיים בחודש ביום שני.", "tagline": "אל תיתן לחוסר ניסיון לעצור אותך. המסע היזמי שלך מתחיל כאן.", "cta_label": "הירשם עכשיו:", "cta_title": "תוכנית אקדמיית Kima לניהול מנהיגות", "cta_button": "מלא את הטופס" }, "modals": { "module1_title": "מודול 1: מנהיגות מודעת", "module1_intro": "liderה אינה תורשתית. היא נבנית.", "module1_desc": "המוסדות המובילים בעולם - הרווארד, MIT - הוכיחו שliderה היא מיומנות ניתנת ללמידה. אנו מביאים לך את המתודולוגיות המוכחות שלהם, מותאמות ליישום בעולם האמיתי.", "module1_what_title": "מה תשלוט:", "module1_point1": "מסגרות מנהיגות טכנית ומסתגלת", "module1_point2": "קבלת החלטות אי-וודאות וחמשת חוקי המנהיגות", "module1_point3": "בניית השפעה והנעת שינוי ארגוני", "module1_point4": "הانتقال מנהל למנהיג מודע", "module1_bottom": "שורה תחתונה: הנהג בבהירות, תכלית והשפעה ניתנת למדידה.", "module2_title": "מודול 2: חשיבה יזמית", "module2_intro": "יזמות אינה עוסקת בסטארטאפים. זו מנטליות של יצירת ערך.", "module2_desc": "יזמים אמיתיים רואים מה שאחרים מפספסים: הפער בין בעיות לפתרונות. They diagnose challenges, spot opportunities, and mobilize resources whether building new ventures or driving innovation within existing organizations.", "module2_what_title": "מה תפתח:", "module2_point1": "מסגרות פתרון בעיות שיוצרות ערך", "module2_point2": "التعرف على الفرص וביצוע אסטרטגי", "module2_point3": "בניית פתרונות בשיתוף פעולה", "module2_point4": "دفع الابتكار في أي سياق", "module2_bottom": "النتيجة النهائية: חשוב כיזם. הנהג כיוצר שינוי.", "module3_title": "מודול 3: השפעה מקצועית", "module3_intro": "رؤיتك לא שווה כלום אם אתה לא יכול לתקשר אותה.", "module3_desc": "מקצועיות היא הגשר בין רעיונות לביצוע. זו הדרך שבה אתה משכנע בעלי עניין, מושך שותפים, בונה אמינות, ומעורר פעולה. זו המיומנות שהופכת פוטנציאל לביצועים.", "module3_what_title": "מה תשכלל:", "module3_point1": "סיפור והצגה משכנעים", "module3_point2": "תקשורת עסקית אסטרטגית ושכנוע", "module3_point3": "בניית נוכחות MANAGEMENTית", "module3_point4": "המרת חזון לאסטרטגיה ניתנת לביצוע", "module3_bottom": "النتيجة النهائية: תקשר בכוח. בצע בדיוק.", "enrollment_title": "הרשמה לתוכנית ELM", "enrollment_intro": "حوّل رحلتك القيادية.", "enrollment_desc": "املأ النموذج أدناه כדי להבטיח את מקומך בתוכנית ניהול המנהיגות.", "program_modal1_title": "מختص תجاري לבכיר", "program_modal1_subtitle": "הتحول מהתמחות מומחית לפיקוח ניהולי", "program_modal1_benefit_title": "מה תקבל", "program_modal1_benefit1_title": "פגישות מנהיגות מתקדמות", "program_modal1_benefit1_desc": "6 פגישות עם השפעה גבוהה בהרצליה", "program_modal1_benefit2_title": "הדרכה אישית", "program_modal1_benefit2_desc": "8 תدريبות אישיות מעוצבות עבורך", "program_modal1_benefit3_title": "תעודת LEM", "program_modal1_benefit3_desc": "הצטרף לרשת המנהיגות KIMA LEM", "program_modal1_benefit4_title": "נוכחות MANAGEMENTית", "program_modal1_benefit4_desc": "בניית מסגרות פיקוח אסטרטגי", "accelerators_modal_title": "הצטרף למאיצים ושותפי Kima", "accelerators_modal_desc": "התחבר לרשת המאיצים והשותפים האסטרטגיים שלנו כדי להגביר את מסע המנהיגות שלך.", "accelerators_benefit_title": "יתרונות שותפות", "accelerators_benefit1_title": "גישה לרשת", "accelerators_benefit1_desc": "התחברות עם מובילי תעשייה", "accelerators_benefit2_title": "הזדמנויות מימון", "accelerators_benefit2_desc": "גישה להון ומשקיעים", "accelerators_benefit3_title": "הדרכה", "accelerators_benefit3_desc": "הנחייה ממייסדים מצליחים", "accelerators_benefit4_title": "משאבים", "accelerators_benefit4_desc": "כלים, הכשרה ותמיכה", "accelerators_partners_title": "רשת השותפים שלנו" }, "footer": { "work_together": "בואו נעבוד יחד?", "call_kima": "התקשר לאקדيمית Kima עכשיו", "operations": "פעילות - ישראל", "address": "גנו 452 8082 בונר פאר', הרצליה, ישראל", "company_title": "החברה שלנו", "company_desc": "המשימה שלנו היא להעצים עסקים מכל הגדלים לשגשג בשוק המשתנה ללא הרף.", "follow_us": "עקבו אחרינו", "copyright": "© 2025 אקדيمית Kima כל הזכויות שמורות.", "policy_privacy": "מדיניות ופרטיות", "terms_conditions": "תנאים והגבלות", "gotop": "למעלה" }, "contact": { "breadcrumb_home": "בית", "breadcrumb_contact": "צור קשר", "page_title": "צור קשר", "section_heading": "צור קשר", "section_title": "צור איתנו קשר", "form_title_part1": "אנא ", "form_title_part2": "צור קשר", "form_title_part3": " או בקר במיקום שלנו.", "form_name": "الاسم الكامل*", "form_email": "عنوان البريد الإلكتروني*", "form_phone": "رقم الهاتف*", "form_select_default": "اختر אפשרות", "form_option1": "תוכנית ELM", "form_option2": "تدريب القيادة", "form_option3": "הכשרה ביזמות", "form_option4": "פנייה כללית", "form_message": "اكتب الرسالة", "form_submit": "שלח הודעה", "info_heading": "צור קשר", "info_title": "פרטי הקשר שלנו", "email_title": "שלח לנו אימייל", "call_title": "اتصل بنا", "location_title": "המיקום שלנו", "location_text": "גנו 452, 8082 בונר פאר', הרצליה, ישראל", "hours_title": "שעות פעילות", "hours_weekdays": "ב' - ו': 9:00 - 18:00", "hours_sunday": "ראשון: לפי תיאום" } }
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
