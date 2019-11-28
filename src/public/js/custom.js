document.addEventListener("DOMContentLoaded", function () {

  function toggle(parent, child) {
    // reservation buttons in left side menu
    let parentBtn = document.querySelector(parent);;
    let childBtn = document.querySelector(child);

    parentBtn ? parentBtn.onclick = () => {
      (childBtn.style.display = childBtn.style.display === "block" ? "none" : "block", childBtn.style.transtion = "all .5s ease")
    } : "";
  }

  toggle(".user", "#pageSubmenu");
  toggle(".vehi", "#vsubmenu");
  toggle(".resv", "#rsubmenu");
  toggle(".res", "#rrsubmenu");

  toggle("#sidebarCollapse", "#sidebar");

});