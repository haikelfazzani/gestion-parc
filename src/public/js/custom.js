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

    let urlPath = window.location.href.split("/");

    if (urlPath.includes("profile")) {

        const passwordProfile = document.getElementById("password-profile");
        const btnProfileUpdate = document.getElementById("btn-profile");
        //const inputs = document.querySelectorAll(".form-control:disabled,.form-control[readonly]");

        function enableButton() {
            btnProfileUpdate.disabled = true;
            passwordProfile.onkeyup = (e) => {
                let inputValue = e.target.value;
                btnProfileUpdate.disabled = inputValue.length > 3 ? false : true;
            }
        }
        enableButton();


        (function () {
            const inputAvatar = document.getElementById("avatar");
            const btnChangeAvatar = document.getElementById("btn-change-avatar");

            btnChangeAvatar.disabled = true;
            inputAvatar.onchange = (event) => {
                let inputValue = event.target.value; // C:\fakepath\7.PNG
                inputValue = inputValue.match(/\.[0-9a-z]+$/i)[0].toLowerCase();

                const validExtensions = [".png", ".jpeg", ".jpg", ".svg"];
                let isValid = validExtensions.includes(inputValue);

                btnChangeAvatar.disabled = isValid ? false : true;

                isValid ? previewImage(event) : "";
            }
        }());


        function previewImage(event) {
            const imgField = document.querySelector(".img-thumbnail");
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    imgField.src = reader.result;
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }

    }



    if (urlPath.includes("reservations") && urlPath.includes("user")) {

        const dateDepart = document.getElementById("date-depart");
        const dateRetour = document.getElementById("date-retour");
        const alertReserve = document.getElementById("alert-reserve");
        const formReserve = document.getElementById("form-reserve");

        if (alertReserve) alertReserve.style.display = "none";

        let dateDep = "", dateRet = "";
        dateDepart.onchange = (e) => {
            dateDep = (e.target.value).split("-").reduce((a, c) => a + +c, 0);
        }

        dateRetour.onchange = (e) => {
            dateRet = (e.target.value).split("-").reduce((a, c) => a + +c, 0);
        }

        formReserve.onsubmit = () => {
            if (dateDep > dateRet) {
                alertReserve.style.display = "block";
                alertReserve.textContent = "La date de depart doit étre < à la date de retour";
                return false;
            }
            return true;
        }
    }

});