import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_directory_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_directory_list_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_directory" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_directory_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservices_subservices_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservices_subservices_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservices_subservices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar
  );
  
  CREATE TABLE "pages_blocks_subservices_subservices_locales" (
  	"supertitle" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"count_group_count_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservices_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"count_group_count_title" varchar,
  	"count_group_count_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it_items_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it_items_locales" (
  	"eyebrow" varchar,
  	"supertitle" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_when_you_need_it_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_readiness_check_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_readiness_check_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_readiness_check" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_readiness_check_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_directory_list" ADD CONSTRAINT "pages_blocks_directory_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_directory_list_locales" ADD CONSTRAINT "pages_blocks_directory_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_directory_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_directory" ADD CONSTRAINT "pages_blocks_directory_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_directory" ADD CONSTRAINT "pages_blocks_directory_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_directory" ADD CONSTRAINT "pages_blocks_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_directory_locales" ADD CONSTRAINT "pages_blocks_directory_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices_subservices_tags" ADD CONSTRAINT "pages_blocks_subservices_subservices_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservices_subservices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices_subservices_tags_locales" ADD CONSTRAINT "pages_blocks_subservices_subservices_tags_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservices_subservices_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices_subservices" ADD CONSTRAINT "pages_blocks_subservices_subservices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices_subservices_locales" ADD CONSTRAINT "pages_blocks_subservices_subservices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservices_subservices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices" ADD CONSTRAINT "pages_blocks_subservices_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices" ADD CONSTRAINT "pages_blocks_subservices_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices" ADD CONSTRAINT "pages_blocks_subservices_count_group_count_background_image_id_media_id_fk" FOREIGN KEY ("count_group_count_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices" ADD CONSTRAINT "pages_blocks_subservices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservices_locales" ADD CONSTRAINT "pages_blocks_subservices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it_items_tags" ADD CONSTRAINT "pages_blocks_when_you_need_it_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_when_you_need_it_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it_items_tags_locales" ADD CONSTRAINT "pages_blocks_when_you_need_it_items_tags_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_when_you_need_it_items_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it_items" ADD CONSTRAINT "pages_blocks_when_you_need_it_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_when_you_need_it"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it_items_locales" ADD CONSTRAINT "pages_blocks_when_you_need_it_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_when_you_need_it_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it" ADD CONSTRAINT "pages_blocks_when_you_need_it_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it" ADD CONSTRAINT "pages_blocks_when_you_need_it_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it" ADD CONSTRAINT "pages_blocks_when_you_need_it_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_when_you_need_it_locales" ADD CONSTRAINT "pages_blocks_when_you_need_it_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_when_you_need_it"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_readiness_check_items" ADD CONSTRAINT "pages_blocks_readiness_check_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_readiness_check"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_readiness_check_items_locales" ADD CONSTRAINT "pages_blocks_readiness_check_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_readiness_check_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_readiness_check" ADD CONSTRAINT "pages_blocks_readiness_check_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_readiness_check" ADD CONSTRAINT "pages_blocks_readiness_check_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_readiness_check_locales" ADD CONSTRAINT "pages_blocks_readiness_check_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_readiness_check"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_directory_list_order_idx" ON "pages_blocks_directory_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_directory_list_parent_id_idx" ON "pages_blocks_directory_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_directory_list_locales_locale_parent_id_unique" ON "pages_blocks_directory_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_directory_order_idx" ON "pages_blocks_directory" USING btree ("_order");
  CREATE INDEX "pages_blocks_directory_parent_id_idx" ON "pages_blocks_directory" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_directory_path_idx" ON "pages_blocks_directory" USING btree ("_path");
  CREATE INDEX "pages_blocks_directory_background_image_idx" ON "pages_blocks_directory" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_directory_texture_waves_image_idx" ON "pages_blocks_directory" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_directory_locales_locale_parent_id_unique" ON "pages_blocks_directory_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservices_subservices_tags_order_idx" ON "pages_blocks_subservices_subservices_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservices_subservices_tags_parent_id_idx" ON "pages_blocks_subservices_subservices_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservices_subservices_tags_locales_locale_par" ON "pages_blocks_subservices_subservices_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservices_subservices_order_idx" ON "pages_blocks_subservices_subservices" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservices_subservices_parent_id_idx" ON "pages_blocks_subservices_subservices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservices_subservices_locales_locale_parent_i" ON "pages_blocks_subservices_subservices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservices_order_idx" ON "pages_blocks_subservices" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservices_parent_id_idx" ON "pages_blocks_subservices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservices_path_idx" ON "pages_blocks_subservices" USING btree ("_path");
  CREATE INDEX "pages_blocks_subservices_background_image_idx" ON "pages_blocks_subservices" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_subservices_texture_waves_image_idx" ON "pages_blocks_subservices" USING btree ("texture_waves_image_id");
  CREATE INDEX "pages_blocks_subservices_count_group_count_group_count_b_idx" ON "pages_blocks_subservices" USING btree ("count_group_count_background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subservices_locales_locale_parent_id_unique" ON "pages_blocks_subservices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_when_you_need_it_items_tags_order_idx" ON "pages_blocks_when_you_need_it_items_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_when_you_need_it_items_tags_parent_id_idx" ON "pages_blocks_when_you_need_it_items_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_when_you_need_it_items_tags_locales_locale_pare" ON "pages_blocks_when_you_need_it_items_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_when_you_need_it_items_order_idx" ON "pages_blocks_when_you_need_it_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_when_you_need_it_items_parent_id_idx" ON "pages_blocks_when_you_need_it_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_when_you_need_it_items_locales_locale_parent_id" ON "pages_blocks_when_you_need_it_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_when_you_need_it_order_idx" ON "pages_blocks_when_you_need_it" USING btree ("_order");
  CREATE INDEX "pages_blocks_when_you_need_it_parent_id_idx" ON "pages_blocks_when_you_need_it" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_when_you_need_it_path_idx" ON "pages_blocks_when_you_need_it" USING btree ("_path");
  CREATE INDEX "pages_blocks_when_you_need_it_texture_waves_image_idx" ON "pages_blocks_when_you_need_it" USING btree ("texture_waves_image_id");
  CREATE INDEX "pages_blocks_when_you_need_it_background_image_idx" ON "pages_blocks_when_you_need_it" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_when_you_need_it_locales_locale_parent_id_uniqu" ON "pages_blocks_when_you_need_it_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_readiness_check_items_order_idx" ON "pages_blocks_readiness_check_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_readiness_check_items_parent_id_idx" ON "pages_blocks_readiness_check_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_readiness_check_items_locales_locale_parent_id_" ON "pages_blocks_readiness_check_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_readiness_check_order_idx" ON "pages_blocks_readiness_check" USING btree ("_order");
  CREATE INDEX "pages_blocks_readiness_check_parent_id_idx" ON "pages_blocks_readiness_check" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_readiness_check_path_idx" ON "pages_blocks_readiness_check" USING btree ("_path");
  CREATE INDEX "pages_blocks_readiness_check_texture_waves_image_idx" ON "pages_blocks_readiness_check" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_readiness_check_locales_locale_parent_id_unique" ON "pages_blocks_readiness_check_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_directory_list" CASCADE;
  DROP TABLE "pages_blocks_directory_list_locales" CASCADE;
  DROP TABLE "pages_blocks_directory" CASCADE;
  DROP TABLE "pages_blocks_directory_locales" CASCADE;
  DROP TABLE "pages_blocks_subservices_subservices_tags" CASCADE;
  DROP TABLE "pages_blocks_subservices_subservices_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_subservices_subservices" CASCADE;
  DROP TABLE "pages_blocks_subservices_subservices_locales" CASCADE;
  DROP TABLE "pages_blocks_subservices" CASCADE;
  DROP TABLE "pages_blocks_subservices_locales" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it_items_tags" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it_items_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it_items" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it_items_locales" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it" CASCADE;
  DROP TABLE "pages_blocks_when_you_need_it_locales" CASCADE;
  DROP TABLE "pages_blocks_readiness_check_items" CASCADE;
  DROP TABLE "pages_blocks_readiness_check_items_locales" CASCADE;
  DROP TABLE "pages_blocks_readiness_check" CASCADE;
  DROP TABLE "pages_blocks_readiness_check_locales" CASCADE;`)
}
