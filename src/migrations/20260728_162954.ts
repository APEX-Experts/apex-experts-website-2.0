import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_team_members_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_team_members_members_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_team_members_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_team_members_members" ADD CONSTRAINT "pages_blocks_about_team_members_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members_members" ADD CONSTRAINT "pages_blocks_about_team_members_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members_members_locales" ADD CONSTRAINT "pages_blocks_about_team_members_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_team_members_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members" ADD CONSTRAINT "pages_blocks_about_team_members_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members" ADD CONSTRAINT "pages_blocks_about_team_members_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members" ADD CONSTRAINT "pages_blocks_about_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members_locales" ADD CONSTRAINT "pages_blocks_about_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_team_members_members_order_idx" ON "pages_blocks_about_team_members_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_team_members_members_parent_id_idx" ON "pages_blocks_about_team_members_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_team_members_members_photo_idx" ON "pages_blocks_about_team_members_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_about_team_members_members_locales_locale_paren" ON "pages_blocks_about_team_members_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_team_members_order_idx" ON "pages_blocks_about_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_team_members_parent_id_idx" ON "pages_blocks_about_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_team_members_path_idx" ON "pages_blocks_about_team_members" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_team_members_texture_waves_image_idx" ON "pages_blocks_about_team_members" USING btree ("texture_waves_image_id");
  CREATE INDEX "pages_blocks_about_team_members_background_image_idx" ON "pages_blocks_about_team_members" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_team_members_locales_locale_parent_id_uni" ON "pages_blocks_about_team_members_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_team_members_members" CASCADE;
  DROP TABLE "pages_blocks_about_team_members_members_locales" CASCADE;
  DROP TABLE "pages_blocks_about_team_members" CASCADE;
  DROP TABLE "pages_blocks_about_team_members_locales" CASCADE;`)
}
