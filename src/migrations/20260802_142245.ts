import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_featured_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"selected_post_id" integer,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_post_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"read_more_text" varchar DEFAULT 'Read Article',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_hero_tags" ADD COLUMN "href" varchar NOT NULL;
  ALTER TABLE "pages_blocks_contact_what_we_deliver" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_project_built_for" ADD COLUMN "card_background_image_id" integer;
  ALTER TABLE "pages_blocks_featured_post" ADD CONSTRAINT "pages_blocks_featured_post_selected_post_id_posts_id_fk" FOREIGN KEY ("selected_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_post" ADD CONSTRAINT "pages_blocks_featured_post_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_post" ADD CONSTRAINT "pages_blocks_featured_post_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_post" ADD CONSTRAINT "pages_blocks_featured_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_post_locales" ADD CONSTRAINT "pages_blocks_featured_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_post"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_featured_post_order_idx" ON "pages_blocks_featured_post" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_post_parent_id_idx" ON "pages_blocks_featured_post" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_post_path_idx" ON "pages_blocks_featured_post" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_post_selected_post_idx" ON "pages_blocks_featured_post" USING btree ("selected_post_id");
  CREATE INDEX "pages_blocks_featured_post_background_image_idx" ON "pages_blocks_featured_post" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_featured_post_texture_waves_image_idx" ON "pages_blocks_featured_post" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_featured_post_locales_locale_parent_id_unique" ON "pages_blocks_featured_post_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_contact_what_we_deliver" ADD CONSTRAINT "pages_blocks_contact_what_we_deliver_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for" ADD CONSTRAINT "pages_blocks_project_built_for_card_background_image_id_media_id_fk" FOREIGN KEY ("card_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_what_we_deliver_background_image_idx" ON "pages_blocks_contact_what_we_deliver" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_project_built_for_card_background_image_idx" ON "pages_blocks_project_built_for" USING btree ("card_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_featured_post" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_post_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_featured_post" CASCADE;
  DROP TABLE "pages_blocks_featured_post_locales" CASCADE;
  ALTER TABLE "pages_blocks_contact_what_we_deliver" DROP CONSTRAINT "pages_blocks_contact_what_we_deliver_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_project_built_for" DROP CONSTRAINT "pages_blocks_project_built_for_card_background_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_contact_what_we_deliver_background_image_idx";
  DROP INDEX "pages_blocks_project_built_for_card_background_image_idx";
  ALTER TABLE "pages_blocks_about_hero_tags" DROP COLUMN "href";
  ALTER TABLE "pages_blocks_contact_what_we_deliver" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_project_built_for" DROP COLUMN "card_background_image_id";`)
}
