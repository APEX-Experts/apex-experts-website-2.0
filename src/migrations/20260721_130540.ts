import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items_locales" ALTER COLUMN "mega_menu_title" DROP NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "href" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "icon_svg" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items_locales" ALTER COLUMN "mega_menu_title" SET NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "href";
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "icon_svg";`)
}
