import { GoogleMeaning } from "@shared/interfaces/googledictionaryapi/google-meaning.interface";

export interface GoogleDefineResponse {
    word: string;
    meaning: GoogleMeaning;
}