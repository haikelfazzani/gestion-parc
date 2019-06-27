document.addEventListener("DOMContentLoaded", () => {

  if (checkURL("notifications", "")) {
    // pagination notifications
    var listNotifications = [];
    let step = 5;
    let end = step;
    let start = 0;

    const readProd = "https://gestion-park.herokuapp.com/notifications/read";
    const readDev = "http://localhost:3000/notifications/read";

    fetch(mode === "dev" ? readDev : readProd)
      .then(res => res.json())
      .then(data => pagination(data))
      .catch(err => console.log(err));


    function pagination(data) {

      const listNotifs = document.getElementById("list-notifications");
      const btnNext = document.getElementById("btn-next");
      const btnPrev = document.getElementById("btn-previous");
      const pages = document.getElementById("pages");
      const msg = document.getElementById("msg");
      let i = 1;


      if (data && data.length > 0) {

        const len = data.length;
        data = data.reverse();

        msg.innerHTML = `<a href="/reservations/list-demands" 
            class="list-group-item list-group-item-action">
              <i class="fas fa-bookmark mr-3"></i> ${data[0].message}
              <span class="badge badge-info">
                  ${data[0].date_notif}
              </span>
            </a>`;

        listNotifications = data.slice(0, 5);
        displayList(listNotifications, start, end);

        pages.textContent = 1 + " / " + Math.ceil(len / step);

        btnNext.onclick = () => {

          if (end < len - 1) {
            i++;
            pages.textContent = i + " / " + Math.ceil(len / step);
            start += 5;
            end += 5;
            listNotifications = data.slice(start, end);
            displayList(listNotifications, start, end);
          }

        }

        btnPrev.onclick = () => {

          if (start > 0) {
            i--;
            pages.textContent = i + " / " + Math.ceil(len / step);
            start -= 5;
            end -= 5;
            listNotifications = data.slice(start, end);
            displayList(listNotifications, start, end);
          }

        }

        function displayList(listNotifications, start, end) {
          listNotifs.innerHTML = "";
          for (let d of listNotifications) {

            let elemnt = `<div class="media notif-style mb-2">
              <img src="/img/notifications.png" class="mr-3" alt="..." width="50" height="50">
              <div class="media-body">
                <h5 class="m-0 p-0">${d.message}</h5>
                <small class="text-muted"><i class="fas fa-clock"></i> ${d.date_notif}</small>
              </div>
            </div>`;

            listNotifs.innerHTML += elemnt;
          }
        }


      }
    }

  }

});