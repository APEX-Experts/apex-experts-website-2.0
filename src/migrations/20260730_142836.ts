import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_hero_cta_group_type" AS ENUM('primary', 'secondary');
  CREATE TABLE "pages_blocks_about_hero_cta_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"type" "enum_pages_blocks_about_hero_cta_group_type" DEFAULT 'primary' NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_hero_cta_group_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_what_we_deliver_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_what_we_deliver_items_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_what_we_deliver" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_what_we_deliver_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_about_hero_cta_group" ADD CONSTRAINT "pages_blocks_about_hero_cta_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_cta_group_locales" ADD CONSTRAINT "pages_blocks_about_hero_cta_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero_cta_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_items" ADD CONSTRAINT "pages_blocks_contact_what_we_deliver_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_what_we_deliver"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_items_locales" ADD CONSTRAINT "pages_blocks_contact_what_we_deliver_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_what_we_deliver_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_what_we_deliver" ADD CONSTRAINT "pages_blocks_contact_what_we_deliver_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_locales" ADD CONSTRAINT "pages_blocks_contact_what_we_deliver_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_what_we_deliver"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_hero_cta_group_order_idx" ON "pages_blocks_about_hero_cta_group" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_cta_group_parent_id_idx" ON "pages_blocks_about_hero_cta_group" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_hero_cta_group_locales_locale_parent_id_u" ON "pages_blocks_about_hero_cta_group_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_what_we_deliver_items_order_idx" ON "pages_blocks_contact_what_we_deliver_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_what_we_deliver_items_parent_id_idx" ON "pages_blocks_contact_what_we_deliver_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_what_we_deliver_items_locales_locale_pa" ON "pages_blocks_contact_what_we_deliver_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_what_we_deliver_order_idx" ON "pages_blocks_contact_what_we_deliver" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_what_we_deliver_parent_id_idx" ON "pages_blocks_contact_what_we_deliver" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_what_we_deliver_path_idx" ON "pages_blocks_contact_what_we_deliver" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_what_we_deliver_locales_locale_parent_i" ON "pages_blocks_contact_what_we_deliver_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "header_nav_items_mega_menu_items" ADD CONSTRAINT "header_nav_items_mega_menu_items_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_items_mega_menu_items_background_image_idx" ON "header_nav_items_mega_menu_items" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_hero_cta_group" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_hero_cta_group_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_what_we_deliver" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_what_we_deliver_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_about_hero_cta_group" CASCADE;
  DROP TABLE "pages_blocks_about_hero_cta_group_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_what_we_deliver_items" CASCADE;
  DROP TABLE "pages_blocks_contact_what_we_deliver_items_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_what_we_deliver" CASCADE;
  DROP TABLE "pages_blocks_contact_what_we_deliver_locales" CASCADE;
  ALTER TABLE "header_nav_items_mega_menu_items" DROP CONSTRAINT "header_nav_items_mega_menu_items_background_image_id_media_id_fk";
  
  DROP INDEX "header_nav_items_mega_menu_items_background_image_idx";
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "background_image_id";
  DROP TYPE "public"."enum_pages_blocks_about_hero_cta_group_type";`)
}
