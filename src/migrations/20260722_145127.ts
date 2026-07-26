import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_capabilities_capabilities_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_capabilities_services_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_capabilities_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_capabilities_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"count_title" varchar,
  	"count_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_capabilities_capabilities_services" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_capabilities_services" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_capabilities_services_locales" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_services_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities_capabilities_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_capabilities_locales" ADD CONSTRAINT "pages_blocks_capabilities_capabilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_locales" ADD CONSTRAINT "pages_blocks_capabilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_capabilities_capabilities_services_order_idx" ON "pages_blocks_capabilities_capabilities_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_capabilities_services_parent_id_idx" ON "pages_blocks_capabilities_capabilities_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_capabilities_services_icon_idx" ON "pages_blocks_capabilities_capabilities_services" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_capabilities_capabilities_services_locales_loca" ON "pages_blocks_capabilities_capabilities_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_capabilities_capabilities_order_idx" ON "pages_blocks_capabilities_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_capabilities_parent_id_idx" ON "pages_blocks_capabilities_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_capabilities_icon_idx" ON "pages_blocks_capabilities_capabilities" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_capabilities_capabilities_locales_locale_parent" ON "pages_blocks_capabilities_capabilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_capabilities_order_idx" ON "pages_blocks_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_parent_id_idx" ON "pages_blocks_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_path_idx" ON "pages_blocks_capabilities" USING btree ("_path");
  CREATE INDEX "pages_blocks_capabilities_background_image_idx" ON "pages_blocks_capabilities" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_capabilities_locales_locale_parent_id_unique" ON "pages_blocks_capabilities_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_capabilities_capabilities_services" CASCADE;
  DROP TABLE "pages_blocks_capabilities_capabilities_services_locales" CASCADE;
  DROP TABLE "pages_blocks_capabilities_capabilities" CASCADE;
  DROP TABLE "pages_blocks_capabilities_capabilities_locales" CASCADE;
  DROP TABLE "pages_blocks_capabilities" CASCADE;
  DROP TABLE "pages_blocks_capabilities_locales" CASCADE;`)
}
