// Constants
const API_URL = 'https://api.aladhan.com/v1';
const AUDIO_STORAGE_KEY = 'noor_audio_muted';

// Multiple Quran Radio Streams (fallback system)
const RADIO_STREAMS = [
    'https://qurango.net/radio/mix',
    'https://radio.mp3islam.com:8010/radio.mp3',
    'https://radio.mp3islam.com:8020/radio.mp3',
    'https://radio.mp3islam.com:8030/radio.mp3'
];

// Islamic Quotes
const QUOTES = [
    { ar: "لَا تَقْنَطُوا مِن رَّحْمَةِ ٱللَّهِ", bn: "আল্লাহর রহমত থেকে নিরাশ হয়ো না।" },
    { ar: "إِنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ", bn: "নিশ্চয়ই আল্লাহ ক্ষমাশীল, পরম দয়ালু।" },
    { ar: "ٱسْتَعِينُوا بِٱلصَّبْرِ وَٱلصَّلَاةِ", bn: "ধৈর্য ও নামাজের মাধ্যমে সাহায্য চাও।" },
    { ar: "إِنَّ مَعَ ٱلصَّبْرِ نَصْرًا", bn: "নিশ্চয়ই ধৈর্যের সাথে রয়েছে সাহায্য।" },
    { ar: "وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", bn: "তিনি সব কিছুর উপর ক্ষমতাবান।" },
    { ar: "وَٱللَّهُ خَيْرُ ٱلرَّازِقِينَ", bn: "আল্লাহই সর্বোত্তম রিযিকদাতা।" },
    { ar: "إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُحْسِنِينَ", bn: "নিশ্চয়ই আল্লাহ সৎকর্মশীলদের ভালোবাসেন।" },
    { ar: "وَتَوَكَّلْ عَلَى ٱللَّهِ", bn: "আর আল্লাহর উপর ভরসা করো।" },
    { ar: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ", bn: "আল্লাহই আমাদের জন্য যথেষ্ট, তিনিই উত্তম কর্মবিধায়ক।" },
    { ar: "ٱلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", bn: "নিশ্চয়ই আল্লাহর স্মরণে অন্তর প্রশান্ত হয়।" },
    { ar: "رَبَّنَا تَقَبَّلْ مِنَّا", bn: "হে আমাদের রব, আমাদের থেকে কবুল করুন।" },
    { ar: "رَبِّ ٱغْفِرْ لِي", bn: "হে আমার রব, আমাকে ক্ষমা করুন।" },
    { ar: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ", bn: "নিশ্চয়ই আমার রব নিকটবর্তী ও দোয়া কবুলকারী।" },
    { ar: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُ مَخْرَجًا", bn: "যে আল্লাহকে ভয় করে, তিনি তার জন্য উত্তরণের পথ করে দেন।" },
    { ar: "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", bn: "এবং তাকে এমন স্থান থেকে রিযিক দেন যা সে কল্পনাও করে না।" },
    { ar: "إِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ", bn: "নিশ্চয়ই আল্লাহ সৎকর্মশীলদের প্রতিদান নষ্ট করেন না।" },
    { ar: "وَٱصْبِرْ وَمَا صَبْرُكَ إِلَّا بِٱللَّهِ", bn: "ধৈর্য ধারণ করো, আর তোমার ধৈর্য কেবল আল্লাহর সাহায্যে।" },
    { ar: "وَٱللَّهُ سَمِيعٌ عَلِيمٌ", bn: "আল্লাহ সর্বশ্রোতা, সর্বজ্ঞ।" },
    { ar: "إِنَّ ٱللَّهَ يُحِبُّ ٱلتَّوَّابِينَ", bn: "নিশ্চয়ই আল্লাহ তওবাকারীদের ভালোবাসেন।" },
    { ar: "إِنَّ ٱللَّهَ مَعَ ٱلْمُتَّقِينَ", bn: "নিশ্চয়ই আল্লাহ মুত্তাকীদের সাথে আছেন।" },
    { ar: "فَٱذْكُرُونِي أَذْكُرْكُمْ", bn: "তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করবো।" },
    { ar: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", bn: "তোমরা দুর্বল হয়ো না এবং দুঃখ করো না।" },
    { ar: "إِنَّ ٱللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ", bn: "নিশ্চয়ই আল্লাহ সব বিষয়ে অবগত।" },
    { ar: "إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ", bn: "নিশ্চয়ই আল্লাহ সব কিছুর উপর সাক্ষী।" },
    { ar: "وَٱللَّهُ خَيْرُ ٱلْحَافِظِينَ", bn: "আল্লাহই সর্বোত্তম রক্ষক।" },
    { ar: "رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا", bn: "হে আমাদের রব, আমাদের গুনাহ ক্ষমা করুন।" },
    { ar: "وَٱللَّهُ وَلِيُّ ٱلْمُؤْمِنِينَ", bn: "আল্লাহ মুমিনদের অভিভাবক।" },
    { ar: "إِنَّ رَحْمَتَ ٱللَّهِ قَرِيبٌ مِّنَ ٱلْمُحْسِنِينَ", bn: "নিশ্চয়ই আল্লাহর রহমত সৎকর্মশীলদের নিকটবর্তী।" },
    { ar: "إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُتَوَكِّلِينَ", bn: "নিশ্চয়ই আল্লাহ ভরসাকারীদের ভালোবাসেন।" },
    { ar: "وَمَا ٱللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ", bn: "তোমরা যা করো, আল্লাহ সে সম্পর্কে উদাসীন নন।" },
    { ar: "رَبِّ ٱشْرَحْ لِي صَدْرِي", bn: "হে আমার রব, আমার অন্তর প্রশস্ত করুন।" },
    { ar: "وَيَسِّرْ لِي أَمْرِي", bn: "আর আমার কাজ সহজ করে দিন।" },
    { ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", bn: "হে আমাদের রব, আমাদের অন্তরকে বিচ্যুত করবেন না।" },
    { ar: "إِنَّ ٱللَّهَ سَرِيعُ ٱلْحِسَابِ", bn: "নিশ্চয়ই আল্লাহ দ্রুত হিসাবগ্রহণকারী।" },
    { ar: "وَكَفَىٰ بِٱللَّهِ وَكِيلًا", bn: "কার্যনির্বাহে আল্লাহই যথেষ্ট।" },
    { ar: "إِنَّ ٱللَّهَ لَطِيفٌ خَبِيرٌ", bn: "নিশ্চয়ই আল্লাহ সূক্ষ্মদর্শী, সর্বজ্ঞ।" },
    { ar: "وَٱللَّهُ غَنِيٌّ حَمِيدٌ", bn: "আল্লাহ অমুখাপেক্ষী, প্রশংসিত।" },
    { ar: "إِنَّ ٱللَّهَ عَزِيزٌ حَكِيمٌ", bn: "নিশ্চয়ই আল্লাহ পরাক্রমশালী, প্রজ্ঞাময়।" },
    { ar: "إِنَّ ٱللَّهَ سَمِيعٌ بَصِيرٌ", bn: "নিশ্চয়ই আল্লাহ সর্বশ্রোতা, সর্বদ্রষ্টা।" },
    { ar: "وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ ٱللَّهُ", bn: "তোমরা কিছুই ইচ্ছা করতে পারো না, যদি না আল্লাহ চান।" },
    { ar: "إِنَّ ٱللَّهَ يَعْفُو عَن كَثِيرٍ", bn: "নিশ্চয়ই আল্লাহ অনেক কিছু ক্ষমা করে দেন।" },
    { ar: "وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ", bn: "আল্লাহ মহা অনুগ্রহশীল।" },
    { ar: "إِنَّ ٱللَّهَ رَءُوفٌ رَّحِيمٌ", bn: "নিশ্চয়ই আল্লাহ অতিশয় দয়ালু, পরম করুণাময়।" },
    { ar: "إِنَّ ٱللَّهَ نِعِمَّا يَعِظُكُم بِهِ", bn: "নিশ্চয়ই আল্লাহ তোমাদের উত্তম উপদেশ দেন।" },
    { ar: "إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا", bn: "নিশ্চয়ই আল্লাহ তোমাদের উপর পর্যবেক্ষক।" }
];

// State
let appState = {
    city: localStorage.getItem('noor_city') || 'Dhaka',
    country: 'Bangladesh',
    bangladeshAdjustment: localStorage.getItem('noor_bd_adj') !== 'false',
    calendarMode: localStorage.getItem('noor_cal_mode') || 'hijri',
    prayerData: null,
    ramadanData: null,
    currentDate: new Date(),
    nextPrayer: null,
    viewHijriMonthOffset: 0
};

// DOM Elements
const el = {
    introOverlay: document.getElementById('intro-overlay'),
    appContainer: document.getElementById('app-container'),
    enterBtn: document.getElementById('enter-btn'),
    arabicQuote: document.querySelector('.arabic-quote'),
    banglaQuote: document.querySelector('.bangla-quote'),
    englishDate: document.getElementById('english-date'),
    hijriDate: document.getElementById('hijri-date'),
    heroTimers: document.getElementById('hero-timers'),
    prayerGrid: document.getElementById('prayer-grid'),
    nextPrayerName: document.getElementById('next-prayer-name'),
    nextPrayerTime: document.getElementById('next-prayer-time'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    closeModal: document.querySelector('.close-modal'),
    saveSettings: document.getElementById('save-settings'),
    cityInput: document.getElementById('city-input'),
    bdToggle: document.getElementById('bd-ramadan-toggle'),
    locationBadge: document.getElementById('location-badge'),
    ramadanTableBody: document.getElementById('calendar-body'),
    downloadPngBtn: document.getElementById('download-png-btn'),
    downloadPdfBtn: document.getElementById('download-pdf-btn'),
    audioToggleBtn: document.getElementById('audio-toggle-btn'),
    muteIcon: document.getElementById('mute-icon'),
    unmuteIcon: document.getElementById('unmute-icon'),
    digitalClock: document.getElementById('digital-clock'),
    clockAmpm: document.getElementById('clock-ampm'),
    clockDay: document.getElementById('clock-day'),
    clockFullDate: document.getElementById('clock-full-date'),
    clockHijriDate: document.getElementById('clock-hijri-date')
};

// --- Audio System with Multiple Fallbacks ---
let quranAudio = null;
let isAudioMuted = true;
let currentStreamIndex = 0;

function initAudio() {
    const savedMuteState = localStorage.getItem(AUDIO_STORAGE_KEY);
    isAudioMuted = savedMuteState !== 'false';
    currentStreamIndex = 0;

    createAudioElement();
    updateAudioUI();

    if (el.audioToggleBtn) {
        el.audioToggleBtn.addEventListener('click', toggleAudio);
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

    // Set initial source
    quranAudio.src = RADIO_STREAMS[currentStreamIndex];

    // Handle errors by trying next stream
    quranAudio.addEventListener('error', (e) => {
        console.error('Audio error on stream', currentStreamIndex, e);
        tryNextStream();
    });

    // Handle stalled audio
    quranAudio.addEventListener('stalled', () => {
        console.log('Audio stalled, attempting to recover...');
        if (!isAudioMuted) {
            quranAudio.load();
            quranAudio.play().catch(() => {
                tryNextStream();
            });
        }
    });

    // Handle waiting (buffering)
    quranAudio.addEventListener('waiting', () => {
        console.log('Audio buffering...');
    });

    // Handle canplay
    quranAudio.addEventListener('canplay', () => {
        console.log('Audio can play now');
    });
}

function tryNextStream() {
    currentStreamIndex++;
    if (currentStreamIndex >= RADIO_STREAMS.length) {
        currentStreamIndex = 0;
        console.error('All streams failed');
        showToast("কুরআন রেডিও সংযোগ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", true);
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

    if (!isAudioMuted) {
        showToast("কুরআন তেলাওয়াত শুরু হচ্ছে...");
    }
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
    if (!el.muteIcon || !el.unmuteIcon || !el.audioToggleBtn) return;

    if (isAudioMuted) {
        el.muteIcon.classList.remove('hidden');
        el.unmuteIcon.classList.add('hidden');
        el.audioToggleBtn.classList.remove('active');
        el.audioToggleBtn.setAttribute('aria-label', 'Unmute Quran Radio');
    } else {
        el.muteIcon.classList.add('hidden');
        el.unmuteIcon.classList.remove('hidden');
        el.audioToggleBtn.classList.add('active');
        el.audioToggleBtn.setAttribute('aria-label', 'Mute Quran Radio');
    }
}

window.syncAudioState = function(muted) {
    isAudioMuted = muted;
    updateAudioPlayback();
    updateAudioUI();
};

// --- Inactivity Detection ---
let inactivityTimer = null;
const INACTIVITY_TIMEOUT = 30000;

function initInactivityDetection() {
    if (window.location.pathname.includes('display.html')) return;

    const resetTimer = () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            window.location.href = 'display.html';
        }, INACTIVITY_TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
        document.addEventListener(event, resetTimer, true);
    });

    resetTimer();
}

// --- Initialization ---
async function init() {
    initAudio();
    initInactivityDetection();
    registerServiceWorker();
    requestNotificationPermission();

    if(el.cityInput) el.cityInput.value = appState.city;
    if(el.bdToggle) el.bdToggle.checked = appState.bangladeshAdjustment;
    const calModeInput = document.getElementById('calendar-mode-input');
    if(calModeInput) calModeInput.value = appState.calendarMode;
    if(el.locationBadge) el.locationBadge.textContent = `${appState.city}, BD`;

    let introAutoCloseTimer = null;

    if(el.enterBtn) {
        el.enterBtn.addEventListener('click', enterApp);
    }

    introAutoCloseTimer = setTimeout(() => {
        if (el.introOverlay && !el.introOverlay.classList.contains('fade-out')) {
            enterApp();
        }
    }, 3000);

    function enterApp() {
        if (introAutoCloseTimer) clearTimeout(introAutoCloseTimer);
        el.introOverlay.classList.add('fade-out');
        el.appContainer.classList.remove('hidden');
        el.appContainer.classList.add('visible');

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(e => {
                console.log("Fullscreen request failed:", e);
            });
        }

        requestNotificationPermission();
    }

    setupEventListeners();
    startQuoteRotation();
    startClock();

    await fetchPrayerTimes();
    renderUI();
    initInstallPrompt();
    initOrientationSuggestion();
}

function startClock() {
    const updateClock = () => {
        const now = new Date();
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (el.digitalClock) {
            el.digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
        }
        if (el.clockAmpm) {
            el.clockAmpm.textContent = ampm;
        }

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        if (el.clockDay) {
            el.clockDay.textContent = days[now.getDay()];
        }
        if (el.clockFullDate) {
            el.clockFullDate.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
        }

        if (appState.prayerData) {
            updateNextPrayer();
            updateTahajjudDisplay();
        }
    };

    updateClock();
    setInterval(updateClock, 1000);
}

function updateTahajjudDisplay() {
    const today = getTodayData();
    if (!today) return;

    const timings = today.timings;
    const maghribStr = timings.Maghrib.split(' ')[0];
    const fajrStr = timings.Fajr.split(' ')[0];

    const [mH, mM] = maghribStr.split(':').map(Number);
    const [fH, fM] = fajrStr.split(':').map(Number);

    const now = new Date();
    const mDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), mH, mM);
    const fDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, fH, fM);

    const nightDuration = fDate - mDate;
    const third = nightDuration / 3;
    const tahajjudStart = new Date(fDate.getTime() - third);

    const tH = tahajjudStart.getHours();
    const tM = tahajjudStart.getMinutes();
    const ampm = tH >= 12 ? 'PM' : 'AM';
    const displayH = tH % 12 || 12;

    const tahajjudEl = document.getElementById('tahajjud-time-display');
    if (tahajjudEl) {
        tahajjudEl.textContent = `Tahajjud: ${displayH}:${tM.toString().padStart(2, '0')} ${ampm}`;
        tahajjudEl.style.opacity = "1";
    }
}

function initInstallPrompt() {
    let deferredPrompt;
    const overlay = document.getElementById('install-overlay');
    const installBtn = document.getElementById('install-confirm');
    const closeBtn = document.getElementById('install-close');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (overlay) overlay.classList.remove('hidden');
    });

    if (installBtn) {
        installBtn.addEventListener('click', () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
                if (overlay) overlay.classList.add('hidden');
            });
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.matchMedia('(display-mode: fullscreen)').matches) {
        if (overlay) overlay.classList.add('hidden');
    }
}

