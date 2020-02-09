const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
  inquirer
  .prompt([
    {
      message: "Enter a GitHub User Name:",
      name: "name"
    },
    {
      message: "Enter a Color:",
      name: "color"
    }
  ])
  .then(function({ name, color }) {
    const queryUrl = `https://api.github.com/users/${name}`;

    axios
      .get(queryUrl)
      .then(function(response) {
        console.log("10%");
        const profileImage = response.data.avatar_url;
        console.log("20%");
        const userName = response.data.login;
        console.log("30%");
        const userLocation = response.data.location;
        console.log("40%");
        const userProfile = response.data.html_url;
        console.log("50%");
        const userBlog = response.data.blog;
        console.log("60%");
        const userBio = response.data.bio;
        console.log("70%");
        const publicRepos = response.data.public_repos;
        console.log("80%");
        const followers = response.data.followers;
        console.log("90%");
        const following = response.data.following;
        const html = `
          <body style="background-color: ${color};">
            <img src=${profileImage} alt=${userName} height="400" width="400">
            <h1>${userName}</h1>
            <a href="https://www.google.com/maps/place/${userLocation}">${userLocation}</a>
            <br>
            <a href=${userProfile}>${userName} GitHub Profile</a>
            <br>
            <a href=${userBlog}>${userName} Blog</a>
            <p>${userName} Bio: ${userBio}</p>
            <p>Public Repos: ${publicRepos}</p>
            <p>Followers: ${followers}</p>
            <p>Following: ${following}</p>
          </body>
        `;
        const options = {
          format: 'Letter',
          border: {
            top: "1in",
            right: "1in",
            bottom: "1in",
            left: "1in"
          },
        };
        pdf.create(html, options).toFile(`${userName}.pdf`, (err) => {
          if (err) return console.log(err);
          console.log("100%");
          console.log("Success!");
      });
    });
  });
