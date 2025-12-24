// js/ui.js — UI helpers (toast, modal) — demo implementations
function toast(message, timeout = 3000){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(()=> { t.style.opacity = '0'; setTimeout(()=> t.remove(), 300); }, timeout);
}
