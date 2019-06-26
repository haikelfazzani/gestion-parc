class InputValidator {

    isLetters(input) {
        return (input && input.length > 3) && /^[a-z ]+$/gi.test(input)
    }

    isNumeric(input) {
        return (input && input.length > 3) && /^[0-9]+$/g.test(input)
    }

    isAlphaNum(input) {
        return (input && input.length > 3) && /^[a-z0-9 ]+$/gi.test(input.trim())
    }

    isValidNumSerie(input) {
        return (input && input.length > 6) && /^[a-z0-9\-]*$/gi.test(input.trim())
    }

    isEmail(input) {
        const validProviders = ["gmail", "yahoo", "hotmail", "tuta"];
        let domain = input.split("@")[1].split(".")[0];
        return (input && input.length > 10)
            && /\S+@\S+\.\S+/.test(input) && validProviders.includes(domain);
    }

    isPassword(input) {
        return (input && input.length > 2) && /^[a-z0-9\:\;\,.@\&\%\*\#\- ]+$/gi.test(input);
    }

}

const validator = new InputValidator();

if (checkURL("users", "add")) {
    // handle form add user    
    const alert = document.getElementById("alert-form-add-user");
    alert.style.display = "none";

    function handleForm(form) {

        let nom = form.nom.value;
        let email = form.email.value;
        let password = form.password.value;

        if (validator.isLetters(nom) && validator.isEmail(email) && validator.isPassword(password)) {
            return true;
        }
        alert.style.display = "block";
        alert.innerText = "Erreur de saisie";
        return false;
    }
}


if (checkURL("vehicules", "add")) {
    // handle form add vehicule
    const alertVehicule = document.getElementById("alert-form-add-vehicule");
    alertVehicule.style.display = "none";

    function handleFormVehicile(form) {

        let nom = form.numSerie.value;
        let marque = form.marque.value;

        if (validator.isValidNumSerie(nom) && validator.isAlphaNum(marque)) {
            return true;
        }
        alertVehicule.style.display = "block";
        alertVehicule.innerText = "Erreur de saisie";
        return false;
    }
}


if (checkURL("profile", "")) {

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



if (checkURL("reservations", "user")) {

    const dateDepart = document.getElementById("date-depart");
    const dateRetour = document.getElementById("date-retour");
    const alertReserve = document.getElementById("alert-reserve");
    const formReserve = document.getElementById("form-reserve");

    if (alertReserve) alertReserve.style.display = "none";

    let dateDep = "", dateRet = "";
    dateDepart ? dateDepart.onchange = (e) => {
        dateDep = (e.target.value).split("-").reduce((a, c) => a + +c, 0);
    } : "";

    dateRetour ? dateRetour.onchange = (e) => {
        dateRet = (e.target.value).split("-").reduce((a, c) => a + +c, 0);
    } : "";

    formReserve ? formReserve.onsubmit = () => {
        if (dateDep > dateRet) {
            alertReserve.style.display = "block";
            alertReserve.textContent = "La date de depart doit étre < à la date de retour";
            return false;
        }
        return true;
    } : "";
}
