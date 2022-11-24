import { IsAlpha, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class WordPost {
  @IsNumber()
  userId!: number;

  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(50)
  word!: string;
}

export class WordPut {
  @IsAlpha()
  @IsNotEmpty()
  word: string;
}
