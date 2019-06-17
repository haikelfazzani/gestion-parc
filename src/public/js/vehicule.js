const urlVehicule = window.location.href.split("/");

document.addEventListener("DOMContentLoaded", function(){

    if (urlVehicule.includes("vehicules") && urlVehicule.some(i => i.startsWith("delete"))) {

        const formDelete = document.getElementById("form-delete-vehicule");

        formDelete.onsubmit = () => {
            var x = confirm("voulez-vous vraiment supprimer?");
            return x ? true : false;
        }

    }

});
