const axios = require("axios");


axios.get('http://0.0.0.0:5000/api/apple')
  .then((response) => {
    console.log(response.data);
  });

