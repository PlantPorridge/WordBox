import { PartOfSpeech } from "@shared/enums/part-of-speech.enum";

export interface WordDefinition {
    partOfSpeech: PartOfSpeech,
    definition: string;
}