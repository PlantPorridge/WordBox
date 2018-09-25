import { GoogleDefinition } from "@shared/interfaces/googledictionaryapi/google-definition.interface";

export class GoogleMeaning {
    [partOfSpeech: string]: GoogleDefinition[];
}