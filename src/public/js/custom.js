document.addEventListener("DOMContentLoaded", function () {

  function toggle(parent, child) {
    // reservation buttons in left side menu
    let parentBtn = document.querySelector(parent);;
    let childBtn = document.querySelector(child);

    parentBtn.onclick = () => {
      childBtn.style.display = childBtn.style.display === "block" ? "none" : "block";
    }
  }

  toggle(".user", "#pageSubmenu");
  toggle(".vehi", "#vsubmenu");
  toggle(".res", "#rsubmenu");

  toggle("#sidebarCollapse", "#sidebar");

});