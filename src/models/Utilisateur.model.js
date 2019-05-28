class Utilisateur {

    constructor(nomComplet, email, password, role) {
        this.nomComplet = nomComplet;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}

module.exports = Utilisateur;