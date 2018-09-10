import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction, DocumentChangeType, DocumentReference } from "@angular/fire/firestore";
import { WordItem } from "@shared/interfaces/word/word-item.interface";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WordService {

    constructor(private afs: AngularFirestore) {

    }

    public queryWords(uid: string): Observable<DocumentChangeAction<WordItem>[]> {
        return this.getWords(uid, ['added', 'removed', 'modified']);
    }

    public addWord(uid: string, word: WordItem): Observable<DocumentReference> {
        const userWordsCollection = this.afs.collection<WordItem>(`users/${uid}/words`);
        delete word.id;
        return from(userWordsCollection.add(word));
    }

    public removeWord(uid: string, word: WordItem): Observable<void> {
        return from(this.afs.doc<WordItem>(`users/${uid}/words/${word.id}`).delete());
    }

    public updateWord(uid: string, word: Partial<WordItem>): Observable<void> {
        delete word.id;
        return from(this.afs.doc<WordItem>(`users/${uid}/words/${word.id}`).update(word));
    }

    private getWords(uid: string, state: DocumentChangeType[]): Observable<DocumentChangeAction<WordItem>[]> {
        let userWordsCollection = this.afs.collection<WordItem>(`users/${uid}/words`);
        return userWordsCollection.stateChanges(state);
    }

    public static actionToWordItem(action: DocumentChangeAction<WordItem>) {
        const data = action.payload.doc.data() as WordItem;
        const id = action.payload.doc.id;
        return { ...data, id } as WordItem;
    }
}