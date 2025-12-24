// js/dashboard.js — dashboard rendering + inactivity timeout + session expired message

(function () {
  /* =========================
     INACTIVITY AUTO-LOGOUT
     ========================= */
  const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
  let inactivityTimer;

  function showSessionExpired() {
    // Clear session/auth data
    localStorage.clear();
    sessionStorage.clear();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "session-expired-overlay";
    overlay.innerHTML = `
      <div class="session-expired-box">
        <h2>Session Expired</h2>
        <p>
          For your security, you’ve been signed out due to inactivity.
        </p>
        <button id="reloginBtn">Sign In Again</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("reloginBtn").onclick = () => {
      window.location.href = "../pages/login.html"; // adjust path if needed
    };
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showSessionExpired, INACTIVITY_LIMIT);
  }

  // Track user activity
  ["mousemove", "keydown", "scroll", "click", "touchstart"].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer, true);
  });

  // Start timer
  resetInactivityTimer();

  /* =========================
     DASHBOARD CONTENT
     ========================= */

  // Recent transactions
  const recentTx = document.getElementById("recentTx");
  if (recentTx) {
    const tx = [
      { d: "Mar 27", t: "Grocery Market", a: -54.12 },
      { d: "Jan 25", t: "Payroll deposit", a: 1500 },
      { d: "Jan 15", t: "Starbucks", a: -7.5 },
      { d: "Nov 20", t: "Zelle from M. Smith", a: 200 }
    ];

    tx.forEach(item => {
      const li = document.createElement("li");
      li.className = "tx";
      li.innerHTML = `
        <div class="tx-left">
          <div class="tx-desc">${item.t}</div>
          <div class="tx-date">${item.d}</div>
        </div>
        <div class="tx-amt ${item.a < 0 ? "neg" : "pos"}">
          ${item.a < 0 ? "-" : ""}$${Math.abs(item.a).toFixed(2)}
        </div>
      `;
      recentTx.appendChild(li);
    });
  }

  // Notifications
  const notifList = document.getElementById("notifList");
  if (notifList) {
    const notes = [
      "Security alert: New sign-in",
      "Reminder: Bill due Dec 31",
      "Life & Credit Blog Careers"
    ];

    notes.forEach(note => {
      const li = document.createElement("li");
      li.className = "notif";
      li.textContent = note;
      notifList.appendChild(li);
    });
  }

  // Animated spending chart
  const chart = document.getElementById("spendChart");
  if (chart) {
    chart.style.display = "flex";
    chart.style.alignItems = "end";
    chart.style.gap = "6px";

    const data = [120, 240, 80, 200, 180, 100, 160];

    data.forEach((val, idx) => {
      const bar = document.createElement("div");
      bar.style.width = "12px";
      bar.style.height = "6px";
      bar.style.borderRadius = "6px";
      bar.style.backgroundColor = "rgba(0,51,160,0.85)";
      bar.style.transform = "scaleY(0.08)";
      bar.style.transformOrigin = "bottom";
      bar.style.transition =
        "transform 800ms cubic-bezier(.2,.9,.2,1) " + idx * 80 + "ms";

      chart.appendChild(bar);

      requestAnimationFrame(() => {
        bar.style.transform = `scaleY(${Math.max(0.12, val / 240)})`;
      });
    });
  }
})();