function initOrientationSuggestion() {
    const overlay = document.getElementById('orientation-overlay');
    const closeBtn = document.getElementById('close-orientation');

    function checkOrientation() {
        if (window.innerHeight > window.innerWidth && window.innerWidth < 768) {
            if (overlay && !localStorage.getItem('noor_orientation_dismissed')) {
                overlay.classList.remove('hidden');
            }
        } else {
            if (overlay) overlay.classList.add('hidden');
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (overlay) overlay.classList.add('hidden');
            localStorage.setItem('noor_orientation_dismissed', 'true');
        });
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    checkOrientation();
}

function setupEventListeners() {
    if(el.settingsBtn) el.settingsBtn.addEventListener('click', () => el.settingsModal.classList.remove('hidden'));
    if(el.closeModal) el.closeModal.addEventListener('click', () => el.settingsModal.classList.add('hidden'));

    if(el.saveSettings) {
        el.saveSettings.addEventListener('click', async () => {
            const newCity = el.cityInput.value.trim();
            const calModeInput = document.getElementById('calendar-mode-input');
            if (newCity) {
                appState.city = newCity;
                appState.bangladeshAdjustment = el.bdToggle.checked;
                if(calModeInput) appState.calendarMode = calModeInput.value;

                localStorage.setItem('noor_city', appState.city);
                localStorage.setItem('noor_bd_adj', appState.bangladeshAdjustment);
                localStorage.setItem('noor_cal_mode', appState.calendarMode);

                el.locationBadge.textContent = `${appState.city}, BD`;
                el.settingsModal.classList.add('hidden');

                showToast('Settings Saved. Updating...');
                await fetchPrayerTimes();
                renderUI();
                renderCalendar();
            }
        });
    }

    if(el.downloadPngBtn) el.downloadPngBtn.addEventListener('click', downloadAsImage);
    if(el.downloadPdfBtn) el.downloadPdfBtn.addEventListener('click', downloadAsPDF);

    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            appState.viewHijriMonthOffset--;
            fetchPrayerTimes();
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            appState.viewHijriMonthOffset++;
            fetchPrayerTimes();
            renderCalendar();
        });
    }

    const backBtn = document.getElementById('back-to-today');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            appState.viewHijriMonthOffset = 0;
            renderUI();
        });
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Registration Failed', err));
    }
}

