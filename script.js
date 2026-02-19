// Constants
const API_URL = 'https://api.aladhan.com/v1';
const QUOTES = [
    { ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", bn: "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে।" },
    { ar: "ٱللَّهُ نُورُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ", bn: "আল্লাহ আসমান ও জমিনের নূর।" },
    { ar: "رَبِّ زِدْنِي عِلْمًا", bn: "হে আমার রব, আমাকে জ্ঞান দান করুন।" },
    { ar: "وَمَا تَوْفِيقِي إِلَّا بِٱللَّهِ", bn: "আমার তৌফিক কেবল আল্লাহর পক্ষ থেকে।" },
    { ar: "إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ", bn: "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।" }
];

// State
let appState = {
    city: localStorage.getItem('noor_city') || 'Dhaka',
    country: 'Bangladesh',
    bangladeshAdjustment: localStorage.getItem('noor_bd_adj') !== 'false', // Default true
    displayMode: false,
    prayerData: null,
    ramadanData: null,
    currentDate: new Date(),
    nextPrayer: null
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
    seheriTime: document.getElementById('seheri-time'),
    iftarTime: document.getElementById('iftar-time'),
    seheriCountdown: document.getElementById('seheri-countdown'),
    iftarCountdown: document.getElementById('iftar-countdown'),
    prayerGrid: document.getElementById('prayer-grid'),
    nextPrayerName: document.getElementById('next-prayer-name'),
    nextPrayerTime: document.getElementById('next-prayer-time'),
    displayModeBtn: document.getElementById('display-mode-btn'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    closeModal: document.querySelector('.close-modal'),
    saveSettings: document.getElementById('save-settings'),
    cityInput: document.getElementById('city-input'),
    bdToggle: document.getElementById('bd-ramadan-toggle'),
    locationBadge: document.getElementById('location-badge'),
    liveClock: document.getElementById('live-clock'),
    ramadanTableBody: document.getElementById('calendar-body'),
    downloadPngBtn: document.getElementById('download-png-btn'),
    downloadPdfBtn: document.getElementById('download-pdf-btn'),
    audioToggleBtn: document.getElementById('audio-toggle-btn'),
    muteIcon: document.getElementById('mute-icon'),
    unmuteIcon: document.getElementById('unmute-icon')
};

// --- Audio ---
let quranAudio = null;

function initAudio() {
    // Using a more reliable MP3 stream URL
    quranAudio = new Audio('https://mirrors.quranicaudio.com/radio/quran_radio/mp3/128/default.mp3');
    quranAudio.crossOrigin = "anonymous";
    quranAudio.loop = true;

    if (el.audioToggleBtn) {
        el.audioToggleBtn.addEventListener('click', () => {
            if (quranAudio.paused) {
                const playPromise = quranAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        el.muteIcon.classList.add('hidden');
                        el.unmuteIcon.classList.remove('hidden');
                        el.audioToggleBtn.classList.add('active');
                    }).catch(error => {
                        console.error("Playback failed:", error);
                        showToast("Audio playback failed. Try again.", true);
                    });
                }
            } else {
                quranAudio.pause();
                el.muteIcon.classList.remove('hidden');
                el.unmuteIcon.classList.add('hidden');
                el.audioToggleBtn.classList.remove('active');
            }
        });
    }
}

// --- Initialization ---

async function init() {
    initAudio();
    registerServiceWorker();
    requestNotificationPermission();
    // Restore Settings
    if(el.cityInput) el.cityInput.value = appState.city;
    if(el.bdToggle) el.bdToggle.checked = appState.bangladeshAdjustment;
    if(el.locationBadge) el.locationBadge.textContent = `${appState.city}, BD`;

    // Intro Event
    if(el.enterBtn) {
        el.enterBtn.addEventListener('click', () => {
            el.introOverlay.classList.add('fade-out');
            el.appContainer.classList.remove('hidden');
            el.appContainer.classList.add('visible');
            
            // Fix: Trigger audio and notifications on user interaction
            if (quranAudio && quranAudio.paused) {
                quranAudio.play().then(() => {
                    el.muteIcon.classList.add('hidden');
                    el.unmuteIcon.classList.remove('hidden');
                    el.audioToggleBtn.classList.add('active');
                }).catch(e => console.log("Audio play failed:", e));
            }
            requestNotificationPermission();
        });
    }

    // Setup UI Interactions
    setupEventListeners();
    
    // Start Loops
    startQuoteRotation();
    startClock();
    
    // Fetch Data
    await fetchPrayerTimes();
    renderUI();
}

