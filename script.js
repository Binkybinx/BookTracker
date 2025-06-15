// Remove animation for hover effect

document.querySelectorAll(".feature-card.animate").forEach((card) => {
  // Ensure animationend fires correctly (some browsers need this)
  card.addEventListener(
    "animationend",
    function cleanup() {
      // Force remove the animate class
      card.classList.remove("animate");

      // Reset transform (optional, but ensures no conflicts)
      card.style.transform = "";

      // Remove this listener to avoid duplicates
      card.removeEventListener("animationend", cleanup);
    },
    { once: true }
  ); // 'once: true' automatically removes listener after firing
});