function scheduleAzanNotifications() {
    if (!appState.prayerData || Notification.permission !== 'granted') return;

    const today = getTodayData();
    if (!today) return;

    const timings = today.timings;
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    prayers.forEach(prayer => {
        const [h, m] = timings[prayer].split(':');
        const prayerTime = new Date();
        prayerTime.setHours(h, m, 0);

        const now = new Date();
        if (prayerTime > now) {
            const timeout = prayerTime.getTime() - now.getTime();
            setTimeout(() => {
                new Notification(`Time for ${prayer}`, {
                    body: `It is now time for ${prayer} prayer.`,
                    icon: 'logo.png'
                });
            }, timeout);
        }
    });
}

async function fetchPrayerTimes() {
    try {
        const date = new Date();
        date.setMonth(date.getMonth() + appState.viewHijriMonthOffset);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const url = `${API_URL}/calendarByCity/${year}/${month}?city=${appState.city}&country=${appState.country}&method=1&school=1`;
        const nextMonthDate = new Date(year, month, 1);
        const nextMonthUrl = `${API_URL}/calendarByCity/${nextMonthDate.getFullYear()}/${nextMonthDate.getMonth() + 1}?city=${appState.city}&country=${appState.country}&method=1&school=1`;
        const prevMonthDate = new Date(year, month - 2, 1);
        const prevMonthUrl = `${API_URL}/calendarByCity/${prevMonthDate.getFullYear()}/${prevMonthDate.getMonth() + 1}?city=${appState.city}&country=${appState.country}&method=1&school=1`;

        const [resp1, resp2, resp3] = await Promise.all([fetch(url), fetch(nextMonthUrl), fetch(prevMonthUrl)]);
        const [data1, data2, data3] = await Promise.all([resp1.json(), resp2.json(), resp3.json()]);

        if (data1.code === 200) {
            let combinedData = [];
            if (data3.code === 200) combinedData = [...data3.data];
            combinedData = [...combinedData, ...data1.data];
            if (data2.code === 200) combinedData = [...combinedData, ...data2.data];

            appState.prayerData = combinedData;
            scheduleAzanNotifications();
        } else {
            showToast('Failed to fetch prayer times', true);
        }
    } catch (error) {
        console.error(error);
        showToast('Network error', true);
    }
}

