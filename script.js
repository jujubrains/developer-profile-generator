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
      const name = res.data.name;
      const company = res.data.company;
      const blog = res.data.blog;
      const location = res.data.blog;
      const bio = res.data.bio;
      const repos = res.data.public_repos;
      const followers= res.data.followers;
      const following = res.data.following;
      const url = res.data.
      console.log(name);
      
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