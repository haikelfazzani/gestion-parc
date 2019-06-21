class Utilisateur {

    constructor(nomComplet, email, password, division, role) {
        this.nomComplet = nomComplet;
        this.email = email;
        this.password = password;
        this.division = division;
        this.role = role;
    }

}

module.exports = Utilisateur;
