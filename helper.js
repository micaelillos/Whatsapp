const axios = require("axios");

const BASE_URL = "https://love-calculator.p.rapidapi.com";

module.exports = {
  getPercentage: (yourName, partnerName) => axios({
      "method": "GET",
      "url": `${BASE_URL}/getPercentage`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
        "x-rapidapi-key":"your key"
      },
      "params": {
        "fname": yourName,
        "sname": partnerName
        }
      })
};