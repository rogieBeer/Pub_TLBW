const fetch = require('node-fetch');

let Birds


var something = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            Birds = fetch("https://heroku-birdv2-api.herokuapp.com/birds")
            .then(resp => resp.json())
        }
    };
})();

something()



module.exports.Birds = Birds



