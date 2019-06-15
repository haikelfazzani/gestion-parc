const btnTheme = document.getElementById("btn-theme");
const dark = document.getElementById("dark");
const clair = document.getElementById("clair");

let theme = {
    dark: "none",
    clair: "",
    btnText: "THEME SOMBRE"
};

if (localStorage.getItem("theme")) {
    theme = JSON.parse(localStorage.getItem("theme"));
    dark["media"] = theme.dark;
    clair["media"] = theme.clair;
    btnTheme.textContent = theme.btnText;
} else {
    localStorage.setItem("theme", JSON.stringify(theme))
}

btnTheme.onclick = () => {

    if (theme.clair === "") {
        theme.dark = "";
        theme.clair = "none";
        theme.btnText = "THEME CLAIR";

        dark["media"] = theme.dark;
        clair["media"] = theme.clair;
        btnTheme.textContent = theme.btnText;

        localStorage.setItem("theme", JSON.stringify(theme))
    }
    else {
        theme.dark = "none";
        theme.clair = "";
        theme.btnText = "THEME SOMBRE";

        dark["media"] = theme.dark;
        clair["media"] = theme.clair;
        btnTheme.textContent = theme.btnText;

        localStorage.setItem("theme", JSON.stringify(theme))


        localStorage.setItem("theme", JSON.stringify(theme))
    }
}

