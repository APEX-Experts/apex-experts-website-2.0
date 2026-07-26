import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_projects_projects" ADD COLUMN "background_image_blur_id" integer;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_background_image_blur_id_media_id_fk" FOREIGN KEY ("background_image_blur_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_projects_projects_background_image_blur_idx" ON "pages_blocks_projects_projects" USING btree ("background_image_blur_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_projects_projects" DROP CONSTRAINT "pages_blocks_projects_projects_background_image_blur_id_media_id_fk";
  
  DROP INDEX "pages_blocks_projects_projects_background_image_blur_idx";
  ALTER TABLE "pages_blocks_projects_projects" DROP COLUMN "background_image_blur_id";`)
}
