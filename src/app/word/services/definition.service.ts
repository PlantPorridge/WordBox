import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartOfSpeech } from '@shared/enums/part-of-speech.enum';
import { GoogleDefineResponse } from '@shared/interfaces/googledictionaryapi/google-define-response.interface';
import { GoogleDefinition } from '@shared/interfaces/googledictionaryapi/google-definition.interface';
import { WordDefinition } from '@shared/interfaces/word/word-definition.interface';
// import * as request from 'request';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {

  constructor(private httpClient: HttpClient) { }

  public static responseToDefine(resp: GoogleDefineResponse): WordDefinition[] {
    let definitions: WordDefinition[] = [];
    Object.keys(resp.meaning).forEach((partOfSpeech: string) => {
      (<GoogleDefinition[]><any>resp.meaning[partOfSpeech]).forEach((definition: GoogleDefinition) => {
        definitions.push(
          {
            definition: definition.definition,
            partOfSpeech: partOfSpeech as PartOfSpeech
          }
        );
      });
    });
    return definitions;
  }

  public getDefinitions(word: string) {
    var url = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`;

    return this.httpClient.get<GoogleDefineResponse>(url);
  }


}
