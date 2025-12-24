// js/dashboard.js — FINAL version with Firebase-aware inactivity logout

(function () {

  const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
  let inactivityTimer;
  let expired = false;

  function showSessionExpired() {

    if (expired) return;
    expired = true;

    // sign out of firebase if present
    if (window.firebase && firebase.auth) {
      firebase.auth().signOut().catch(() => {});
    }

    localStorage.clear();
    sessionStorage.clear();

    // disable interaction
    document.body.style.pointerEvents = "none";

    const overlay = document.createElement("div");
    overlay.id = "session-expired-overlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,.85)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    overlay.innerHTML = `
      <div style="
        background:white;
        padding:20px 16px;
        border-radius:14px;
        width:92%;
        max-width:380px;
        text-align:center;
        font-family:Arial, sans-serif;
      ">
        <h2>Session Expired</h2>
        <p>You were signed out due to inactivity.</p>
        <button id="reloginBtn"
          style="
            padding:10px 14px;
            border:none;
            background:#0033a0;
            color:white;
            border-radius:6px;
            cursor:pointer;
          ">
          Sign in again
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("reloginBtn").onclick = () => {
      if (!user) return window.location.href = "../html/login.html";

    };
  }

  function resetInactivityTimer() {
    if (expired) return;
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showSessionExpired, INACTIVITY_LIMIT);
  }

  // watch user activity
  ["mousemove","keydown","scroll","click","touchstart"].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer, true);
  });

  // when tab hidden → still expires
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(showSessionExpired, INACTIVITY_LIMIT);
    } else {
      resetInactivityTimer();
    }
  });

  // sync logout across tabs
  window.addEventListener("storage", e => {
    if (e.key === "authUser" && !e.newValue) {
      showSessionExpired();
    }
  });

  resetInactivityTimer();

})();