function getTodayData() {
    if (!appState.prayerData) return null;
    const now = new Date();
    const today = appState.prayerData.find(d => 
        parseInt(d.date.gregorian.day) === now.getDate() && 
        d.date.gregorian.month.number === (now.getMonth() + 1)
    );
    return today;
}

// --- Dynamic Hero Timers with Enhanced Design ---
function renderHeroTimers(timings, isRamadan, isFriday) {
    const heroTimers = el.heroTimers;
    if (!heroTimers || !timings) return;

    heroTimers.innerHTML = '';

    if (isRamadan) {
        const seheriCard = document.createElement('div');
        seheriCard.className = 'timer-card seheri-card enhanced';
        seheriCard.innerHTML = `
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </div>
            <span class="timer-label">Seheri Ends</span>
            <h3 id="seheri-time">${formatTime(timings.Fajr)}</h3>
            <div class="countdown" id="seheri-countdown">
                <div class="countdown-box"><span class="value">--</span><span class="label">hr</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">--</span><span class="label">min</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">--</span><span class="label">sec</span></div>
            </div>
        `;
        heroTimers.appendChild(seheriCard);

        const iftarCard = document.createElement('div');
        iftarCard.className = 'timer-card iftar-card enhanced';
        iftarCard.innerHTML = `
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            </div>
            <span class="timer-label">Iftar Time</span>
            <h3 id="iftar-time">${formatTime(timings.Maghrib)}</h3>
            <div class="countdown" id="iftar-countdown">
                <div class="countdown-box"><span class="value">--</span><span class="label">hr</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">--</span><span class="label">min</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">--</span><span class="label">sec</span></div>
            </div>
        `;
        heroTimers.appendChild(iftarCard);
    } else if (isFriday) {
        const jummaCard = document.createElement('div');
        jummaCard.className = 'timer-card jumma-card enhanced';
        jummaCard.innerHTML = `
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
            </div>
            <span class="timer-label">Jumma Prayer</span>
            <h3 id="jumma-time">${formatTime(timings.Dhuhr)}</h3>
            <div class="countdown" id="jumma-countdown">
                <div class="countdown-box"><span class="value">00</span><span class="label">hr</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">00</span><span class="label">min</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">00</span><span class="label">sec</span></div>
            </div>
        `;
        heroTimers.appendChild(jummaCard);
    } else {
        const now = new Date();
        const prayers = [
            { name: 'Fajr', time: timings.Fajr },
            { name: 'Dhuhr', time: timings.Dhuhr },
            { name: 'Asr', time: timings.Asr },
            { name: 'Maghrib', time: timings.Maghrib },
            { name: 'Isha', time: timings.Isha }
        ];

        let nextPrayer = null;
        for (let p of prayers) {
            const [h, m] = p.time.split(':');
            const pDate = new Date();
            pDate.setHours(parseInt(h), parseInt(m), 0, 0);
            if (pDate > now) {
                nextPrayer = p;
                break;
            }
        }

        if (!nextPrayer) {
            nextPrayer = { name: 'Fajr', time: timings.Fajr };
        }

        const nextPrayerCard = document.createElement('div');
        nextPrayerCard.className = 'timer-card next-prayer-card enhanced';
        nextPrayerCard.innerHTML = `
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <span class="timer-label">Next Prayer</span>
            <h3 id="next-prayer-card-name">${nextPrayer.name}</h3>
            <div class="countdown" id="next-prayer-card-time">${formatTime(nextPrayer.time)}</div>
        `;
        heroTimers.appendChild(nextPrayerCard);
    }
}

