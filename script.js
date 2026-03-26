/* OUT-2026-home
   Minimal JS for:
   - hamburger menu
   - Yo-Yo bubble (placeholder chat)
   - OUT-MATCH intake logic
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
    shop: 'https://onlyusedtesla.com/used-tesla-for-sale',
    advertise: 'https://onlyusedtesla.com/sell-my-tesla',
    cash: 'https://onlyusedtesla.com/cash-offer',
    outcheck: 'https://adamqureshi.com/out-check-landing/',
    outmatch: 'out-match.html',
    outmatchStart: 'out-match.html#intake',
    outmatchBuyer: 'out-match.html?track=buyer#intake',
    outmatchSeller: 'out-match.html?track=seller#intake',
    outmatchBoth: 'out-match.html?track=both#intake',
    outmatchExpert: 'out-match.html?track=expert#intake',
    dealer: 'dealer.html',
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
      t.includes('price my') ||
      t.includes('screen buyer') ||
      t.includes('screening buyer') ||
      t.includes('tire kicker') ||
      t.includes('market my') ||
      t.includes('video') ||
      t.includes('pricing') ||
      (t.includes('sell') && (t.includes('help') || t.includes('agent') || t.includes('tesla'))) ||
      ((t.includes('cash') || t.includes('offer')) && (t.includes('seller') || t.includes('price') || t.includes('my tesla')));

    const expertIntent =
      t.includes('side hustle') ||
      t.includes('apply as') ||
      t.includes('apply') ||
      t.includes('former tesla') ||
      t.includes('worked at tesla') ||
      t.includes('out agent') ||
      t.includes('become an agent');

    const buyerIntent =
      t.includes('second look') ||
      t.includes('already found') ||
      t.includes('found a tesla') ||
      t.includes('help buying') ||
      (t.includes('buy') && t.includes('tesla')) ||
      (t.includes('concierge') && !sellerIntent && !expertIntent);

    if (expertIntent) {
      appendMsg('Want to become an OUT Agent? The expert track uses the same intake form.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatchExpert}">Apply as an OUT Agent</a>`, 'bot');
      return;
    }

    if (sellerIntent) {
      appendMsg('OUT‑MATCH can help you sell with pricing, cash-offer benchmarking, listing help, buyer screening, and closing guidance.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatchSeller}">Open seller intake</a>`, 'bot');
      return;
    }

    if (buyerIntent) {
      appendMsg('OUT‑MATCH can help you buy the right Tesla or give a second look on one you already found.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatchBuyer}">Open buyer intake</a>`, 'bot');
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

    if (t.includes('match') || t.includes('specialist') || t.includes('expert')) {
      appendMsg('OUT‑MATCH now has one smart intake for buyers, sellers, and future OUT Agents.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.outmatchStart}">Open OUT‑MATCH intake</a>`, 'bot');
      return;
    }

    if (t.includes('shop') || t.includes('browse') || t.includes('buy')) {
      appendMsg('Let’s shop Tesla‑only listings.', 'bot');
      appendMsg(`<a class="link" href="${LINKS.shop}" target="_blank" rel="noopener">Open listings</a>`, 'bot');
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

    appendMsg('Got it. Quick options: “Shop”, “Advertise”, “Cash offer”, “OUT‑CHECK”, or “OUT‑MATCH”.', 'bot');
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
        appendMsg('Open “OUT‑MATCH”.', 'user');
        window.location.href = LINKS.outmatchStart;
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

  // ----- OUT-MATCH intake form -----
  const intakeSection = qs('#intake');
  const intakeForm = qs('#outMatchIntakeForm');
  const intakeRole = qs('#intakeRole');
  const intakeTrackHint = qs('#intakeTrackHint');
  const buildIntakeBtn = qs('#buildIntakeBtn');
  const intakeMessage = qs('#intakeMessage');
  const intakePreview = qs('#intakePreview');
  const intakeSummary = qs('#intakeSummary');
  const copyIntakeBtn = qs('#copyIntakeBtn');
  const emailIntakeLink = qs('#emailIntakeLink');
  const roleSections = {
    buyer: qs('[data-role-section="buyer"]'),
    seller: qs('[data-role-section="seller"]'),
    expert: qs('[data-role-section="expert"]'),
  };

  const allowedIntakeRoles = ['buyer', 'seller', 'both', 'expert'];
  const roleButtonText = {
    buyer: 'Build buyer intake',
    seller: 'Build seller intake',
    both: 'Build buy + sell intake',
    expert: 'Build OUT Agent application',
    default: 'Build my intake',
  };
  const roleHints = {
    buyer: 'Tell us the Tesla you want, your budget, and whether you already found a listing.',
    seller: 'Tell us the Tesla, mileage, and whether you care more about speed, pricing confidence, or both.',
    both: 'Tell us both sides so Adam can see the full transaction picture.',
    expert: 'Former Tesla people and owners with real depth are strong fits. Use this track to apply as an OUT Agent.',
    default: 'Pick the right track first. For the pilot, Adam reviews the first fit calls personally before deeper concierge work starts.',
  };

  const roleSubject = {
    buyer: 'OUT-MATCH buyer intake',
    seller: 'OUT-MATCH seller intake',
    both: 'OUT-MATCH buy + sell intake',
    expert: 'OUT-MATCH OUT Agent application',
  };

  const trackButtons = qsa('[data-intake-path]');

  const setSectionState = (section, show) => {
    if (!section) return;
    section.hidden = !show;
    qsa('input, select, textarea', section).forEach((field) => {
      field.disabled = !show;
    });
  };

  const roleMatches = (requiredFor, activeRole) => {
    if (!requiredFor || !activeRole) return false;
    return String(requiredFor)
      .split(',')
      .map((part) => part.trim())
      .includes(activeRole);
  };

  const syncIntakeRole = (role) => {
    const activeRole = allowedIntakeRoles.includes(role) ? role : '';
    const showBuyer = activeRole === 'buyer' || activeRole === 'both';
    const showSeller = activeRole === 'seller' || activeRole === 'both';
    const showExpert = activeRole === 'expert';

    if (intakeRole) intakeRole.value = activeRole;
    setSectionState(roleSections.buyer, showBuyer);
    setSectionState(roleSections.seller, showSeller);
    setSectionState(roleSections.expert, showExpert);

    qsa('[data-required-for]').forEach((field) => {
      field.required = roleMatches(field.getAttribute('data-required-for'), activeRole);
    });

    if (buildIntakeBtn) {
      buildIntakeBtn.textContent = roleButtonText[activeRole] || roleButtonText.default;
    }

    if (intakeTrackHint) {
      intakeTrackHint.textContent = roleHints[activeRole] || roleHints.default;
    }
  };

  const showIntakeMessage = (text) => {
    if (!intakeMessage) return;
    intakeMessage.textContent = text;
    intakeMessage.hidden = false;
  };

  const hideIntakeMessage = () => {
    if (!intakeMessage) return;
    intakeMessage.hidden = true;
    intakeMessage.textContent = '';
  };

  const copyText = async (text) => {
    if (!text) return false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // fall back below
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

  const valueOf = (formData, name) => String(formData.get(name) || '').trim();

  const pushIf = (lines, label, value) => {
    if (!value) return;
    lines.push(`${label}: ${value}`);
  };

  const buildSummary = (role, formData) => {
    const lines = [];
    const roleLabel = roleSubject[role] || 'OUT-MATCH intake';

    lines.push(roleLabel);
    lines.push(`Submitted: ${new Date().toLocaleString()}`);
    lines.push('');
    lines.push('CONTACT');
    pushIf(lines, 'Name', valueOf(formData, 'full_name'));
    pushIf(lines, 'Email', valueOf(formData, 'email'));
    pushIf(lines, 'Phone', valueOf(formData, 'phone'));
    pushIf(lines, 'Location', valueOf(formData, 'location'));
    pushIf(lines, 'Best contact', valueOf(formData, 'best_contact'));

    if (role === 'buyer' || role === 'both') {
      lines.push('');
      lines.push('BUYER TRACK');
      pushIf(lines, 'Target Tesla', valueOf(formData, 'buyer_target'));
      pushIf(lines, 'Budget', valueOf(formData, 'buyer_budget'));
      pushIf(lines, 'Main help needed', valueOf(formData, 'buyer_help'));
      pushIf(lines, 'Timeline', valueOf(formData, 'buyer_timing'));
      pushIf(lines, 'Listing link', valueOf(formData, 'buyer_listing'));
      pushIf(lines, 'Notes', valueOf(formData, 'buyer_notes'));
    }

    if (role === 'seller' || role === 'both') {
      lines.push('');
      lines.push('SELLER TRACK');
      pushIf(lines, 'Tesla', valueOf(formData, 'seller_tesla'));
      pushIf(lines, 'Mileage', valueOf(formData, 'seller_mileage'));
      pushIf(lines, 'Priority', valueOf(formData, 'seller_priority'));
      pushIf(lines, 'Main help needed', valueOf(formData, 'seller_need'));
      pushIf(lines, 'Current ask', valueOf(formData, 'seller_ask'));
      pushIf(lines, 'Best cash offer', valueOf(formData, 'seller_cash_offer'));
      pushIf(lines, 'Listing link', valueOf(formData, 'seller_listing'));
      pushIf(lines, 'Notes', valueOf(formData, 'seller_notes'));
    }

    if (role === 'expert') {
      lines.push('');
      lines.push('FUTURE OUT AGENT TRACK');
      pushIf(lines, 'Background', valueOf(formData, 'expert_background'));
      pushIf(lines, 'Tesla model', valueOf(formData, 'expert_tesla'));
      pushIf(lines, 'Years owned', valueOf(formData, 'expert_years_owned'));
      pushIf(lines, 'Tesla work background', valueOf(formData, 'expert_role'));
      pushIf(lines, 'How they can help', valueOf(formData, 'expert_help'));
      pushIf(lines, 'Hours per week', valueOf(formData, 'expert_availability'));
      pushIf(lines, 'Region / time zone', valueOf(formData, 'expert_region'));
      pushIf(lines, 'LinkedIn / website', valueOf(formData, 'expert_link'));
      pushIf(lines, 'Why they are a fit', valueOf(formData, 'expert_why'));
    }

    const generalNotes = valueOf(formData, 'general_notes');
    if (generalNotes) {
      lines.push('');
      lines.push('GENERAL NOTES');
      lines.push(generalNotes);
    }

    return lines.join('\n').replace(/\n{3,}/g, '\n\n');
  };

  if (intakeForm && intakeRole) {
    const queryTrack = new URLSearchParams(window.location.search).get('track');
    syncIntakeRole(queryTrack || intakeRole.value);

    intakeRole.addEventListener('change', () => {
      hideIntakeMessage();
      syncIntakeRole(intakeRole.value);
    });

    intakeForm.addEventListener('reset', () => {
      window.setTimeout(() => {
        syncIntakeRole('');
        hideIntakeMessage();
        if (intakePreview) intakePreview.hidden = true;
        if (intakeSummary) intakeSummary.textContent = '';
      }, 0);
    });

    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideIntakeMessage();

      const activeRole = intakeRole.value;
      syncIntakeRole(activeRole);

      if (!allowedIntakeRoles.includes(activeRole)) {
        showIntakeMessage('Choose the right intake track first.');
        intakeRole.focus();
        return;
      }

      if (!intakeForm.reportValidity()) {
        showIntakeMessage('Please complete the highlighted fields and try again.');
        return;
      }

      const formData = new FormData(intakeForm);
      const summary = buildSummary(activeRole, formData);
      const name = valueOf(formData, 'full_name');
      const subject = `${roleSubject[activeRole] || 'OUT-MATCH intake'}${name ? ` — ${name}` : ''}`;

      if (intakeSummary) intakeSummary.textContent = summary;
      if (emailIntakeLink) {
        emailIntakeLink.href = `mailto:hello@onlyusedtesla.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
      }
      if (intakePreview) intakePreview.hidden = false;

      showIntakeMessage('Your intake summary is ready. Copy it or open the draft email below.');

      if (intakePreview) {
        intakePreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    if (copyIntakeBtn) {
      copyIntakeBtn.addEventListener('click', async () => {
        const text = intakeSummary ? intakeSummary.textContent : '';
        const ok = await copyText(text);
        showIntakeMessage(ok ? 'Copied. You can paste the intake anywhere.' : 'Copy did not work automatically. You can still select and copy the summary.');
      });
    }
  }

  trackButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!intakeSection || !intakeRole) return;
      const role = btn.getAttribute('data-intake-path');
      if (!allowedIntakeRoles.includes(role)) return;

      if (btn.getAttribute('href') && btn.getAttribute('href').includes('#intake')) {
        e.preventDefault();
      }

      hideIntakeMessage();
      syncIntakeRole(role);
      intakeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const nextUrl = `${window.location.pathname}?track=${role}#intake`;
      window.history.replaceState({}, '', nextUrl);
    });
  });

  // Close overlays with ESC
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
