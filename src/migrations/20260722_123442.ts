import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_home_about_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_about_list_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"clip_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_about_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_home_about_list" ADD CONSTRAINT "pages_blocks_home_about_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about_list_locales" ADD CONSTRAINT "pages_blocks_home_about_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_about_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_clip_image_id_media_id_fk" FOREIGN KEY ("clip_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about_locales" ADD CONSTRAINT "pages_blocks_home_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_about"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_about_list_order_idx" ON "pages_blocks_home_about_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_about_list_parent_id_idx" ON "pages_blocks_home_about_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_home_about_list_locales_locale_parent_id_unique" ON "pages_blocks_home_about_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_about_order_idx" ON "pages_blocks_home_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_about_parent_id_idx" ON "pages_blocks_home_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_about_path_idx" ON "pages_blocks_home_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_about_clip_image_idx" ON "pages_blocks_home_about" USING btree ("clip_image_id");
  CREATE UNIQUE INDEX "pages_blocks_home_about_locales_locale_parent_id_unique" ON "pages_blocks_home_about_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_home_about_list" CASCADE;
  DROP TABLE "pages_blocks_home_about_list_locales" CASCADE;
  DROP TABLE "pages_blocks_home_about" CASCADE;
  DROP TABLE "pages_blocks_home_about_locales" CASCADE;`)
}
