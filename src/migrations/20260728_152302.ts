import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_ways_ways" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_ways_ways_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"best_suited_for_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_ways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_ways_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"best_suited_for_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_ways_ways" ADD CONSTRAINT "pages_blocks_about_ways_ways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_ways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_ways_ways_locales" ADD CONSTRAINT "pages_blocks_about_ways_ways_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_ways_ways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_ways" ADD CONSTRAINT "pages_blocks_about_ways_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_ways" ADD CONSTRAINT "pages_blocks_about_ways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_ways_locales" ADD CONSTRAINT "pages_blocks_about_ways_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_ways"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_ways_ways_order_idx" ON "pages_blocks_about_ways_ways" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_ways_ways_parent_id_idx" ON "pages_blocks_about_ways_ways" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_ways_ways_locales_locale_parent_id_unique" ON "pages_blocks_about_ways_ways_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_ways_order_idx" ON "pages_blocks_about_ways" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_ways_parent_id_idx" ON "pages_blocks_about_ways" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_ways_path_idx" ON "pages_blocks_about_ways" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_ways_texture_waves_image_idx" ON "pages_blocks_about_ways" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_ways_locales_locale_parent_id_unique" ON "pages_blocks_about_ways_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_ways_ways" CASCADE;
  DROP TABLE "pages_blocks_about_ways_ways_locales" CASCADE;
  DROP TABLE "pages_blocks_about_ways" CASCADE;
  DROP TABLE "pages_blocks_about_ways_locales" CASCADE;`)
}
