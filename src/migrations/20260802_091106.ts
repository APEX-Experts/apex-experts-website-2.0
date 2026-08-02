import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_project_business_value_list" CASCADE;
  DROP TABLE "pages_blocks_project_business_value_list_locales" CASCADE;
  DROP TABLE "pages_blocks_project_business_value" CASCADE;
  DROP TABLE "pages_blocks_project_business_value_locales" CASCADE;
  ALTER TABLE "pages_blocks_directory" ADD COLUMN "is_project_page" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_project_business_value_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_project_business_value_list_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_business_value" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_business_value_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_project_business_value_list" ADD CONSTRAINT "pages_blocks_project_business_value_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value_list_locales" ADD CONSTRAINT "pages_blocks_project_business_value_list_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value" ADD CONSTRAINT "pages_blocks_project_business_value_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value" ADD CONSTRAINT "pages_blocks_project_business_value_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value_locales" ADD CONSTRAINT "pages_blocks_project_business_value_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_project_business_value_list_order_idx" ON "pages_blocks_project_business_value_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_business_value_list_parent_id_idx" ON "pages_blocks_project_business_value_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_business_value_list_locales_locale_pare" ON "pages_blocks_project_business_value_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_business_value_order_idx" ON "pages_blocks_project_business_value" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_business_value_parent_id_idx" ON "pages_blocks_project_business_value" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_business_value_path_idx" ON "pages_blocks_project_business_value" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_business_value_texture_waves_image_idx" ON "pages_blocks_project_business_value" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_business_value_locales_locale_parent_id" ON "pages_blocks_project_business_value_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_directory" DROP COLUMN "is_project_page";`)
}
