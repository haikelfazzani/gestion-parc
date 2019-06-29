document.addEventListener("DOMContentLoaded", function () {

    const btnUsers = document.querySelector(".user");
    const dropDownU = document.querySelector("#pageSubmenu");

    const btnVhi = document.querySelector(".vehi");
    const dropDownV = document.querySelector("#vsubmenu");

    const btnResevs = document.querySelector(".resv");
    const dropDownR = document.querySelector("#rsubmenu");

    const closeBtn = document.querySelector("#sidebarCollapse");
    const sidebar = document.querySelector("#sidebar");

    function toggle(parent, child) {
      parent.onclick = () => {
        child.style.display = child.style.display === "block" ? "none" : "block";
      }
    }

    toggle(btnUsers, dropDownU);
    toggle(btnVhi, dropDownV);
    toggle(btnResevs, dropDownR);
    toggle(closeBtn, sidebar);

});