function renderUI(selectedDay = null) {
    const today = selectedDay || getTodayData();
    if (!today) return;

    const isToday = parseInt(today.date.gregorian.day) === new Date().getDate();
    const backBtn = document.getElementById('back-to-today');
    if (backBtn) {
        if (!isToday) backBtn.classList.remove('hidden');
        else backBtn.classList.add('hidden');
    }

    const dateObj = selectedDay ? new Date(today.date.readable) : new Date();
    if(el.englishDate) el.englishDate.textContent = dateObj.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let hijriDay = parseInt(today.date.hijri.day);
    if (appState.bangladeshAdjustment) hijriDay -= 1;

    let displayHijri = hijriDay;
    let displayMonth = today.date.hijri.month.en;
    if (hijriDay <= 0) {
        displayHijri = 30;
        displayMonth = "Sha'ban"; 
    }

    if(el.hijriDate) el.hijriDate.textContent = `${displayHijri} ${displayMonth} ${today.date.hijri.year}`;

    if(el.clockHijriDate) {
        el.clockHijriDate.textContent = `${displayHijri} ${displayMonth} ${today.date.hijri.year}`;
    }

    const existingBadge = document.querySelector('.ramadan-count-badge');
    if (existingBadge) existingBadge.remove();

    if (displayMonth === 'Ramaḍān' || displayMonth === 'Ramadan') {
        const badge = document.createElement('div');
        badge.className = 'ramadan-count-badge';
        badge.textContent = `Ramadan Day: ${displayHijri}`;
        if(el.hijriDate) el.hijriDate.after(badge);
    }

    const isRamadan = displayMonth === 'Ramaḍān' || displayMonth === 'Ramadan';
    const isFriday = dateObj.getDay() === 5;

    renderHeroTimers(today.timings, isRamadan, isFriday);
    renderPrayerGrid(today.timings);

    if (!selectedDay) renderCalendar();

    if (isToday) {
        if (isRamadan) {
            startCountdowns(today.timings.Fajr, today.timings.Maghrib, today.timings);
        } else if (isFriday) {
            updateJummaCountdown(today.timings.Dhuhr);
        }
    }
}

