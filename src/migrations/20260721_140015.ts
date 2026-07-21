import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_nav_items_mega_menu_items_sublist" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu_items_sublist_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "header_nav_items_mega_menu_items_sublist" ADD CONSTRAINT "header_nav_items_mega_menu_items_sublist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_items_sublist_locales" ADD CONSTRAINT "header_nav_items_mega_menu_items_sublist_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu_items_sublist"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_mega_menu_items_sublist_order_idx" ON "header_nav_items_mega_menu_items_sublist" USING btree ("_order");
  CREATE INDEX "header_nav_items_mega_menu_items_sublist_parent_id_idx" ON "header_nav_items_mega_menu_items_sublist" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_mega_menu_items_sublist_locales_locale_pare" ON "header_nav_items_mega_menu_items_sublist_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_items_mega_menu_items_sublist" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_items_sublist_locales" CASCADE;`)
}
