const axios = require("axios");

module.exports = {
  getQuote: () => axios({
      "method": "GET",
      "url": `https://api.quotable.io/random`
      })
};
let date = new Date();
console.log(date.getUTCMinutes() %2 == 0);