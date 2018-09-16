import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.groupStarred = functions.firestore.document('/users/{userId}/words/{wordId}')
    .onUpdate((snap, context) => {

        const beforeStarred = snap.before.data().starred;
        const afterStarred = snap.after.data().starred;

        if(beforeStarred !== afterStarred){
            if(afterStarred){
                //add to starred doc
                // return admin.firestore().doc('/users/' + context.params.userId).update({starred: context.params.wordId});
                return admin.firestore().collection('/users/' + context.params.userId + '/starred').doc(context.params.wordId).set({added: context.timestamp});
            } else {
                //remove from starred doc
                return admin.firestore().collection('/users/' + context.params.userId + '/starred').doc(context.params.wordId).delete();
            }
        }

        return new Promise(function(resolve, reject) {
            resolve();
        });
    });