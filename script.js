/* OUT-2026-home
   Minimal JS for:
   - hamburger menu
   - Yo-Yo bubble (placeholder chat)
   - OUT-MATCH Concierge short form
   - login page demo interactions
   - contact page email-draft form
*/

(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const CONTACT_EMAIL = 'contact@onlyusedtesla.com';

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
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (menuBtn) menuBtn.addEventListener('click', () => setMenuOpen(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => setMenuOpen(false));
  if (menuBackdrop) menuBackdrop.addEventListener('click', () => setMenuOpen(false));

  qsa('.menu-link').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });

  // ----- Utilities -----
  const normalizePhone = (value) => String(value || '').trim();
  const validPhone = (value) => /^[0-9+().\-\s]{7,20}$/.test(normalizePhone(value));
  const validZip = (value) => /^\d{5}(?:-\d{4})?$/.test(String(value || '').trim());

  const showMessage = (el, text) => {
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
  };

  const hideMessage = (el) => {
    if (!el) return;
    el.hidden = true;
    el.textContent = '';
  };

  const copyText = async (text) => {
    if (!text) return false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // fall through
    }

    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(helper);
    return ok;
  };

  // ----- Yo-Yo chat widget (placeholder) -----
  const yoyoBtn = qs('#yoyoBtn');
  const yoyoPanel = qs('#yoyoPanel');
  const yoyoClose = qs('#yoyoClose');
  const yoyoBody = qs('#yoyoBody');
  const yoyoForm = qs('#yoyoForm');
  const yoyoInput = qs('#yoyoInput');

  const LINKS = {
    shop: 'https://onlyusedtesla.com/used-tesla-for-sale',
    advertise: 'https://onlyusedtesla.com/sell-my-tesla',
    cash: 'https://onlyusedtesla.com/cash-offer',
    outcheck: 'https://adamqureshi.com/out-check-landing/',
    outmatch: 'out-match.html#contact',
    dealer: 'dealer.html',
    email: `mailto:${CONTACT_EMAIL}`,
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

    const sellerIntent =
      t.includes('sell my tesla') ||
      t.includes('selling my tesla') ||
      t.includes('cash offer') ||
      t.includes('price my') ||
      t.includes('help me sell') ||
      t.includes('screen buyer') ||
      t.includes('concierge');

    const buyerIntent =
      t.includes('buy a tesla') ||
      t.includes('buying a tesla') ||
      t.includes('find one') ||
      t.includes('find me') ||
      t.includes('model s plaid') ||
      t.includes('plaid') ||
      t.includes('help buying');

    const expertIntent =
      t.includes('out agent') ||
      t.includes('apply') ||
      t.includes('worked at tesla') ||
      t.includes('former tesla');

    if (expertIntent) {
      appendMsg('OUT Agent applications are not on the public page right now. Email Adam if you want to be considered later.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.email}">Email Adam</a>`, 'bot');
      return;
    }

    if (sellerIntent) {
      appendMsg('OUT‑MATCH Concierge can help you sell your Tesla. Start with the short contact form and Adam will text you back.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatch}">Open OUT‑MATCH Concierge</a>`, 'bot');
      return;
    }

    if (buyerIntent) {
      appendMsg('Need help finding a Tesla? Start with OUT‑MATCH Concierge and say you want buy-side help in your message.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatch}">Contact Adam</a>`, 'bot');
      return;
    }

    if ((t.includes('cash') || t.includes('offer')) && !t.includes('match')) {
      appendMsg('Want a quick cash offer? Tap the button below, or I can open it for you.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.cash}" target="_blank" rel="noopener">Open cash offer</a>`, 'bot');
      return;
    }

    if (t.includes('dealer') || t.includes('inventory') || t.includes('dealership')) {
      appendMsg('Looking to advertise dealer inventory? Start on the dealer sign-up page.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.dealer}">Open dealer sign-up</a>`, 'bot');
      return;
    }

    if (t.includes('shop') || t.includes('browse')) {
      appendMsg('Let’s shop Tesla-only listings.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.shop}" target="_blank" rel="noopener">Open listings</a>`, 'bot');
      return;
    }

    if (t.includes('out') || t.includes('report') || t.includes('check')) {
      appendMsg('OUT‑CHECK is made for private sales: connect → generate → share.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outcheck}" target="_blank" rel="noopener">Buy OUT‑CHECK</a>`, 'bot');
      return;
    }

    if (t.includes('advertise') || (t.includes('sell') && !t.includes('tesla concierge'))) {
      appendMsg('Perfect. Let’s get your Tesla ad live.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.advertise}" target="_blank" rel="noopener">Start your ad</a>`, 'bot');
      return;
    }

    appendMsg('Quick options: “Shop”, “Advertise”, “Cash offer”, “OUT‑CHECK”, or “OUT‑MATCH Concierge”.', 'bot');
  };

  if (yoyoBtn) yoyoBtn.addEventListener('click', () => setYoYoOpen(true));
  if (yoyoClose) yoyoClose.addEventListener('click', () => setYoYoOpen(false));

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

      if (action === 'shop') {
        appendMsg('Open “Shop used Teslas”.', 'user');
        window.open(LINKS.shop, '_blank', 'noopener,noreferrer');
        botReply('shop');
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

      if (action === 'outmatch') {
        appendMsg('Open “OUT‑MATCH Concierge”.', 'user');
        window.location.href = LINKS.outmatch;
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

  // ----- OUT-MATCH Concierge short form -----
  const conciergeForm = qs('#outMatchConciergeForm');
  const conciergeName = qs('#conciergeName');
  const conciergePhone = qs('#conciergePhone');
  const conciergeZip = qs('#conciergeZip');
  const conciergeMessage = qs('#conciergeMessage');
  const conciergeStatus = qs('#conciergeStatus');
  const conciergePreview = qs('#conciergePreview');
  const conciergeSummary = qs('#conciergeSummary');
  const conciergeEmailLink = qs('#conciergeEmailLink');
  const copyConciergeBtn = qs('#copyConciergeBtn');

  const syncConciergePhoneValidity = () => {
    if (!conciergePhone) return true;
    const value = conciergePhone.value.trim();
    if (!value) {
      conciergePhone.setCustomValidity('');
      return false;
    }

    const ok = validPhone(value);
    conciergePhone.setCustomValidity(ok ? '' : 'Enter a valid phone number using numbers, spaces, parentheses, dots, or +.');
    return ok;
  };

  const syncConciergeZipValidity = () => {
    if (!conciergeZip) return true;
    const value = conciergeZip.value.trim();
    if (!value) {
      conciergeZip.setCustomValidity('');
      return false;
    }

    const ok = validZip(value);
    conciergeZip.setCustomValidity(ok ? '' : 'Enter a valid ZIP code like 10001 or 10001-1234.');
    return ok;
  };

  const buildConciergeSummary = () => {
    const name = conciergeName ? conciergeName.value.trim() : '';
    const phone = conciergePhone ? conciergePhone.value.trim() : '';
    const zip = conciergeZip ? conciergeZip.value.trim() : '';
    const message = conciergeMessage ? conciergeMessage.value.trim().replace(/\n{3,}/g, '\n\n') : '';

    return [
      'OUT-MATCH Concierge lead',
      `Submitted: ${new Date().toLocaleString()}`,
      '',
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Zip Code: ${zip}`,
      '',
      'Message:',
      message,
    ].join('\n');
  };

  if (conciergeForm) {
    [conciergeName, conciergePhone, conciergeZip, conciergeMessage]
      .filter(Boolean)
      .forEach((field) => {
        field.addEventListener('input', () => {
          hideMessage(conciergeStatus);
          if (field === conciergePhone) syncConciergePhoneValidity();
          if (field === conciergeZip) syncConciergeZipValidity();
          field.setCustomValidity(field.validationMessage || '');
        });
      });

    conciergeForm.addEventListener('reset', () => {
      window.setTimeout(() => {
        hideMessage(conciergeStatus);
        if (conciergePreview) conciergePreview.hidden = true;
        if (conciergeSummary) conciergeSummary.textContent = '';
        if (conciergePhone) conciergePhone.setCustomValidity('');
        if (conciergeZip) conciergeZip.setCustomValidity('');
      }, 0);
    });

    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideMessage(conciergeStatus);
      syncConciergePhoneValidity();
      syncConciergeZipValidity();

      if (!conciergeForm.reportValidity()) {
        showMessage(conciergeStatus, 'Please complete the highlighted fields and try again.');
        return;
      }

      const name = conciergeName ? conciergeName.value.trim() : '';
      const summary = buildConciergeSummary();
      const subject = `OUT-MATCH Concierge lead${name ? ` — ${name}` : ''}`;

      if (conciergeSummary) conciergeSummary.textContent = summary;
      if (conciergeEmailLink) {
        conciergeEmailLink.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
      }
      if (conciergePreview) conciergePreview.hidden = false;

      showMessage(conciergeStatus, 'Your email draft is ready. If nothing opens, copy the message below and email Adam directly.');

      if (conciergePreview) {
        conciergePreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (conciergeEmailLink) {
        window.location.href = conciergeEmailLink.href;
      }
    });

    if (copyConciergeBtn) {
      copyConciergeBtn.addEventListener('click', async () => {
        const text = conciergeSummary ? conciergeSummary.textContent : '';
        const ok = await copyText(text);
        showMessage(
          conciergeStatus,
          ok
            ? 'Copied. You can paste the message anywhere.'
            : 'Copy did not work automatically. You can still select and copy the message manually.'
        );
      });
    }
  }

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

  // ----- Contact page form -----
  const contactForm = qs('#contactForm');
  const contactStatus = qs('#contactStatus');
  const contactName = qs('#contactName');
  const contactEmail = qs('#contactEmail');
  const contactPhone = qs('#contactPhone');
  const contactMessage = qs('#contactMessage');

  const syncContactPhoneValidity = () => {
    if (!contactPhone) return true;
    const value = contactPhone.value.trim();
    if (!value) {
      contactPhone.setCustomValidity('');
      return true;
    }

    const ok = validPhone(value);
    contactPhone.setCustomValidity(ok ? '' : 'Enter a valid phone number using numbers, spaces, parentheses, dots, or +.');
    return ok;
  };

  if (contactForm) {
    [contactName, contactEmail, contactPhone, contactMessage]
      .filter(Boolean)
      .forEach((field) => {
        field.addEventListener('input', () => {
          hideMessage(contactStatus);
          if (field === contactPhone) syncContactPhoneValidity();
          else field.setCustomValidity('');
        });
      });

    contactForm.addEventListener('reset', () => {
      window.setTimeout(() => {
        hideMessage(contactStatus);
        if (contactPhone) contactPhone.setCustomValidity('');
      }, 0);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideMessage(contactStatus);
      syncContactPhoneValidity();

      if (!contactForm.reportValidity()) {
        showMessage(contactStatus, 'Please complete the highlighted fields and try again.');
        return;
      }

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const message = String(formData.get('message') || '').trim().replace(/\n{3,}/g, '\n\n');
      const subject = `Only Used Tesla contact form${name ? ` — ${name}` : ''}`;
      const body = [
        'Only Used Tesla contact form',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        'Message:',
        message,
      ].join('\n');

      showMessage(contactStatus, 'Your email draft is ready. If nothing opens, use the direct email link on this page.');
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Social placeholder buttons
  qsa('[data-social]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const provider = btn.getAttribute('data-social');
      alert(`Placeholder: connect ${provider} OAuth here.`);
    });
  });

  // Close overlays with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      setYoYoOpen(false);
    }
  });
})();
