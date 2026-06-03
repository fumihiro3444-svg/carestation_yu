function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
function switchTab(idx) {
  document.querySelectorAll('.tab-btn').forEach(function(t,i){ t.classList.toggle('active', i===idx); });
  document.querySelectorAll('.tab-panel').forEach(function(p,i){ p.classList.toggle('active', i===idx); });
}
function submitForm() {
  var name  = document.getElementById('f-name').value.trim();
  var email = document.getElementById('f-email').value.trim();
  var type  = document.getElementById('f-type').value;
  var body  = document.getElementById('f-body').value.trim();
  var err   = document.getElementById('f-error');
  var msgs  = [];
  if (!name)                          msgs.push('お名前をご入力ください');
  if (!email || !email.includes('@')) msgs.push('正しいメールアドレスをご入力ください');
  if (!type)                          msgs.push('お問い合わせ種別を選択してください');
  if (!body)                          msgs.push('お問い合わせ内容をご入力ください');
  if (msgs.length > 0) {
    err.style.display = 'block';
    err.innerHTML = msgs.join('<br>');
    return;
  }
  err.style.display = 'none';
  document.getElementById('formWrap').style.display    = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}


(function () {
  const DURATION = 6000;

  const ssData = [
    {
      tag: '居宅介護支援 ／ ヘルパーステーション',
      quote: '木漏れ日の中、一歩一歩を大切に。',
      body: '杉木立に守られた阿蘇の小径のように、おひとりおひとりに寄り添い、安心できる道を一緒に歩みます。'
    },
    {
      tag: '居宅介護支援 ／ ヘルパーステーション',
      quote: '広がる空と大地に、ほっと息をつく。',
      body: '世界最大級のカルデラを抱く阿蘇の地で、その豊かな自然の力を借りながら、笑顔あふれる暮らしを支えます。'
    },
    {
      tag: '居宅介護支援 ／ ヘルパーステーション',
      quote: '田植えの水面に、山々が宿る。',
      body: '阿蘇の水と土に育まれたこの地域で、ご自宅でのくらしを続けられるよう、ケアプランの作成からヘルパー派遣まで、きめ細やかにサポートします。'
    },
    {
      tag: '居宅介護支援 ／ ヘルパーステーション',
      quote: '風にそよぐ草原が、今日を優しく包む。',
      body: '一日の終わりに「今日もよかった」と感じていただけるように。阿蘇に生きる皆さまの日常を、心を込めてお手伝いします。'
    },
    {
      tag: 'ケアステーションゆう　阿蘇市',
      quote: '新しい朝が、静かに、優しく始まります。',
      body: '阿蘇の雄大な自然に包まれたこの場所で、「住み慣れた地域で、自分らしく」を合言葉に、ご利用者様とご家族に安心をお届けします。'
    }
  ];

  const slideEls   = document.querySelectorAll('.ss-slide');
  const dotsEl     = document.getElementById('ssDots');
  const tagEl      = document.getElementById('ssTag');
  const quoteEl    = document.getElementById('ssQuote');
  const bodyEl     = document.getElementById('ssBody');
  const progressEl = document.getElementById('ssProgress');
  const pauseBtn   = document.getElementById('ssPause');

  if (!slideEls.length) return;

  let current = 0, paused = false, timer, startTime, elapsed = 0;

  // ドット生成
  ssData.forEach(function (_, i) {
    const dot = document.createElement('div');
    dot.className = 'ss-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(dot);
  });

  // アニメーション付きでテキストを表示
  function renderContent(idx) {
    const s = ssData[idx];
    tagEl.textContent   = s.tag;
    quoteEl.textContent = s.quote;
    bodyEl.textContent  = s.body;

    // クラスをいったん除去してアニメーションをリセット
    [tagEl, quoteEl, bodyEl].forEach(function (el) {
      el.classList.remove('ss-animate', 'ss-animate-delay', 'ss-animate-delay2');
    });
    // 次フレームで付与してアニメーション発火
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        tagEl.classList.add('ss-animate');
        quoteEl.classList.add('ss-animate-delay');
        bodyEl.classList.add('ss-animate-delay2');
      });
    });
  }

  renderContent(0);

  function goTo(n) {
    const next = ((n % ssData.length) + ssData.length) % ssData.length;
    slideEls[current].classList.remove('active');
    document.querySelectorAll('.ss-dot')[current].classList.remove('active');
    current = next;
    slideEls[current].classList.add('active');
    document.querySelectorAll('.ss-dot')[current].classList.add('active');
    renderContent(current);
    elapsed = 0;
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    if (!paused) startProgress();
  }

  function startProgress() {
    clearTimeout(timer);
    startTime = Date.now();
    var remaining = DURATION - elapsed;
    progressEl.style.transition = 'width ' + remaining + 'ms linear';
    progressEl.style.width = '100%';
    timer = setTimeout(function () { elapsed = 0; goTo(current + 1); }, remaining);
  }

  function stopProgress() {
    clearTimeout(timer);
    elapsed = Math.min(elapsed + (Date.now() - startTime), DURATION);
    progressEl.style.transition = 'none';
    progressEl.style.width = (elapsed / DURATION * 100) + '%';
  }

  startProgress();

  document.getElementById('ssPrev').addEventListener('click', function () { goTo(current - 1); });
  document.getElementById('ssNext').addEventListener('click', function () { goTo(current + 1); });
  pauseBtn.addEventListener('click', function () {
    paused = !paused;
    pauseBtn.textContent = paused ? '▶' : '⏸';
    if (paused) stopProgress(); else startProgress();
  });
})();
