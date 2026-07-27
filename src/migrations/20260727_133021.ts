import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_subscribe_to_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_subscribe_to_newsletter_locales" (
  	"title" varchar,
  	"description" varchar,
  	"email_input_placeholder" varchar,
  	"submit_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_subscribe_to_newsletter" ADD CONSTRAINT "pages_blocks_subscribe_to_newsletter_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_subscribe_to_newsletter" ADD CONSTRAINT "pages_blocks_subscribe_to_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_subscribe_to_newsletter_locales" ADD CONSTRAINT "pages_blocks_subscribe_to_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_subscribe_to_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_subscribe_to_newsletter_order_idx" ON "pages_blocks_subscribe_to_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_subscribe_to_newsletter_parent_id_idx" ON "pages_blocks_subscribe_to_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_subscribe_to_newsletter_path_idx" ON "pages_blocks_subscribe_to_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_subscribe_to_newsletter_background_image_idx" ON "pages_blocks_subscribe_to_newsletter" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_subscribe_to_newsletter_locales_locale_parent_i" ON "pages_blocks_subscribe_to_newsletter_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_subscribe_to_newsletter" CASCADE;
  DROP TABLE "pages_blocks_subscribe_to_newsletter_locales" CASCADE;`)
}
