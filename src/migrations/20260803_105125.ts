import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_posts_locales" (
  	"eyebrow" varchar,
  	"title_before_highlight" varchar NOT NULL,
  	"highlighted_title" varchar,
  	"title_after_highlight" varchar,
  	"subtitle" varchar,
  	"read_more_text" varchar DEFAULT 'Read Article',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "users" ADD COLUMN "image_id" integer;
  ALTER TABLE "users" ADD COLUMN "bio" varchar;
  ALTER TABLE "users" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_related_posts" ADD CONSTRAINT "pages_blocks_related_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_posts_locales" ADD CONSTRAINT "pages_blocks_related_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_related_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_related_posts_order_idx" ON "pages_blocks_related_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_posts_parent_id_idx" ON "pages_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_posts_path_idx" ON "pages_blocks_related_posts" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_related_posts_locales_locale_parent_id_unique" ON "pages_blocks_related_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_image_idx" ON "users" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_related_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_related_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_related_posts" CASCADE;
  DROP TABLE "pages_blocks_related_posts_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_image_id_media_id_fk";
  
  DROP INDEX "users_image_idx";
  ALTER TABLE "users" DROP COLUMN "image_id";
  ALTER TABLE "users" DROP COLUMN "bio";
  ALTER TABLE "users" DROP COLUMN "description";`)
}
