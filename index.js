const menubar = require("menubar");
const {ipcMain} = require("electron");
const getRandomRecipe = require("./lib/get-recipe");
const mb = menubar({showDockIcon: true});

mb.on("ready", () => {
  console.log("ready!");
});

// mb.on("after-create-window", () => {
//   mb.window.openDevTools();
// });

ipcMain.on("message", (event, arg) => {
  console.log(arg);
  getRandomRecipe()
    .then(text => event.sender.send("message", text))
    .catch(err => {
      console.log(err);
      event.sender.send("message", `Oops, there was an error: ${err}`);
    });
});
