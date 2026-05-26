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
