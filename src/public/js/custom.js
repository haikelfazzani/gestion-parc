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
    }

}