/* =========================================================
   BMST — Site interactions, i18n and form handling
   ========================================================= */

(function () {
    'use strict';

    /* -------------------------------------------------------
       Translation dictionary
       ------------------------------------------------------- */

    const I18N = {
        en: {
            'meta.title': 'BMST | Sports That Build Community',
            'meta.description': 'BMST is a community sports team in Bani Mazar, Egypt, empowering children and youth through sport, service and leadership.',

            'common.skip': 'Skip to content',
            'common.language': 'Language',
            'common.english': 'English',
            'common.arabic': 'Arabic',
            'common.theme': 'Toggle theme',
            'common.themeDark': 'Switch to dark theme',
            'common.themeLight': 'Switch to light theme',
            'common.menu': 'Open menu',
            'common.closeMenu': 'Close menu',
            'common.previous': 'Previous slide',
            'common.next': 'Next slide',
            'common.toTop': 'Back to top',
            'common.optional': '(optional)',

            'brand.sub': 'Bani Mazar',

            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.mission': 'Mission',
            'nav.activities': 'Activities',
            'nav.gallery': 'Gallery',
            'nav.impact': 'Impact',
            'nav.donate': 'Support',
            'nav.join': 'Join Us',
            'nav.contact': 'Contact',

            'hero.eyebrow': 'Bani Mazar, Egypt · Since 2016',
            'hero.title1': 'Sport that builds',
            'hero.title2': 'stronger communities',
            'hero.lead': 'We bring children, youth and families together through football, service and leadership — on and off the pitch.',
            'hero.join': 'Join the team',
            'hero.support': 'Support our mission',
            'hero.proof': 'Trusted by families across Bani Mazar',
            'hero.stat': 'Active members',
            'hero.year': 'Made with heart',
            'hero.imageAlt': 'BMST players training together',

            'about.imageAlt': 'BMST community sports team',
            'about.badgeTitle': '10 years',
            'about.badgeText': 'of showing up',
            'about.eyebrow': 'Who we are',
            'about.title': 'More than a team. A community.',
            'about.intro': 'BMST is a volunteer-led sports team in Bani Mazar. We use the game we love to create opportunities for young people and their families.',
            'about.f1': 'A safe place to play and belong',
            'about.f2': 'Coaching built on respect and discipline',
            'about.f3': 'Real service projects in our neighbourhood',
            'about.f4': 'A path from player to leader',
            'about.cta': 'Become a member',

            'mission.eyebrow': 'Our mission',
            'mission.title': 'Three commitments, one team',
            'mission.intro': 'Everything we do is designed to help people grow together.',
            'mission.p1Title': 'Play with purpose',
            'mission.p1Text': 'Regular sessions build fitness, focus and the confidence to try something new.',
            'mission.p2Title': 'Serve with heart',
            'mission.p2Text': 'We show up for our neighbours with practical help, visits and community days.',
            'mission.p3Title': 'Grow together',
            'mission.p3Text': 'Older players mentor younger ones, turning teamwork into everyday leadership.',

            'activities.eyebrow': 'What we do',
            'activities.title': 'Always something happening',
            'activities.intro': 'From weekly training to family festivals, there is a place for every age and ability.',
            'activities.a1Title': 'Weekly training',
            'activities.a1Text': 'Structured sessions that develop skill, fitness and teamwork.',
            'activities.a1Meta': 'Every week',
            'activities.a2Title': 'Summer camps',
            'activities.a2Text': 'Active, memorable camps filled with games and learning.',
            'activities.a2Meta': 'Seasonal',
            'activities.a3Title': 'Community service',
            'activities.a3Text': 'Volunteer days that put our values into action.',
            'activities.a3Meta': 'Monthly',
            'activities.a4Title': 'Tournaments',
            'activities.a4Text': 'Friendly competitions that teach winning and losing with grace.',
            'activities.a4Meta': 'Throughout the year',
            'activities.a5Title': 'Family days',
            'activities.a5Text': 'Events that bring parents, siblings and friends onto the field.',
            'activities.a5Meta': 'Every season',
            'activities.a6Title': 'Leadership lab',
            'activities.a6Text': 'Older members learn to coach, organise and mentor.',
            'activities.a6Meta': 'For teens & adults',

            'gallery.eyebrow': 'Gallery',
            'gallery.title': 'Moments worth keeping',
            'gallery.intro': 'A small window into the energy and joy of BMST.',
            'gallery.carousel': 'BMST photo gallery',
            'gallery.s1Alt': 'Players during a training session',
            'gallery.s1Tag': 'On the pitch',
            'gallery.s1Title': 'Training with purpose',
            'gallery.s2Alt': 'BMST team members together',
            'gallery.s2Tag': 'Off the pitch',
            'gallery.s2Title': 'A team off the field',
            'gallery.s3Art': 'BMST',
            'gallery.s3Tag': 'Coming soon',
            'gallery.s3Title': 'More stories to share',
            'gallery.dots': 'Choose a slide',
            'gallery.slidePrefix': 'Slide',

            'impact.eyebrow': 'Our impact',
            'impact.title': 'Small team. Real change.',
            'impact.intro': 'Numbers tell part of the story. The rest is in the people we meet.',
            'impact.s1': 'Active members',
            'impact.s2': 'Events organised',
            'impact.s3': 'Children & youth served',
            'impact.s4': 'Years of service',

            'donate.eyebrow': 'Support us',
            'donate.title': 'Help keep the game open to everyone',
            'donate.intro': 'Every contribution goes towards equipment, sessions and activities for families in Bani Mazar.',
            'donate.blockTitle': 'Where your support goes',
            'donate.d1': 'Footballs, kits and safe equipment',
            'donate.d2': 'Free places for children who need them',
            'donate.d3': 'Community days and family events',
            'donate.note': 'BMST is volunteer-run. Your support is handled with care and transparency.',
            'donate.instapay': 'Instapay',
            'donate.copyInstapay': 'Copy Instapay address',
            'donate.vodafone': 'Vodafone Cash',
            'donate.copyPhone': 'Copy phone number',
            'donate.bank': 'Bank transfer',
            'donate.bankSoon': 'Coming soon',
            'donate.soon': 'Soon',
            'donate.qrAlt': 'Payment QR code',
            'donate.qrText': 'Scan to support BMST',

            'join.eyebrow': 'Join BMST',
            'join.title': 'Find your place on the team',
            'join.intro': 'Whether you want to play, coach or help out, there is room for you here.',
            'join.why': 'Why join us?',
            'join.j1Title': 'Make a difference',
            'join.j1Text': "See the impact of your time in real people's lives.",
            'join.j2Title': 'Build friendships',
            'join.j2Text': 'Meet people who care about the same things you do.',
            'join.j3Title': 'Learn by doing',
            'join.j3Text': 'Gain practical coaching and leadership experience.',
            'join.safety': 'We safeguard every member, on and off the field.',
            'join.formTitle': 'Membership application',
            'join.formSub': 'Takes less than two minutes.',
            'join.name': 'Full name *',
            'join.namePh': 'e.g. Mohamed Ahmed',
            'join.age': 'Age *',
            'join.agePh': '16',
            'join.phone': 'Phone number *',
            'join.phonePh': '01XXXxxxxxx',
            'join.email': 'Email',
            'join.emailPh': 'you@example.com',
            'join.address': 'Neighbourhood',
            'join.addressPh': 'Bani Mazar, Minya',
            'join.reason': 'What would you like to do with us?',
            'join.reasonPh': "I'd love to help with weekly training...",
            'join.submit': 'Send application',
            'join.fineprint': "We'll only use these details to get in touch about BMST.",

            'contact.eyebrow': 'Contact',
            'contact.title': "Let's talk",
            'contact.intro': "Questions, ideas or partnership opportunities — we'd love to hear from you.",
            'contact.addressLabel': 'Address',
            'contact.address': 'Bani Mazar, Minya, Egypt',
            'contact.phoneLabel': 'Phone',
            'contact.emailLabel': 'Email',
            'contact.hoursLabel': 'Response time',
            'contact.hours': 'Usually within 48 hours',
            'contact.formTitle': 'Send us a message',
            'contact.formSub': 'Fill in the details below.',
            'contact.name': 'Your name *',
            'contact.namePh': 'Your name',
            'contact.email': 'Email *',
            'contact.emailPh': 'you@example.com',
            'contact.phone': 'Phone number',
            'contact.phonePh': '01XXXxxxxxx',
            'contact.subject': 'Subject *',
            'contact.subjectPh': 'Partnership enquiry',
            'contact.message': 'Message *',
            'contact.messagePh': "Tell us what's on your mind...",
            'contact.submit': 'Send message',

            'footer.about': 'A volunteer-led sports team in Bani Mazar, using the game to build stronger families and a stronger community.',
            'footer.facebook': 'Facebook',
            'footer.email': 'Email',
            'footer.phone': 'Phone',
            'footer.explore': 'Explore',
            'footer.reach': 'Reach us',
            'footer.newsletter': 'Stay close',
            'footer.newsletterText': 'Follow our updates and upcoming events.',
            'footer.follow': 'Follow BMST',
            'footer.rights': 'All rights reserved.',
            'footer.made': 'Made for the community, with the community.',

            'validation.required': 'This field is required',
            'validation.name': 'Please enter your full name',
            'validation.nameShort': 'Name is too short',
            'validation.age': 'Please enter your age',
            'validation.ageRange': 'Age must be between 10 and 100',
            'validation.phone': 'Please enter your phone number',
            'validation.phoneFormat': 'Enter a valid Egyptian phone number',
            'validation.email': 'Enter a valid email address',
            'validation.subject': 'Please enter a subject',
            'validation.subjectShort': 'Subject is too short',
            'validation.message': 'Please write a message',
            'validation.messageShort': 'Message is too short',

            'status.joinSuccess': 'Application sent successfully! We will be in touch soon.',
            'status.contactSuccess': 'Message sent successfully! Thanks for reaching out.',
            'status.copied': 'Copied to clipboard',
            'status.copyFailed': 'Could not copy — please copy it manually',
            'status.network': 'Could not reach the server. Please try again.',
            'status.generic': 'Something went wrong. Please try again later.',
            'status.whatsappOpen': 'WhatsApp is opening — press send there to reach the team.',
            'status.whatsappLink': 'Open WhatsApp'
        },

        ar: {
            'meta.title': 'BMST | رياضة تبني مجتمعاً أقوى',
            'meta.description': 'BMST فريق رياضي مجتمعي في بني مزار، مصر، يمكّن الأطفال والشباب من خلال كرة القدم والخدمة والقيادة.',

            'common.skip': 'تخطَّ إلى المحتوى',
            'common.language': 'اللغة',
            'common.english': 'الإنجليزية',
            'common.arabic': 'العربية',
            'common.theme': 'تبديل المظهر',
            'common.themeDark': 'التبديل إلى المظهر الداكن',
            'common.themeLight': 'التبديل إلى المظهر الفاتح',
            'common.menu': 'فتح القائمة',
            'common.closeMenu': 'إغلاق القائمة',
            'common.previous': 'الشريحة السابقة',
            'common.next': 'الشريحة التالية',
            'common.toTop': 'العودة إلى الأعلى',
            'common.optional': '(اختياري)',

            'brand.sub': 'بني مزار',

            'nav.home': 'الرئيسية',
            'nav.about': 'عن الفريق',
            'nav.mission': 'رسالتنا',
            'nav.activities': 'أنشطتنا',
            'nav.gallery': 'المعرض',
            'nav.impact': 'أثرنا',
            'nav.donate': 'ادعمنا',
            'nav.join': 'انضم إلينا',
            'nav.contact': 'تواصل معنا',

            'hero.eyebrow': 'بني مزار، مصر · منذ 2016',
            'hero.title1': 'رياضة تبني',
            'hero.title2': 'مجتمعاً أقوى',
            'hero.lead': 'نجمع الأطفال والشباب والعائلات عبر كرة القدم والخدمة والقيادة — داخل الملعب وخارجه.',
            'hero.join': 'انضم إلى الفريق',
            'hero.support': 'ادعم رسالتنا',
            'hero.proof': 'موثوق به لدى عائلات بني مزار',
            'hero.stat': 'عضو نشط',
            'hero.year': 'صنع بشغف',
            'hero.imageAlt': 'لاعبون من BMST يتدربون معاً',

            'about.imageAlt': 'فريق BMST المجتمعي',
            'about.badgeTitle': '10 سنوات',
            'about.badgeText': 'من العطاء',
            'about.eyebrow': 'من نحن',
            'about.title': 'أكثر من فريق.. مجتمع',
            'about.intro': 'BMST فريق رياضي تطوعي في بني مزار. نستخدم اللعبة التي نحبها لصنع فرص للشباب وعائلاتهم.',
            'about.f1': 'مكان آمن للعب والانتماء',
            'about.f2': 'تدريب قائم على الاحترام والانضباط',
            'about.f3': 'مشاريع خدمة حقيقية في حيّنا',
            'about.f4': 'طريق من لاعب إلى قائد',
            'about.cta': 'كن عضواً معنا',

            'mission.eyebrow': 'رسالتنا',
            'mission.title': 'ثلاث التزامات.. فريق واحد',
            'mission.intro': 'كل ما نفعله يهدف إلى نمو الناس معاً.',
            'mission.p1Title': 'العب بهدف',
            'mission.p1Text': 'جلسات منتظمة تبني اللياقة والتركيز والثقة للمحاولة من جديد.',
            'mission.p2Title': 'اخدم من القلب',
            'mission.p2Text': 'نشارك جيراننا بالمساعدة العملية والزيارات وأيام المجتمع.',
            'mission.p3Title': 'انمُ معاً',
            'mission.p3Text': 'اللاعبون الأكبر يوجّهون الصغار، فيتحول العمل الجماعي إلى قيادة يومية.',

            'activities.eyebrow': 'ماذا نفعل',
            'activities.title': 'دائماً هناك ما يحدث',
            'activities.intro': 'من التدريب الأسبوعي إلى المهرجانات العائلية، هناك مكان لكل عمر ومستوى.',
            'activities.a1Title': 'التدريب الأسبوعي',
            'activities.a1Text': 'جلسات منظّمة تنمّي المهارة واللياقة والعمل الجماعي.',
            'activities.a1Meta': 'كل أسبوع',
            'activities.a2Title': 'معسكرات الصيف',
            'activities.a2Text': 'معسكرات نشطة مليئة بالألعاب والتعلّم.',
            'activities.a2Meta': 'موسمية',
            'activities.a3Title': 'خدمة المجتمع',
            'activities.a3Text': 'أيام تطوعية نترجم فيها قيمنا إلى أفعال.',
            'activities.a3Meta': 'شهرياً',
            'activities.a4Title': 'البطولات',
            'activities.a4Text': 'منافسات ودية تعلّم الفوز والخسارة بروح رياضية.',
            'activities.a4Meta': 'على مدار العام',
            'activities.a5Title': 'الأيام العائلية',
            'activities.a5Text': 'فعاليات تجمع الآباء والأشقاء والأصدقاء على الملعب.',
            'activities.a5Meta': 'كل موسم',
            'activities.a6Title': 'مختبر القيادة',
            'activities.a6Text': 'الأعضاء الأكبر يتعلمون التدريب والتنظيم والإرشاد.',
            'activities.a6Meta': 'للشباب والبالغين',

            'gallery.eyebrow': 'المعرض',
            'gallery.title': 'لحظات تستحق البقاء',
            'gallery.intro': 'نافذة صغيرة على طاقة BMST وفرحتها.',
            'gallery.carousel': 'معرض صور BMST',
            'gallery.s1Alt': 'لاعبون أثناء التدريب',
            'gallery.s1Tag': 'على الملعب',
            'gallery.s1Title': 'تدريب بهدف',
            'gallery.s2Alt': 'أعضاء فريق BMST معاً',
            'gallery.s2Tag': 'خارج الملعب',
            'gallery.s2Title': 'فريق خارج الملعب',
            'gallery.s3Art': 'BMST',
            'gallery.s3Tag': 'قريباً',
            'gallery.s3Title': 'المزيد من الحكايات',
            'gallery.dots': 'اختيار الشريحة',
            'gallery.slidePrefix': 'شريحة',

            'impact.eyebrow': 'أثرنا',
            'impact.title': 'فريق صغير.. أثر حقيقي',
            'impact.intro': 'الأرقام تحكي جزءاً من القصة، والباقي في الناس الذين قابلناهم.',
            'impact.s1': 'عضو نشط',
            'impact.s2': 'فعالية منظّمة',
            'impact.s3': 'طفل وشاب استفادوا',
            'impact.s4': 'سنة من الخدمة',

            'donate.eyebrow': 'ادعمنا',
            'donate.title': 'ساعد في إبقاء اللعبة متاحة للجميع',
            'donate.intro': 'كل مساهمة تذهب للمعدات والجلسات والأنشطة لعائلات بني مزار.',
            'donate.blockTitle': 'أين تذهب مساعدتك',
            'donate.d1': 'كرات وملابس ومعدات آمنة',
            'donate.d2': 'أماكن مجانية للأطفال الذين يحتاجونها',
            'donate.d3': 'أيام المجتمع والفعاليات العائلية',
            'donate.note': 'BMST فريق تطوعي بالكامل. تُدار مساعدتك بعناية وشفافية.',
            'donate.instapay': 'إنستاباي',
            'donate.copyInstapay': 'نسخ عنوان إنستاباي',
            'donate.vodafone': 'فودافون كاش',
            'donate.copyPhone': 'نسخ رقم الهاتف',
            'donate.bank': 'تحويل بنكي',
            'donate.bankSoon': 'قريباً',
            'donate.soon': 'قريباً',
            'donate.qrAlt': 'رمز الاستجابة السريعة للدفع',
            'donate.qrText': 'امسح لدعم BMST',

            'join.eyebrow': 'انضم إلى BMST',
            'join.title': 'جد مكانك في الفريق',
            'join.intro': 'سواء أردت اللعب أو التدريب أو المساعدة، لدينا مكان لك.',
            'join.why': 'لماذا تنضم إلينا؟',
            'join.j1Title': 'أحدث فرقاً',
            'join.j1Text': 'ترى أثر وقتك في حياة الناس الحقيقية.',
            'join.j2Title': 'ابنِ صداقات',
            'join.j2Text': 'التقِ بأشخاص يشاركونك نفس القيم.',
            'join.j3Title': 'تعلّم بالممارسة',
            'join.j3Text': 'اكتسب خبرة عملية في التدريب والقيادة.',
            'join.safety': 'نحن نحمي كل عضو، داخل الملعب وخارجه.',
            'join.formTitle': 'طلب الانضمام',
            'join.formSub': 'يستغرق أقل من دقيقتين.',
            'join.name': 'الاسم الكامل *',
            'join.namePh': 'مثال: محمد أحمد',
            'join.age': 'العمر *',
            'join.agePh': '16',
            'join.phone': 'رقم الهاتف *',
            'join.phonePh': '01XXXxxxxxx',
            'join.email': 'البريد الإلكتروني',
            'join.emailPh': 'you@example.com',
            'join.address': 'الحي',
            'join.addressPh': 'بني مزار، المنيا',
            'join.reason': 'ماذا تود أن تفعل معنا؟',
            'join.reasonPh': 'أحب أن أساعد في التدريب الأسبوعي...',
            'join.submit': 'إرسال الطلب',
            'join.fineprint': 'سنستخدم هذه البيانات فقط للتواصل معك بخصوص BMST.',

            'contact.eyebrow': 'تواصل',
            'contact.title': 'لنتحدث',
            'contact.intro': 'أسئلة أو أفكار أو فرص شراكة — نحب أن نسمع منك.',
            'contact.addressLabel': 'العنوان',
            'contact.address': 'بني مزار، المنيا، مصر',
            'contact.phoneLabel': 'الهاتف',
            'contact.emailLabel': 'البريد الإلكتروني',
            'contact.hoursLabel': 'مدة الرد',
            'contact.hours': 'عادة خلال 48 ساعة',
            'contact.formTitle': 'أرسل لنا رسالة',
            'contact.formSub': 'املأ البيانات أدناه.',
            'contact.name': 'اسمك *',
            'contact.namePh': 'اسمك',
            'contact.email': 'البريد الإلكتروني *',
            'contact.emailPh': 'you@example.com',
            'contact.phone': 'رقم الهاتف',
            'contact.phonePh': '01XXXxxxxxx',
            'contact.subject': 'الموضوع *',
            'contact.subjectPh': 'استفسار عن شراكة',
            'contact.message': 'الرسالة *',
            'contact.messagePh': 'أخبرنا بما يدور في بالك...',
            'contact.submit': 'إرسال الرسالة',

            'footer.about': 'فريق رياضي تطوعي في بني مزار، نستخدم اللعبة لبناء عائلات أقوى ومجتمع أقوى.',
            'footer.facebook': 'فيسبوك',
            'footer.email': 'البريد الإلكتروني',
            'footer.phone': 'الهاتف',
            'footer.explore': 'استكشف',
            'footer.reach': 'تواصل معنا',
            'footer.newsletter': 'ابقَ قريباً',
            'footer.newsletterText': 'تابع أخبارنا وفعالياتنا القادمة.',
            'footer.follow': 'تابع BMST',
            'footer.rights': 'جميع الحقوق محفوظة.',
            'footer.made': 'صُنع من أجل المجتمع، ومعه.',

            'validation.required': 'هذا الحقل مطلوب',
            'validation.name': 'يرجى إدخال الاسم الكامل',
            'validation.nameShort': 'الاسم قصير جداً',
            'validation.age': 'يرجى إدخال العمر',
            'validation.ageRange': 'العمر يجب أن يكون بين 10 و100',
            'validation.phone': 'يرجى إدخال رقم الهاتف',
            'validation.phoneFormat': 'رقم هاتف مصري غير صالح',
            'validation.email': 'صيغة البريد الإلكتروني غير صالحة',
            'validation.subject': 'يرجى إدخال الموضوع',
            'validation.subjectShort': 'الموضوع قصير جداً',
            'validation.message': 'يرجى كتابة الرسالة',
            'validation.messageShort': 'الرسالة قصيرة جداً',

            'status.joinSuccess': 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.',
            'status.contactSuccess': 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.',
            'status.copied': 'تم النسخ إلى الحافظة',
            'status.copyFailed': 'تعذّر النسخ، يرجى النسخ يدوياً',
            'status.network': 'تعذّر الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
            'status.generic': 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.',
            'status.whatsappOpen': 'جاري فتح واتساب — اضغط إرسال هناك لتصل رسالتك للفريق.',
            'status.whatsappLink': 'فتح واتساب'
        }
    };

    const root = document.documentElement;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Admin WhatsApp number. Change `data-whatsapp` on <body> to update it.
    const WHATSAPP_NUMBER = (String((document.body && document.body.dataset.whatsapp) || '').replace(/\D/g, '') || '201125993315');

    let lang = (function () {
        try {
            return localStorage.getItem('bmst-lang') === 'ar' ? 'ar' : 'en';
        } catch (e) {
            return 'en';
        }
    })();

    function t(key) {
        return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    }

    /* -------------------------------------------------------
       Translation
       ------------------------------------------------------- */

    function setText(el, value) {
        for (let i = 0; i < el.childNodes.length; i += 1) {
            const node = el.childNodes[i];
            if (node.nodeType === 3 && node.nodeValue.trim()) {
                node.nodeValue = value;
                return;
            }
        }
        el.textContent = value;
    }

    function translatePage() {
        root.lang = lang;
        root.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            setText(el, t(el.getAttribute('data-i18n')));
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
                const bits = pair.split(':');
                if (bits.length === 2) {
                    el.setAttribute(bits[0].trim(), t(bits[1].trim()));
                }
            });
        });

        const attrMap = {
            i18nAriaLabel: 'aria-label',
            i18nTitle: 'title',
            i18nPlaceholder: 'placeholder',
            i18nAlt: 'alt'
        };

        document.querySelectorAll('[data-i18n-aria-label], [data-i18n-title], [data-i18n-placeholder], [data-i18n-alt]').forEach(function (el) {
            Object.keys(attrMap).forEach(function (prop) {
                const key = el.dataset[prop];
                if (key) el.setAttribute(attrMap[prop], t(key));
            });
        });

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        updateThemeControl();
        updateSliderDirection();
        updateSliderDots();
        hideToast();

        document.querySelectorAll('.form-status').forEach(function (status) {
            status.textContent = '';
            status.className = 'form-status';
        });
    }

    function setLang(next) {
        if (next !== 'en' && next !== 'ar') return;
        lang = next;
        try { localStorage.setItem('bmst-lang', lang); } catch (e) { /* ignore */ }
        document.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; });
        document.querySelectorAll('[aria-invalid="true"]').forEach(function (el) { el.setAttribute('aria-invalid', 'false'); });
        translatePage();
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });

    /* -------------------------------------------------------
       Theme
       ------------------------------------------------------- */

    const themeToggle = document.getElementById('theme-toggle');

    function storedTheme() {
        try { return localStorage.getItem('bmst-theme'); } catch (e) { return null; }
    }

    function updateThemeControl() {
        if (!themeToggle) return;
        const isDark = root.dataset.theme === 'dark';
        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-regular fa-moon" aria-hidden="true"></i>';
        const label = t(isDark ? 'common.themeLight' : 'common.themeDark');
        themeToggle.setAttribute('aria-label', label);
        themeToggle.setAttribute('title', label);
    }

    function applyTheme(theme, persist) {
        root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
        if (persist) {
            try { localStorage.setItem('bmst-theme', theme); } catch (e) { /* ignore */ }
        }
        updateThemeControl();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
        });
    }

    if (!storedTheme() && window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = function (event) { applyTheme(event.matches ? 'dark' : 'light', false); };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    /* -------------------------------------------------------
       Mobile navigation, header and scroll spy
       ------------------------------------------------------- */

    const header = document.getElementById('site-header');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const toTop = document.getElementById('to-top');

    function closeMenu() {
        if (!navLinks || !menuBtn) return;
        navLinks.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', t('common.menu'));
        menuBtn.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            const open = !navLinks.classList.contains('is-open');
            navLinks.classList.toggle('is-open', open);
            menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            menuBtn.setAttribute('aria-label', t(open ? 'common.closeMenu' : 'common.menu'));
            menuBtn.innerHTML = open
                ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        });

        navLinks.addEventListener('click', function (event) {
            if (event.target.closest('a')) closeMenu();
        });

        document.addEventListener('click', function (event) {
            if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
        });
    }

    const navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    const spySections = navAnchors
        .map(function (a) { return document.querySelector(a.getAttribute('href')); })
        .filter(Boolean);

    let scrollTicking = false;

    function onScroll() {
        const y = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle('is-scrolled', y > 12);
        if (toTop) toTop.classList.toggle('is-visible', y > 480);

        let active = null;
        spySections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= 180) active = section.id;
        });
        navAnchors.forEach(function (a) {
            if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });

        scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(onScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1120) closeMenu();
    });

    /* -------------------------------------------------------
       Reveal on scroll
       ------------------------------------------------------- */

    const revealItems = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealItems.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* -------------------------------------------------------
       Animated counters
       ------------------------------------------------------- */

    const counters = document.querySelectorAll('.counter');

    function runCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        if (reducedMotion) {
            el.textContent = String(target);
            return;
        }

        const duration = 1500;
        const start = performance.now();

        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(target * eased));
            if (progress < 1) window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (el) { counterObserver.observe(el); });
    } else {
        counters.forEach(runCounter);
    }

    /* -------------------------------------------------------
       Gallery slider
       ------------------------------------------------------- */

    const slider = document.getElementById('slider');
    const track = document.getElementById('slider-track');
    const slides = track ? Array.prototype.slice.call(track.querySelectorAll('.slide')) : [];
    const dotsWrap = document.getElementById('slider-dots');
    const currentLabel = document.getElementById('slider-current');
    const totalLabel = document.getElementById('slider-total');
    const live = document.getElementById('slider-live');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    let currentSlide = 0;
    let autoplayTimer = null;

    function pad(number) { return String(number).padStart(2, '0'); }

    function updateSliderDots() {
        if (!dotsWrap) return;
        Array.prototype.slice.call(dotsWrap.children).forEach(function (dot, index) {
            dot.classList.toggle('is-active', index === currentSlide);
            dot.setAttribute('aria-selected', index === currentSlide ? 'true' : 'false');
            dot.setAttribute('aria-label', t('gallery.slidePrefix') + ' ' + (index + 1));
        });
    }

    function updateSliderDirection() {
        if (!track) return;
        const offset = root.dir === 'rtl' ? currentSlide * 100 : -currentSlide * 100;
        track.style.transform = 'translateX(' + offset + '%)';
    }

    function goToSlide(index) {
        if (!slides.length) return;
        currentSlide = (index + slides.length) % slides.length;
        updateSliderDirection();
        updateSliderDots();
        if (currentLabel) currentLabel.textContent = pad(currentSlide + 1);
        if (live) live.textContent = t('gallery.slidePrefix') + ' ' + (currentSlide + 1) + ' / ' + slides.length;
    }

    function startAutoplay() {
        if (reducedMotion || slides.length < 2 || autoplayTimer) return;
        autoplayTimer = window.setInterval(function () { goToSlide(currentSlide + 1); }, 5500);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    if (track && slides.length) {
        if (dotsWrap) {
            slides.forEach(function (_, index) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('role', 'tab');
                dot.addEventListener('click', function () { goToSlide(index); });
                dotsWrap.appendChild(dot);
            });
        }

        if (totalLabel) totalLabel.textContent = pad(slides.length);

        if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

        slider.addEventListener('keydown', function (event) {
            const forward = root.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
            if (event.key === forward || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                const step = event.key === forward ? 1 : -1;
                goToSlide(currentSlide + step);
                event.preventDefault();
            }
        });

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        slider.addEventListener('focusin', stopAutoplay);
        slider.addEventListener('focusout', function (event) {
            if (!slider.contains(event.relatedTarget)) startAutoplay();
        });
        slider.addEventListener('touchstart', stopAutoplay, { passive: true });
        slider.addEventListener('touchend', startAutoplay, { passive: true });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        goToSlide(0);
        startAutoplay();
    }

    /* -------------------------------------------------------
       Copy-to-clipboard actions
       ------------------------------------------------------- */

    let toastTimer = null;
    const toast = document.getElementById('toast');

    function hideToast() {
        if (!toast) return;
        toast.classList.remove('is-visible');
        if (toastTimer) window.clearTimeout(toastTimer);
    }

    function showToast(message, tone) {
        if (!toast) return;
        toast.textContent = message;
        toast.className = 'toast is-visible' + (tone === 'error' ? ' is-error' : '');
        if (toastTimer) window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(hideToast, 3600);
    }

    function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(value);
        }
        return new Promise(function (resolve, reject) {
            const helper = document.createElement('textarea');
            helper.value = value;
            helper.setAttribute('readonly', '');
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.select();
            try {
                const ok = document.execCommand('copy');
                document.body.removeChild(helper);
                ok ? resolve() : reject(new Error('copy failed'));
            } catch (err) {
                document.body.removeChild(helper);
                reject(err);
            }
        });
    }

    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            copyText(btn.getAttribute('data-copy'))
                .then(function () { showToast(t('status.copied'), 'success'); })
                .catch(function () { showToast(t('status.copyFailed'), 'error'); });
        });
    });

    /* -------------------------------------------------------
       Forms
       ------------------------------------------------------- */

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function normalizePhone(value) {
        let digits = String(value || '').replace(/\D/g, '');
        if (digits.indexOf('0020') === 0) digits = digits.slice(4);
        else if (digits.indexOf('20') === 0 && digits.length === 12) digits = digits.slice(2);
        else if (digits.indexOf('0') === 0) digits = digits.slice(1);
        return digits;
    }

    function validateField(name, value, required) {
        const text = String(value || '').trim();

        if (!text) return required ? t('validation.required') : '';

        switch (name) {
            case 'name':
                return text.length < 2 ? t('validation.nameShort') : '';
            case 'age': {
                const age = Number(text);
                if (!Number.isFinite(age) || !Number.isInteger(age)) return t('validation.age');
                return age < 10 || age > 100 ? t('validation.ageRange') : '';
            }
            case 'phone': {
                const digits = normalizePhone(text);
                return /^1\d{9}$/.test(digits) ? '' : t('validation.phoneFormat');
            }
            case 'email':
                return EMAIL_RE.test(text) ? '' : t('validation.email');
            case 'subject':
                return text.length < 3 ? t('validation.subjectShort') : '';
            case 'message':
                return text.length < 10 ? t('validation.messageShort') : '';
            case 'reason':
                return text.length > 0 && text.length < 3 ? t('validation.messageShort') : '';
            default:
                return '';
        }
    }

    const FORM_CONFIG = {
        'join-form': {
            type: 'join',
            statusId: 'join-status',
            whatsappId: 'join-whatsapp',
            successKey: 'status.joinSuccess',
            fields: {
                name: true,
                age: true,
                phone: true,
                email: false,
                address: false,
                reason: false
            }
        },
        'contact-form': {
            type: 'contact',
            statusId: 'contact-status',
            whatsappId: 'contact-whatsapp',
            successKey: 'status.contactSuccess',
            fields: {
                name: true,
                email: true,
                phone: false,
                subject: true,
                message: true
            }
        }
    };

    function fieldErrorNode(form, name) {
        return form.querySelector('[data-error-for="' + name + '"]');
    }

    function setFieldError(form, name, message) {
        const input = form.elements[name];
        const error = fieldErrorNode(form, name);
        if (error) error.textContent = message;
        if (input && input.setAttribute) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function clearFormErrors(form) {
        Object.keys(form.elements).forEach(function (key) {
            const input = form.elements[key];
            if (input && input.name) setFieldError(form, input.name, '');
        });
    }

    function setFormStatus(form, message, tone) {
        const status = document.getElementById(FORM_CONFIG[form.id].statusId);
        if (!status) return;
        status.textContent = message;
        status.className = 'form-status' + (tone ? ' is-' + tone : '');
    }

    function buildPayload(form, config) {
        const value = function (name) {
            const el = form.elements[name];
            return el ? String(el.value || '').trim() : '';
        };

        const payload = {
            type: config.type,
            lang: lang,
            website: value('website'),
            name: value('name'),
            email: value('email')
        };

        if (config.type === 'join') {
            payload.age = Number(value('age'));
            payload.phone = value('phone');
            payload.address = value('address');
            payload.reason = value('reason');
        } else {
            payload.phone = value('phone');
            payload.subject = value('subject');
            payload.message = value('message');
        }

        return payload;
    }

    function formValue(form, name) {
        const el = form.elements[name];
        return el ? String(el.value || '').trim() : '';
    }

    /**
     * WhatsApp click-to-chat: no API or token needed. The visitor's WhatsApp
     * opens with the message ready, and they confirm with one tap on Send.
     */
    function whatsappUrl(message) {
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function buildWhatsappMessage(form, config) {
        const arabic = lang === 'ar';
        const join = config.type === 'join';
        const lines = [];

        lines.push('*' + (arabic
            ? (join ? 'طلب انضمام جديد - BMST' : 'رسالة تواصل جديدة - BMST')
            : (join ? 'New membership application - BMST' : 'New contact message - BMST')) + '*');
        lines.push((arabic ? 'الاسم: ' : 'Name: ') + formValue(form, 'name'));

        const phone = formValue(form, 'phone');
        const email = formValue(form, 'email');
        if (phone) lines.push((arabic ? 'الهاتف: ' : 'Phone: ') + phone);
        if (email) lines.push((arabic ? 'الإيميل: ' : 'Email: ') + email);

        if (join) {
            const age = formValue(form, 'age');
            const address = formValue(form, 'address');
            const reason = formValue(form, 'reason');
            if (age) lines.push((arabic ? 'العمر: ' : 'Age: ') + age);
            if (address) lines.push((arabic ? 'الحي: ' : 'Area: ') + address);
            if (reason) lines.push((arabic ? 'السبب: ' : 'Reason: ') + reason);
        } else {
            lines.push((arabic ? 'الموضوع: ' : 'Subject: ') + formValue(form, 'subject'));
            lines.push((arabic ? 'الرسالة: ' : 'Message: ') + formValue(form, 'message'));
        }

        return lines.join('\n');
    }

    function showWhatsappLink(form, url) {
        const link = document.getElementById(FORM_CONFIG[form.id].whatsappId);
        if (!link) return;
        link.href = url;
        link.hidden = false;
    }

    function openWhatsapp(url) {
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (err) {
            /* The visible fallback link remains available. */
        }
    }

    Object.keys(FORM_CONFIG).forEach(function (formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const config = FORM_CONFIG[formId];

        Object.keys(config.fields).forEach(function (name) {
            const input = form.elements[name];
            if (!input) return;

            input.addEventListener('blur', function () {
                setFieldError(form, name, validateField(name, input.value, config.fields[name]));
            });

            input.addEventListener('input', function () {
                if (input.getAttribute('aria-invalid') === 'true') {
                    setFieldError(form, name, validateField(name, input.value, config.fields[name]));
                }
            });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFormErrors(form);
            setFormStatus(form, '', '');

            const fallback = document.getElementById(config.whatsappId);
            if (fallback) fallback.hidden = true;

            let firstInvalid = null;
            const errors = {};

            Object.keys(config.fields).forEach(function (name) {
                const input = form.elements[name];
                if (!input) return;
                const error = validateField(name, input.value, config.fields[name]);
                if (error) {
                    errors[name] = error;
                    setFieldError(form, name, error);
                    if (!firstInvalid) firstInvalid = input;
                }
            });

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            const whatsappLink = whatsappUrl(buildWhatsappMessage(form, config));
            showWhatsappLink(form, whatsappLink);
            openWhatsapp(whatsappLink);

            const button = form.querySelector('button[type="submit"]');
            if (button) {
                button.classList.add('is-loading');
                button.disabled = true;
            }

            fetch('api/application.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(buildPayload(form, config))
            })
                .then(function (response) {
                    return response.text().then(function (text) {
                        let data = null;
                        try { data = JSON.parse(text); } catch (err) { /* handled below */ }
                        if (!response.ok || !data) {
                            const error = new Error((data && data.message) || t('status.generic'));
                            error.serverMessage = data && data.message;
                            throw error;
                        }
                        return data;
                    });
                })
                .then(function (data) {
                    form.reset();
                    clearFormErrors(form);
                    const saved = data.message || t(config.successKey);
                    setFormStatus(form, saved + ' ' + t('status.whatsappOpen'), 'success');
                    showToast(saved, 'success');
                })
                .catch(function (error) {
                    const message = error.serverMessage || (error instanceof TypeError ? t('status.network') : t('status.generic'));
                    setFormStatus(form, message, 'error');
                    showToast(message, 'error');
                })
                .finally(function () {
                    if (button) {
                        button.classList.remove('is-loading');
                        button.disabled = false;
                    }
                });
        });
    });

    /* -------------------------------------------------------
       Init
       ------------------------------------------------------- */

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
    translatePage();
    onScroll();
})();
