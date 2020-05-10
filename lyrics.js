const axios = require("axios");

const BASE_URL = "https://canarado-lyrics.p.rapidapi.com";

module.exports = {
  getLyrics: (name) => axios({
    "method":"GET",
    "url":"https://canarado-lyrics.p.rapidapi.com/lyrics/" + name,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"canarado-lyrics.p.rapidapi.com",
    "x-rapidapi-key":"05803224b5msh1d0ec76fe98f35fp13eee2jsn5ab0a503c944"
    }
      })
};