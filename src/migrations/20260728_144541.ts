import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_highlighted_title_and_eyebrow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_highlighted_title_and_eyebrow_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_our_difference_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_our_difference_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_our_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"foreground_image_id" integer,
  	"learn_more_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_our_difference_locales" (
  	"header_eyebrow" varchar,
  	"header_title_before_highlight" varchar NOT NULL,
  	"header_highlighted_title" varchar,
  	"header_title_after_highlight" varchar,
  	"header_subtitle" varchar,
  	"secondary_eyebrow" varchar,
  	"secondary_title_before_highlight" varchar NOT NULL,
  	"secondary_highlighted_title" varchar,
  	"secondary_title_after_highlight" varchar,
  	"secondary_subtitle" varchar,
  	"learn_more_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps_paragraphs_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_steps_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_principles_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"foreground_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_how_we_work_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_industries_industries_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"industries_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_projects_locales" ALTER COLUMN "title_before_highlight" SET NOT NULL;
  ALTER TABLE "pages_blocks_technologies_locales" ALTER COLUMN "title_before_highlight" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_locales" ALTER COLUMN "title_before_highlight" SET NOT NULL;
  ALTER TABLE "pages_blocks_home_blogs_locales" ALTER COLUMN "title_before_highlight" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_locales" ALTER COLUMN "title_before_highlight" SET NOT NULL;
  ALTER TABLE "pages_blocks_about_who_we_are_locales" ALTER COLUMN "highlighted_title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_highlighted_title_and_eyebrow" ADD CONSTRAINT "pages_blocks_highlighted_title_and_eyebrow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlighted_title_and_eyebrow_locales" ADD CONSTRAINT "pages_blocks_highlighted_title_and_eyebrow_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlighted_title_and_eyebrow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference_items" ADD CONSTRAINT "pages_blocks_about_our_difference_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_our_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference_items_locales" ADD CONSTRAINT "pages_blocks_about_our_difference_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_our_difference_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference" ADD CONSTRAINT "pages_blocks_about_our_difference_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference" ADD CONSTRAINT "pages_blocks_about_our_difference_foreground_image_id_media_id_fk" FOREIGN KEY ("foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference" ADD CONSTRAINT "pages_blocks_about_our_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_our_difference_locales" ADD CONSTRAINT "pages_blocks_about_our_difference_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_our_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_paragraphs" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_paragraphs_locales" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_paragraphs_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_steps_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_tags" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_tags_locales" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_tags_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_steps_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_locales" ADD CONSTRAINT "pages_blocks_about_how_we_work_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_principles" ADD CONSTRAINT "pages_blocks_about_how_we_work_principles_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_principles" ADD CONSTRAINT "pages_blocks_about_how_we_work_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_principles_locales" ADD CONSTRAINT "pages_blocks_about_how_we_work_principles_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work" ADD CONSTRAINT "pages_blocks_about_how_we_work_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work" ADD CONSTRAINT "pages_blocks_about_how_we_work_foreground_image_id_media_id_fk" FOREIGN KEY ("foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work" ADD CONSTRAINT "pages_blocks_about_how_we_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_how_we_work_locales" ADD CONSTRAINT "pages_blocks_about_how_we_work_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_how_we_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_industries" ADD CONSTRAINT "pages_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_industries_locales" ADD CONSTRAINT "pages_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries" ADD CONSTRAINT "pages_blocks_industries_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries" ADD CONSTRAINT "pages_blocks_industries_industries_background_image_id_media_id_fk" FOREIGN KEY ("industries_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries" ADD CONSTRAINT "pages_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_locales" ADD CONSTRAINT "pages_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_highlighted_title_and_eyebrow_order_idx" ON "pages_blocks_highlighted_title_and_eyebrow" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlighted_title_and_eyebrow_parent_id_idx" ON "pages_blocks_highlighted_title_and_eyebrow" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlighted_title_and_eyebrow_path_idx" ON "pages_blocks_highlighted_title_and_eyebrow" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_highlighted_title_and_eyebrow_locales_locale_pa" ON "pages_blocks_highlighted_title_and_eyebrow_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_our_difference_items_order_idx" ON "pages_blocks_about_our_difference_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_our_difference_items_parent_id_idx" ON "pages_blocks_about_our_difference_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_our_difference_items_locales_locale_paren" ON "pages_blocks_about_our_difference_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_our_difference_order_idx" ON "pages_blocks_about_our_difference" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_our_difference_parent_id_idx" ON "pages_blocks_about_our_difference" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_our_difference_path_idx" ON "pages_blocks_about_our_difference" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_our_difference_background_image_idx" ON "pages_blocks_about_our_difference" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_about_our_difference_foreground_image_idx" ON "pages_blocks_about_our_difference" USING btree ("foreground_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_our_difference_locales_locale_parent_id_u" ON "pages_blocks_about_our_difference_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_paragraphs_order_idx" ON "pages_blocks_about_how_we_work_steps_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_paragraphs_parent_id_idx" ON "pages_blocks_about_how_we_work_steps_paragraphs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_how_we_work_steps_paragraphs_locales_loca" ON "pages_blocks_about_how_we_work_steps_paragraphs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_tags_order_idx" ON "pages_blocks_about_how_we_work_steps_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_tags_parent_id_idx" ON "pages_blocks_about_how_we_work_steps_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_how_we_work_steps_tags_locales_locale_par" ON "pages_blocks_about_how_we_work_steps_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_order_idx" ON "pages_blocks_about_how_we_work_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_how_we_work_steps_parent_id_idx" ON "pages_blocks_about_how_we_work_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_how_we_work_steps_locales_locale_parent_i" ON "pages_blocks_about_how_we_work_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_principles_order_idx" ON "pages_blocks_about_how_we_work_principles" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_how_we_work_principles_parent_id_idx" ON "pages_blocks_about_how_we_work_principles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_principles_icon_idx" ON "pages_blocks_about_how_we_work_principles" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_about_how_we_work_principles_locales_locale_par" ON "pages_blocks_about_how_we_work_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_order_idx" ON "pages_blocks_about_how_we_work" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_how_we_work_parent_id_idx" ON "pages_blocks_about_how_we_work" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_how_we_work_path_idx" ON "pages_blocks_about_how_we_work" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_how_we_work_texture_waves_image_idx" ON "pages_blocks_about_how_we_work" USING btree ("texture_waves_image_id");
  CREATE INDEX "pages_blocks_about_how_we_work_foreground_image_idx" ON "pages_blocks_about_how_we_work" USING btree ("foreground_image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_how_we_work_locales_locale_parent_id_uniq" ON "pages_blocks_about_how_we_work_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_industries_industries_order_idx" ON "pages_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_industries_industries_parent_id_idx" ON "pages_blocks_industries_industries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_industries_industries_locales_locale_parent_id_" ON "pages_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_industries_order_idx" ON "pages_blocks_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_industries_parent_id_idx" ON "pages_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industries_path_idx" ON "pages_blocks_industries" USING btree ("_path");
  CREATE INDEX "pages_blocks_industries_background_image_idx" ON "pages_blocks_industries" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_industries_industries_background_image_idx" ON "pages_blocks_industries" USING btree ("industries_background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_industries_locales_locale_parent_id_unique" ON "pages_blocks_industries_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_highlighted_title_and_eyebrow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlighted_title_and_eyebrow_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_our_difference_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_our_difference_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_our_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_our_difference_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_paragraphs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_principles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_principles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_how_we_work_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_industries_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_industries_industries_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_industries_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_highlighted_title_and_eyebrow" CASCADE;
  DROP TABLE "pages_blocks_highlighted_title_and_eyebrow_locales" CASCADE;
  DROP TABLE "pages_blocks_about_our_difference_items" CASCADE;
  DROP TABLE "pages_blocks_about_our_difference_items_locales" CASCADE;
  DROP TABLE "pages_blocks_about_our_difference" CASCADE;
  DROP TABLE "pages_blocks_about_our_difference_locales" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps_paragraphs_locales" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps_tags" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_principles" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_principles_locales" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work" CASCADE;
  DROP TABLE "pages_blocks_about_how_we_work_locales" CASCADE;
  DROP TABLE "pages_blocks_industries_industries" CASCADE;
  DROP TABLE "pages_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "pages_blocks_industries" CASCADE;
  DROP TABLE "pages_blocks_industries_locales" CASCADE;
  ALTER TABLE "pages_blocks_projects_locales" ALTER COLUMN "title_before_highlight" DROP NOT NULL;
  ALTER TABLE "pages_blocks_technologies_locales" ALTER COLUMN "title_before_highlight" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_locales" ALTER COLUMN "title_before_highlight" DROP NOT NULL;
  ALTER TABLE "pages_blocks_home_blogs_locales" ALTER COLUMN "title_before_highlight" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_locales" ALTER COLUMN "title_before_highlight" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_who_we_are_locales" ALTER COLUMN "highlighted_title" SET NOT NULL;`)
}
