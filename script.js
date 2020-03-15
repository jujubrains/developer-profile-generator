var axios = require("axios");
var inquirer = require("inquirer");
var electron = require("electron");
var convertFactory = require("electron-html-to");
var html = fs.readFileSync('./profile.html', 'utf8');
var fs = require("fs");

function userProfileHtml (data, response, starsCounter) {
  var HTMLPage = 
  `<!DOCTYPE html>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <style> 
    body {
      -webkit-print-color-adjust:exact !important;
      background-color: ${response[0]};
    }
    #main {
      position: absolute; 
      bottom: 200px;
      height: 1400px;
      width: 1200px;
      background-color:${response[0]};
    }
    .profile-img {
      border-radius: 50%;
      position: absolute;
      bottom: 70%;
      max-width: 220px;
      margin: 0 auto;
      left:17%;
      border: 6px solid ${response[2]}; 
    }
    h2 {
      padding-top: 130px;
    }
    .top-container {
      margin: 150px auto;
      max-width: 1000px;
      display: flex;
      flex-direction: row ;
      justify-content: center;
      align-items: center;
      border: 7px solid ${response[2]};
      margin-bottom: 0px;
      background-color: ${response[1]};
    }
    .card {
      width: 300px; 
      border: 3px grey response[2];
      background-color: ${response[2]} 
    }
    .card-text {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      font-size: 1.5em; 
    }
    .badge {
      padding: 3% 6%;
      font-size: larger;
      font-weight: normal;
      display: inline; 
      text-align: center;
    }
    .bottom-container {
      padding-top: 30px;
      padding-bottom: 30px; 
      display: flex; 
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 1000px;
      margin: 0 auto;
      background-color: ${response[1]};
      border: 7px solid ${response[2]}
    }
    .column {
      display: flex; 
      justify-content: center;
      flex-direction: column;
    }
    .flex-item {
      width: 250px;
      padding: 10px 20px;
      height: 150px;
      margin-top: 40px;
      margin-bottom: 40px;
      line-height: 150px;
      color: white;
      font-weight: bold;
      font-size: 1em;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 25%;
      display: flex; 
      flex-direction: column;
      justify-content: center;
      background-color: ${response[2]}
    }
    .badge {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      font-size: 2em; 
      font-weight: bolder;
      overflow: hidden;
    }
    </style>
  </head>
  <body>
    <div class="" id="main">
      <div class="top-container">
        <div class="card" style="width: 23rem;">
          <img src="${data.avatar_url}" class="profile-img card-img-top" alt="profile-pic">
          <div class="card-body">
            <h2 class="card-title use">${data.login}</h2>
            <p class="card-text"><a class="location" href="">${data.location}</a></p>
            <p class="card-text"><a class='profile: ' href=""></a>Profile: ${data.html_url}</p>
            <p class="card-text"><a class='bio:' href=""></a>${data.bio}</p>
          </div>
        </div>
      </div>   
      <div class="bottom-container">
        <div class="column">
          <div class="flex-item">
            <p class="badge followers">Repos: ${data.public_repos}</p>
          </div>
          <div class="flex-item">
            <p class="badge following">Stars:${starsCounter} </p>
          </div>
        </div>
        <div class="column">
          <div class="flex-item">
            <p class="badge repos">Following: ${data.following}</p>
          </div>
          <div class="flex-item">
            <p class="badge blog">Followers: ${data.followers}</p>
          </div>
        </div> 
      </div>
    </div>
  </body>
  <html lang="en">`
  return htmlPage 
}

var yellowArray = ['rgb(249 166 2)', 'rgb(240 219 176)', 'rgb(241 208 19)'];
var blueArray = ['rgb(24 41 198)', 'rgb(107 119 233)', 'rgb(52 60 136)'];
var redArray = ['rgb(148 21 21)', 'rgb(236 41 41)', 'rgb(233 165 165)'];
var greenArray = ['rgb(165 233 176)', 'rgb(99 245 123)', 'rgb(7 83 20)'];

var getUser = (username, color) => {
  var starsCounter = 0
  axios.get(`https://api.github.com/users/${username}/repos`)
  .then((res)=>{
    var repos = res.data;
    var data = repos[1].owner; 
    repos.forEach(repo => {
      starsCounter += parseInt(repo.stargazers_count);
    })
    axios
    .get(`https://api.github.com/users/${username}`)
    .then((res) => {
      console.log(res.data);
      const data = res.data; 
  var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  })
  conversion({ html:userProfileHTML(data, color, starsCounter) }, (err, result) => {
    if (err) {
      return console.error(err);
    }
    result.stream.pipe(fs.createWriteStream('./username.pdf'));
    conversion.kill();
    });
  })
})
}
inquirer
.prompt([
  {
    type: "input",
    message: "What is your Github user name?",
    name: "username"
  },
  {
    type: "list",
    message: "What is your favorite color?",
    name: "color",
    choices: [
      'green', 'blue','red', 'yellow'
    ]
  },
])
.then(async function(response) {
if(response.color === 'yellow'){
  const user = await getUser(response.username,yellowArray); 
}else if(response.color === 'green'){
  const user = await getUser(response.username,greenArray); 
}else if(response.color === 'red'){
  const user = await getUser(response.username,redArray); 
}else {
  const user = await getUser(response.username,blueArray); 
}   
})

// inquirer 
//   .prompt({
//     message: "What is your GitHub username?",
//     name: "username"
//   })
  // .then(function({username}) {
  //   // const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  //   const queryUrl = `https://api.github.com/users/${username}`;
  //   axios
  //   .get(queryUrl)
  //   .then(function(res){
      // console.log(res.data);
      // const name = res.data.name;
      // const company = res.data.company;
      // const blog = res.data.blog;
      // const location = res.data.location;
      // const bio = res.data.bio;
      // const repos = res.data.public_repos;
      // const followers= res.data.followers;
      // const following = res.data.following;
      // const url = res.data.url
      // console.log(name);
      
  //       queryURL= `https://api.github.com/users/${username}`;
  //     $.ajax({
  //       url: queryURL,
  //       method: "GET"
  //     }).then(function(response) {
  //         console.log(response);
  //     });

    // console.log(response.followers);
  // });

// queryURL= `https://api.github.com/users/${response}`;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//       console.log(response);
  // });