//Feature Card Animation
// Remove animation for hover effect

document.querySelectorAll(".feature-card.animate").forEach((card) => {
  card.addEventListener(
    "animationend",
    function cleanup() {
      card.classList.remove("animate");

      card.style.transform = "";

      card.removeEventListener("animationend", cleanup);
    },
    { once: true }
  );
});

//Library Filters
//Display or Remove Animated custom-select when icon clicked

document.addEventListener("DOMContentLoaded", () => {
  const initDropdown = (containerClass) => {
    const icon = document.querySelector(`${containerClass} .icon-overlay`);
    const options = document.querySelector(
      `${containerClass} .custom-select-options`
    );

    options.style.display = "none";

    icon.addEventListener("click", (e) => {
      e.stopPropagation();

      document
        .querySelectorAll(".custom-select-options")
        .forEach((dropdown) => {
          if (dropdown !== options) {
            dropdown.classList.remove("visible");
            setTimeout(() => {
              dropdown.style.display = "none";
            }, 200);
          }
        });

      if (options.classList.contains("visible")) {
        options.classList.remove("visible");
        setTimeout(() => {
          options.style.display = "none";
        }, 200);
      } else {
        options.style.display = "flex";
        void options.offsetHeight;
        options.classList.add("visible");
      }
    });

    options.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("disabled") &&
        e.target.tagName === "LI"
      ) {
        console.log("Selected:", e.target.dataset.value);
      }
      e.stopPropagation();
    });
  };

  initDropdown(".filter-select-container");
  initDropdown(".sort-select-container");

  document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select-options").forEach((options) => {
      options.classList.remove("visible");
      setTimeout(() => {
        options.style.display = "none";
      }, 200);
    });
  });
});
