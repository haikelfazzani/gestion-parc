document.addEventListener("DOMContentLoaded", function(){

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

    let urlProfile = window.location.href.split("/").reverse()[0];

    if (urlProfile === "profile") {

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
                if(reader.readyState === 2) {
                    imgField.src = reader.result;
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }

});