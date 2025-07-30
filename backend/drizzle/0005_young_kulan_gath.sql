ALTER TABLE `feedbacks` MODIFY COLUMN `content` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `feedbacks` ADD `rating` int NOT NULL;