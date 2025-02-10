CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`category` text NOT NULL,
	`stock` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_id_unique` ON `products` (`id`);