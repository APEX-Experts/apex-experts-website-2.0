import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_projects_projects_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_projects_projects_keywords_locales" (
  	"keyword" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"background_image_id" integer,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_projects_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"texture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_capabilities" ALTER COLUMN "view_all_text" SET DEFAULT 'View All Services';
  ALTER TABLE "pages_blocks_projects_projects_keywords" ADD CONSTRAINT "pages_blocks_projects_projects_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects_keywords_locales" ADD CONSTRAINT "pages_blocks_projects_projects_keywords_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_projects_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects_locales" ADD CONSTRAINT "pages_blocks_projects_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_texture_id_media_id_fk" FOREIGN KEY ("texture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_locales" ADD CONSTRAINT "pages_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_projects_projects_keywords_order_idx" ON "pages_blocks_projects_projects_keywords" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_keywords_parent_id_idx" ON "pages_blocks_projects_projects_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_projects_projects_keywords_locales_locale_paren" ON "pages_blocks_projects_projects_keywords_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_order_idx" ON "pages_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_parent_id_idx" ON "pages_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_background_image_idx" ON "pages_blocks_projects_projects" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_projects_projects_logo_idx" ON "pages_blocks_projects_projects" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_projects_projects_locales_locale_parent_id_uniq" ON "pages_blocks_projects_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_background_image_idx" ON "pages_blocks_projects" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_projects_texture_idx" ON "pages_blocks_projects" USING btree ("texture_id");
  CREATE UNIQUE INDEX "pages_blocks_projects_locales_locale_parent_id_unique" ON "pages_blocks_projects_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_projects_projects_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_projects_keywords_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_projects_projects_keywords" CASCADE;
  DROP TABLE "pages_blocks_projects_projects_keywords_locales" CASCADE;
  DROP TABLE "pages_blocks_projects_projects" CASCADE;
  DROP TABLE "pages_blocks_projects_projects_locales" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages_blocks_projects_locales" CASCADE;
  ALTER TABLE "pages_blocks_capabilities" ALTER COLUMN "view_all_text" DROP DEFAULT;`)
}
