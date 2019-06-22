document.addEventListener("DOMContentLoaded", function () {

    const prod = "https://gestion-park.herokuapp.com/notifications/unread";
    const dev = "http://localhost:3000/notifications/unread";

    fetch(dev)
        .then(res => res.json())
        .then(data => {
            const notifIcon = document.querySelector(".fa-bell");
            notifIcon.innerHTML = `<span class="ml-1">${data.length || 0}</span>`;
        })
        .catch(err => console.log(err))

});