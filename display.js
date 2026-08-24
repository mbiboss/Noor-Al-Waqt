// ============================================
// NOOR AL-WAQT - DISPLAY MODE
// Professional AMOLED Display with Audio Control
// ============================================

const API_URL = 'https://api.aladhan.com/v1';
const AUDIO_STORAGE_KEY = 'noor_audio_muted';

// Multiple Quran Radio Streams (fallback system)
const RADIO_STREAMS = [
    'https://qurango.net/radio/mix',
    'https://radio.mp3islam.com:8010/radio.mp3',
    'https://radio.mp3islam.com:8020/radio.mp3',
    'https://radio.mp3islam.com:8030/radio.mp3'
];

// Quranic Ayats Collection
const QURANIC_AYATS = [
    {
        surah: "Surah Al-Baqarah - Ayat 152",
        arabic: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ",
        pronounce: "ফাযকুরুনি আযকুরকুম",
        meaning: "তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব"
    },
    {
        surah: "Surah Al-Baqarah - Ayat 186",
        arabic: "فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ",
        pronounce: "ফাইন্নি কারিব। উজিবু দাওয়াতাদ্দায়ি ইযা দা'আনি",
        meaning: "নিশ্চয়ই আমি নিকটবর্তী। কেউ আমাকে ডাকলে আমি তার ডাকে সাড়া দিই"
    },
    {
        surah: "Surah Al-Baqarah - Ayat 216",
        arabic: "وَعَسَىٰٓ أَن تَكْرَهُوا۟ شَيْـًٔا وَهُوَ خَيْرٌۭ لَّكُمْ",
        pronounce: "ওয়া আসা আন তাকরাহু শাইয়ান ওয়া হুয়া খাইরুল্লাকুম",
        meaning: "হতে পারে, তোমরা কোনো বিষয়কে অপছন্দ করছ, অথচ তা তোমাদের জন্য কল্যাণকর"
    },
    {
        surah: "Surah Al-Baqarah - Ayat 286",
        arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
        pronounce: "লা ইউকাল্লিফুল্লাহু নাফসান ইল্লা উসআহা",
        meaning: "আল্লাহ কাউকে তার সাধ্যের বাইরে কোনো বোঝা দেন না"
    },
    {
        surah: "Surah Al-Imran - Ayat 139",
        arabic: "وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ",
        pronounce: "ওয়ালা তাহিনু ওয়ালা তাহযানু ওয়া আনতুমুল আ'লাওনা",
        meaning: "তোমরা দুর্বল হয়ো না এবং দুঃখ করো না"
    },
    {
        surah: "Surah Al-Imran - Ayat 160",
        arabic: "إِن يَنصُرْكُمُ ٱللَّهُ فَلَا غَالِبَ لَكُمْ",
        pronounce: "ইয়ানসুরকুমুল্লাহু ফালা গালিবা লাকুম",
        meaning: "আল্লাহ যদি তোমাদের সাহায্য করেন, তবে কেউ তোমাদের পরাজিত করতে পারবে না"
    },
    {
        surah: "Surah Al-Imran - Ayat 173",
        arabic: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
        pronounce: "হাসবুনাল্লাহু ওয়া নি'মাল ওয়াকিল",
        meaning: "আমাদের জন্য আল্লাহই যথেষ্ট এবং তিনিই সর্বোত্তম কর্মবিধায়ক"
    },
    {
        surah: "Surah An-Nisa - Ayat 147",
        arabic: "مَا يَفْعَلُ ٱللَّهُ بِعَذَابِكُمْ إِن شَكَرْتُمْ وَءَامَنتُمْ",
        pronounce: "মা ইয়াফআলুল্লাহু বিআযাবিকুম ইন শাকারতুম ওয়া আমান্তুম",
        meaning: "তোমরা কৃতজ্ঞ ও বিশ্বাসী হলে আল্লাহ তোমাদের শাস্তি দিয়ে কী করবেন?"
    },
    {
        surah: "Surah Al-An'am - Ayat 17",
        arabic: "وَإِن يَمْسَسْكَ ٱللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُۥٓ إِلَّا هُوَ",
        pronounce: "ওয়া ইয়ামসাসকাল্লাহু বিদুররিন ফালা কাশিফা লাহু ইল্লা হুয়া",
        meaning: "আল্লাহ যদি তোমাকে কোনো কষ্ট দেন, তিনি ছাড়া তা দূর করার কেউ নেই"
    },
    {
        surah: "Surah Al-An'am - Ayat 54",
        arabic: "كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ ٱلرَّحْمَةَ",
        pronounce: "কাতাবা রাব্বুকুম আলা নাফসিহির রাহমাহ",
        meaning: "তোমাদের রব তাঁর নিজের উপর রহমতকে অবধারিত করে নিয়েছেন"
    },
    {
        surah: "Surah Al-A'raf - Ayat 56",
        arabic: "إِنَّ رَحْمَتَ ٱللَّهِ قَرِيبٌۭ مِّنَ ٱلْمُحْسِنِينَ",
        pronounce: "ইন্না রাহমাতাল্লাহি কারিবুম মিনাল মুহসিনিন",
        meaning: "নিশ্চয়ই আল্লাহর রহমত সৎকর্মশীলদের নিকটবর্তী"
    },
    {
        surah: "Surah At-Tawbah - Ayat 40",
        arabic: "لَا تَحْزَنْ إِنَّ ٱللَّهَ مَعَنَا",
        pronounce: "লা তাহযান ইন্নাল্লাহা মা'আনা",
        meaning: "দুঃখ করো না, নিশ্চয়ই আল্লাহ আমাদের সাথে আছেন"
    },
    {
        surah: "Surah Yunus - Ayat 57",
        arabic: "وَشِفَآءٌۭ لِّمَا فِى ٱلصُّدُورِ",
        pronounce: "ওয়া শিফাউন লিমা ফিস সুদুর",
        meaning: "আর অন্তরে যা আছে তার জন্য রয়েছে আরোগ্য"
    },
    {
        surah: "Surah Hud - Ayat 6",
        arabic: "وَمَا مِن دَآبَّةٍۢ فِى ٱلْأَرْضِ إِلَّا عَلَى ٱللَّهِ رِزْقُهَا",
        pronounce: "ওয়া মা মিন দাব্বাতিন ফিল আরদি ইল্লা আলাল্লাহি রিযকুহা",
        meaning: "পৃথিবীতে এমন কোনো প্রাণী নেই যার রিযিকের দায়িত্ব আল্লাহর উপর নয়"
    },
    {
        surah: "Surah Yusuf - Ayat 64",
        arabic: "فَٱللَّهُ خَيْرٌ حَٰفِظًۭا وَهُوَ أَرْحَمُ ٱلرَّٰحِمِينَ",
        pronounce: "ফাল্লাহু খাইরুন হাফিযান ওয়া হুয়া আরহামুর রাহিমিন",
        meaning: "আল্লাহই সর্বোত্তম রক্ষক এবং তিনি সর্বাধিক দয়ালু"
    },
    {
        surah: "Surah Yusuf - Ayat 87",
        arabic: "لَا تَا۟يْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ",
        pronounce: "লা তাইয়াসু মির রাওহিল্লাহ",
        meaning: "তোমরা আল্লাহর রহমত ও সাহায্য থেকে নিরাশ হয়ো না"
    },
    {
        surah: "Surah Yusuf - Ayat 90",
        arabic: "إِنَّهُۥ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ",
        pronounce: "ইন্নাহু মাই ইয়াত্তাকি ওয়া ইয়াসবির ফাইন্নাল্লাহা লা ইউদিইউ আজরাল মুহসিনিন",
        meaning: "যে তাকওয়া অবলম্বন করে এবং ধৈর্য ধরে, আল্লাহ তার সৎকর্মের প্রতিদান নষ্ট করেন না"
    },
    {
        surah: "Surah Ar-Ra'd - Ayat 11",
        arabic: "إِنَّ ٱللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا۟ مَا بِأَنفُسِهِمْ",
        pronounce: "ইন্নাল্লাহা লা ইউগাইয়িরু মা বিকাওমিন হাত্তা ইউগাইয়িরু মা বিআনফুসিহিম",
        meaning: "আল্লাহ কোনো জাতির অবস্থা পরিবর্তন করেন না, যতক্ষণ না তারা নিজেদের পরিবর্তন করে"
    },
    {
        surah: "Surah Ar-Ra'd - Ayat 28",
        arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
        pronounce: "আলা বিযিকরিল্লাহি তাতমাইন্নুল কুলুব",
        meaning: "জেনে রাখো, আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়"
    },
    {
        surah: "Surah Ibrahim - Ayat 7",
        arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
        pronounce: "লাইইন শাকারতুম লাআযিদান্নাকুম",
        meaning: "তোমরা কৃতজ্ঞ হলে আমি অবশ্যই তোমাদের আরও বৃদ্ধি করে দেব"
    },
    {
        surah: "Surah Al-Hijr - Ayat 56",
        arabic: "وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِۦٓ إِلَّا ٱلضَّآلُّونَ",
        pronounce: "ওয়া মাই ইয়াকনাতু মির রাহমাতি রাব্বিহি ইল্লাদ্দল্লুন",
        meaning: "পথভ্রষ্টরা ছাড়া কে তার রবের রহমত থেকে নিরাশ হয়?"
    },
    {
        surah: "Surah Al-Isra - Ayat 70",
        arabic: "وَلَقَدْ كَرَّمْنَا بَنِىٓ ءَادَمَ",
        pronounce: "ওয়ালাকাদ কাররামনা বানি আদাম",
        meaning: "নিশ্চয়ই আমি আদমসন্তানকে মর্যাদা দান করেছি"
    },
    {
        surah: "Surah Maryam - Ayat 4",
        arabic: "وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّۭا",
        pronounce: "ওয়ালাম আকুম বিদুআইকা রাব্বি শাকিয়্যা",
        meaning: "হে আমার রব! আপনার কাছে দোয়া করে আমি কখনো ব্যর্থ হইনি"
    },
    {
        surah: "Surah Maryam - Ayat 76",
        arabic: "وَيَزِيدُ ٱللَّهُ ٱلَّذِينَ ٱهْتَدَوْا۟ هُدًۭى",
        pronounce: "ওয়া ইয়াযিদুল্লাহুল্লাযিনাহতাদাও হুদা",
        meaning: "যারা সৎপথে রয়েছে, আল্লাহ তাদের হিদায়াত আরও বৃদ্ধি করেন"
    },
    {
        surah: "Surah Ta-Ha - Ayat 46",
        arabic: "لَا تَخَافَآ إِنَّنِى مَعَكُمَآ أَسْمَعُ وَأَرَىٰ",
        pronounce: "লা তাখাফা ইন্নানি মা'আকুমা আসমাউ ওয়া আরা",
        meaning: "ভয় করো না, নিশ্চয়ই আমি তোমাদের সাথে আছি; আমি শুনি এবং দেখি"
    },
    {
        surah: "Surah Ta-Ha - Ayat 114",
        arabic: "وَقُل رَّبِّ زِدْنِى عِلْمًۭا",
        pronounce: "ওয়া কুল রাব্বি যিদনি ইলমা",
        meaning: "আর বলো, হে আমার রব! আমার জ্ঞান বৃদ্ধি করুন"
    },
    {
        surah: "Surah Al-Anbiya - Ayat 35",
        arabic: "كُلُّ نَفْسٍۢ ذَآئِقَةُ ٱلْمَوْتِ",
        pronounce: "কুল্লু নাফসিন যাইকাতুল মাওত",
        meaning: "প্রত্যেক প্রাণীকেই মৃত্যুর স্বাদ গ্রহণ করতে হবে"
    },
    {
        surah: "Surah Al-Anbiya - Ayat 87",
        arabic: "لَّآ إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّٰلِمِينَ",
        pronounce: "লা ইলাহা ইল্লা আন্তা সুবহানাকা ইন্নি কুনতু মিনাজ্জালিমিন",
        meaning: "আপনি ছাড়া কোনো ইলাহ নেই। আপনি পবিত্র। নিশ্চয়ই আমি ভুলকারীদের অন্তর্ভুক্ত ছিলাম"
    },
    {
        surah: "Surah Al-Anbiya - Ayat 89",
        arabic: "رَبِّ لَا تَذَرْنِى فَرْدًۭا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ",
        pronounce: "রাব্বি লা তাযারনি ফারদান ওয়া আন্তা খাইরুল ওয়ারিসিন",
        meaning: "হে আমার রব! আমাকে একা রেখো না, আপনিই সর্বোত্তম উত্তরাধিকারী"
    },
    {
        surah: "Surah Al-Hajj - Ayat 78",
        arabic: "وَمَا جَعَلَ عَلَيْكُمْ فِى ٱلدِّينِ مِنْ حَرَجٍۢ",
        pronounce: "ওয়া মা জা'আলা আলাইকুম ফিদ্দিনি মিন হারাজ",
        meaning: "তিনি দ্বীনের ব্যাপারে তোমাদের উপর কোনো কঠোরতা আরোপ করেননি"
    },
    {
        surah: "Surah Al-Mu'minun - Ayat 60",
        arabic: "وَٱلَّذِينَ يُؤْتُونَ مَآ ءَاتَوا۟ وَّقُلُوبُهُمْ وَجِلَةٌ",
        pronounce: "ওয়াল্লাযিনা ইউতুনা মা আতাও ওয়া কুলুবুহুম ওয়াজিলাহ",
        meaning: "যারা দান করে, অথচ তাদের অন্তর ভয়ে কাঁপতে থাকে"
    },
    {
        surah: "Surah Al-Furqan - Ayat 70",
        arabic: "فَأُو۟لَٰٓئِكَ يُبَدِّلُ ٱللَّهُ سَيِّـَٔاتِهِمْ حَسَنَٰتٍۢ",
        pronounce: "ফাউলাইকা ইউবাদ্দিলুল্লাহু সাইয়িআতিহিম হাসানাত",
        meaning: "আল্লাহ তাদের পাপগুলোকে নেকিতে পরিবর্তন করে দেবেন"
    },
    {
        surah: "Surah Ash-Shu'ara - Ayat 80",
        arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
        pronounce: "ওয়া ইযা মারিদতু ফাহুয়া ইয়াশফিন",
        meaning: "আমি অসুস্থ হলে তিনিই আমাকে সুস্থ করেন"
    },
    {
        surah: "Surah Al-Qasas - Ayat 24",
        arabic: "رَبِّ إِنِّى لِمَآ أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍۢ فَقِيرٌۭ",
        pronounce: "রাব্বি ইন্নি লিমা আনযালতা ইলাইয়া মিন খাইরিন ফাকির",
        meaning: "হে আমার রব! আপনি আমার জন্য যে কল্যাণ পাঠাবেন, আমি তার মুখাপেক্ষী"
    },
    {
        surah: "Surah Al-Ankabut - Ayat 2",
        arabic: "أَحَسِبَ ٱلنَّاسُ أَن يُتْرَكُوٓا۟ أَن يَقُولُوٓا۟ ءَامَنَّا وَهُمْ لَا يُفْتَنُونَ",
        pronounce: "আহাসিবান্নাসু আই ইউতরাকু আই ইয়াকুলু আমান্না ওয়া হুম লা ইউফতানুন",
        meaning: "মানুষ কি মনে করে যে, শুধু আমরা ঈমান এনেছি বললেই তাদের পরীক্ষা করা হবে না?"
    },
    {
        surah: "Surah Al-Ankabut - Ayat 56",
        arabic: "يَٰعِبَادِىَ ٱلَّذِينَ ءَامَنُوٓا۟ إِنَّ أَرْضِى وَٰسِعَةٌۭ",
        pronounce: "ইয়া ইবাদিয়াল্লাযিনা আমানু ইন্না আরদি ওয়াসিয়াহ",
        meaning: "হে আমার ঈমানদার বান্দারা! নিশ্চয়ই আমার পৃথিবী প্রশস্ত"
    },
    {
        surah: "Surah Al-Ankabut - Ayat 69",
        arabic: "وَٱلَّذِينَ جَٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
        pronounce: "ওয়াল্লাযিনা জাহাদু ফিনা লানাহদিয়ান্নাহুম সুবুলানা",
        meaning: "যারা আমার পথে চেষ্টা করে, আমি অবশ্যই তাদের আমার পথ দেখাব"
    },
    {
        surah: "Surah Ar-Rum - Ayat 60",
        arabic: "فَٱصْبِرْ إِنَّ وَعْدَ ٱللَّهِ حَقٌّۭ",
        pronounce: "ফাসবির ইন্না ওয়াদাল্লাহি হাক্ক",
        meaning: "ধৈর্য ধরো, নিশ্চয়ই আল্লাহর প্রতিশ্রুতি সত্য"
    },
    {
        surah: "Surah Luqman - Ayat 22",
        arabic: "وَمَن يُسْلِمْ وَجْهَهُۥٓ إِلَى ٱللَّهِ وَهُوَ مُحْسِنٌۭ",
        pronounce: "ওয়া মাই ইউসলিম ওয়াজহাহু ইলাল্লাহি ওয়া হুয়া মুহসিন",
        meaning: "যে নিজেকে আল্লাহর কাছে সমর্পণ করে এবং সৎকর্মশীল হয়"
    },
    {
        surah: "Surah Al-Ahzab - Ayat 3",
        arabic: "وَتَوَكَّلْ عَلَى ٱللَّهِ ۚ وَكَفَىٰ بِٱللَّهِ وَكِيلًۭا",
        pronounce: "ওয়া তাওয়াক্কাল আলাল্লাহি ওয়া কাফা বিল্লাহি ওয়াকিলা",
        meaning: "আল্লাহর উপর ভরসা করো, কর্মবিধায়ক হিসেবে আল্লাহই যথেষ্ট"
    },
    {
        surah: "Surah Al-Ahzab - Ayat 41",
        arabic: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱذْكُرُوا۟ ٱللَّهَ ذِكْرًۭا كَثِيرًۭا",
        pronounce: "ইয়া আইয়ুহাল্লাযিনা আমানুযকুরুল্লাহা যিকরান কাছিরা",
        meaning: "হে ঈমানদারগণ! তোমরা আল্লাহকে অধিক পরিমাণে স্মরণ করো"
    },
    {
        surah: "Surah Az-Zumar - Ayat 10",
        arabic: "إِنَّمَا يُوَفَّى ٱلصَّٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍۢ",
        pronounce: "ইন্নামা ইউওয়াফফাস সাবিরুনা আজরাহুম বিগাইরি হিসাব",
        meaning: "ধৈর্যশীলদের প্রতিদান হিসাব ছাড়াই পূর্ণভাবে দেওয়া হবে"
    },
    {
        surah: "Surah Az-Zumar - Ayat 53",
        arabic: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
        pronounce: "লা তাকনাতু মির রাহমাতিল্লাহ",
        meaning: "তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না"
    },
    {
        surah: "Surah Ghafir - Ayat 60",
        arabic: "ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ",
        pronounce: "উদউনি আসতাজিব লাকুম",
        meaning: "তোমরা আমাকে ডাকো, আমি তোমাদের ডাকে সাড়া দেব"
    },
    {
        surah: "Surah Fussilat - Ayat 30",
        arabic: "أَلَّا تَخَافُوا۟ وَلَا تَحْزَنُوا۟",
        pronounce: "আল্লা তাখাফু ওয়ালা তাহযানু",
        meaning: "তোমরা ভয় করো না এবং দুঃখও করো না"
    },
    {
        surah: "Surah Ash-Shura - Ayat 43",
        arabic: "وَلَمَن صَبَرَ وَغَفَرَ إِنَّ ذَٰلِكَ لَمِنْ عَزْمِ ٱلْأُمُورِ",
        pronounce: "ওয়ালামান সাবারা ওয়া গাফারা ইন্না যালিকা লামিন আযমিল উমুর",
        meaning: "যে ধৈর্য ধরে এবং ক্ষমা করে, নিশ্চয়ই এটি দৃঢ়সংকল্পের কাজ"
    },
    {
        surah: "Surah Ad-Dukhan - Ayat 59",
        arabic: "فَٱرْتَقِبْ إِنَّهُم مُّرْتَقِبُونَ",
        pronounce: "ফারতাকিব ইন্নাহুম মুরতাকিবুন",
        meaning: "তুমি অপেক্ষা করো, তারাও অপেক্ষা করছে"
    },
    {
        surah: "Surah Al-Qamar - Ayat 17",
        arabic: "وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍۢ",
        pronounce: "ওয়ালাকাদ ইয়াসসারনাল কুরআনা লিযযিকরি ফাহাল মিন মুদ্দাকির",
        meaning: "আমি অবশ্যই কুরআনকে উপদেশ গ্রহণের জন্য সহজ করেছি, অতএব উপদেশ গ্রহণকারী কেউ আছে কি?"
    },
    {
        surah: "Surah Ar-Rahman - Ayat 13",
        arabic: "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
        pronounce: "ফাবিআইয়ি আলা-ই রাব্বিকুমা তুকাযযিবান",
        meaning: "তোমরা তোমাদের রবের কোন কোন অনুগ্রহকে অস্বীকার করবে?"
    },
    {
        surah: "Surah Al-Hadid - Ayat 4",
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        pronounce: "ওয়া হুয়া মা'আকুম আইনা মা কুনতুম",
        meaning: "তোমরা যেখানেই থাকো, তিনি তোমাদের সাথেই আছেন"
    },
    {
        surah: "Surah Al-Hashr - Ayat 18",
        arabic: "وَلْتَنظُرْ نَفْسٌۭ مَّا قَدَّمَتْ لِغَدٍۢ",
        pronounce: "ওয়ালতানযুর নাফসুম মা কাদ্দামাত লিগাদ",
        meaning: "প্রত্যেক মানুষের উচিত সে আগামী দিনের জন্য কী পাঠিয়েছে তা চিন্তা করা"
    },
    {
        surah: "Surah Al-Mumtahanah - Ayat 4",
        arabic: "عَلَيْهِ تَوَكَّلْنَا وَإِلَيْهِ أَنَبْنَا",
        pronounce: "আলাইহি তাওয়াক্কালনা ওয়া ইলাইহি আনাবনা",
        meaning: "আমরা তাঁরই উপর ভরসা করেছি এবং তাঁরই দিকে ফিরে এসেছি"
    },
    {
        surah: "Surah At-Taghabun - Ayat 11",
        arabic: "وَمَن يُؤْمِنۢ بِٱللَّهِ يَهْدِ قَلْبَهُۥ",
        pronounce: "ওয়া মাই ইউমিন বিল্লাহি ইয়াহদি কালবাহ",
        meaning: "যে আল্লাহর প্রতি ঈমান আনে, তিনি তার অন্তরকে সৎপথে পরিচালিত করেন"
    },
    {
        surah: "Surah At-Talaq - Ayat 2",
        arabic: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا",
        pronounce: "ওয়া মাই ইয়াত্তাকিল্লাহা ইয়াজআল্লাহু মাখরাজা",
        meaning: "যে আল্লাহকে ভয় করে, আল্লাহ তার জন্য উত্তরণের পথ তৈরি করে দেন"
    },
    {
        surah: "Surah At-Talaq - Ayat 3",
        arabic: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ",
        pronounce: "ওয়া মাই ইয়াতাওয়াক্কাল আলাল্লাহি ফাহুয়া হাসবুহ",
        meaning: "যে আল্লাহর উপর ভরসা করে, আল্লাহই তার জন্য যথেষ্ট"
    },
    {
        surah: "Surah Al-Mulk - Ayat 2",
        arabic: "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ",
        pronounce: "আল্লাযি খালাকাল মাওতা ওয়াল হায়াতা লিয়াবলুওয়াকুম",
        meaning: "তিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করার জন্য"
    },
    {
        surah: "Surah Al-Qalam - Ayat 48",
        arabic: "فَٱصْبِرْ لِحُكْمِ رَبِّكَ",
        pronounce: "ফাসবির লিহুকমি রাব্বিকা",
        meaning: "তোমার রবের ফয়সালার জন্য ধৈর্য ধরো"
    },
    {
        surah: "Surah Al-Fajr - Ayat 27-28",
        arabic: "يَٰٓأَيَّتُهَا ٱلنَّفْسُ ٱلْمُطْمَئِنَّةُ ۝ ٱرْجِعِىٓ إِلَىٰ رَبِّكِ رَاضِيَةًۭ مَّرْضِيَّةًۭ",
        pronounce: "ইয়া আইয়াতুহান নাফসুল মুতমাইন্নাহ। ইরজিঈ ইলা রাব্বিকি রাদিয়াতাম মারদিয়্যাহ",
        meaning: "হে প্রশান্ত আত্মা! তুমি তোমার রবের দিকে ফিরে এসো, তুমি সন্তুষ্ট এবং তিনি তোমার প্রতি সন্তুষ্ট"
    },
    {
        surah: "Surah Ash-Shams - Ayat 9",
        arabic: "قَدْ أَفْلَحَ مَن زَكَّىٰهَا",
        pronounce: "কাদ আফলাহা মান যাক্কাহা",
        meaning: "সফল হয়েছে সে, যে নিজের আত্মাকে পরিশুদ্ধ করেছে"
    },
    {
        surah: "Surah Ash-Sharh - Ayat 5-6",
        arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
        pronounce: "ফাইন্না মা'আল উসরি ইউসরা। ইন্না মা'আল উসরি ইউসরা",
        meaning: "নিশ্চয়ই কষ্টের সাথেই আছে স্বস্তি। নিশ্চয়ই কষ্টের সাথেই আছে স্বস্তি"
    },
    {
        surah: "Surah Ad-Duha - Ayat 3",
        arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
        pronounce: "মা ওয়াদ্দা'আকা রাব্বুকা ওয়া মা কালা",
        meaning: "তোমার রব তোমাকে ত্যাগ করেননি এবং তোমার প্রতি বিরূপও হননি"
    },
    {
        surah: "Surah Ad-Duha - Ayat 5",
        arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
        pronounce: "ওয়ালাসাওফা ইউ'তিক রাব্বুকা ফাতারদা",
        meaning: "তোমার রব অবশ্যই তোমাকে এত দান করবেন যে তুমি সন্তুষ্ট হয়ে যাবে"
    },
    {
        surah: "Surah Ad-Duha - Ayat 7",
        arabic: "وَوَجَدَكَ ضَآلًّۭا فَهَدَىٰ",
        pronounce: "ওয়া ওয়াজাদাকা দাল্লান ফাহাদা",
        meaning: "তিনি তোমাকে পথের সন্ধান দিয়ে সৎপথে পরিচালিত করেছেন"
    },
    {
        surah: "Surah Ad-Duha - Ayat 11",
        arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
        pronounce: "ওয়া আম্মা বিনি'মাতি রাব্বিকা ফাহাদ্দিস",
        meaning: "আর তোমার রবের অনুগ্রহের কথা প্রকাশ করো"
    },
    {
        surah: "Surah At-Tin - Ayat 4",
        arabic: "لَقَدْ خَلَقْنَا ٱلْإِنسَٰنَ فِىٓ أَحْسَنِ تَقْوِيمٍۢ",
        pronounce: "লাকাদ খালাকনাল ইনসানা ফি আহসানি তাকউইম",
        meaning: "নিশ্চয়ই আমি মানুষকে সর্বোত্তম গঠনে সৃষ্টি করেছি"
    },
    {
        surah: "Surah Al-Inshiqaq - Ayat 6",
        arabic: "إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًۭا فَمُلَٰقِيهِ",
        pronounce: "ইন্নাকা কাদিহুন ইলা রাব্বিকা কাদহান ফামুলাকিহ",
        meaning: "হে মানুষ! তুমি তোমার রবের দিকে কঠোর পরিশ্রম করে এগিয়ে যাচ্ছ, অতঃপর অবশ্যই তাঁর সাক্ষাৎ লাভ করবে"
    }
];

