import { User } from './../../database/entities/User';
import { wrap } from '@mikro-orm/core';
import {
  JsonController,
  Param,
  Get,
  Post,
  Put,
  Delete,
  NotFoundError,
  Body,
  QueryParam,
} from 'routing-controllers';
import { Word } from '../../database/entities/Word';
import { WordPost, WordPut } from '../models/Word';
import { Service } from 'typedi';
import { ResponseSchema } from 'routing-controllers-openapi';
import { AppService } from '../../core/services/AppService';
import { TTSService } from '../services/TTSService';

@JsonController('/words')
@Service()
export class WordController {
  constructor(public appService: AppService, public ttsService: TTSService) {}

  @Get('/:word/:languageCode', { transformResponse: false })
  async getWord(
    @Param('word') word: string,
    @Param('languageCode') languageCode: string
  ): Promise<string | Uint8Array | null | undefined> {
    return this.ttsService.getAudioFromWord(word, languageCode);
  }

  @Get('/', { transformResponse: false })
  @ResponseSchema(Word)
  async getByUserId(@QueryParam('user-id') userId: number): Promise<Word[]> {
    const em = this.appService.getEntityManager();
    const result = await (
      await em.getRepository<Word>('Word').find({ user: { id: userId } })
    ).sort((user1, user2) => user1.id - user2.id);
    return result;
  }

  @Post('/', { transformResponse: false })
  @ResponseSchema(Word)
  async post(@Body() word: WordPost): Promise<Word> {
    const em = this.appService.getEntityManager();
    const userBdd = await em
      .getRepository<User>('User')
      .findOneOrFail(
        { id: word.userId },
        { failHandler: () => new NotFoundError() }
      );

    const wordBdd = new Word();
    wrap(wordBdd).assign({
      user: userBdd,
      word: word.word,
    });
    await em.persistAndFlush(wordBdd);
    return wordBdd;
  }

  @Put('/:id', { transformResponse: false })
  @ResponseSchema(Word)
  async put(@Param('id') id: number, @Body() word: WordPut): Promise<Word> {
    const em = this.appService.getEntityManager();
    const result = await em
      .getRepository<Word>('Word')
      .findOneOrFail({ id }, { failHandler: () => new NotFoundError() });
    wrap(result).assign(word);
    await em.persistAndFlush(result);
    return result;
  }

  @Delete('/:id', { transformResponse: false })
  @ResponseSchema(Word)
  async delete(@Param('id') id: number): Promise<Word> {
    const em = this.appService.getEntityManager();
    const result = await em
      .getRepository<Word>('Word')
      .findOneOrFail({ id }, { failHandler: () => new NotFoundError() });
    await em.removeAndFlush(result);
    return result;
  }
}
