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
        surah: "Surah Al-Fatiha",
        arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        pronounce: "বিসমিল্লাহির রাহমানির রাহীম",
        meaning: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে"
    },
    {
        surah: "Surah Al-Baqarah - Ayatul Kursi",
        arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
        pronounce: "আল্লাহু লা ইলাহা ইল্লা হুয়াল হাইয়্যুল কাইয়্যুম",
        meaning: "আল্লাহ, তিনি ছাড়া কোনো ইলাহ নেই, তিনি চিরঞ্জীব, সকলের ধারক"
    },
    {
        surah: "Surah Al-Ikhlas",
        arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ",
        pronounce: "কুল হুয়াল্লাহু আহাদ। আল্লাহুস সামাদ",
        meaning: "বলুন, তিনি আল্লাহ, এক। আল্লাহ অমুখাপেক্ষী"
    },
    {
        surah: "Surah Al-Falaq",
        arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ",
        pronounce: "কুল আউযু বিরাব্বিল ফালাক। মিন শাররি মা খালাক",
        meaning: "বলুন, আমি আশ্রয় প্রার্থনা করছি ভোরের রবের কাছে"
    },
    {
        surah: "Surah An-Nas",
        arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝ مَلِكِ ٱلنَّاسِ",
        pronounce: "কুল আউযু বিরাব্বিন নাস। মালিকিন নাস",
        meaning: "বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের রবের কাছে"
    },
    {
        surah: "Surah Ar-Rahman",
        arabic: "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
        pronounce: "ফাবিআই আলাই রাব্বিকুমা তুকাজ্জিবানি",
        meaning: "তোমরা তোমাদের রবের কোন্ অনুগ্রহকে অস্বীকার করবে?"
    },
    {
        surah: "Surah Al-Asr",
        arabic: "وَٱلْعَصْرِ ۝ إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ",
        pronounce: "ওয়াল আসর। ইন্নাল ইনসানা লাফি খুসর",
        meaning: "সময়ের শপথ! নিশ্চয়ই মানুষ ক্ষতিগ্রস্ত"
    },
    {
        surah: "Surah Al-Kafirun",
        arabic: "قُلْ يَٰٓأَيُّهَا ٱلْكَٰفِرُونَ ۝ لَآ أَعْبُدُ مَا تَعْبُدُونَ",
        pronounce: "কুল ইয়া আইয়ুহাল কাফিরুন। লা আবুদু মা তাবুদুন",
        meaning: "বলুন, হে কাফিরেরা! আমি এবাদত করি না তোমরা যার এবাদত কর"
    },
    {
        surah: "Surah Al-Mulk",
        arabic: "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ",
        pronounce: "তাবারাকাল্লাযি বিয়াদিহিল মুলকু ওয়া হুয়া আলা কুল্লি শাইইন কাদির",
        meaning: "ধন্য তিনি, যাঁর হাতে রাজত্ব এবং তিনি সব কিছুর উপর ক্ষমতাবান"
    },
    {
        surah: "Surah Ya-Sin",
        arabic: "سَلَٰمٌ قَوْلًا مِّن رَّبٍ رَّحِيمٍ",
        pronounce: "সালামুন কাওলাম মির রাব্বির রাহিম",
        meaning: "পরম দয়ালু রবের পক্ষ থেকে শান্তির বাণী"
    },
    {
        surah: "Surah Al-Baqarah - Ayat 286",
        arabic: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ",
        pronounce: "রাব্বানা ওয়ালা তুহাম্মিলনা মা লা তাক্বাতা লানা বিহি",
        meaning: "হে আমাদের রব! আমাদের উপর এমন কোনো বোঝা চাপিয়ে দিও না"
    },
    {
        surah: "Surah Al-Hashr",
        arabic: "هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَٰهَ إِلَّا هُوَ ۖ عَٰلِمُ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ",
        pronounce: "হুয়াল্লাহুল্লাযি লা ইলাহা ইল্লা হুয়া আলিমুল গাইবি ওয়াশ শাহাদাহ",
        meaning: "তিনিই আল্লাহ, যিনি ছাড়া কোনো ইলাহ নেই, অদৃশ্য ও দৃশ্যের জ্ঞানী"
    },
    {
        surah: "Surah Al-Imran - Ayat 173",
        arabic: "ٱلَّذِينَ قَالَ لَهُمُ ٱلنَّاسُ إِنَّ ٱلنَّاسَ قَدْ جَمَعُوا۟ لَكُمْ فَٱخْشَوْهُمْ",
        pronounce: "আল্লাযিনা কালা লাহুমুন নাসু ইন্নান নাসা কাদ জামাউ লাকুম ফাখশাউহুম",
        meaning: "যাদেরকে লোকেরা বলেছিল, মানুষ তোমাদের বিরুদ্ধে জমায়েত হয়েছে, তোমরা তাদের ভয় কর"
    },
    {
        surah: "Surah Az-Zumar",
        arabic: "قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
        pronounce: "কুল ইয়া ইবাদিয়াল্লাযিনা আসরাফু আলা আনফুসিহিম লা তাকনাতু মির রাহমাতিল্লাহ",
        meaning: "বলুন, হে আমার বান্দারা! যারা নিজেদের উপর অত্যাচার করেছে, তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না"
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

    quranAudio.src = RADIO_STREAMS[currentStreamIndex];

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

    const enterFullscreen = () => {
        const docEl = document.documentElement;
        const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
        if (requestFS && !document.fullscreenElement) {
            requestFS.call(docEl).catch(err => console.log("Fullscreen error:", err));
        }
    };

    document.addEventListener('click', enterFullscreen);
    document.addEventListener('touchstart', enterFullscreen);

    setTimeout(enterFullscreen, 500);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    await fetchPrayerTimes();

    startClock();

    showAyat(0);
    setInterval(rotateAyat, 30000);

    updateDisplay();
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

        const [resp1, resp2] = await Promise.all([fetch(url), fetch(nextMonthUrl)]);
        const [data1, data2] = await Promise.all([resp1.json(), resp2.json()]);

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
