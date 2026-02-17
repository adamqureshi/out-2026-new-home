/* OUT-2026-home
   Minimal JS for:
   - hamburger menu
   - Yo-Yo bubble (placeholder chat)
   - login page demo interactions
*/

(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----- Menu -----
  const menu = qs('#menu');
  const menuBtn = qs('#menuBtn');
  const closeMenuBtn = qs('#closeMenu');
  const menuBackdrop = qs('#menuBackdrop');

  const setMenuOpen = (open) => {
    if (!menu) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  };

  if (menuBtn) menuBtn.addEventListener('click', () => setMenuOpen(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => setMenuOpen(false));
  if (menuBackdrop) menuBackdrop.addEventListener('click', () => setMenuOpen(false));

  qsa('.menu-link').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });

  // ----- Yo-Yo chat widget (placeholder) -----
  const yoyoBtn = qs('#yoyoBtn');
  const yoyoPanel = qs('#yoyoPanel');
  const yoyoClose = qs('#yoyoClose');
  const yoyoBody = qs('#yoyoBody');
  const yoyoForm = qs('#yoyoForm');
  const yoyoInput = qs('#yoyoInput');

  const LINKS = {
    advertise: 'https://onlyusedtesla.com/sell-my-tesla',
    cash: 'https://onlyusedtesla.com/cash-offer',
    outcheck: 'https://adamqureshi.com/out-check-landing/',
  };

  const setYoYoOpen = (open) => {
    if (!yoyoPanel || !yoyoBtn) return;
    yoyoPanel.classList.toggle('open', open);
    yoyoPanel.setAttribute('aria-hidden', String(!open));
    yoyoBtn.setAttribute('aria-expanded', String(open));
  };

  const appendMsg = (text, who = 'bot') => {
    if (!yoyoBody) return;
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    div.innerHTML = text;
    yoyoBody.appendChild(div);
    yoyoBody.scrollTop = yoyoBody.scrollHeight;
  };

  const botReply = (raw) => {
    const t = String(raw || '').trim().toLowerCase();

    // super-simple intent detection
    if (t.includes('cash') || t.includes('offer')) {
      appendMsg('Want a quick cash offer? Tap the button below, or I can open it for you.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.cash}" target="_blank" rel="noopener">Open cash offer</a>`, 'bot');
      return;
    }

    if (t.includes('out') || t.includes('report') || t.includes('check')) {
      appendMsg('OUT‑CHECK is made for private sales: connect → generate → share.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outcheck}" target="_blank" rel="noopener">Buy OUT‑CHECK</a>`, 'bot');
      return;
    }

    if (t.includes('list') || t.includes('advertise') || t.includes('sell')) {
      appendMsg('Perfect. Let’s get your Tesla ad live.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.advertise}" target="_blank" rel="noopener">Start your ad</a>`, 'bot');
      return;
    }

    appendMsg('Got it. Quick options: “Advertise”, “Cash offer”, or “OUT‑CHECK”.', 'bot');
  };

  if (yoyoBtn) yoyoBtn.addEventListener('click', () => setYoYoOpen(true));
  if (yoyoClose) yoyoClose.addEventListener('click', () => setYoYoOpen(false));

  // Quick action buttons
  qsa('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (!action) return;

      if (action === 'advertise') {
        appendMsg('Open the “Advertise my Tesla” flow.', 'user');
        window.open(LINKS.advertise, '_blank', 'noopener,noreferrer');
        botReply('advertise');
        return;
      }

      if (action === 'cash') {
        appendMsg('Open “Get a cash offer”.', 'user');
        window.open(LINKS.cash, '_blank', 'noopener,noreferrer');
        botReply('cash offer');
        return;
      }

      if (action === 'outcheck') {
        appendMsg('Open “Buy OUT‑CHECK”.', 'user');
        window.open(LINKS.outcheck, '_blank', 'noopener,noreferrer');
        botReply('out check report');
        return;
      }
    });
  });

  if (yoyoForm) {
    yoyoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!yoyoInput) return;
      const value = yoyoInput.value.trim();
      if (!value) return;
      appendMsg(value, 'user');
      yoyoInput.value = '';
      setTimeout(() => botReply(value), 250);
    });
  }

  // Close Yo-Yo with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      setYoYoOpen(false);
    }
  });

  // ----- Login page demo -----
  const emailForm = qs('#emailForm');
  const emailToast = qs('#emailToast');

  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (emailToast) {
        emailToast.hidden = false;
        setTimeout(() => (emailToast.hidden = true), 5000);
      }
    });
  }

  // Social placeholder buttons
  qsa('[data-social]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const provider = btn.getAttribute('data-social');
      alert(`Placeholder: connect ${provider} OAuth here.`);
    });
  });
})();
