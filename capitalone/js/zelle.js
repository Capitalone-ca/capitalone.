// js/zelle.js — demo Zelle send
(function(){
  const form = document.getElementById('zelleSend');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const recipient = document.getElementById('zelleRecipient').value.trim();
    const amt = parseFloat(document.getElementById('zelleAmount').value);
    if(!recipient || isNaN(amt) || amt <= 0) return alert('Complete fields');

    showLoader('Sending via Zelle...');
    setTimeout(()=> {
      hideLoader();
      alert(`$${amt.toFixed(2)} failed sending to ${recipient}.`);
      form.reset();
    }, 1400);
  });
})();
