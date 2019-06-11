function formatDate(input) { // 2019-06-15 => 15 Jun 2019
    const months = [
        "janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"
    ];
    input = input.split("-");
    return input[2] + " " + months[parseInt(input[1])] + " " + input[0];
}

module.exports = { formatDate };
