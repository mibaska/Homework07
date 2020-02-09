const axios = require("axios");
const inquirer = require("inquirer");
// const pdf = require('html-pdf');
// const html = '<h1>Hello World!</h1>';
// const options = {
//     format: 'A3',
//   };
  inquirer
  .prompt({
    message: "Enter a GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios
      .get(queryUrl)
      .then(function(response) {
        console.log(response.data.avatar_url);
        console.log(response.data.login);
        console.log(response.data.location);
        console.log(response.data.html_url);
        console.log(response.data.blog);
        console.log(response.data.followers);
        console.log(response.data.starred_url);
        console.log(response.data.following);
      });
  });
// pdf.create(html, options).toFile('output.pdf', (err) => {
//     if (err) return console.log(err);
//     console.log('Success!');
// });