function setupEventListeners() {
    // Display Mode
    if(el.displayModeBtn) {
        el.displayModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('display-mode');
            appState.displayMode = !appState.displayMode;
        });
    }

    // Settings Modal
    if(el.settingsBtn) el.settingsBtn.addEventListener('click', () => el.settingsModal.classList.remove('hidden'));
    if(el.closeModal) el.closeModal.addEventListener('click', () => el.settingsModal.classList.add('hidden'));
    
    if(el.saveSettings) {
        el.saveSettings.addEventListener('click', async () => {
            const newCity = el.cityInput.value.trim();
            if (newCity) {
                appState.city = newCity;
                appState.bangladeshAdjustment = el.bdToggle.checked;
                
                localStorage.setItem('noor_city', appState.city);
                localStorage.setItem('noor_bd_adj', appState.bangladeshAdjustment);
                
                el.locationBadge.textContent = `${appState.city}, BD`;
                el.settingsModal.classList.add('hidden');
                
                showToast('Settings Saved. Updating...');
                await fetchPrayerTimes();
                renderUI();
            }
        });
    }

    // Downloads
    if(el.downloadPngBtn) el.downloadPngBtn.addEventListener('click', downloadAsImage);
    if(el.downloadPdfBtn) el.downloadPdfBtn.addEventListener('click', downloadAsPDF);

    // Back to Today
    const backBtn = document.getElementById('back-to-today');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            renderUI();
        });
    }
}

// --- Logic & Data ---

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
                    icon: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=192&h=192&auto=format&fit=crop'
                });
            }, timeout);
        }
    });
}

// Update fetchPrayerTimes to trigger notification scheduling
async function fetchPrayerTimes() {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        const url = `${API_URL}/calendarByCity/${year}/${month}?city=${appState.city}&country=${appState.country}&method=1&school=1`;
        const nextMonthUrl = `${API_URL}/calendarByCity/${year}/${month === 12 ? 1 : month + 1}?city=${appState.city}&country=${appState.country}&method=1&school=1`;
        
        const [resp1, resp2] = await Promise.all([fetch(url), fetch(nextMonthUrl)]);
        const [data1, data2] = await Promise.all([resp1.json(), resp2.json()]);
        
        if (data1.code === 200) {
            let combinedData = [...data1.data];
            if (data2.code === 200) combinedData = [...combinedData, ...data2.data];
            
            appState.prayerData = combinedData;
            processRamadanData(combinedData);
            scheduleAzanNotifications(); // Schedule notifications after data is fetched
        } else {
            showToast('Failed to fetch prayer times', true);
        }
    } catch (error) {
        console.error(error);
        showToast('Network error', true);
    }
}

function processRamadanData(data) {
    appState.ramadanData = data.map((day, index) => {
        // Since we want to shift the Ramadan start by one day later in Bangladesh
        // The first few days of the month might not be Ramadan yet.
        // We'll calculate the Ramadan day number based on the adjusted Hijri day.
        
        let hijriDay = parseInt(day.date.hijri.day);
        
        // In Bangladesh, the Hijri date is usually 1 day behind the global/Middle East calculation
        // but the user says "Ramadan akdin pichiye" (Ramadan is one day later/delayed).
        // This usually means if the API says it's Ramadan 1, in BD it's still Sha'ban 30.
        // So we subtract 1 from the API's Hijri day to get the BD Hijri day.
        
        if (appState.bangladeshAdjustment) {
            hijriDay -= 1;
        }

        return {
            ...day,
            adjustedHijri: hijriDay
        };
    });
}

function getTodayData() {
    if (!appState.prayerData) return null;
    
    const todayStr = new Date().getDate().toString();
    const today = appState.prayerData.find(d => parseInt(d.date.gregorian.day) === parseInt(todayStr));
    return today;
}

