"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// [START makeUppercase]
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// [START makeUppercaseTrigger]
exports.groupStarred = functions.firestore.document('/users/{userId}/words/{wordId}')
    .onUpdate((snap, context) => {
    // [END makeUppercaseTrigger]
    // [START makeUppercaseBody]
    // Grab the current value of what was written to the Realtime Database.
    const beforeStarred = snap.before.data().starred;
    const afterStarred = snap.after.data().starred;
    if (beforeStarred !== afterStarred) {
        if (afterStarred) {
            //add to starred doc
            // return admin.firestore().doc('/users/' + context.params.userId).update({starred: context.params.wordId});
            return admin.firestore().collection('/users/' + context.params.userId + '/starred').doc(context.params.wordId).set({ added: context.timestamp });
        }
        else {
            //remove from starred doc
            return admin.firestore().collection('/users/' + context.params.userId + '/starred').doc(context.params.wordId).delete();
        }
    }
    return new Promise(function (resolve, reject) {
        resolve();
    });
    //   console.log('Uppercasing', context.params.documentId, original);
    //   const uppercase = original.toUpperCase();
    //   // You must return a Promise when performing asynchronous tasks inside a Functions such as
    //   // writing to the Firebase Realtime Database.
    //   // Setting an 'uppercase' sibling in the Realtime Database returns a Promise.
    //   return snap.after.ref.set({uppercase}, {merge: true});
    //   // [END makeUppercaseBody]
});
// [END makeUppercase]
// [END all]
//# sourceMappingURL=index.js.map