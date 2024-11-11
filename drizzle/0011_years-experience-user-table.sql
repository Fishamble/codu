ALTER TABLE "session" ADD PRIMARY KEY ("sessionToken");--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "yearsOfExperience" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboardingComplete" timestamp with time zone;