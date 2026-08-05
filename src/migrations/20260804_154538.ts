import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_capabilities_locales" ADD COLUMN "view_all_text" varchar DEFAULT 'View All Services' NOT NULL;
  ALTER TABLE "pages_blocks_capabilities" DROP COLUMN "view_all_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_capabilities" ADD COLUMN "view_all_text" varchar DEFAULT 'View All Services' NOT NULL;
  ALTER TABLE "pages_blocks_capabilities_locales" DROP COLUMN "view_all_text";`)
}
