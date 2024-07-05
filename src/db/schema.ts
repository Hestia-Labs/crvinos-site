import { sqliteTable, AnySQLiteColumn, index, integer, text, numeric } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const mailing_list = sqliteTable("mailing_list", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	email: text("email").notNull(),
	name: text("name"),
	subscribed_on: numeric("subscribed_on").default(sql`(DATE('now'))`),
	status: text("status").default("active"),
},
(table) => {
	return {
		idx_email: index("idx_email").on(table.email),
	}
});