// State
let state = {
    city: localStorage.getItem('noor_city') || 'Dhaka',
    country: 'Bangladesh',
    bangladeshAdjustment: localStorage.getItem('noor_bd_adj') !== 'false',
    prayerData: null,
    currentAyatIndex: 0,
    nextPrayer: null
};

// Audio State
let quranAudio = null;
let isAudioMuted = true;
let currentStreamIndex = 0;

// Wake Lock
let wakeLock = null;

// DOM Elements
const elements = {
    locationText: document.getElementById('location-text'),
    islamicDate: document.getElementById('islamic-date'),
    mainTime: document.getElementById('main-time'),
    mainSeconds: document.getElementById('main-seconds'),
    mainAmpm: document.getElementById('main-ampm'),
    gregorianDate: document.getElementById('gregorian-date'),
    prayerSection: document.getElementById('prayer-section'),
    prayerName: document.getElementById('prayer-name'),
    prayerTime: document.getElementById('prayer-time'),
    countH: document.getElementById('count-h'),
    countM: document.getElementById('count-m'),
    countS: document.getElementById('count-s'),
    sunriseSection: document.getElementById('sunrise-section'),
    sunriseTime: document.getElementById('sunrise-time'),
    surahName: document.getElementById('surah-name'),
    ayatArabic: document.getElementById('ayat-arabic'),
    ayatPronounce: document.getElementById('ayat-pronounce'),
    ayatMeaning: document.getElementById('ayat-meaning'),
    exitBtn: document.getElementById('exit-btn'),
    muteBtn: document.getElementById('mute-btn'),
    muteIcon: document.getElementById('mute-icon-display'),
    unmuteIcon: document.getElementById('unmute-icon-display')
};

