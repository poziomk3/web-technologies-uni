import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import resolvers from "./resolvers.js";
import { connectDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = readFileSync(
  path.join(__dirname, "../schema.graphql"),
  "utf-8"
);

connectDB();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("✅ Server is running at http://localhost:4000/graphql");
});
