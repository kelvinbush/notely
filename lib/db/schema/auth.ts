import {pgTable, bigint, varchar, text} from "drizzle-orm/pg-core";

export const users = pgTable("auth_user", {
	id: text("cuid").primaryKey(),
	// other user attributes
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	username: varchar("username", { length: 255 }),
});

export const sessions = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const keys = pgTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});