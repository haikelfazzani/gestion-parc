class InputValidator {

    isLetters(input) {
        return input && /^[a-z ]+$/gi.test(input)
    }

    isNumeric(input) {
        return input && /^[0-9]+$/g.test(input)
    }

    isAlphaNum(input) {
        return input && /^[a-z0-9 ]+$/gi.test(input)
    }

    isValidNumSerie(input) {
        return input && /^[a-z0-9-]+$/gi.test(input)
    }

    isEmail(input) {
        const validProviders = ["gmail", "yahoo", "hotmail", "tuta"];
        let domain = input.split("@")[1].split(".")[0];
        return input && /\S+@\S+\.\S+/.test(input) && validProviders.includes(domain);
    }

    isPassword(input) {
        return input && /^[a-z0-9\:\;\,.@\&\%\*\#\- ]+$/gi.test(input);
    }

}

module.exports = new InputValidator();
