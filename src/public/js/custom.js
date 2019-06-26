document.addEventListener("DOMContentLoaded", function () {

    const btnDrop = document.getElementById("navbarDropdownMenuLink-4");
    const menuDropDown = document.querySelector(".dropdown-menu");

    const navbarToggler = document.querySelector(".navbar-toggler");
    const collapse = document.querySelector(".collapse");

    function toggle(parent, child) {
        parent.onclick = () => {
            child.style.display = child.style.display === "block" ? "none" : "block";
        }
    }

    toggle(btnDrop, menuDropDown);
    toggle(navbarToggler, collapse);    

});