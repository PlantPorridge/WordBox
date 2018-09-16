import { FirestoreIdentity } from "@shared/interfaces/firestore/firestore-identity.interface";

export interface WordItem extends FirestoreIdentity {
    word: string;
    starred: boolean;
}