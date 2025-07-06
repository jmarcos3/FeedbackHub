ALTER TABLE `rooms` RENAME COLUMN `name` TO `title`;--> statement-breakpoint
ALTER TABLE `rooms` ADD `description` varchar(255);