// State
let isPaused = true;
let isTimerMode = false;
let durationMode = 'minute';
let chaosLevel = 0.4;
let showGhost = false;

let velocity = 1;
let internalTime = Date.now();
let lastFrame = performance.now();
let offset = 0;

const DURATIONS = { minute: 60000, hour: 3600000, day: 86400000 };

function initClock() {
  // Main clock elements (may not exist on all pages)
  const els = {
    hH: document.getElementById('h-h'), 
    hM: document.getElementById('h-m'), 
    hS: document.getElementById('h-s'), 
    hG: document.getElementById('h-g'),
    mH: document.getElementById('m-h'), 
    mM: document.getElementById('m-m'), 
    mS: document.getElementById('m-s'),
    btnT: document.getElementById('btn-toggle'), 
    btnR: document.getElementById('btn-reset'), 
    btnS: document.getElementById('btn-settings'),
    mini: document.getElementById('mini-clock'), 
    status: document.getElementById('run-status'), 
    panel: document.getElementById('panel-settings'),
    txtT: document.getElementById('txt-time'), 
    txtO: document.getElementById('txt-offset'), 
    txtV: document.getElementById('txt-speed')
  };

  function getProgress(ts) {
    const d = new Date(ts);
    if (isTimerMode) {
      const start = new Date(ts).setHours(0,0,0,0);
      return Math.min((ts - start) / DURATIONS[durationMode], 1);
    }
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const m = d.getMinutes() + s / 60;
    const h = d.getHours() + m / 60;
    return durationMode === 'minute' ? s/60 : durationMode === 'hour' ? m/60 : h/24;
  }

  function updateHands(ts, h, m, s) {
    if (!h || !m || !s) return; // Safety check in case elements are missing
    const d = new Date(ts);
    const sec = d.getSeconds() + d.getMilliseconds() / 1000;
    const min = d.getMinutes() + sec / 60;
    const hr = (d.getHours() % 12) + min / 60;
    h.style.transform = `translateX(-50%) rotate(${hr * 30}deg)`;
    m.style.transform = `translateX(-50%) rotate(${min * 6}deg)`;
    s.style.transform = `translateX(-50%) rotate(${sec * 6}deg)`;
  }

  function loop(now) {
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;

    if (!isPaused) {
      const p = getProgress(internalTime);
      const targetV = 1.6 - (p * 1.2);
      
      if (Math.random() < chaosLevel * 0.08) {
        velocity += (Math.random() - 0.5) * chaosLevel * 4;
      } else {
        velocity += (targetV - velocity) * 0.05;
      }
      
      velocity = Math.max(0.1, Math.min(velocity, 4));
      internalTime += dt * 1000 * velocity;
      if (!isTimerMode) offset = (internalTime - Date.now()) / 1000;
    }

    // Update both main hands and mini hands
    updateHands(internalTime, els.hH, els.hM, els.hS);
    updateHands(internalTime, els.mH, els.mM, els.mS);
    
    // Update Ghost Hand (if it exists)
    if (els.hG) {
      if (showGhost) {
        els.hG.classList.remove('hidden');
        const gs = new Date().getSeconds() + new Date().getMilliseconds() / 1000;
        els.hG.style.transform = `translateX(-50%) rotate(${gs * 6}deg)`;
      } else {
        els.hG.classList.add('hidden');
      }
    }

    // Update Text Readouts (if they exist)
    if (els.txtT) els.txtT.innerText = new Date(internalTime).toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'});
    if (els.txtO) els.txtO.innerText = Math.round(offset * 1000);
    if (els.txtV) els.txtV.innerText = velocity.toFixed(2);

    requestAnimationFrame(loop);
  }

  const toggle = () => {
    isPaused = !isPaused;
    if (els.btnT) els.btnT.innerText = isPaused ? 'Start' : 'Stop';
    if (els.status) {
      els.status.innerText = isPaused ? 'STOPPED' : 'RUNNING';
      els.status.className = isPaused ? 'blink' : '';
    }
  };

  // Attach event listeners safely
  if (els.btnT) els.btnT.onclick = toggle;
  if (els.mini) els.mini.onclick = toggle;
  
  if (els.btnR) {
    els.btnR.onclick = () => {
      const d = new Date();
      if (isTimerMode) d.setHours(0,0,0,0);
      internalTime = d.getTime();
      velocity = 1; offset = 0;
    };
  }
  
  if (els.btnS && els.panel) {
    els.btnS.onclick = () => els.panel.classList.toggle('hidden');
  }
  
  const selectMode = document.getElementById('select-mode');
  if (selectMode) {
    selectMode.onchange = (e) => {
      isTimerMode = e.target.value === 'timer';
      if(els.btnR) els.btnR.onclick();
    };
  }
  
  const selectPeriod = document.getElementById('select-period');
  if (selectPeriod) selectPeriod.onchange = (e) => durationMode = e.target.value;
  
  const inputChaos = document.getElementById('input-chaos');
  if (inputChaos) inputChaos.oninput = (e) => chaosLevel = parseFloat(e.target.value);
  
  const checkGhost = document.getElementById('check-ghost');
  if (checkGhost) checkGhost.onchange = (e) => showGhost = e.target.checked;

  requestAnimationFrame(loop);
}

// Ensure the DOM is fully loaded before looking for elements
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initClock, 100); // Tiny delay to guarantee nav.js finishes injecting
  });
} else {
  setTimeout(initClock, 100);
}