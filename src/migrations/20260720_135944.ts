import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "action_button_link";
  ALTER TABLE "header" DROP COLUMN "action_button_is_enabled";
  ALTER TABLE "header_locales" DROP COLUMN "action_button_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "action_button_link" varchar DEFAULT '/auth/login';
  ALTER TABLE "header" ADD COLUMN "action_button_is_enabled" boolean DEFAULT true;
  ALTER TABLE "header_locales" ADD COLUMN "action_button_label" varchar DEFAULT 'Sign In';`)
}
