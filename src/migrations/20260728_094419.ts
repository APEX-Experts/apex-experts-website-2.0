import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_hero_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_about_hero_breadcrumb_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_hero_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee_icons_marquee_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee_icons_marquee_icons_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_stats_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_marquee_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_marquee_icons_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_who_we_are_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar NOT NULL,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_hero_breadcrumb" ADD CONSTRAINT "pages_blocks_about_hero_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_breadcrumb_locales" ADD CONSTRAINT "pages_blocks_about_hero_breadcrumb_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero_breadcrumb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_locales" ADD CONSTRAINT "pages_blocks_about_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_icons_marquee_icons" ADD CONSTRAINT "pages_blocks_marquee_icons_marquee_icons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_icons_marquee_icons" ADD CONSTRAINT "pages_blocks_marquee_icons_marquee_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_icons_marquee_icons_locales" ADD CONSTRAINT "pages_blocks_marquee_icons_marquee_icons_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_icons_marquee_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_icons" ADD CONSTRAINT "pages_blocks_marquee_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_stats" ADD CONSTRAINT "pages_blocks_about_who_we_are_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_stats_locales" ADD CONSTRAINT "pages_blocks_about_who_we_are_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_cards" ADD CONSTRAINT "pages_blocks_about_who_we_are_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_cards" ADD CONSTRAINT "pages_blocks_about_who_we_are_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_cards_locales" ADD CONSTRAINT "pages_blocks_about_who_we_are_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_marquee_icons" ADD CONSTRAINT "pages_blocks_about_who_we_are_marquee_icons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_marquee_icons" ADD CONSTRAINT "pages_blocks_about_who_we_are_marquee_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_marquee_icons_locales" ADD CONSTRAINT "pages_blocks_about_who_we_are_marquee_icons_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are_marquee_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are" ADD CONSTRAINT "pages_blocks_about_who_we_are_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are" ADD CONSTRAINT "pages_blocks_about_who_we_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_who_we_are_locales" ADD CONSTRAINT "pages_blocks_about_who_we_are_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_hero_breadcrumb_order_idx" ON "pages_blocks_about_hero_breadcrumb" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_breadcrumb_parent_id_idx" ON "pages_blocks_about_hero_breadcrumb" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_hero_breadcrumb_locales_locale_parent_id_" ON "pages_blocks_about_hero_breadcrumb_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_hero_order_idx" ON "pages_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_parent_id_idx" ON "pages_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_path_idx" ON "pages_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_hero_background_image_idx" ON "pages_blocks_about_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_hero_locales_locale_parent_id_unique" ON "pages_blocks_about_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_marquee_icons_marquee_icons_order_idx" ON "pages_blocks_marquee_icons_marquee_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_icons_marquee_icons_parent_id_idx" ON "pages_blocks_marquee_icons_marquee_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_icons_marquee_icons_icon_idx" ON "pages_blocks_marquee_icons_marquee_icons" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_marquee_icons_marquee_icons_locales_locale_pare" ON "pages_blocks_marquee_icons_marquee_icons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_marquee_icons_order_idx" ON "pages_blocks_marquee_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_icons_parent_id_idx" ON "pages_blocks_marquee_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_icons_path_idx" ON "pages_blocks_marquee_icons" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_who_we_are_stats_order_idx" ON "pages_blocks_about_who_we_are_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_who_we_are_stats_parent_id_idx" ON "pages_blocks_about_who_we_are_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_who_we_are_stats_locales_locale_parent_id" ON "pages_blocks_about_who_we_are_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_cards_order_idx" ON "pages_blocks_about_who_we_are_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_who_we_are_cards_parent_id_idx" ON "pages_blocks_about_who_we_are_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_cards_image_idx" ON "pages_blocks_about_who_we_are_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_who_we_are_cards_locales_locale_parent_id" ON "pages_blocks_about_who_we_are_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_marquee_icons_order_idx" ON "pages_blocks_about_who_we_are_marquee_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_who_we_are_marquee_icons_parent_id_idx" ON "pages_blocks_about_who_we_are_marquee_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_marquee_icons_icon_idx" ON "pages_blocks_about_who_we_are_marquee_icons" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_about_who_we_are_marquee_icons_locales_locale_p" ON "pages_blocks_about_who_we_are_marquee_icons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_order_idx" ON "pages_blocks_about_who_we_are" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_who_we_are_parent_id_idx" ON "pages_blocks_about_who_we_are" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_who_we_are_path_idx" ON "pages_blocks_about_who_we_are" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_who_we_are_background_image_idx" ON "pages_blocks_about_who_we_are" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_who_we_are_locales_locale_parent_id_uniqu" ON "pages_blocks_about_who_we_are_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_hero_breadcrumb" CASCADE;
  DROP TABLE "pages_blocks_about_hero_breadcrumb_locales" CASCADE;
  DROP TABLE "pages_blocks_about_hero" CASCADE;
  DROP TABLE "pages_blocks_about_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_marquee_icons_marquee_icons" CASCADE;
  DROP TABLE "pages_blocks_marquee_icons_marquee_icons_locales" CASCADE;
  DROP TABLE "pages_blocks_marquee_icons" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_stats" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_cards" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_marquee_icons" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_marquee_icons_locales" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are" CASCADE;
  DROP TABLE "pages_blocks_about_who_we_are_locales" CASCADE;`)
}
