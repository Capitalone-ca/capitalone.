// js/otp.js — OTP via EmailJS
(function(){
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const otpForm = document.getElementById('otpForm');
  const resendOtp = document.getElementById('resendOtp');
  const otpMessage = document.getElementById('otpMessage');
  const sendOtpSection = document.getElementById('sendOtpSection');
  const resendSection = document.getElementById('resendSection');

  let pendingLogin = null;
  let userEmail = '';

  // Initialize EmailJS (replace with your public key)
  emailjs.init('nGSIAFj1QP2mcZS5B');

  function init() {
    const pending = sessionStorage.getItem('pending_login');
    if (!pending) {
      alert('No login attempt found. Redirecting to login.');
      window.location.href = 'login.html';
      return;
    }
    pendingLogin = JSON.parse(pending);
    userEmail = pendingLogin.email;
    otpMessage.textContent = `We will send a one-time passcode to ${userEmail}.`;
  }

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async function sendOtp() {
    const otp = generateOtp();
    sessionStorage.setItem('login_otp', otp);
    sessionStorage.setItem('otp_timestamp', Date.now());

    // Send email via EmailJS
    const templateParams = {
      to_email: userEmail,
      otp_code: otp
    };

    try {
      showLoader('Sending OTP...');
      // Replace with your service ID and template ID
      await emailjs.send('service_colbica', 'template_jrg5m47', templateParams);
      hideLoader();
      alert('OTP sent to your email.');
      sendOtpSection.style.display = 'none';
      otpForm.style.display = 'block';
      resendSection.style.display = 'block';
    } catch (error) {
      hideLoader();
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  }

  function verifyOtp(enteredOtp) {
    const savedOtp = sessionStorage.getItem('login_otp');
    const timestamp = sessionStorage.getItem('otp_timestamp');
    if (!savedOtp || !timestamp) {
      return false;
    }
    // OTP expires in 5 minutes
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      alert('OTP expired. Please resend.');
      return false;
    }
    return enteredOtp === savedOtp;
  }

  async function completeLogin() {
    try {
      showLoader('Signing in...');
      await firebase.auth().signInWithEmailAndPassword(pendingLogin.email, pendingLogin.password);
      sessionStorage.removeItem('pending_login');
      sessionStorage.removeItem('login_otp');
      sessionStorage.removeItem('otp_timestamp');
      hideLoader();
      window.location.href = 'dashboard.html';
    } catch (err) {
      hideLoader();
      alert('Sign in error: ' + (err.message || err));
    }
  }

  sendOtpBtn.addEventListener('click', sendOtp);

  otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const entered = document.getElementById('otpInput').value.trim();
    if (verifyOtp(entered)) {
      await completeLogin();
    } else {
      alert('Incorrect OTP.');
    }
  });

  resendOtp.addEventListener('click', (e) => {
    e.preventDefault();
    sendOtp();
  });

  init();
})();
