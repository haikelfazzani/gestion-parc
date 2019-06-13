window.onload = () => {  

  const inputEmail = document.getElementById("login-email");
  const inputPass = document.getElementById("login-password");

  function getCookie(cname) {
    const name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (getCookie("user")) {
    const data = JSON.parse(getCookie("user"));
    inputEmail.value = data.email;
    inputPass.value = data.password;
  }

}
