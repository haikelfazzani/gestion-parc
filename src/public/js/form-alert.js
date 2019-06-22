const baseURL = window.location.href.split("/");

document.addEventListener("DOMContentLoaded", function () {

    function checkURL(basePath, key) {
        return baseURL.includes(basePath) && baseURL.some(i => i.startsWith(key))
    }
    //form-update
    if (checkURL("users", "delete")) {

        const formDelete = document.getElementById("form-delete-user");
        formDelete ? formDelete.onsubmit = () => confirm("voulez-vous vraiment supprimer?") : "";
    }

    if (checkURL("users", "update")) {

        const formUpdate = document.getElementById("form-update");
        formUpdate ? formUpdate.onsubmit = () => confirm("voulez-vous vraiment modifier?") : "";
    }


    if (checkURL("vehicules", "delete")) {

        const formDelete = document.getElementById("form-delete-vehicule");
        formDelete ? formDelete.onsubmit = () => confirm("voulez-vous vraiment supprimer?") : "";
    }



    if (checkURL("reservations", "cancel")) {

        const formAnnuler = document.getElementById("form-annuler");
        formAnnuler ? formAnnuler.onsubmit = () => confirm("voulez-vous vraiment annuler?") : "";
    }



    if (checkURL("reservations", "confirm")) {

        const formAnnuler = document.getElementById("form-confirm");
        formAnnuler ? formAnnuler.onsubmit = () => confirm("voulez-vous vraiment confirmer?") : "";
    }

    // User form profile
    if (checkURL("profile", "")) {

        const formProfile = document.getElementById("form-profile");
        formProfile ? formProfile.onsubmit = () => confirm("voulez-vous vraiment modifier?") : "";
    }

});