// --- Rendering ---

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
    
    // Handle month transition if hijriDay becomes 0 or less
    let displayHijri = hijriDay;
    let displayMonth = today.date.hijri.month.en;
    if (hijriDay <= 0) {
        displayHijri = 30; // Approximation for previous month last day
        displayMonth = "Sha'ban"; 
    }
    
    if(el.hijriDate) el.hijriDate.textContent = `${displayHijri} ${displayMonth} ${today.date.hijri.year}`;
    
    if (displayMonth === 'Ramaḍān' || displayMonth === 'Ramadan') {
        const existingBadge = document.querySelector('.ramadan-count-badge');
        if (existingBadge) existingBadge.remove();
        const badge = document.createElement('div');
        badge.className = 'ramadan-count-badge';
        badge.textContent = `Ramadan Day: ${displayHijri}`;
        if(el.hijriDate) el.hijriDate.after(badge);
    }

    const seheri = formatTime(today.timings.Fajr);
    const iftar = formatTime(today.timings.Maghrib);
    
    if(el.seheriTime) el.seheriTime.textContent = seheri;
    if(el.iftarTime) el.iftarTime.textContent = iftar;

    renderPrayerGrid(today.timings);

    if (!selectedDay) renderCalendar();

    if (isToday) {
        if(el.seheriCountdown) el.seheriCountdown.classList.remove('hidden');
        if(el.iftarCountdown) el.iftarCountdown.classList.remove('hidden');
        startCountdowns(today.timings.Fajr, today.timings.Maghrib);
    } else {
        if(el.seheriCountdown) el.seheriCountdown.classList.add('hidden');
        if(el.iftarCountdown) el.iftarCountdown.classList.add('hidden');
        if (window.countdownInterval) clearInterval(window.countdownInterval);
    }
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
    if (!appState.ramadanData || !el.ramadanTableBody) return;
    el.ramadanTableBody.innerHTML = '';
    
    const todayNum = new Date().getDate();
    const currentMonth = new Date().getMonth();

    let ramadanCounter = 0;
    appState.ramadanData.forEach((day, index) => {
        let hijriDay = day.adjustedHijri;
        let hijriMonth = day.date.hijri.month.en;
        
        // We only want to show the 30 days of Ramadan
        if (!((hijriMonth === 'Ramaḍān' || hijriMonth === 'Ramadan') && hijriDay > 0)) {
            return;
        }
        
        ramadanCounter++;
        if (ramadanCounter > 30) return;

        const tr = document.createElement('tr');
        const dayDate = new Date(day.date.readable);
        const isToday = dayDate.getDate() === todayNum && dayDate.getMonth() === currentMonth;
        
        if (isToday) tr.classList.add('highlight-day');
        
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
            appState.currentDate = new Date(day.date.readable);
            renderUI(day);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        tr.innerHTML = `
            <td>${ramadanCounter}</td>
            <td>${day.date.gregorian.day} ${day.date.gregorian.month.en}</td>
            <td>${formatTime(day.timings.Fajr)}</td>
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
    hours = hours ? hours : 12; // the hour '0' should be '12'
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

function startClock() {
    const liveClockLarge = document.getElementById('live-clock-large');
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        if(el.liveClock) el.liveClock.textContent = timeStr;
        if(liveClockLarge) liveClockLarge.textContent = timeStr;
        if (appState.prayerData) updateNextPrayer();
    }, 1000);
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
            // Check if it's for tomorrow
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
        
        // Update full screen clock elements
        const nameLarge = document.getElementById('next-prayer-name-large');
        const timeLarge = document.getElementById('next-prayer-time-large');
        if (nameLarge) nameLarge.textContent = next.name;
        if (timeLarge) timeLarge.textContent = nextTimeFormatted;
        
        const activeItem = document.getElementById(`prayer-${next.name}`);
        if (activeItem) activeItem.classList.add('active');
    }
}

function startCountdowns(seheriTime, iftarTime) {
    const parse = (t) => {
        const d = new Date();
        const cleanTime = t.split(' ')[0];
        const [h, m] = cleanTime.split(':');
        d.setHours(parseInt(h), parseInt(m), 0, 0);
        return d;
    };

    const update = () => {
        const now = new Date();
        const sDate = parse(seheriTime);
        const iDate = parse(iftarTime);

        // If time has passed today, set for tomorrow
        if (sDate < now) sDate.setDate(sDate.getDate() + 1);
        if (iDate < now) iDate.setDate(iDate.getDate() + 1);

        let sDiff = sDate - now;
        if(el.seheriCountdown) el.seheriCountdown.innerHTML = formatCountdown(sDiff);
        
        let iDiff = iDate - now;
        if(el.iftarCountdown) el.iftarCountdown.innerHTML = formatCountdown(iDiff);
    };

    if (window.countdownInterval) clearInterval(window.countdownInterval);
    window.countdownInterval = setInterval(update, 1000);
    update();
}

function formatCountdown(ms) {
    if (ms <= 0) return `<span>0</span><span>0</span>:<span>0</span><span>0</span>:<span>0</span><span>0</span>`;
    
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    
    const pad = (n) => n.toString().padStart(2, '0');
    const hh = pad(h);
    const mm = pad(m);
    const ss = pad(s);

    return `<span>${hh[0]}</span><span>${hh[1]}</span>:<span>${mm[0]}</span><span>${mm[1]}</span>:<span>${ss[0]}</span><span>${ss[1]}</span>`;
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
        link.download = `Noor-Al-Waqt-Ramadan-${appState.city}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        showToast('Download Started');
    }).catch(err => {
        element.classList.remove('download-ready');
        showToast('Download Failed', true);
    });
}

function downloadAsPDF() {
    if (typeof window.jspdf === 'undefined') {
        showToast('Library Loading...', true);
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    showToast('Generating PDF...');
    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.text(`Ramadan Calendar - ${appState.city}`, 105, 20, null, null, "center");
    doc.setFontSize(10);
    let y = 40;
    const headers = ["Ramadan", "Date", "Seheri", "Iftar", "Fajr", "Maghrib"];
    const xPositions = [20, 50, 90, 120, 150, 180];
    headers.forEach((h, i) => doc.text(h, xPositions[i], y));
    y += 10;
    if (appState.ramadanData) {
        appState.ramadanData.forEach(day => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
            const row = [
                day.adjustedHijri.toString(),
                `${day.date.gregorian.day} ${day.date.gregorian.month.en}`,
                formatTime(day.timings.Fajr),
                formatTime(day.timings.Maghrib),
                formatTime(day.timings.Fajr),
                formatTime(day.timings.Maghrib)
            ];
            row.forEach((txt, i) => doc.text(txt, xPositions[i], y));
            y += 7;
        });
    }
    doc.save("Noor-Al-Waqt-Calendar.pdf");
}

document.addEventListener('DOMContentLoaded', init);