const axios = require("axios");

const BASE_URL = "https://covid-193.p.rapidapi.com";
  
module.exports = {
    getStats: (country) => axios({
        "method": "GET",
        "url": `${BASE_URL}/statistics`,
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":"covid-193.p.rapidapi.cosm",
          "x-rapidapi-key":"your key"
        },
        "params": {
          "country": country
          }
        })
  };