import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_clip_text_marquee_marquee_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_clip_text_marquee_marquee_icons_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_clip_text_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"clip_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_clip_text_marquee_locales" (
  	"text_before_highlight" varchar NOT NULL,
  	"highlighted_text" varchar,
  	"text_after_highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_clip_text_marquee_marquee_icons" ADD CONSTRAINT "pages_blocks_clip_text_marquee_marquee_icons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clip_text_marquee_marquee_icons" ADD CONSTRAINT "pages_blocks_clip_text_marquee_marquee_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clip_text_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clip_text_marquee_marquee_icons_locales" ADD CONSTRAINT "pages_blocks_clip_text_marquee_marquee_icons_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clip_text_marquee_marquee_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clip_text_marquee" ADD CONSTRAINT "pages_blocks_clip_text_marquee_clip_image_id_media_id_fk" FOREIGN KEY ("clip_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clip_text_marquee" ADD CONSTRAINT "pages_blocks_clip_text_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clip_text_marquee_locales" ADD CONSTRAINT "pages_blocks_clip_text_marquee_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clip_text_marquee"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_clip_text_marquee_marquee_icons_order_idx" ON "pages_blocks_clip_text_marquee_marquee_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_clip_text_marquee_marquee_icons_parent_id_idx" ON "pages_blocks_clip_text_marquee_marquee_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clip_text_marquee_marquee_icons_icon_idx" ON "pages_blocks_clip_text_marquee_marquee_icons" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_clip_text_marquee_marquee_icons_locales_locale_" ON "pages_blocks_clip_text_marquee_marquee_icons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_clip_text_marquee_order_idx" ON "pages_blocks_clip_text_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_clip_text_marquee_parent_id_idx" ON "pages_blocks_clip_text_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clip_text_marquee_path_idx" ON "pages_blocks_clip_text_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_clip_text_marquee_clip_image_idx" ON "pages_blocks_clip_text_marquee" USING btree ("clip_image_id");
  CREATE UNIQUE INDEX "pages_blocks_clip_text_marquee_locales_locale_parent_id_uniq" ON "pages_blocks_clip_text_marquee_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_clip_text_marquee_marquee_icons" CASCADE;
  DROP TABLE "pages_blocks_clip_text_marquee_marquee_icons_locales" CASCADE;
  DROP TABLE "pages_blocks_clip_text_marquee" CASCADE;
  DROP TABLE "pages_blocks_clip_text_marquee_locales" CASCADE;`)
}
