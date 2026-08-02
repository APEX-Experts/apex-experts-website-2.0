import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_project_cta_cta_group_type" AS ENUM('primary', 'secondary');
  CREATE TABLE "pages_blocks_about_hero_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_hero_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "pages_blocks_project_principles_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_project_principles_principles_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"card_foreground_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_principles_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_value_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_project_value_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_value" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_value_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_cta_cta_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"type" "enum_pages_blocks_project_cta_cta_group_type" DEFAULT 'primary' NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_cta_cta_group_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_cta_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_built_for_foreground_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_built_for_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_built_for_bullet_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_built_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_built_for_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"waves_texture_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_text_block_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_what_comes_next_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_what_comes_next_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_what_comes_next" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_what_comes_next_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_pipeline_pipeline_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_pipeline_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_pipeline_pipeline_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"texture_waves_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_pipeline_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_items_subitems_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_items_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_steps_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_icon_svg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_features_steps_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pg_svc_uc_cap_uc" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pg_svc_uc_cap_uc_locales" (
  	"use_case" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_use_cases_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"side_note_icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_use_cases_capabilities_locales" (
  	"eyebrow" varchar,
  	"supertitle" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"use_cases_label" varchar,
  	"side_note_title" varchar,
  	"side_note_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"foreground_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_use_cases_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_text_and_tags_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_text_and_tags_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_text_and_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_text_and_tags_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_deliverables_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_deliverables_deliverables_locales" (
  	"deliverable" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_subservice_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marker_svg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subservice_deliverables_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_hero" ADD COLUMN "justify_from_start" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_about_hero_tags" ADD CONSTRAINT "pages_blocks_about_hero_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_tags_locales" ADD CONSTRAINT "pages_blocks_about_hero_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value_list" ADD CONSTRAINT "pages_blocks_project_business_value_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value_list_locales" ADD CONSTRAINT "pages_blocks_project_business_value_list_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value" ADD CONSTRAINT "pages_blocks_project_business_value_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value" ADD CONSTRAINT "pages_blocks_project_business_value_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_business_value_locales" ADD CONSTRAINT "pages_blocks_project_business_value_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_business_value"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles_principles" ADD CONSTRAINT "pages_blocks_project_principles_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles_principles_locales" ADD CONSTRAINT "pages_blocks_project_principles_principles_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_principles_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles" ADD CONSTRAINT "pages_blocks_project_principles_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles" ADD CONSTRAINT "pages_blocks_project_principles_card_foreground_image_id_media_id_fk" FOREIGN KEY ("card_foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles" ADD CONSTRAINT "pages_blocks_project_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_principles_locales" ADD CONSTRAINT "pages_blocks_project_principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_value_items" ADD CONSTRAINT "pages_blocks_project_value_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_value"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_value_items_locales" ADD CONSTRAINT "pages_blocks_project_value_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_value_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_value" ADD CONSTRAINT "pages_blocks_project_value_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_value" ADD CONSTRAINT "pages_blocks_project_value_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_value_locales" ADD CONSTRAINT "pages_blocks_project_value_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_value"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_cta_cta_group" ADD CONSTRAINT "pages_blocks_project_cta_cta_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_cta_cta_group_locales" ADD CONSTRAINT "pages_blocks_project_cta_cta_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_cta_cta_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_cta" ADD CONSTRAINT "pages_blocks_project_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_cta" ADD CONSTRAINT "pages_blocks_project_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_cta_locales" ADD CONSTRAINT "pages_blocks_project_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for_foreground_images" ADD CONSTRAINT "pages_blocks_project_built_for_foreground_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for_foreground_images" ADD CONSTRAINT "pages_blocks_project_built_for_foreground_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_built_for"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for_bullet_points" ADD CONSTRAINT "pages_blocks_project_built_for_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_built_for"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for_bullet_points_locales" ADD CONSTRAINT "pages_blocks_project_built_for_bullet_points_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_built_for_bullet_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for" ADD CONSTRAINT "pages_blocks_project_built_for_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for" ADD CONSTRAINT "pages_blocks_project_built_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_built_for_locales" ADD CONSTRAINT "pages_blocks_project_built_for_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_built_for"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_text_block" ADD CONSTRAINT "pages_blocks_project_text_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_text_block" ADD CONSTRAINT "pages_blocks_project_text_block_waves_texture_image_id_media_id_fk" FOREIGN KEY ("waves_texture_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_text_block" ADD CONSTRAINT "pages_blocks_project_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_text_block_locales" ADD CONSTRAINT "pages_blocks_project_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next_items" ADD CONSTRAINT "pages_blocks_project_what_comes_next_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_what_comes_next"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next_items_locales" ADD CONSTRAINT "pages_blocks_project_what_comes_next_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_what_comes_next_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next" ADD CONSTRAINT "pages_blocks_project_what_comes_next_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next" ADD CONSTRAINT "pages_blocks_project_what_comes_next_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next" ADD CONSTRAINT "pages_blocks_project_what_comes_next_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_what_comes_next_locales" ADD CONSTRAINT "pages_blocks_project_what_comes_next_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_what_comes_next"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline_pipeline_images" ADD CONSTRAINT "pages_blocks_subservice_pipeline_pipeline_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline_pipeline_images" ADD CONSTRAINT "pages_blocks_subservice_pipeline_pipeline_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_pipeline_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline_pipeline" ADD CONSTRAINT "pages_blocks_subservice_pipeline_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline_pipeline_locales" ADD CONSTRAINT "pages_blocks_subservice_pipeline_pipeline_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_pipeline_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline" ADD CONSTRAINT "pages_blocks_subservice_pipeline_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline" ADD CONSTRAINT "pages_blocks_subservice_pipeline_texture_waves_image_id_media_id_fk" FOREIGN KEY ("texture_waves_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline" ADD CONSTRAINT "pages_blocks_subservice_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_pipeline_locales" ADD CONSTRAINT "pages_blocks_subservice_pipeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_items_subitems" ADD CONSTRAINT "pages_blocks_subservice_features_steps_items_subitems_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_items_subitems" ADD CONSTRAINT "pages_blocks_subservice_features_steps_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_items_subitems_locales" ADD CONSTRAINT "pages_blocks_subservice_features_steps_items_subitems_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_items" ADD CONSTRAINT "pages_blocks_subservice_features_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_items_locales" ADD CONSTRAINT "pages_blocks_subservice_features_steps_items_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_steps" ADD CONSTRAINT "pages_blocks_subservice_features_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_steps_locales" ADD CONSTRAINT "pages_blocks_subservice_features_steps_steps_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps" ADD CONSTRAINT "pages_blocks_subservice_features_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_features_steps_locales" ADD CONSTRAINT "pages_blocks_subservice_features_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_features_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pg_svc_uc_cap_uc" ADD CONSTRAINT "pg_svc_uc_cap_uc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_use_cases_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pg_svc_uc_cap_uc_locales" ADD CONSTRAINT "pg_svc_uc_cap_uc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pg_svc_uc_cap_uc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases_capabilities" ADD CONSTRAINT "pages_blocks_subservice_use_cases_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases_capabilities_locales" ADD CONSTRAINT "pages_blocks_subservice_use_cases_capabilities_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_use_cases_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases" ADD CONSTRAINT "pages_blocks_subservice_use_cases_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases" ADD CONSTRAINT "pages_blocks_subservice_use_cases_foreground_image_id_media_id_fk" FOREIGN KEY ("foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases" ADD CONSTRAINT "pages_blocks_subservice_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_use_cases_locales" ADD CONSTRAINT "pages_blocks_subservice_use_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_text_and_tags_tags" ADD CONSTRAINT "pages_blocks_subservice_text_and_tags_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_text_and_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_text_and_tags_tags_locales" ADD CONSTRAINT "pages_blocks_subservice_text_and_tags_tags_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_text_and_tags_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_text_and_tags" ADD CONSTRAINT "pages_blocks_subservice_text_and_tags_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_text_and_tags" ADD CONSTRAINT "pages_blocks_subservice_text_and_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_text_and_tags_locales" ADD CONSTRAINT "pages_blocks_subservice_text_and_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_text_and_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_deliverables_deliverables" ADD CONSTRAINT "pages_blocks_subservice_deliverables_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_deliverables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_deliverables_deliverables_locales" ADD CONSTRAINT "pages_blocks_subservice_deliverables_deliverables_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_deliverables_deliverables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_deliverables" ADD CONSTRAINT "pages_blocks_subservice_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subservice_deliverables_locales" ADD CONSTRAINT "pages_blocks_subservice_deliverables_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subservice_deliverables"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_hero_tags_order_idx" ON "pages_blocks_about_hero_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_tags_parent_id_idx" ON "pages_blocks_about_hero_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_hero_tags_locales_locale_parent_id_unique" ON "pages_blocks_about_hero_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_business_value_list_order_idx" ON "pages_blocks_project_business_value_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_business_value_list_parent_id_idx" ON "pages_blocks_project_business_value_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_business_value_list_locales_locale_pare" ON "pages_blocks_project_business_value_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_business_value_order_idx" ON "pages_blocks_project_business_value" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_business_value_parent_id_idx" ON "pages_blocks_project_business_value" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_business_value_path_idx" ON "pages_blocks_project_business_value" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_business_value_texture_waves_image_idx" ON "pages_blocks_project_business_value" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_business_value_locales_locale_parent_id" ON "pages_blocks_project_business_value_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_principles_principles_order_idx" ON "pages_blocks_project_principles_principles" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_principles_principles_parent_id_idx" ON "pages_blocks_project_principles_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_principles_principles_locales_locale_pa" ON "pages_blocks_project_principles_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_principles_order_idx" ON "pages_blocks_project_principles" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_principles_parent_id_idx" ON "pages_blocks_project_principles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_principles_path_idx" ON "pages_blocks_project_principles" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_principles_background_image_idx" ON "pages_blocks_project_principles" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_project_principles_card_foreground_image_idx" ON "pages_blocks_project_principles" USING btree ("card_foreground_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_principles_locales_locale_parent_id_uni" ON "pages_blocks_project_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_value_items_order_idx" ON "pages_blocks_project_value_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_value_items_parent_id_idx" ON "pages_blocks_project_value_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_value_items_locales_locale_parent_id_un" ON "pages_blocks_project_value_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_value_order_idx" ON "pages_blocks_project_value" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_value_parent_id_idx" ON "pages_blocks_project_value" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_value_path_idx" ON "pages_blocks_project_value" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_value_texture_waves_image_idx" ON "pages_blocks_project_value" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_value_locales_locale_parent_id_unique" ON "pages_blocks_project_value_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_cta_cta_group_order_idx" ON "pages_blocks_project_cta_cta_group" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_cta_cta_group_parent_id_idx" ON "pages_blocks_project_cta_cta_group" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_cta_cta_group_locales_locale_parent_id_" ON "pages_blocks_project_cta_cta_group_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_cta_order_idx" ON "pages_blocks_project_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_cta_parent_id_idx" ON "pages_blocks_project_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_cta_path_idx" ON "pages_blocks_project_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_cta_background_image_idx" ON "pages_blocks_project_cta" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_cta_locales_locale_parent_id_unique" ON "pages_blocks_project_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_built_for_foreground_images_order_idx" ON "pages_blocks_project_built_for_foreground_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_built_for_foreground_images_parent_id_idx" ON "pages_blocks_project_built_for_foreground_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_built_for_foreground_images_image_idx" ON "pages_blocks_project_built_for_foreground_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_project_built_for_bullet_points_order_idx" ON "pages_blocks_project_built_for_bullet_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_built_for_bullet_points_parent_id_idx" ON "pages_blocks_project_built_for_bullet_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_built_for_bullet_points_locales_locale_" ON "pages_blocks_project_built_for_bullet_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_built_for_order_idx" ON "pages_blocks_project_built_for" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_built_for_parent_id_idx" ON "pages_blocks_project_built_for" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_built_for_path_idx" ON "pages_blocks_project_built_for" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_built_for_background_image_idx" ON "pages_blocks_project_built_for" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_built_for_locales_locale_parent_id_uniq" ON "pages_blocks_project_built_for_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_text_block_order_idx" ON "pages_blocks_project_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_text_block_parent_id_idx" ON "pages_blocks_project_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_text_block_path_idx" ON "pages_blocks_project_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_text_block_background_image_idx" ON "pages_blocks_project_text_block" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_project_text_block_waves_texture_image_idx" ON "pages_blocks_project_text_block" USING btree ("waves_texture_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_text_block_locales_locale_parent_id_uni" ON "pages_blocks_project_text_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_what_comes_next_items_order_idx" ON "pages_blocks_project_what_comes_next_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_what_comes_next_items_parent_id_idx" ON "pages_blocks_project_what_comes_next_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_project_what_comes_next_items_locales_locale_pa" ON "pages_blocks_project_what_comes_next_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_what_comes_next_order_idx" ON "pages_blocks_project_what_comes_next" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_what_comes_next_parent_id_idx" ON "pages_blocks_project_what_comes_next" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_what_comes_next_path_idx" ON "pages_blocks_project_what_comes_next" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_what_comes_next_background_image_idx" ON "pages_blocks_project_what_comes_next" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_project_what_comes_next_texture_waves_image_idx" ON "pages_blocks_project_what_comes_next" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_project_what_comes_next_locales_locale_parent_i" ON "pages_blocks_project_what_comes_next_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_pipeline_images_order_idx" ON "pages_blocks_subservice_pipeline_pipeline_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_pipeline_pipeline_images_parent_id_idx" ON "pages_blocks_subservice_pipeline_pipeline_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_pipeline_images_image_idx" ON "pages_blocks_subservice_pipeline_pipeline_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_pipeline_order_idx" ON "pages_blocks_subservice_pipeline_pipeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_pipeline_pipeline_parent_id_idx" ON "pages_blocks_subservice_pipeline_pipeline" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_pipeline_pipeline_locales_locale_par" ON "pages_blocks_subservice_pipeline_pipeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_order_idx" ON "pages_blocks_subservice_pipeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_pipeline_parent_id_idx" ON "pages_blocks_subservice_pipeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_path_idx" ON "pages_blocks_subservice_pipeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_subservice_pipeline_background_image_idx" ON "pages_blocks_subservice_pipeline" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_subservice_pipeline_texture_waves_image_idx" ON "pages_blocks_subservice_pipeline" USING btree ("texture_waves_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_pipeline_locales_locale_parent_id_un" ON "pages_blocks_subservice_pipeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_items_subitems_order_idx" ON "pages_blocks_subservice_features_steps_items_subitems" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_features_steps_items_subitems_parent_id_idx" ON "pages_blocks_subservice_features_steps_items_subitems" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_items_subitems_ba_idx" ON "pages_blocks_subservice_features_steps_items_subitems" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_features_steps_items_subitems_locale" ON "pages_blocks_subservice_features_steps_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_items_order_idx" ON "pages_blocks_subservice_features_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_features_steps_items_parent_id_idx" ON "pages_blocks_subservice_features_steps_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_features_steps_items_locales_locale_" ON "pages_blocks_subservice_features_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_steps_order_idx" ON "pages_blocks_subservice_features_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_features_steps_steps_parent_id_idx" ON "pages_blocks_subservice_features_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_features_steps_steps_locales_locale_" ON "pages_blocks_subservice_features_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_order_idx" ON "pages_blocks_subservice_features_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_features_steps_parent_id_idx" ON "pages_blocks_subservice_features_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_features_steps_path_idx" ON "pages_blocks_subservice_features_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_subservice_features_steps_locales_locale_parent" ON "pages_blocks_subservice_features_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pg_svc_uc_cap_uc_order_idx" ON "pg_svc_uc_cap_uc" USING btree ("_order");
  CREATE INDEX "pg_svc_uc_cap_uc_parent_id_idx" ON "pg_svc_uc_cap_uc" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pg_svc_uc_cap_uc_locales_locale_parent_id_unique" ON "pg_svc_uc_cap_uc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_use_cases_capabilities_order_idx" ON "pages_blocks_subservice_use_cases_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_use_cases_capabilities_parent_id_idx" ON "pages_blocks_subservice_use_cases_capabilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_use_cases_capabilities_locales_local" ON "pages_blocks_subservice_use_cases_capabilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_use_cases_order_idx" ON "pages_blocks_subservice_use_cases" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_use_cases_parent_id_idx" ON "pages_blocks_subservice_use_cases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_use_cases_path_idx" ON "pages_blocks_subservice_use_cases" USING btree ("_path");
  CREATE INDEX "pages_blocks_subservice_use_cases_background_image_idx" ON "pages_blocks_subservice_use_cases" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_subservice_use_cases_foreground_image_idx" ON "pages_blocks_subservice_use_cases" USING btree ("foreground_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_use_cases_locales_locale_parent_id_u" ON "pages_blocks_subservice_use_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_tags_order_idx" ON "pages_blocks_subservice_text_and_tags_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_tags_parent_id_idx" ON "pages_blocks_subservice_text_and_tags_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_text_and_tags_tags_locales_locale_pa" ON "pages_blocks_subservice_text_and_tags_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_order_idx" ON "pages_blocks_subservice_text_and_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_parent_id_idx" ON "pages_blocks_subservice_text_and_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_path_idx" ON "pages_blocks_subservice_text_and_tags" USING btree ("_path");
  CREATE INDEX "pages_blocks_subservice_text_and_tags_background_image_idx" ON "pages_blocks_subservice_text_and_tags" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_text_and_tags_locales_locale_parent_" ON "pages_blocks_subservice_text_and_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_deliverables_deliverables_order_idx" ON "pages_blocks_subservice_deliverables_deliverables" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_deliverables_deliverables_parent_id_idx" ON "pages_blocks_subservice_deliverables_deliverables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_subservice_deliverables_deliverables_locales_lo" ON "pages_blocks_subservice_deliverables_deliverables_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_subservice_deliverables_order_idx" ON "pages_blocks_subservice_deliverables" USING btree ("_order");
  CREATE INDEX "pages_blocks_subservice_deliverables_parent_id_idx" ON "pages_blocks_subservice_deliverables" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subservice_deliverables_path_idx" ON "pages_blocks_subservice_deliverables" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_subservice_deliverables_locales_locale_parent_i" ON "pages_blocks_subservice_deliverables_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_hero_tags" CASCADE;
  DROP TABLE "pages_blocks_about_hero_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_project_business_value_list" CASCADE;
  DROP TABLE "pages_blocks_project_business_value_list_locales" CASCADE;
  DROP TABLE "pages_blocks_project_business_value" CASCADE;
  DROP TABLE "pages_blocks_project_business_value_locales" CASCADE;
  DROP TABLE "pages_blocks_project_principles_principles" CASCADE;
  DROP TABLE "pages_blocks_project_principles_principles_locales" CASCADE;
  DROP TABLE "pages_blocks_project_principles" CASCADE;
  DROP TABLE "pages_blocks_project_principles_locales" CASCADE;
  DROP TABLE "pages_blocks_project_value_items" CASCADE;
  DROP TABLE "pages_blocks_project_value_items_locales" CASCADE;
  DROP TABLE "pages_blocks_project_value" CASCADE;
  DROP TABLE "pages_blocks_project_value_locales" CASCADE;
  DROP TABLE "pages_blocks_project_cta_cta_group" CASCADE;
  DROP TABLE "pages_blocks_project_cta_cta_group_locales" CASCADE;
  DROP TABLE "pages_blocks_project_cta" CASCADE;
  DROP TABLE "pages_blocks_project_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_project_built_for_foreground_images" CASCADE;
  DROP TABLE "pages_blocks_project_built_for_bullet_points" CASCADE;
  DROP TABLE "pages_blocks_project_built_for_bullet_points_locales" CASCADE;
  DROP TABLE "pages_blocks_project_built_for" CASCADE;
  DROP TABLE "pages_blocks_project_built_for_locales" CASCADE;
  DROP TABLE "pages_blocks_project_text_block" CASCADE;
  DROP TABLE "pages_blocks_project_text_block_locales" CASCADE;
  DROP TABLE "pages_blocks_project_what_comes_next_items" CASCADE;
  DROP TABLE "pages_blocks_project_what_comes_next_items_locales" CASCADE;
  DROP TABLE "pages_blocks_project_what_comes_next" CASCADE;
  DROP TABLE "pages_blocks_project_what_comes_next_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_pipeline_pipeline_images" CASCADE;
  DROP TABLE "pages_blocks_subservice_pipeline_pipeline" CASCADE;
  DROP TABLE "pages_blocks_subservice_pipeline_pipeline_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_pipeline" CASCADE;
  DROP TABLE "pages_blocks_subservice_pipeline_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_items_subitems" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_items_subitems_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_items" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_items_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps" CASCADE;
  DROP TABLE "pages_blocks_subservice_features_steps_locales" CASCADE;
  DROP TABLE "pg_svc_uc_cap_uc" CASCADE;
  DROP TABLE "pg_svc_uc_cap_uc_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_use_cases_capabilities" CASCADE;
  DROP TABLE "pages_blocks_subservice_use_cases_capabilities_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_use_cases" CASCADE;
  DROP TABLE "pages_blocks_subservice_use_cases_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_text_and_tags_tags" CASCADE;
  DROP TABLE "pages_blocks_subservice_text_and_tags_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_text_and_tags" CASCADE;
  DROP TABLE "pages_blocks_subservice_text_and_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_deliverables_deliverables" CASCADE;
  DROP TABLE "pages_blocks_subservice_deliverables_deliverables_locales" CASCADE;
  DROP TABLE "pages_blocks_subservice_deliverables" CASCADE;
  DROP TABLE "pages_blocks_subservice_deliverables_locales" CASCADE;
  ALTER TABLE "pages_blocks_about_hero" DROP COLUMN "justify_from_start";
  DROP TYPE "public"."enum_pages_blocks_project_cta_cta_group_type";`)
}
