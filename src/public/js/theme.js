const btnTheme = document.getElementById("btn-theme");
const dark = document.getElementById("dark");
const clair = document.getElementById("clair");

let theme = {
    dark: "none",
    clair: "",
    btnText: `<i class="fas fa-sun"></i> THEME SOMBRE`
};

if (localStorage.getItem("theme")) {
    theme = JSON.parse(localStorage.getItem("theme"));
    dark["media"] = theme.dark;
    clair["media"] = theme.clair;
    btnTheme.innerHTML = theme.btnText;
} else {
    localStorage.setItem("theme", JSON.stringify(theme))
}

btnTheme.onclick = () => {

    if (theme.clair === "") {
        theme.dark = "";
        theme.clair = "none";
        theme.btnText = `<i class="fas fa-sun"></i> THEME CLAIR`;

        dark["media"] = theme.dark;
        clair["media"] = theme.clair;
        btnTheme.innerHTML = theme.btnText;

        localStorage.setItem("theme", JSON.stringify(theme))
    }
    else {
        theme.dark = "none";
        theme.clair = "";
        theme.btnText = `<i class="fas fa-moon"></i> THEME SOMBRE`;

        dark["media"] = theme.dark;
        clair["media"] = theme.clair;
        btnTheme.innerHTML = theme.btnText;

        localStorage.setItem("theme", JSON.stringify(theme));
    }
}

