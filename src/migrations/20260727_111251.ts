import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_form_form_fields_type" AS ENUM('text', 'textarea', 'email', 'password', 'phone');
  CREATE TABLE "pages_blocks_home_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"view_all_href" varchar DEFAULT '/blog',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_blogs_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"view_all_text" varchar DEFAULT 'View All Blogs',
  	"view_article_text" varchar DEFAULT 'Read Article',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_form_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_pages_blocks_contact_form_form_fields_type" DEFAULT 'text' NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_form_form_fields_locales" (
  	"label" varchar NOT NULL,
  	"placeholder" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_background_image_id" integer,
  	"form_foreground_image_id" integer,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"form_submit_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_home_blogs" ADD CONSTRAINT "pages_blocks_home_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_blogs_locales" ADD CONSTRAINT "pages_blocks_home_blogs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_form_fields" ADD CONSTRAINT "pages_blocks_contact_form_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_form_fields_locales" ADD CONSTRAINT "pages_blocks_contact_form_form_fields_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_form_background_image_id_media_id_fk" FOREIGN KEY ("form_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_form_foreground_image_id_media_id_fk" FOREIGN KEY ("form_foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD CONSTRAINT "pages_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_blogs_order_idx" ON "pages_blocks_home_blogs" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_blogs_parent_id_idx" ON "pages_blocks_home_blogs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_blogs_path_idx" ON "pages_blocks_home_blogs" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_home_blogs_locales_locale_parent_id_unique" ON "pages_blocks_home_blogs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_form_fields_order_idx" ON "pages_blocks_contact_form_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_form_fields_parent_id_idx" ON "pages_blocks_contact_form_form_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_form_fields_locales_locale_parent_" ON "pages_blocks_contact_form_form_fields_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_form_background_image_idx" ON "pages_blocks_contact_form" USING btree ("form_background_image_id");
  CREATE INDEX "pages_blocks_contact_form_form_foreground_image_idx" ON "pages_blocks_contact_form" USING btree ("form_foreground_image_id");
  CREATE INDEX "pages_blocks_contact_form_background_image_idx" ON "pages_blocks_contact_form" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_contact_form_texture_waves_image_idx" ON "pages_blocks_contact_form" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_texts_order_parent" ON "posts_texts" USING btree ("order","parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_home_blogs" CASCADE;
  DROP TABLE "pages_blocks_home_blogs_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_form_form_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_form_fields_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_contact_form_locales" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  ALTER TABLE "users" DROP COLUMN "name";
  DROP TYPE "public"."enum_pages_blocks_contact_form_form_fields_type";`)
}