// ============================================
// AUDIO SYSTEM WITH FALLBACKS
// ============================================
function initAudio() {
    const savedMuteState = localStorage.getItem(AUDIO_STORAGE_KEY);
    isAudioMuted = savedMuteState !== 'false';
    currentStreamIndex = 0;

    createAudioElement();
    updateAudioUI();

    if (elements.muteBtn) {
        elements.muteBtn.addEventListener('click', toggleAudio);
    }

    window.addEventListener('storage', (e) => {
        if (e.key === AUDIO_STORAGE_KEY) {
            const newMutedState = e.newValue !== 'false';
            if (newMutedState !== isAudioMuted) {
                isAudioMuted = newMutedState;
                updateAudioPlayback();
                updateAudioUI();
            }
        }
    });
}

function createAudioElement() {
    if (quranAudio) {
        quranAudio.pause();
        quranAudio = null;
    }

    quranAudio = new Audio();
    quranAudio.crossOrigin = "anonymous";
    quranAudio.loop = true;
    quranAudio.volume = 0.7;
    quranAudio.preload = 'none';

    quranAudio.addEventListener('error', (e) => {
        console.error('Audio error on stream', currentStreamIndex, e);
        tryNextStream();
    });

    quranAudio.addEventListener('stalled', () => {
        console.log('Audio stalled, attempting to recover...');
        if (!isAudioMuted) {
            quranAudio.load();
            quranAudio.play().catch(() => {
                tryNextStream();
            });
        }
    });

    quranAudio.addEventListener('waiting', () => {
        console.log('Audio buffering...');
    });

    quranAudio.addEventListener('canplay', () => {
        console.log('Audio can play now');
    });
}

