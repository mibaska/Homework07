const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
  inquirer
  .prompt({
      message: "Enter a GitHub User Name:",
      name: "name"
    })
  .then(function({ name }) {
    const queryUrl = `https://api.github.com/users/${name}`;

    axios
      .get(queryUrl)
      .then(function(response) {
        console.log(response.data.avatar_url);
        const profileImage = response.data.avatar_url;
        console.log(response.data.login);
        const userName = response.data.login;
        console.log(response.data.location);
        const userLocation = response.data.location;
        console.log(response.data.html_url);
        const userProfile = response.data.html_url;
        console.log(response.data.blog);
        const userBlog = response.data.blog;
        console.log(response.data.bio);
        const userBio = response.data.bio;
        console.log(response.data.public_repos);
        const publicRepos = response.data.public_repos;
        console.log(response.data.followers);
        const followers = response.data.followers;
        console.log(response.data.following);
        const following = response.data.following;
        const html = `
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
          console.log('Success!');
      });
      });
  });
