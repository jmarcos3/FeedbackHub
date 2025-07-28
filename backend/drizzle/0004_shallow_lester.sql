ALTER TABLE `feedbacks` DROP FOREIGN KEY `feedbacks_room_id_rooms_id_fk`;
--> statement-breakpoint
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_room_id_rooms_id_fk` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE cascade ON UPDATE no action;