// js/auth.js — Firebase auth handlers (compat)
(function(){
  // Elements
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Password toggle functionality
  function initPasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('.eye-icon');

        if (input.type === 'password') {
          input.type = 'text';
          // Change to eye-off icon
          icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        } else {
          input.type = 'password';
          // Change back to eye icon
          icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
      });
    });
  }

  // Initialize password toggles
  initPasswordToggles();

  // Login
  if(loginForm){
    loginForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      // Store temporarily
      sessionStorage.setItem('pending_login', JSON.stringify({email, password}));
      window.location.href = 'otp.html';
    });
  }

  // Register
  if(registerForm){
    registerForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      try{
        showLoader('Creating account...');
        const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if(userCred.user && name) await userCred.user.updateProfile({displayName: name});
        hideLoader();
        window.location.href = 'dashboard.html';
      }catch(err){
        hideLoader();
        alert('Registration error: ' + (err.message || err));
      }
    });
  }

  // Google sign-in
  window.googleLogin = async function(){
    try{
      showLoader('Signing in with Google...');
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      hideLoader();
      window.location.href = 'dashboard.html';
    }catch(err){
      hideLoader();
      alert('Google sign-in error: ' + (err.message || err));
    }
  };

  // Optional: sign out helper
  window.signOutUser = async function(){
    try{
      await firebase.auth().signOut();
      window.location.href = 'login.html';
    }catch(e){
      console.error(e);
    }
  };

})();