function tryNextStream() {
    currentStreamIndex++;
    if (currentStreamIndex >= RADIO_STREAMS.length) {
        currentStreamIndex = 0;
        console.error('All streams failed');
        isAudioMuted = true;
        updateAudioUI();
        return;
    }

    console.log('Trying next stream:', currentStreamIndex);
    quranAudio.src = RADIO_STREAMS[currentStreamIndex];
    quranAudio.load();

    if (!isAudioMuted) {
        quranAudio.play().catch(() => {
            tryNextStream();
        });
    }
}

function toggleAudio() {
    isAudioMuted = !isAudioMuted;
    localStorage.setItem(AUDIO_STORAGE_KEY, isAudioMuted.toString());
    updateAudioPlayback();
    updateAudioUI();
}

function updateAudioPlayback() {
    if (!quranAudio) return;

    if (isAudioMuted) {
        quranAudio.pause();
    } else {
        if (!quranAudio.src) quranAudio.src = RADIO_STREAMS[currentStreamIndex];
        quranAudio.load();
        const playPromise = quranAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Playback failed:", error);
                tryNextStream();
            });
        }
    }
}

function updateAudioUI() {
    if (!elements.muteIcon || !elements.unmuteIcon || !elements.muteBtn) return;

    if (isAudioMuted) {
        elements.muteIcon.classList.remove('hidden');
        elements.unmuteIcon.classList.add('hidden');
        elements.muteBtn.classList.remove('active');
        elements.muteBtn.setAttribute('aria-label', 'Unmute Quran Radio');
    } else {
        elements.muteIcon.classList.add('hidden');
        elements.unmuteIcon.classList.remove('hidden');
        elements.muteBtn.classList.add('active');
        elements.muteBtn.setAttribute('aria-label', 'Mute Quran Radio');
    }
}

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    await requestWakeLock();
    initAudio();

    elements.exitBtn.addEventListener('click', exitDisplayMode);

    const prevAyatBtn = document.getElementById('prev-ayat');
    const nextAyatBtn = document.getElementById('next-ayat');

    if (prevAyatBtn) {
        prevAyatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.currentAyatIndex = (state.currentAyatIndex - 1 + QURANIC_AYATS.length) % QURANIC_AYATS.length;
            showAyat(state.currentAyatIndex);
        });
    }

    if (nextAyatBtn) {
        nextAyatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            rotateAyat();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && prevAyatBtn) prevAyatBtn.click();
        if (event.key === 'ArrowRight' && nextAyatBtn) nextAyatBtn.click();
        if (event.key === 'Escape' && !document.fullscreenElement) exitDisplayMode();
    });

    initFullscreenToggle();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    await fetchPrayerTimes();

    startClock();

    showAyat(0);
    setInterval(rotateAyat, 30000);

    updateDisplay();
}

