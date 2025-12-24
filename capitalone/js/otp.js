// js/otp.js — OTP via EmailJS
(function () {

  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const otpForm = document.getElementById('otpForm');
  const resendOtp = document.getElementById('resendOtp');
  const otpMessage = document.getElementById('otpMessage');
  const sendOtpSection = document.getElementById('sendOtpSection');
  const resendSection = document.getElementById('resendSection');

  let pendingLogin = null;
  let userEmail = '';

  // Initialize EmailJS
  emailjs.init('nGSIAFj1QP2mcZS5B');

  function maskEmail(email) {
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;
    return name.charAt(0) + '***@' + domain;
  }

  function init() {
    const pending = sessionStorage.getItem('pending_login');
    if (!pending) {
      window.location.href = 'login.html';
      return;
    }

    pendingLogin = JSON.parse(pending);
    userEmail = pendingLogin.email;

    otpMessage.textContent = '';
  }

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async function sendOtp() {
    const otp = generateOtp();

    sessionStorage.setItem('login_otp', otp);
    sessionStorage.setItem('otp_timestamp', Date.now());

    const templateParams = {
      to_email: userEmail,
      otp_code: otp
    };

    try {
      showLoader('Sending OTP...');
      await emailjs.send('service_colbica', 'template_jrg5m47', templateParams);
      hideLoader();

      const masked = maskEmail(userEmail);
      otpMessage.textContent = `OTP has been sent to ${masked}.`;

      sendOtpSection.style.display = 'none';
      otpForm.style.display = 'block';
      resendSection.style.display = 'block';

    } catch (error) {
      hideLoader();
      alert('Failed to send OTP. Please try again.');
      console.error(error);
    }
  }

  function verifyOtp(enteredOtp) {
    const savedOtp = sessionStorage.getItem('login_otp');
    const timestamp = sessionStorage.getItem('otp_timestamp');

    if (!savedOtp || !timestamp) return false;

    if (Date.now() - timestamp > 5 * 60 * 1000) {
      alert('OTP expired. Please resend.');
      return false;
    }

    return enteredOtp === savedOtp;
  }

  async function completeLogin() {
    try {
      showLoader('Signing in...');
      await firebase.auth().signInWithEmailAndPassword(
        pendingLogin.email,
        pendingLogin.password
      );

      sessionStorage.clear();
      hideLoader();
      window.location.href = 'dashboard.html';

    } catch (err) {
      hideLoader();
      alert('Sign in error.');
      console.error(err);
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
