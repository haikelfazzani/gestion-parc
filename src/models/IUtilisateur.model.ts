import Role from "./Role.enum";

interface IUtilisateur {

    idUtilisateur:number;
    nomComplet : string;
    email:string;
    password:string;
    role:string;

}

class Utilisateur {

    idUtilisateur:number;
    nomComplet : string;
    email:string;
    password:string;
    role:string;

    constructor(nomComplet:string, email:string, password:string, role:string) {
        this.nomComplet = nomComplet;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}

export {IUtilisateur , Utilisateur };