// Année dans le footer
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Bandeau cookies (RGPD, Consent Mode v2)
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    let stored = null;
    try { stored = localStorage.getItem("cookie-consent"); } catch (e) {}

    if (!stored) {
      banner.hidden = false;
    }

    const setConsent = (value) => {
      try { localStorage.setItem("cookie-consent", value); } catch (e) {}
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: value === "granted" ? "granted" : "denied",
        });
      }
      banner.hidden = true;
    };

    banner.querySelector(".cookie-accept")?.addEventListener("click", () => setConsent("granted"));
    banner.querySelector(".cookie-refuse")?.addEventListener("click", () => setConsent("denied"));
  }

  // Rating popup – dismissible with localStorage
  const popup = document.getElementById("rating-popup");
  if (popup) {
    let dismissed = false;
    try { dismissed = localStorage.getItem("rating-popup-closed") === "1"; } catch (e) {}
    if (dismissed) {
      popup.style.display = "none";
    }
    const closeBtn = popup.querySelector(".rating-popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        popup.style.display = "none";
        try { localStorage.setItem("rating-popup-closed", "1"); } catch (e) {}
      });
    }
  }
});
