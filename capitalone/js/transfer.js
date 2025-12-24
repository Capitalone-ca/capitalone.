// js/transfer.js — demo transfer flow, requires OTP > $500
(function(){
  const form = document.getElementById('transferForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const from = document.getElementById('fromAccount').value;
    const to = document.getElementById('toAccount').value;
    const amt = parseFloat(document.getElementById('transferAmount').value);
    if(isNaN(amt) || amt <= 0){ return alert('Enter valid amount'); }

    showLoader('Preparing transfer...');
    setTimeout(()=> {
      hideLoader();
      if(amt > 500){
        sessionStorage.setItem('pending_transfer', JSON.stringify({from,to,amt}));
        sessionStorage.setItem('demo_otp', '123456');
        window.location.href = 'otp.html';
      } else {
        showLoader('Processing transfer...');
        setTimeout(()=> {
          hideLoader();
          alert(`Your account is temporarily unavailable due to scheduled maintenance.
Please visit your nearest Capital One branch with your deployment return letter for further assistance. .`);
          window.location.href = 'dashboard.html';
        }, 1200);
      }
    }, 900);
  });

})();
