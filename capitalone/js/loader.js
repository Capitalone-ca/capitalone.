// js/loader.js

// Create loader UI if it doesn't exist
document.addEventListener("DOMContentLoaded", () => {
    let loader = document.getElementById("globalLoader");
    
    if (!loader) {
        const div = document.createElement("div");
        div.id = "globalLoader";
        div.className = "loader-container";
        div.style.display = "none";
        div.innerHTML = `
            <div class="loader"></div>
            <p id="loaderMessage" style="color:white; margin-top:10px;"></p>
        `;
        document.body.appendChild(div);
    }
});

function showLoader(message = "") {
    const loader = document.getElementById("globalLoader");
    const msg = document.getElementById("loaderMessage");

    if (msg) msg.textContent = message;
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("globalLoader");
    if (loader) loader.style.display = "none";
}
