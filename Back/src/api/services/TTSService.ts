import { Service } from 'typedi';
import textToSpeech from '@google-cloud/text-to-speech';
// import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import fs from 'fs';
import util from 'util';

@Service()
export class TTSService {
  private client: any;

  constructor() {
    this.client = new textToSpeech.TextToSpeechClient();
  }
  async getAudioFromWord(
    _word: string,
    _languageCode: string
  ): Promise<string | Uint8Array | null | undefined> {
    const request = {
      input: { text: _word },
      voice: { languageCode: _languageCode, ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await this.client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    return '';
  }
}
