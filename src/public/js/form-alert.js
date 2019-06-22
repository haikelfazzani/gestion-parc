const baseURL = window.location.href.split("/");

document.addEventListener("DOMContentLoaded", function () {

    function checkURL(basePath, key) {
        return baseURL.includes(basePath) && baseURL.some(i => i.startsWith(key))
    }

    if (checkURL("users", "delete")) {

        const formDelete = document.getElementById("form-delete-user");

        formDelete.onsubmit = () => {
            var x = confirm("voulez-vous vraiment supprimer?");
            return x ? true : false;
        }

    }    



    if (checkURL("vehicules", "delete")) {

        const formDelete = document.getElementById("form-delete-vehicule");

        formDelete.onsubmit = () => {
            var x = confirm("voulez-vous vraiment supprimer?");
            return x ? true : false;
        }

    }



    if (checkURL("reservations", "cancel")) {

        const formAnnuler = document.getElementById("form-annuler");

        formAnnuler.onsubmit = () => {
            var x = confirm("voulez-vous vraiment annuler?");
            return x ? true : false;
        }

    }



    if (checkURL("reservations", "confirm")) {

        const formAnnuler = document.getElementById("form-confirm");

        formAnnuler.onsubmit = () => {
            var x = confirm("voulez-vous vraiment confirmer?");
            return x ? true : false;
        }

    }


});

