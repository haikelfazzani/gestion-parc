let date = (new Date().toISOString()).slice(0, 19);

function formatDate(input = date) { // 2019-06-15 => 15 Jun 2019    

    const months = [
        "janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"
    ];

    input = input.slice(0,10).split("-");
    return input[2] + " " + months[parseInt(input[1])] + " " + input[0];
}


function formatLongDate(input = date) { // 2019-06-15 => 15 Jun 2019    

    const months = [
        "janv", "févr", "mars", "avr", "mai",
        "juin", "juil", "août", "sept", "oct",
        "nov", "déc"
    ];

    input = input.split("-");

    return input[2].slice(0, 2) + " " +
        months[parseInt(input[1])] + " " +
        input[0] + " " +
        input[2].slice(3);
}

module.exports = { formatDate,formatLongDate };
