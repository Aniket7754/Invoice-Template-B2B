document.addEventListener("DOMContentLoaded", function () {
  // Selectors
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");
  const sidebarOpen = document.querySelector("#sidebarOpen");
  const sidebarClose = document.querySelector(".collapse_sidebar");
  const sidebarExpand = document.querySelector(".expand_sidebar");
  const submenuItems = document.querySelectorAll(".submenu_item");
  

  // Function to update sidebar layout
  function updateLayout() {
    const isSmallScreen = window.innerWidth < 768;
    sidebar.classList.toggle("close", isSmallScreen);
    content.style.marginLeft = isSmallScreen ? "80px" : "230px";
  }

  // Function to set sidebar state in localStorage
  function setSidebarStateToLocalStorage(state) {
    const storedState = localStorage.getItem("sidebarState");
    if (storedState !== state) {
      localStorage.setItem("sidebarState", state);
    }
  }

  // Event Listeners
  sidebarOpen.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    content.style.marginLeft = sidebar.classList.contains("close") ? "80px" : "230px";
    setSidebarStateToLocalStorage(sidebar.classList.contains("close") ? "closed" : "open");
  });

  sidebarClose.addEventListener("click", () => {
    sidebar.classList.add("close", "hoverable");
    content.style.marginLeft = "80px";
    setSidebarStateToLocalStorage("closed");
  });

  sidebarExpand.addEventListener("click", () => {
    sidebar.classList.remove("close", "hoverable");
    content.style.marginLeft = "230px";
    setSidebarStateToLocalStorage("open");
  });

  submenuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      item.classList.toggle("show_submenu");
      submenuItems.forEach((item2, index2) => {
        if (index !== index2) {
          item2.classList.remove("show_submenu");
        }
      });
    });
  });

  // Check if the sidebar state is stored in localStorage and update the layout
  const storedSidebarState = localStorage.getItem("sidebarState");
  if (storedSidebarState === "closed") {
    sidebar.classList.add("close");
    content.style.marginLeft = "80px";
  }

  // Update layout on window resize with debouncing
  let timeout;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(updateLayout, 250);
  });

  // Show content after the page has loaded
  content.style.display = "block";
  // Initial layout check
  updateLayout();
});
