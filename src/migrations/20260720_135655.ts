import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_stats_locales" (
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_gallery_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"image_alt" varchar NOT NULL,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar NOT NULL,
  	"title_after_highlight" varchar,
  	"subtitle" varchar NOT NULL,
  	"cta_primary_text" varchar NOT NULL,
  	"cta_secondary_text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_title" varchar NOT NULL,
  	"site_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu_items_subitems_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu_items_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"mega_menu_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_locales" (
  	"brand_name" varchar DEFAULT 'APEX Experts' NOT NULL,
  	"action_button_label" varchar DEFAULT 'Sign In',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_name" varchar DEFAULT 'APEX Experts' NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_stats_locales" ADD CONSTRAINT "pages_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_gallery_locales" ADD CONSTRAINT "pages_blocks_hero_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_items_subitems_locales" ADD CONSTRAINT "header_nav_items_mega_menu_items_subitems_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_items_locales" ADD CONSTRAINT "header_nav_items_mega_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links_locales" ADD CONSTRAINT "footer_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links_locales" ADD CONSTRAINT "footer_bottom_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_bottom_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_stats_locales_locale_parent_id_unique" ON "pages_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_gallery_locales_locale_parent_id_unique" ON "pages_blocks_hero_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_mega_menu_items_subitems_locales_locale_par" ON "header_nav_items_mega_menu_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_mega_menu_items_locales_locale_parent_id_un" ON "header_nav_items_mega_menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_social_links_locales_locale_parent_id_unique" ON "footer_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_bottom_links_locales_locale_parent_id_unique" ON "footer_bottom_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "pages_blocks_hero_stats" DROP COLUMN "number";
  ALTER TABLE "pages_blocks_hero_stats" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_hero_gallery" DROP COLUMN "alt";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "image_alt";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "title_before_highlight";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "highlighted_title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "title_after_highlight";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_primary_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_secondary_text";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "site_settings" DROP COLUMN "site_title";
  ALTER TABLE "site_settings" DROP COLUMN "site_description";
  ALTER TABLE "header_nav_items_mega_menu_items_subitems" DROP COLUMN "title";
  ALTER TABLE "header_nav_items_mega_menu_items_subitems" DROP COLUMN "description";
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "title";
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "subtitle";
  ALTER TABLE "header_nav_items" DROP COLUMN "label";
  ALTER TABLE "header_nav_items" DROP COLUMN "mega_menu_title";
  ALTER TABLE "header" DROP COLUMN "brand_name";
  ALTER TABLE "header" DROP COLUMN "action_button_label";
  ALTER TABLE "footer_social_links" DROP COLUMN "label";
  ALTER TABLE "footer_columns_links" DROP COLUMN "label";
  ALTER TABLE "footer_columns" DROP COLUMN "title";
  ALTER TABLE "footer_bottom_links" DROP COLUMN "label";
  ALTER TABLE "footer" DROP COLUMN "brand_name";
  ALTER TABLE "footer" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu_items_subitems_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_items_subitems_locales" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_items_locales" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_social_links_locales" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_bottom_links_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero_stats" ADD COLUMN "number" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero_stats" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero_gallery" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "image_alt" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "title_before_highlight" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "highlighted_title" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "title_after_highlight" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subtitle" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_primary_text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_secondary_text" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "site_title" varchar NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items_subitems" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items_subitems" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "subtitle" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "mega_menu_title" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN "brand_name" varchar DEFAULT 'APEX Experts' NOT NULL;
  ALTER TABLE "header" ADD COLUMN "action_button_label" varchar DEFAULT 'Sign In';
  ALTER TABLE "footer_social_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_columns_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_columns" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "footer_bottom_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "brand_name" varchar DEFAULT 'APEX Experts' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "description" varchar;
  DROP TYPE "public"."_locales";`)
}
