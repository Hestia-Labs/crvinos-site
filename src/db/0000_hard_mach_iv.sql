-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `mailing_list` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`email` text NOT NULL,
	`name` text,
	`subscribed_on` numeric DEFAULT (DATE('now')),
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE INDEX `idx_email` ON `mailing_list` (`email`);
*/