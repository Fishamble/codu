DO $$ BEGIN
 CREATE TYPE "public"."experience_range" AS ENUM('0-1', '1-3', '3-5', '5-8', '12+');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "session" ADD PRIMARY KEY ("sessionToken");--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "yearsOfExperience" "experience_range";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboardingComplete" timestamp with time zone;