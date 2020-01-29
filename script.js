var axios = require("axios");
var inquirer = require("inquirer");
var fs = require("fs");



inquirer
  .prompt({
    message: "What is your GitHub username?",
    name: "username"
  })
  .then(function({username}) {
    // const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
    .get(queryUrl)
    .then(function(res){
      console.log(res.data);
  //       queryURL= `https://api.github.com/users/${username}`;
  //     $.ajax({
  //       url: queryURL,
  //       method: "GET"
  //     }).then(function(response) {
  //         console.log(response);
  //     });

    // console.log(response.followers);
  });

// queryURL= `https://api.github.com/users/${response}`;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//       console.log(response);
  });