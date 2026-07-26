import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "texture_waves_image_id" integer;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_background_image_idx" ON "pages_blocks_faq" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_faq_texture_waves_image_idx" ON "pages_blocks_faq" USING btree ("texture_waves_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq" DROP CONSTRAINT "pages_blocks_faq_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_faq" DROP CONSTRAINT "pages_blocks_faq_texture_waves_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_faq_background_image_idx";
  DROP INDEX "pages_blocks_faq_texture_waves_image_idx";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "texture_waves_image_id";`)
}
