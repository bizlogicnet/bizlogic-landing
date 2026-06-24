(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navActions.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
      navActions.classList.remove('open');
    });
  });

  const counters = document.querySelectorAll('[data-count]');
  let counted = false;

  const runCounters = () => {
    if (counted) return;
    const el = document.getElementById('trust');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;
    counted = true;
    counters.forEach((node) => {
      const end = parseInt(node.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.floor(eased * end).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = end.toLocaleString() + '+';
      };
      requestAnimationFrame(tick);
    });
  };

  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();

  const agenticUseCases = {
    idp: {
      title: 'Intelligent document processing',
      body: 'Classify, extract, and route documents from uploads, email, and partner channels into the right BizHeart or Obo workflow.',
      points: [
        'Structured fields from PDFs, scans, and attachments',
        'Confidence thresholds and manual review queues',
        'Native handoff to scoring and onboarding flows',
      ],
      stack: 'Powered by <strong>BizHeart</strong> · <strong>Mando</strong> integrations',
    },
    lead: {
      title: 'Email & document → lead',
      body: 'Turn inbound messages and attachments into structured leads — synced to CRM, core, or Obo onboarding queues.',
      points: [
        'Parse email threads and extract applicant intent',
        'Create or enrich CRM and pipeline records automatically',
        'Kick off Obo onboarding when the lead is qualified',
      ],
      stack: 'Powered by <strong>Obo</strong> · <strong>Mando</strong> · CRM integrations',
    },
    scoring: {
      title: 'Cascade scoring models',
      body: 'Chain bureau data, rules engines, and ML endpoints with governed fallbacks and full audit trails.',
      points: [
        'Waterfall across bureau, rules, and external ML models',
        'Explainable outcomes with versioned policy snapshots',
        'Automatic fallback paths when a provider is unavailable',
      ],
      stack: 'Powered by <strong>BizHeart</strong> decisioning · bureau APIs',
    },
    onboarding: {
      title: 'Customer interaction for onboarding',
      body: 'Guide applicants through Obo flows — collect missing data, resolve exceptions, and advance KYC in conversation.',
      points: [
        'Conversational collection of stipulations and documents',
        'Identity and bureau checks triggered in context',
        'Seamless handoff to human agents when policy requires',
      ],
      stack: 'Powered by <strong>Obo</strong> · <strong>Agentic</strong> dialogue',
    },
    underwriting: {
      title: 'Automated underwriting',
      body: 'Policy-bound credit decisions with confidence thresholds, stipulations, and human-in-the-loop escalation.',
      points: [
        'Approve, stipulate, or refer based on risk policy',
        'Human review queues for edge cases and high exposure',
        'Full audit log for regulators and internal risk teams',
      ],
      stack: 'Powered by <strong>BizHeart</strong> · <strong>Agentic</strong> guardrails',
    },
    orchestration: {
      title: 'Cross-system orchestration',
      body: 'Agents coordinate actions across BizHeart modules, Mando apps, integrations, and external providers in production.',
      points: [
        'MCP-style tool routing across your connected stack',
        'Dependency management between parallel workflow steps',
        'Operational alerts, reconciliation, and core sync',
      ],
      stack: 'Powered by <strong>Mando</strong> · <strong>BizHeart</strong> · integrations',
    },
  };

  const archRoot = document.getElementById('agentic-arch');
  const detailPanel = document.getElementById('agentic-detail');

  if (archRoot && detailPanel) {
    const titleEl = detailPanel.querySelector('.agentic-detail-title');
    const bodyEl = detailPanel.querySelector('.agentic-detail-body');
    const pointsEl = detailPanel.querySelector('.agentic-detail-points');
    const stackEl = detailPanel.querySelector('.agentic-detail-stack');
    const tabs = archRoot.querySelectorAll('.arch-usecase');

    const renderUseCase = (key, tab) => {
      const data = agenticUseCases[key];
      if (!data) return;

      titleEl.textContent = data.title;
      bodyEl.textContent = data.body;
      pointsEl.innerHTML = data.points.map((point) => `<li>${point}</li>`).join('');
      stackEl.innerHTML = data.stack;

      tabs.forEach((node) => {
        const active = node === tab;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      detailPanel.setAttribute('aria-labelledby', tab.id);
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        renderUseCase(tab.dataset.usecase, tab);
      });
    });
  }

  const howRoot = document.getElementById('how-onboarding');

  if (howRoot) {
    const chatApp = document.getElementById('demo-chat');
    const messagesEl = document.getElementById('how-chat-messages');
    const typingEl = document.getElementById('how-chat-typing');
    const chipsEl = document.getElementById('how-chat-chips');
    const formEl = document.getElementById('how-chat-form');
    const inputEl = document.getElementById('how-chat-input');
    const playBtn = document.getElementById('how-play-demo');
    const resetBtn = document.getElementById('how-reset-demo');
    const howSteps = howRoot.querySelectorAll('.how-step');

    const ctxEls = {
      kyc: document.getElementById('how-ctx-kyc'),
      bureau: document.getElementById('how-ctx-bureau'),
      score: document.getElementById('how-ctx-score'),
      decision: document.getElementById('how-ctx-decision'),
    };

    const ctxItems = howRoot.querySelectorAll('.how-context-item');

    const chipSets = {
      context: ['What documents do you have?', 'How long will this take?'],
      plan: ['Walk me through the steps', 'Will you pull my bureau report?'],
      iterate: ['Upload clearer ID photo', "What's my score?", 'What else do you need?'],
      resolve: ['Send me the offer details', 'When will funds arrive?'],
      idle: ['Play the full demo', 'What is my application status?'],
    };

    const keywordReplies = [
      { match: /status|progress|where/i, reply: 'Your application is in progress. I can see your file in Obo — I\'ll update you after each verification step.', phase: null },
      { match: /score|credit/i, reply: 'Your preliminary score is **712** after the bureau pull and cascade scoring. One more document may be needed to finalize.', phase: 'iterate', ctx: { score: '712' } },
      { match: /document|upload|id|photo|cedula/i, reply: 'Please upload a clear photo of the front of your ID. Good lighting, all corners visible, no glare.', phase: 'iterate' },
      { match: /bureau|equifax|report/i, reply: 'I\'ll pull your bureau report as part of the scoring cascade — it\'s a standard step governed by your consent and our policy engine.', phase: 'plan' },
      { match: /approve|decision|offer/i, reply: 'Once verification completes, I\'ll apply your credit policy automatically. If approved, you\'ll see rate, payment, and stipulations here in chat.', phase: 'resolve' },
      { match: /how long|time|wait/i, reply: 'Most applicants finish in minutes. I\'ll guide you step by step — you won\'t need to call or re-enter data elsewhere.', phase: null },
      { match: /help|what can you/i, reply: 'I can verify documents, run KYC and bureau checks, score your application, request missing items, and deliver a governed approve / stipulate / escalate decision.', phase: null },
      { match: /demo|play/i, reply: null, action: 'play' },
    ];

    const demoScript = [
      { step: 'context' },
      { agent: 'Welcome, María! I\'ve received your personal loan application through Obo. I\'m loading your documents and product rules now.', pause: 900 },
      { tool: 'obo.load_application', label: 'Application · María G. · personal loan' },
      { tool: 'policy.load_rules', label: 'Policy engine · v2.3' },
      { pause: 600 },
      { step: 'plan' },
      { agent: 'Here\'s the plan: verify your ID, pull your bureau report, run our scoring cascade, and collect any remaining items. I\'ll keep you posted at each step.', pause: 1000 },
      { tool: 'agentic.create_plan', label: 'Plan · 4 steps · governed' },
      { pause: 700 },
      { step: 'iterate' },
      { agent: 'Your ID photo is a bit blurry. Could you upload a clearer image of the front of your cédula?', pause: 1100 },
      { chips: ['Upload clearer ID photo'] },
      { user: 'Upload clearer ID photo', pause: 400 },
      { tool: 'onfido.verify_document', label: 'KYC · document verification' },
      { ctx: { kyc: 'Passed', bureau: 'Pulling…' }, pause: 900 },
      { agent: 'KYC passed. Pulling your bureau report and running the scoring cascade…', pause: 800 },
      { tool: 'equifax.pull', label: 'Bureau pull · Equifax' },
      { tool: 'bizheart.cascade_score', label: 'Cascade · rules → ML endpoint' },
      { ctx: { bureau: 'Complete', score: '712' }, pause: 900 },
      { agent: 'Preliminary score: **712**. I need one more item — a recent bank statement to finalize underwriting.', pause: 1000 },
      { chips: ['Upload bank statement', "What's my score?"] },
      { user: 'Upload bank statement', pause: 500 },
      { tool: 'obo.collect_document', label: 'Document · bank_statement.pdf' },
      { pause: 700 },
      { step: 'resolve' },
      { agent: 'Great news — you\'re **approved with stipulations**. Monthly payment **$245** at **18.4% APR**. Syncing to core and sending your offer now.', pause: 1100 },
      { tool: 'policy.evaluate', label: 'Guardrails · HITL not required' },
      { tool: 'core.sync', label: 'Core banking · account created' },
      { ctx: { decision: 'Approved' }, pause: 500 },
      { agent: 'Done! Check your email for the formal offer. Ask me anything about next steps.', pause: 0 },
      { chips: ['Send me the offer details', 'When will funds arrive?'] },
    ];

    let phase = 'context';
    let playing = false;
    let playToken = 0;
    let lastHintPhase = null;

    const stepHints = {
      context: 'I\'m reading your Obo application, uploaded documents, and product rules — that\'s my grounding before any action.',
      plan: 'I\'ve mapped the next steps: ID verification, bureau pull, cascade scoring, and any stipulations your policy requires.',
      iterate: 'This is where we interact — I\'ll ask for missing items, run KYC and bureau checks, and re-score as new data arrives.',
      resolve: 'When guardrails pass, I approve or stipulate and sync to core. If not, I escalate with full context for your team.',
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const setPhase = (step) => {
      phase = step;
      howSteps.forEach((node) => {
        const active = node.dataset.step === step;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderChips(chipSets[step] || chipSets.idle);
    };

    const setContext = (updates) => {
      Object.entries(updates).forEach(([key, value]) => {
        if (!ctxEls[key]) return;
        ctxEls[key].textContent = value;
        const item = howRoot.querySelector(`.how-context-item[data-key="${key}"]`);
        if (!item) return;
        item.classList.remove('is-ok', 'is-pending');
        if (/pass|complete|approved|712/i.test(String(value))) item.classList.add('is-ok');
        else if (/pending|pulling|progress/i.test(String(value))) item.classList.add('is-pending');
      });
    };

    const resetContext = () => {
      setContext({ kyc: 'Pending', bureau: '—', score: '—', decision: 'In progress' });
      ctxItems.forEach((item) => item.classList.remove('is-ok', 'is-pending'));
      howRoot.querySelector('.how-context-item[data-key="kyc"]')?.classList.add('is-pending');
    };

    const scrollMessages = () => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    const appendMessage = (type, text) => {
      const row = document.createElement('div');
      row.className = `how-msg how-msg-${type}`;

      if (type === 'tool') {
        row.innerHTML = `<div class="how-msg-bubble"><span class="how-tool-icon">⚡</span><span>${text}</span></div>`;
      } else {
        const avatar = type === 'agent' ? '<span class="how-chat-avatar how-chat-avatar-sm" aria-hidden="true">◇</span>' : '';
        const html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        row.innerHTML = `${avatar}<div class="how-msg-bubble">${html}</div>`;
      }

      messagesEl.appendChild(row);
      scrollMessages();

      if (type === 'tool') {
        window.setTimeout(() => {
          row.querySelector('.how-tool-icon')?.classList.add('is-done');
        }, 400);
      }
    };

    const showTyping = (show) => {
      typingEl.hidden = !show;
      scrollMessages();
    };

    const renderChips = (labels) => {
      chipsEl.innerHTML = '';
      labels.forEach((label) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'how-chat-chip';
        chip.textContent = label;
        chip.addEventListener('click', () => handleUserMessage(label));
        chipsEl.appendChild(chip);
      });
    };

    const agentReply = async (text, pause = 700) => {
      showTyping(true);
      await sleep(pause);
      showTyping(false);
      appendMessage('agent', text);
    };

    const handleUserMessage = async (text) => {
      if (playing) return;
      appendMessage('user', text);
      inputEl.value = '';
      renderChips([]);

      const keyword = keywordReplies.find((entry) => entry.match.test(text));
      if (keyword?.action === 'play') {
        runDemo();
        return;
      }

      if (keyword) {
        if (keyword.phase) setPhase(keyword.phase);
        if (keyword.ctx) setContext(keyword.ctx);
        await agentReply(keyword.reply, 600 + Math.random() * 400);
        renderChips(chipSets[phase] || chipSets.idle);
        return;
      }

      await agentReply('I\'m here to help with your onboarding. Try asking about your **status**, **documents**, **score**, or tap a suggested reply below.', 700);
      renderChips(chipSets[phase] || chipSets.idle);
    };

    const runDemo = async () => {
      const token = ++playToken;
      playing = true;
      chatApp.classList.add('is-playing');
      playBtn.disabled = true;
      playBtn.textContent = 'Playing…';
      messagesEl.innerHTML = '';
      resetContext();
      setPhase('context');
      renderChips([]);

      for (const item of demoScript) {
        if (token !== playToken) return;

        if (item.step) setPhase(item.step);
        if (item.ctx) setContext(item.ctx);
        if (item.tool) {
          appendMessage('tool', item.label || item.tool);
          await sleep(500);
        }
        if (item.agent) await agentReply(item.agent, item.pause ?? 800);
        if (item.user) {
          await sleep(item.pause ?? 300);
          appendMessage('user', item.user);
        }
        if (item.chips) renderChips(item.chips);
        if (item.pause && !item.agent && !item.user) await sleep(item.pause);
      }

      if (token !== playToken) return;
      playing = false;
      chatApp.classList.remove('is-playing');
      playBtn.disabled = false;
      playBtn.textContent = '▶ Play demo';
    };

    const resetDemo = () => {
      playToken += 1;
      playing = false;
      chatApp.classList.remove('is-playing');
      playBtn.disabled = false;
      playBtn.textContent = '▶ Play demo';
      lastHintPhase = null;
      messagesEl.innerHTML = '';
      resetContext();
      setPhase('context');
      renderChips(chipSets.context);
      agentReply('Welcome! Tap **Play demo** to watch AI-driven onboarding, or ask me anything about your application.', 400);
    };

    howSteps.forEach((step) => {
      step.addEventListener('click', async () => {
        if (playing) return;
        const key = step.dataset.step;
        setPhase(key);
        if (key !== lastHintPhase && stepHints[key]) {
          lastHintPhase = key;
          await agentReply(stepHints[key], 550);
          renderChips(chipSets[key] || chipSets.idle);
        }
      });
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (!text) return;
      handleUserMessage(text);
    });

    playBtn.addEventListener('click', runDemo);
    resetBtn.addEventListener('click', resetDemo);

    resetDemo();
  }

  const integrationRows = [
    {
      items: [
        { name: 'Amazon Web Services', tag: 'Infrastructure', icon: 'amazonaws', color: 'FF9900', featured: true },
        { name: 'Salesforce', tag: 'CRM', icon: 'salesforce', color: '00A1E0' },
        { name: 'HubSpot', tag: 'CRM', icon: 'hubspot', color: 'FF7A59' },
        { name: 'Microsoft Dynamics', tag: 'CRM / ERP', icon: 'microsoft', color: '00A4EF' },
        { name: 'Zoho CRM', tag: 'CRM', icon: 'zoho', color: 'C8202B' },
        { name: 'SAP', tag: 'ERP', icon: 'sap', color: '0FAAFF' },
        { name: 'Oracle', tag: 'ERP', icon: 'oracle', color: 'F80000' },
        { name: 'NetSuite', tag: 'ERP', mark: 'NS', markColor: '#125580' },
      ],
    },
    {
      reverse: true,
      items: [
        { name: 'DocuSign', tag: 'E-signature', icon: 'docusign', color: 'FFCC22' },
        { name: 'Adobe Sign', tag: 'E-signature', icon: 'adobe', color: 'FF0000' },
        { name: 'Onfido', tag: 'KYC / IDV', mark: 'ON', markColor: '#3640D8' },
        { name: 'Jumio', tag: 'KYC / IDV', mark: 'JU', markColor: '#1a56db' },
        { name: 'Trulioo', tag: 'KYC / IDV', mark: 'TR', markColor: '#0d9488' },
        { name: 'Snowflake', tag: 'Data warehouse', icon: 'snowflake', color: '29B5E8' },
        { name: 'Databricks', tag: 'ML platform', icon: 'databricks', color: 'FF3621' },
        { name: 'Equifax', tag: 'Credit bureau', mark: 'EQ', markColor: '#b91c1c' },
        { name: 'TransUnion', tag: 'Credit bureau', mark: 'TU', markColor: '#0369a1' },
        { name: 'Experian', tag: 'Credit bureau', mark: 'EX', markColor: '#7c3aed' },
      ],
    },
    {
      items: [
        { name: 'Stripe', tag: 'Payments', icon: 'stripe', color: '635BFF' },
        { name: 'Core banking', tag: 'Banking', mark: 'CB', markColor: '#0891b2' },
        { name: 'Twilio', tag: 'Comms', icon: 'twilio', color: 'F22F46' },
        { name: 'SendGrid', tag: 'Email', mark: 'SG', markColor: '#51A9E3' },
        { name: 'Slack', tag: 'Collaboration', icon: 'slack', color: 'E01E5A' },
        { name: 'Microsoft 365', tag: 'Productivity', icon: 'microsoft', color: '00A4EF' },
        { name: 'Google Workspace', tag: 'Productivity', icon: 'google', color: '4285F4' },
        { name: 'Payment processors', tag: 'Payments', mark: 'PP', markColor: '#ea580c' },
        { name: 'Custom ML endpoints', tag: 'Intelligence', mark: 'ML', markColor: '#059669' },
      ],
    },
  ];

  const marqueesRoot = document.getElementById('integration-marquees');

  if (marqueesRoot) {
    const iconSrc = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;

    const fallbackMark = (item) => {
      if (item.fallbackMark) return item.fallbackMark;
      return item.name
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    };

    const renderLogo = (item) => {
      if (item.mark) {
        return `<span class="integration-logo integration-logo-mark" style="--mark-color:${item.markColor}">${item.mark}</span>`;
      }
      const mark = fallbackMark(item);
      const markColor = item.color ? `#${item.color}` : '#0891b2';
      return `<img class="integration-logo" src="${iconSrc(item.icon, item.color)}" alt="" width="32" height="32" loading="lazy" data-fallback-mark="${mark}" data-fallback-color="${markColor}">`;
    };

    const mountLogoFallback = (img) => {
      img.addEventListener('error', () => {
        const span = document.createElement('span');
        span.className = 'integration-logo integration-logo-mark';
        span.style.setProperty('--mark-color', img.dataset.fallbackColor || '#0891b2');
        span.textContent = img.dataset.fallbackMark || '?';
        img.replaceWith(span);
      }, { once: true });
    };

    const renderCard = (item) => `
      <article class="integration-card${item.featured ? ' featured' : ''}">
        ${renderLogo(item)}
        <div class="integration-card-body">
          <strong>${item.name}</strong>
          <span class="integration-tag">${item.tag}</span>
        </div>
      </article>`;

    const renderSet = (items) => items.map(renderCard).join('');

    integrationRows.forEach((row) => {
      const marquee = document.createElement('div');
      marquee.className = `integration-marquee${row.reverse ? ' reverse' : ''}`;

      const track = document.createElement('div');
      track.className = 'integration-track';

      const html = renderSet(row.items);
      track.innerHTML = `<div class="integration-set">${html}</div><div class="integration-set" aria-hidden="true">${html}</div>`;

      marquee.appendChild(track);
      marqueesRoot.appendChild(marquee);
    });

    marqueesRoot.querySelectorAll('img.integration-logo').forEach(mountLogoFallback);
  }
})();
