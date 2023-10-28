CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"cuid" text PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"username" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "computers" (
	"cuid" text PRIMARY KEY NOT NULL,
	"brand" text NOT NULL,
	"cores" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_auth_user_cuid_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("cuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_auth_user_cuid_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("cuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
