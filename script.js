let mode = 'thb';
let baseINR = 0;

function thbToINR(b) {
    const p = (((b * 595) / 15700) + 0.32);
    return ((((p * 4) / 100) + p) + 0.5) * 100;
}

function idrToINR(r) {
    const p = (r / 15700) + 0.32;
    return ((((p * 4) / 100) + p) + 1) * 100;
}

function setMode(m) {
    mode = m;
    document.getElementById('tab-thb').classList.toggle('active', m === 'thb');
    document.getElementById('tab-idr').classList.toggle('active', m === 'idr');
    document.getElementById('disp-from').textContent = m === 'thb' ? 'THAI BAHT → INR' : 'INDONESIAN IDR → INR';
    document.getElementById('disp-mode').textContent = m === 'thb' ? 'THB' : 'IDR';
    document.getElementById('input-label').textContent = m === 'thb' ? 'BAHT AMOUNT' : 'RUPIAH AMOUNT';
    calculate();
}

function calculate() {
    const amt = parseFloat(document.getElementById('amount').value) || 0;
    baseINR = mode === 'thb' ? thbToINR(amt) : idrToINR(amt);
    document.getElementById('disp-value').textContent = baseINR.toFixed(2);
    updateTotal();
}

function updateTotal() {
    // Looks for specific IDs: fee-shipping and fee-other
    const shipping = parseFloat(document.getElementById('fee-shipping').value) || 0;
    const other = parseFloat(document.getElementById('fee-other').value) || 0;
    const feeSum = shipping + other;
    
    const feeImpact = mode === 'thb' ? (thbToINR(feeSum) - thbToINR(0)) : (idrToINR(feeSum) - idrToINR(0));
    const total = baseINR + feeImpact;
    document.getElementById('total-val').textContent = '₹ ' + total.toFixed(2);
}

function createPixelGalaxy() {
    const starContainer = document.getElementById('stars');
    if (!starContainer) return;
    starContainer.innerHTML = '';

    const colors = ['color-cyan', 'color-pink', 'color-white', 'color-purple'];
    const types = ['pixel-heart', 'pixel-star', 'pixel-circle'];
    
    for (let i = 0; i < 90; i++) {
        const el = document.createElement('div');
        const typeClass = types[Math.floor(Math.random() * types.length)];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        
        el.className = `pixel-element ${typeClass} ${colorClass}`;
        el.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 15 + 10; 
        el.style.setProperty('--duration', `${duration}s`);
        el.style.animationDelay = `-${Math.random() * duration}s`;
        
        const scale = Math.random() * 0.7 + 0.3;
        el.style.transform = `scale(${scale})`;
        starContainer.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createPixelGalaxy();
    calculate();
});