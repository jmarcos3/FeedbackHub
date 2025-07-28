ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_owner_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;