function initFullscreenToggle() {
    const button = document.getElementById('fullscreen-toggle-btn');
    const enterIcon = document.getElementById('fullscreen-enter-icon');
    const exitIcon = document.getElementById('fullscreen-exit-icon');
    if (!button) return;

    const updateFullscreenUI = () => {
        const isFullscreen = Boolean(document.fullscreenElement);
        button.setAttribute('aria-label', isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen');
        button.title = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';
        if (enterIcon) enterIcon.classList.toggle('hidden', isFullscreen);
        if (exitIcon) exitIcon.classList.toggle('hidden', !isFullscreen);
    };

    button.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {});
                }
            }).catch(() => {});
        }
    });
    document.addEventListener('fullscreenchange', updateFullscreenUI);
    updateFullscreenUI();
}

// ============================================
// WAKE LOCK
// ============================================
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock acquired');

            document.addEventListener('visibilitychange', async () => {
                if (wakeLock !== null && document.visibilityState === 'visible') {
                    wakeLock = await navigator.wakeLock.request('screen');
                }
            });
        }
    } catch (err) {
        console.log('Wake Lock error:', err.name, err.message);
    }
}

async function releaseWakeLock() {
    if (wakeLock) {
        try {
            await wakeLock.release();
            wakeLock = null;
        } catch (err) {
            console.error('Release Wake Lock error:', err);
        }
    }
}

