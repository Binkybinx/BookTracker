//Feature Card
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
//Display or Remove Animated custom-select and search input when icon clicked

document.addEventListener("DOMContentLoaded", () => {
  const hideElement = (element) => {
    element.classList.remove("visible");
    setTimeout(() => (element.style.display = "none"), 200);
  };

  const showElement = (element, focusElement = null) => {
    element.style.display = "flex";
    void element.offsetHeight;
    element.classList.add("visible");
    if (focusElement) setTimeout(() => focusElement.focus(), 10);
  };

  const initDropdown = (containerClass) => {
    const icon = document.querySelector(`${containerClass} .icon-overlay`);
    const options = document.querySelector(
      `${containerClass} .custom-select-options`
    );
    options.style.display = "none";

    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllUI(options);

      if (options.classList.contains("visible")) {
        hideElement(options);
      } else {
        showElement(options);
      }
    });

    options.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("disabled") &&
        e.target.tagName === "LI"
      ) {
        console.log("Selected:", e.target.dataset.value);
        hideElement(options);
      }
      e.stopPropagation();
    });
  };

  const initSearch = () => {
    const searchIcon = document.querySelector(
      ".search-container .icon-overlay"
    );
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.getElementById("mySearch");
    const searchSubmit = document.querySelector(".search-icon-container");
    searchBar.style.display = "none";

    searchBar.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllUI(searchBar);

      if (searchBar.classList.contains("visible")) {
        hideElement(searchBar);
      } else {
        showElement(searchBar, searchInput);
      }
    });

    const performSearch = () => {
      if (searchInput.value.trim()) {
        console.log("Searching for:", searchInput.value);
      }
    };

    searchSubmit.addEventListener("click", (e) => {
      e.stopPropagation();
      performSearch();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  };

  const closeAllUI = (exceptElement = null) => {
    document
      .querySelectorAll(".custom-select-options, .search-bar")
      .forEach((el) => {
        if (el !== exceptElement && el.classList.contains("visible")) {
          hideElement(el);
        }
      });
  };

  initDropdown(".filter-select-container");
  initDropdown(".sort-select-container");
  initSearch();

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(
        ".filter-select-container, .sort-select-container, .search-container"
      )
    ) {
      closeAllUI();
    }
  });
});
