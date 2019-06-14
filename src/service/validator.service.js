class InputValidator {

    isLetters(input) {
        return input && /^[a-z ]+$/gi.test(input.trim())
    }

    isNumeric(input) {
        return input && /^[0-9]+$/g.test(input.trim())
    }

    isAlphaNum(input) {
        return input && /^[a-z0-9 ]+$/gi.test(input.trim())
    }

    isValidNumSerie(input) {
        return input && /^[a-z0-9\-]+$/gi.test(input.trim())
    }

    isEmail(input) {
        const validProviders = ["gmail", "yahoo", "hotmail", "tuta"];
        let domain = input.split("@")[1].split(".")[0];
        return input && /\S+@\S+\.\S+/.test(input) && validProviders.includes(domain.trim());
    }

    isPassword(input) {
        return input && /^[a-z0-9\:\;\,.@\&\%\*\#\- ]+$/gi.test(input.trim());
    }

}

module.exports = new InputValidator();
