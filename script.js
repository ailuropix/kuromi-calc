let mode = 'thb';
let baseINR = 0;

// --- CONVERSION FORMULAS ---
function thbToINR(p) { return (((((p * 626 / 15700 + 0.32) * 4 / 100) + (p * 595 / 15700 + 0.32)) + 0.5) * 100) + 100; }
function idrToINR(p) { return (((p / 15700 + 0.32) * 4 / 100) + (p / 15700 + 0.32) + 1) * 100; }
function twdToINR(p) { return (p * 4) + 100; } 
function cnyToINR(p) { return (p * 17) + 100; } // UPDATED: price * 17 + 100
function krwToINR(p) { return (p / 10) + 25; } 
function jpyToINR(p) { return ((((p + 200) / 122) * 4) / 100) + (((p + 200) / 125) * 100) + 50; }  

function getConvertedValue(amount) {
    switch(mode) {
        case 'thb': return thbToINR(amount);
        case 'idr': return idrToINR(amount);
        case 'twd': return twdToINR(amount);
        case 'cny': return cnyToINR(amount);
        case 'krw': return krwToINR(amount);
        case 'jpy': return jpyToINR(amount);
        default: return 0;
    }
}

function setMode(m) {
    mode = m;
    const allTabs = ['thb', 'idr', 'twd', 'cny', 'krw', 'jpy'];
    allTabs.forEach(t => {
        const tabEl = document.getElementById(`tab-${t}`);
        if (tabEl) tabEl.classList.toggle('active', t === m);
    });

    const labels = {
        'thb': ['THAI BAHT - INR', 'THB', 'BAHT AMOUNT'],
        'idr': ['INDONESIAN IDR - INR', 'IDR', 'RUPIAH AMOUNT'],
        'twd': ['TWD - INR', 'TWD', 'NT DOLLAR AMOUNT'],
        'cny': ['CNY - INR', 'CNY', 'YUAN AMOUNT'],
        'krw': ['KRW - INR', 'KRW', 'WON AMOUNT'],
        'jpy': ['JPY - INR', 'JPY', 'YEN AMOUNT']
    };
    
    document.getElementById('disp-from').textContent = labels[m][0];
    document.getElementById('disp-mode').textContent = labels[m][1];
    document.getElementById('input-label').textContent = labels[m][2];
    
    calculate();
}

function calculate() {
    const amt = parseFloat(document.getElementById('amount').value) || 0;
    baseINR = getConvertedValue(amt);
    document.getElementById('disp-value').textContent = baseINR.toFixed(2);
    updateTotal();
}

function updateTotal() {
    const amt = parseFloat(document.getElementById('amount').value) || 0;
    const shipping = parseFloat(document.getElementById('fee-shipping').value) || 0;
    const other = parseFloat(document.getElementById('fee-other').value) || 0;
    const totalRaw = amt + shipping + other;
    const finalTotalINR = getConvertedValue(totalRaw);
    document.getElementById('total-val').textContent = '₹ ' + finalTotalINR.toFixed(2);
}

function createPixelGalaxy() {
    const starContainer = document.getElementById('stars');
    if (!starContainer) return;
    starContainer.innerHTML = '';
    const colors = ['color-cyan', 'color-pink', 'color-white', 'color-purple'];
    const types = ['pixel-heart', 'pixel-star', 'pixel-circle'];
    for (let i = 0; i < 95; i++) {
        const el = document.createElement('div');
        el.className = `pixel-element ${types[Math.floor(Math.random()*3)]} ${colors[Math.floor(Math.random()*4)]}`;
        el.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 15 + 10; 
        el.style.setProperty('--duration', `${duration}s`);
        el.style.animationDelay = `-${Math.random() * duration}s`;
        el.style.transform = `scale(${Math.random() * 0.7 + 0.3})`;
        starContainer.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createPixelGalaxy();
    calculate();
});