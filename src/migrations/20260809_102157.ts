import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_texts" ADD COLUMN "locale" "_locales";
  CREATE INDEX "posts_texts_locale_parent" ON "posts_texts" USING btree ("locale","parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "posts_texts_locale_parent";
  ALTER TABLE "posts_texts" DROP COLUMN "locale";`);
}
