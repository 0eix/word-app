import { Migration } from '@mikro-orm/migrations';

export class Migration20221123230256 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `word` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `word` text not null, `user_id` integer not null, constraint `word_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade);'
    );
    this.addSql('create unique index `word_word_unique` on `word` (`word`);');
    this.addSql('create index `word_user_id_index` on `word` (`user_id`);');
  }
}
