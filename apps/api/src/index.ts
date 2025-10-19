import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as routes from "./routes";
import db from "./db/client"; // your drizzle instance
import { auth } from "./auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

// CORS configuration
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use("*", logger());

// Better Auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// API routes
app.route("/api/profiles", routes.profileRoutes);
app.route("/api/links", routes.linkRoutes);
app.route("/api/analytics", routes.analyticsRoutes);
app.route("/api/admin", routes.adminRoutes);
app.route("/api/upload", routes.uploadRoutes);

app.get("/", (c) => {
  return c.json({ message: "Pocky API v1.0.0" });
});

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api", (c) => {
  return c.json({
    message: "Pocky API v1.0.0",
    endpoints: {
      auth: "/api/auth",
      profiles: "/api/profiles",
      links: "/api/links",
      analytics: "/api/analytics",
      admin: "/api/admin",
      upload: "/api/upload",
    },
  });
});

// Error handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json(
    {
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    },
    500,
  );
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

const port = process.env.PORT || 3001;
console.log(`🚀 Pocky API is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
