function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Initialize only after navbar is loaded
      if (id === "navbar-container") {
        initializeNavbarScripts();
      }
    })
    .catch(err => {
      console.error(`Error loading ${file}:`, err);
    });
}

function initializeNavbarScripts() {
  const menuToggle = document.getElementById("menu-toggle");
  const hamburger = document.getElementById("hamburger");
  const cancel = document.getElementById("cancel");
  const sidebar = document.getElementById("mobile-sidebar");
  const solutionsToggle = document.getElementById("sidebar-solutions-toggle");
  const sidebarDropdown = solutionsToggle?.parentElement;

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");

      const isOpen = sidebar.classList.contains("active");
      hamburger.style.display = isOpen ? "none" : "inline";
      cancel.style.display = isOpen ? "inline" : "none";

      // Always collapse submenu when sidebar closes
      if (!isOpen && sidebarDropdown) {
        sidebarDropdown.classList.remove("active");
      }
    });
  }

  // Sidebar submenu toggle
  if (solutionsToggle && sidebarDropdown) {
    solutionsToggle.addEventListener("click", (e) => {
      e.preventDefault();
      sidebarDropdown.classList.toggle("active");
    });
  }
}

// Load navbar and footer
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar-container", "/navbar.html");
  loadComponent("footer-container", "/footer.html");
});
