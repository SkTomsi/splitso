ALTER TABLE "friends" DROP CONSTRAINT "friends_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "friends" DROP CONSTRAINT "friends_friendId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "invites" DROP CONSTRAINT "invites_userId_users_id_fk";