function updateJummaCountdown(dhuhrTime) {
    if (window.jummaInterval) clearInterval(window.jummaInterval);
    const jummaCountdownEl = document.getElementById('jumma-countdown');
    if (!jummaCountdownEl) return;

    window.jummaInterval = setInterval(() => {
        const now = new Date();
        const [h, m] = dhuhrTime.split(':');
        const target = new Date();
        target.setHours(parseInt(h), parseInt(m), 0);

        const diff = target - now;
        if (diff > 0) {
            const hours = Math.floor(diff / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            const pad = (n) => n.toString().padStart(2, '0');
            jummaCountdownEl.innerHTML = `
                <div class="countdown-box"><span class="value">${pad(hours)}</span><span class="label">hr</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">${pad(mins)}</span><span class="label">min</span></div>
                <span class="countdown-separator">:</span>
                <div class="countdown-box"><span class="value">${pad(secs)}</span><span class="label">sec</span></div>
            `;
        } else {
            jummaCountdownEl.innerHTML = '<span style="color: var(--accent-emerald);">Started</span>';
            clearInterval(window.jummaInterval);
        }
    }, 1000);
}

function renderPrayerGrid(timings) {
    if(!el.prayerGrid) return;
    el.prayerGrid.innerHTML = '';
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    prayers.forEach(prayer => {
        const time = formatTime(timings[prayer]);
        const div = document.createElement('div');
        div.className = 'prayer-item';
        div.id = `prayer-${prayer}`;
        div.innerHTML = `
            <span class="prayer-name">${prayer}</span>
            <span class="prayer-time">${time}</span>
        `;
        el.prayerGrid.appendChild(div);
    });
}

function renderCalendar() {
    if (!appState.prayerData || !el.ramadanTableBody) return;
    el.ramadanTableBody.innerHTML = '';

    const today = new Date();
    const titleEl = document.getElementById('calendar-title');
    const isHijriMode = appState.calendarMode === 'hijri';

    let monthData = [];
    let displayTitle = "";

    if (isHijriMode) {
        const hijriMonths = [];
        appState.prayerData.forEach(day => {
            const hMonth = day.date.hijri.month.en;
            if (!hijriMonths.includes(hMonth)) hijriMonths.push(hMonth);
        });

        const todayData = getTodayData();
        const currentHijriMonthName = todayData ? todayData.date.hijri.month.en : hijriMonths[0];
        let currentIdx = hijriMonths.indexOf(currentHijriMonthName);
        if (currentIdx === -1) currentIdx = 0;

        let targetIndex = currentIdx + appState.viewHijriMonthOffset;

        if (targetIndex >= 0 && targetIndex < hijriMonths.length) {
            const selectedMonth = hijriMonths[targetIndex];
            displayTitle = selectedMonth;
            monthData = appState.prayerData.filter(day => day.date.hijri.month.en === selectedMonth);
        } else {
            displayTitle = "Loading...";
        }
    } else {
        const gregMonths = [];
        appState.prayerData.forEach(day => {
            const gMonth = `${day.date.gregorian.month.en} ${day.date.gregorian.year}`;
            if (!gregMonths.includes(gMonth)) gregMonths.push(gMonth);
        });

        const todayData = getTodayData();
        const currentGregMonthName = todayData ? `${todayData.date.gregorian.month.en} ${todayData.date.gregorian.year}` : gregMonths[0];
        let currentIdx = gregMonths.indexOf(currentGregMonthName);
        if (currentIdx === -1) currentIdx = 0;

        let targetIndex = currentIdx + appState.viewHijriMonthOffset;

        if (targetIndex >= 0 && targetIndex < gregMonths.length) {
            const selectedMonth = gregMonths[targetIndex];
            displayTitle = selectedMonth;
            monthData = appState.prayerData.filter(day => `${day.date.gregorian.month.en} ${day.date.gregorian.year}` === selectedMonth);
        } else {
            displayTitle = "Loading...";
        }
    }

    if (titleEl) titleEl.textContent = displayTitle.toUpperCase();

    monthData.forEach((day) => {
        const tr = document.createElement('tr');
        const dayDate = new Date(day.date.readable);
        const isToday = dayDate.getDate() === today.getDate() && dayDate.getMonth() === today.getMonth() && dayDate.getFullYear() === today.getFullYear();
        if (isToday) tr.classList.add('highlight-day');

        const dayOfWeek = dayDate.getDay();
        if (dayOfWeek === 1 || dayOfWeek === 4) {
            tr.classList.add('sunnah-fast');
        }

        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
            appState.currentDate = new Date(day.date.readable);
            renderUI(day);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const hijriDay = day.date.hijri.day;
        const hijriMonth = day.date.hijri.month.en;
        const engDate = `${day.date.gregorian.day} ${day.date.gregorian.month.en.substring(0,3)}`;
        const arbDate = `${hijriDay} ${hijriMonth}`;
        const dayName = day.date.gregorian.weekday.en;

        tr.innerHTML = `
            <td>${engDate}</td>
            <td>${arbDate}</td>
            <td>${dayName}</td>
            <td>${formatTime(day.timings.Fajr)}</td>
            <td>${formatTime(day.timings.Dhuhr)}</td>
            <td>${formatTime(day.timings.Asr)}</td>
            <td>${formatTime(day.timings.Maghrib)}</td>
            <td>${formatTime(day.timings.Isha)}</td>
        `;
        el.ramadanTableBody.appendChild(tr);
    });
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

function startQuoteRotation() {
    let index = 0;
    const rotate = () => {
        const quote = QUOTES[index];
        if(el.arabicQuote) el.arabicQuote.style.opacity = 0;
        if(el.banglaQuote) el.banglaQuote.style.opacity = 0;

        setTimeout(() => {
            if(el.arabicQuote) {
                el.arabicQuote.textContent = quote.ar;
                el.arabicQuote.style.opacity = 1;
            }
            if(el.banglaQuote) {
                el.banglaQuote.textContent = quote.bn;
                el.banglaQuote.style.opacity = 1;
            }
        }, 500);

        index = (index + 1) % QUOTES.length;
    };

    rotate();
    setInterval(rotate, 5000);
}

function updateNextPrayer() {
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

    document.querySelectorAll('.prayer-item').forEach(i => i.classList.remove('active'));

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
            next = p;
        }
    }

    if (!next) next = prayers[0];

    if (next) {
        const nextTimeFormatted = formatTime(next.time);
        if(el.nextPrayerName) el.nextPrayerName.textContent = next.name;
        if(el.nextPrayerTime) el.nextPrayerTime.textContent = nextTimeFormatted;

        const nextDate = new Date();
        const [nh, nm] = next.time.split(':');
        nextDate.setHours(parseInt(nh), parseInt(nm), 0, 0);
        if (nextDate < now) nextDate.setDate(nextDate.getDate() + 1);

        const diff = nextDate - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const remainingEl = document.getElementById('next-prayer-remaining');
        if (remainingEl) {
            remainingEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }

        const activeItem = document.getElementById(`prayer-${next.name}`);
        if (activeItem) activeItem.classList.add('active');
    }
}

