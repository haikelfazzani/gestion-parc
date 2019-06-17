const urlUser = window.location.href.split("/");

document.addEventListener("DOMContentLoaded", function(){

    if (urlUser.includes("users") && urlUser.some(i => i.startsWith("delete"))) {

        const formDelete = document.getElementById("form-delete-user");

        formDelete.onsubmit = () => {
            var x = confirm("voulez-vous vraiment supprimer?");
            return x ? true : false;
        }

    }

});