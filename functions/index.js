const functions = require("firebase-functions");
const Filter = require("bad-words");
const admin = require("firebase-admin");
admin.initializeApp();

// const db = admin.firestore();

exports.detectBadUsers = functions.firestore
    .document("/message/{msgId}")
    .onCreate((snap, ctx) => {
      const filter = new Filter();
      const {text} = snap.data();
      if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        return snap.ref.update({text: cleaned});
      }
    });