function startCountdowns(seheriTime, iftarTime, allTimings) {
    const parse = (t) => {
        const d = new Date();
        const cleanTime = t.split(' ')[0];
        const [h, m] = cleanTime.split(':');
        d.setHours(parseInt(h), parseInt(m), 0, 0);
        return d;
    };

    const update = () => {
        const now = new Date();
        const todayData = getTodayData();
        const currentHijriMonth = todayData?.date?.hijri?.month?.en;
        const isRamadan = currentHijriMonth === 'Ramaḍān' || currentHijriMonth === 'Ramadan';

        if (isRamadan) {
            const seheriCountdown = document.getElementById('seheri-countdown');
            const iftarCountdown = document.getElementById('iftar-countdown');

            const sDate = parse(seheriTime);
            const iDate = parse(iftarTime);

            if (sDate < now) sDate.setDate(sDate.getDate() + 1);
            if (iDate < now) iDate.setDate(iDate.getDate() + 1);

            let sDiff = sDate - now;
            if(seheriCountdown) seheriCountdown.innerHTML = formatCountdown(sDiff);

            let iDiff = iDate - now;
            if(iftarCountdown) iftarCountdown.innerHTML = formatCountdown(iDiff);
        }
    };

    if (window.countdownInterval) clearInterval(window.countdownInterval);
    window.countdownInterval = setInterval(update, 1000);
    update();
}

