import { FirestoreIdentity } from '@shared/interfaces/firestore/firestore-identity.interface';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';

export interface WordItem extends FirestoreIdentity {
    word: string;
    starred: boolean;
    definitions: WordDefinition[];
}
