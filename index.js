const admin = require('firebase-admin');
const serviceAccount = require('./prj-bu1-d-sample-base-2d69-5641f1d7ea73.json')
const FileSystem = require('fs');
const readline = require("readline");
// Load the service account key JSON file.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getToken() {
  admin.auth().createCustomToken(firebaseUserId).then((customToken) => {
    FileSystem.writeFile("newKey.json", JSON.stringify({ customToken }, null, 2), error => {
      if (error) throw error;
    });
      console.log(customToken);
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

let firebaseUserId;
rl.question("Write firebase user id: ", function (answer) {
  firebaseUserId = answer;
  getToken();
});