async function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && 'wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.error('Failed to re-acquire wake lock:', err);
        }
    }
}

// ============================================
// EXIT DISPLAY MODE
// ============================================
function exitDisplayMode() {
    releaseWakeLock();
    if (window.parent !== window) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        window.parent.postMessage({ type: 'noor-exit-display' }, window.location.origin);
        return;
    }
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
    window.location.href = 'index.html';
}

// ============================================
// CLOCK
// ============================================
function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    elements.mainTime.textContent = `${hours.toString().padStart(2, '0')}:${minutes}`;
    elements.mainSeconds.textContent = seconds;
    elements.mainAmpm.textContent = ampm;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    elements.gregorianDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    updatePrayerInfo();
}

// ============================================
// PRAYER TIMES
// ============================================
async function fetchPrayerTimes() {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const url = `${API_URL}/calendarByCity/${year}/${month}?city=${state.city}&country=${state.country}&method=1&school=1`;
        const nextMonthUrl = `${API_URL}/calendarByCity/${year}/${month + 1}?city=${state.city}&country=${state.country}&method=1&school=1`;

        const fetchJson = async (requestUrl) => {
            for (let attempt = 0; attempt < 3; attempt++) {
                const response = await fetch(requestUrl);
                if (response.ok) return response.json();
                if (response.status < 500 || attempt === 2) {
                    throw new Error(`Prayer API returned HTTP ${response.status}`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        };

        const fetchDaily = async (requestUrl) => {
            try {
                return await fetchJson(requestUrl);
            } catch (monthlyError) {
                const dateString = `${new Date().getDate().toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
                const dailyUrl = `${API_URL}/timingsByCity/${dateString}?city=${encodeURIComponent(state.city)}&country=${encodeURIComponent(state.country)}&method=1&school=1`;
                const response = await fetchJson(dailyUrl);
                if (response.code === 200) return { code: 200, data: [response.data] };
                throw monthlyError;
            }
        };

        const [data1, data2] = await Promise.all([
            fetchDaily(url),
            fetchJson(nextMonthUrl).catch(() => ({ code: 500, data: [] }))
        ]);

        if (data1.code === 200) {
            let combinedData = [...data1.data];
            if (data2.code === 200) combinedData = [...combinedData, ...data2.data];
            state.prayerData = combinedData;
            updateDisplay();
        }
    } catch (error) {
        console.error('Failed to fetch prayer times:', error);
    }
}

function getTodayData() {
    if (!state.prayerData) return null;
    const now = new Date();
    return state.prayerData.find(d => 
        parseInt(d.date.gregorian.day) === now.getDate() && 
        d.date.gregorian.month.number === (now.getMonth() + 1)
    );
}

function updateDisplay() {
    const today = getTodayData();
    if (!today) return;

    elements.locationText.textContent = `${state.city}, Bangladesh`;

    let hijriDay = parseInt(today.date.hijri.day);
    if (state.bangladeshAdjustment) hijriDay -= 1;
    let displayMonth = today.date.hijri.month.en;
    if (hijriDay <= 0) {
        hijriDay = 30;
        displayMonth = "Sha'ban";
    }
    elements.islamicDate.textContent = `${hijriDay} ${displayMonth} ${today.date.hijri.year}`;
}

function updatePrayerInfo() {
    const today = getTodayData();
    if (!today) return;

    const now = new Date();
    const timings = today.timings;

    const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Sunrise', time: timings.Sunrise },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha }
    ];

    let next = null;
    let minDiff = Infinity;

    for (let p of prayers) {
        const pDate = new Date();
        const cleanTime = p.time.split(' ')[0];
        const [h, m] = cleanTime.split(':');
        pDate.setHours(parseInt(h), parseInt(m), 0, 0);

        if (pDate < now) {
            pDate.setDate(pDate.getDate() + 1);
        }

        const diff = pDate - now;
        if (diff < minDiff) {
            minDiff = diff;
            next = { ...p, diff };
        }
    }

    state.nextPrayer = next;

    if (next && next.name === 'Sunrise') {
        elements.prayerSection.classList.add('hidden');
        elements.sunriseSection.classList.remove('hidden');
        elements.sunriseTime.textContent = formatTime(next.time);
    } else {
        elements.prayerSection.classList.remove('hidden');
        elements.sunriseSection.classList.add('hidden');

        if (next) {
            elements.prayerName.textContent = next.name;
            elements.prayerTime.textContent = formatTime(next.time);

            const h = Math.floor(next.diff / (1000 * 60 * 60));
            const m = Math.floor((next.diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((next.diff % (1000 * 60)) / 1000);

            elements.countH.textContent = h.toString().padStart(2, '0');
            elements.countM.textContent = m.toString().padStart(2, '0');
            elements.countS.textContent = s.toString().padStart(2, '0');
        }
    }
}

function formatTime(timeStr) {
    if (!timeStr) return '--:--';
    const cleanTime = timeStr.split(' ')[0];
    const [h, m] = cleanTime.split(':');
    let hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${m} ${ampm}`;
}

// ============================================
// AYAT ROTATION
// ============================================
function showAyat(index) {
    const ayat = QURANIC_AYATS[index];

    elements.ayatArabic.style.opacity = '0';
    elements.ayatPronounce.style.opacity = '0';
    elements.ayatMeaning.style.opacity = '0';

    setTimeout(() => {
        elements.surahName.textContent = ayat.surah;
        elements.ayatArabic.textContent = ayat.arabic;
        elements.ayatPronounce.textContent = ayat.pronounce;
        elements.ayatMeaning.textContent = ayat.meaning;

        elements.ayatArabic.style.opacity = '1';
        elements.ayatPronounce.style.opacity = '1';
        elements.ayatMeaning.style.opacity = '1';
    }, 300);
}

function rotateAyat() {
    state.currentAyatIndex = (state.currentAyatIndex + 1) % QURANIC_AYATS.length;
    showAyat(state.currentAyatIndex);
}

// ============================================
// START
// ============================================
window.addEventListener('DOMContentLoaded', init);
