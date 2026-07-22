import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_home_about" ADD COLUMN "background_texture_id" integer;
  ALTER TABLE "pages_blocks_home_about" ADD COLUMN "left_background_texture_id" integer;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_background_texture_id_media_id_fk" FOREIGN KEY ("background_texture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_left_background_texture_id_media_id_fk" FOREIGN KEY ("left_background_texture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_about_background_texture_idx" ON "pages_blocks_home_about" USING btree ("background_texture_id");
  CREATE INDEX "pages_blocks_home_about_left_background_texture_idx" ON "pages_blocks_home_about" USING btree ("left_background_texture_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_home_about" DROP CONSTRAINT "pages_blocks_home_about_background_texture_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_home_about" DROP CONSTRAINT "pages_blocks_home_about_left_background_texture_id_media_id_fk";
  
  DROP INDEX "pages_blocks_home_about_background_texture_idx";
  DROP INDEX "pages_blocks_home_about_left_background_texture_idx";
  ALTER TABLE "pages_blocks_home_about" DROP COLUMN "background_texture_id";
  ALTER TABLE "pages_blocks_home_about" DROP COLUMN "left_background_texture_id";`)
}
