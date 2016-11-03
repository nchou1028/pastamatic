const {markdown} = require("markdown");
const fs = require("fs");
const path = require("path");

function getFileNames(pathName) {
  return fs.readdirSync(path.resolve(__dirname, pathName))
    .map(filename => {
        return path.join(__dirname, pathName, filename);
    });
}

const allRecipes = getFileNames("../recipes");
console.log(allRecipes);
let lastFile;

function readAndParse(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding: "utf-8"}, (err, text) => {
      if (err) return reject(err);
      resolve(markdown.toHTML(text));
    });
  });
}

module.exports = function getRandomRecipe() {
  return new Promise(resolve => {
    let files;
    if (lastFile) {
      files = [].concat(allRecipes);
      files.splice(allRecipes.indexOf(lastFile), 1)
    } else {
      files = allRecipes;
    }
    const index = Math.floor(Math.random() * files.length);
    lastFile = files[index];
    resolve(readAndParse(lastFile));
  });
};
