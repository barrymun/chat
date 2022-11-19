const functions = require("firebase-functions");
const Filter = require("bad-words");
const admin = require("firebase-admin");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

const db = admin.firestore;
exports.detectBadUsers = functions.firestore
  .document('message/{msgId}')
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const {text, uid} = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      await doc.ref.update({text: cleaned});
    }
  });
