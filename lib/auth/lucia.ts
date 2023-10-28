import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { cache } from "react";
import * as context from "next/headers";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "@/lib/db/index"

export const auth = lucia({
  adapter: pg(pool, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
  env: "DEV",
  middleware: nextjs_future(),
  sessionCookie: { expires: false },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      name: data.name,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