function formatCountdown(ms) {
    if (ms <= 0) {
        return `
            <div class="countdown-box"><span class="value">00</span><span class="label">hr</span></div>
            <span class="countdown-separator">:</span>
            <div class="countdown-box"><span class="value">00</span><span class="label">min</span></div>
            <span class="countdown-separator">:</span>
            <div class="countdown-box"><span class="value">00</span><span class="label">sec</span></div>
        `;
    }

    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);

    const pad = (n) => n.toString().padStart(2, '0');

    return `
        <div class="countdown-box"><span class="value">${pad(h)}</span><span class="label">hr</span></div>
        <span class="countdown-separator">:</span>
        <div class="countdown-box"><span class="value">${pad(m)}</span><span class="label">min</span></div>
        <span class="countdown-separator">:</span>
        <div class="countdown-box"><span class="value">${pad(s)}</span><span class="label">sec</span></div>
    `;
}

function showToast(msg, isError = false) {
    const div = document.createElement('div');
    div.className = 'toast';
    div.textContent = msg;
    if (isError) div.style.borderLeftColor = 'var(--danger)';

    const container = document.getElementById('notification-container');
    if(container) container.appendChild(div);

    setTimeout(() => {
        div.style.opacity = 0;
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

function downloadAsImage() {
    const element = document.querySelector('.calendar-section');
    showToast('Preparing High-Res Image...');
    element.classList.add('download-ready');

    html2canvas(element, {
        backgroundColor: '#000000',
        scale: 3,
        useCORS: true,
        logging: false,
        windowWidth: 1200
    }).then(canvas => {
        element.classList.remove('download-ready');
        const link = document.createElement('a');
        link.download = `Noor-Al-Waqt-Prayer-Calendar-${appState.city}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        showToast('Download Started');
    }).catch(err => {
        element.classList.remove('download-ready');
        showToast('Download Failed', true);
    });
}

function downloadAsPDF() {
    const element = document.querySelector('.calendar-section');
    showToast('Generating PDF...');
    element.classList.add('download-ready');

    html2canvas(element, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        windowWidth: 1200
    }).then(canvas => {
        element.classList.remove('download-ready');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Noor-Al-Waqt-Prayer-Calendar-${appState.city}.pdf`);
        showToast('PDF Downloaded');
    }).catch(err => {
        element.classList.remove('download-ready');
        showToast('PDF Generation Failed', true);
    });
}

window.addEventListener('DOMContentLoaded', init);
