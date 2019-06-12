window.onload = () => {

    let path = window.location.href.split("/").reverse()[0];

    if (path === "profile") {
        
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
            inputAvatar.onchange = (e) => { 
                let inputValue = e.target.value; // C:\fakepath\7.PNG
                inputValue = inputValue.match(/\.[0-9a-z]+$/i)[0].toLowerCase();

                const validExtensions = [".png", ".jpeg", ".jpg", ".svg"];

                btnChangeAvatar.disabled = validExtensions.includes(inputValue) ? false : true ;                
            }
        }());

    }    

}