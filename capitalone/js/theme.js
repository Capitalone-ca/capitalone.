// js/theme.js — dark mode and mobile drawer interactions
(function(){
  window.toggleDarkMode = function(){
    const using = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', using ? 'true' : 'false');
  };
  if(localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark');
  }

  // Mobile drawer (if included)
  const mobileDrawer = document.getElementById('mobileDrawer');
  const open = document.getElementById('mobileDrawerToggle') || document.getElementById('openSidebar');
  const close = document.getElementById('closeDrawer');

  if(open){
    open.addEventListener('click', ()=>{
      if(mobileDrawer) mobileDrawer.setAttribute('aria-hidden','false');
    });
  }
  if(close){
    close.addEventListener('click', ()=>{
      if(mobileDrawer) mobileDrawer.setAttribute('aria-hidden','true');
    });
  }
})();
