// Année dans le footer
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Bandeau cookies (RGPD, Consent Mode v2)
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  let stored = null;
  try { stored = localStorage.getItem("cookie-consent"); } catch (e) {}

  if (!stored) {
    // Pas de choix encore → on affiche le bandeau
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
});
