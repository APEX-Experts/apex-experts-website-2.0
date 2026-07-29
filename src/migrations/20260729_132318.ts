import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_services_main_section_services_subservices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_services_main_section_services_subservices_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_main_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_background_image_id" integer,
  	"cta_href" varchar
  );
  
  CREATE TABLE "pages_blocks_services_main_section_services_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_main_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_main_section_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_common_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_common_cta_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"primary_cta_text" varchar,
  	"secondary_cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_services_main_section_services_subservices" ADD CONSTRAINT "pages_blocks_services_main_section_services_subservices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_main_section_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section_services_subservices_locales" ADD CONSTRAINT "pages_blocks_services_main_section_services_subservices_l_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_main_section_services_subservices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section_services" ADD CONSTRAINT "pages_blocks_services_main_section_services_card_background_image_id_media_id_fk" FOREIGN KEY ("card_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section_services" ADD CONSTRAINT "pages_blocks_services_main_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_main_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section_services_locales" ADD CONSTRAINT "pages_blocks_services_main_section_services_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_main_section_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section" ADD CONSTRAINT "pages_blocks_services_main_section_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section" ADD CONSTRAINT "pages_blocks_services_main_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section" ADD CONSTRAINT "pages_blocks_services_main_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_main_section_locales" ADD CONSTRAINT "pages_blocks_services_main_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_main_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_common_cta" ADD CONSTRAINT "pages_blocks_common_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_common_cta" ADD CONSTRAINT "pages_blocks_common_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_common_cta_locales" ADD CONSTRAINT "pages_blocks_common_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_common_cta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_services_main_section_services_subservices_order_idx" ON "pages_blocks_services_main_section_services_subservices" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_main_section_services_subservices_parent_id_idx" ON "pages_blocks_services_main_section_services_subservices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_main_section_services_subservices_loca" ON "pages_blocks_services_main_section_services_subservices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_main_section_services_order_idx" ON "pages_blocks_services_main_section_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_main_section_services_parent_id_idx" ON "pages_blocks_services_main_section_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_main_section_services_card_backgro_idx" ON "pages_blocks_services_main_section_services" USING btree ("card_background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_services_main_section_services_locales_locale_p" ON "pages_blocks_services_main_section_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_main_section_order_idx" ON "pages_blocks_services_main_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_main_section_parent_id_idx" ON "pages_blocks_services_main_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_main_section_path_idx" ON "pages_blocks_services_main_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_main_section_texture_waves_image_idx" ON "pages_blocks_services_main_section" USING btree ("texture_waves_image_id");
  CREATE INDEX "pages_blocks_services_main_section_background_image_idx" ON "pages_blocks_services_main_section" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_services_main_section_locales_locale_parent_id_" ON "pages_blocks_services_main_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_common_cta_order_idx" ON "pages_blocks_common_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_common_cta_parent_id_idx" ON "pages_blocks_common_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_common_cta_path_idx" ON "pages_blocks_common_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_common_cta_background_image_idx" ON "pages_blocks_common_cta" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_common_cta_locales_locale_parent_id_unique" ON "pages_blocks_common_cta_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_services_main_section_services_subservices" CASCADE;
  DROP TABLE "pages_blocks_services_main_section_services_subservices_locales" CASCADE;
  DROP TABLE "pages_blocks_services_main_section_services" CASCADE;
  DROP TABLE "pages_blocks_services_main_section_services_locales" CASCADE;
  DROP TABLE "pages_blocks_services_main_section" CASCADE;
  DROP TABLE "pages_blocks_services_main_section_locales" CASCADE;
  DROP TABLE "pages_blocks_common_cta" CASCADE;
  DROP TABLE "pages_blocks_common_cta_locales" CASCADE;`)
}
