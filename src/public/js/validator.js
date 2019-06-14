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

let path = window.location.href.split("/").reverse()[0];
let pathTabs = window.location.href.split("/");


if (pathTabs.includes("users") && pathTabs.includes("add")) {
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


if (pathTabs.includes("vehicules") && pathTabs.includes("add")) {
    // handle form add vehicule
    const alertVehicule = document.getElementById("alert-form-add-vehicule");
    alertVehicule.style.display = "none";

    function handleFormVehicile(form) {

        let nom = form.numSerie.value;
        let model = form.model.value;

        if (validator.isValidNumSerie(nom) && validator.isAlphaNum(model)) {
            return true;
        }
        alertVehicule.style.display = "block";
        alertVehicule.innerText = "Erreur de saisie";
        return false;
    }
}

