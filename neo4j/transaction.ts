import { config } from "std/dotenv/mod.ts";
import { Query } from "neo4j/core/types.ts";
import neo4j, { QueryResult, Session } from "neo4j/mod.ts";

import type { Driver } from "neo4j/mod.ts";
import ApiError from "../errors/ApiError.ts";

await config({ export: true });

const uri = Deno.env.get("NEO4J_URI") ?? "";
const user = Deno.env.get("NEO4J_USER") ?? "";
const pass = Deno.env.get("NEO4J_PASS") ?? "";
const database = Deno.env.get("NEO4J_DB") ?? "";

export type Transaction = (
  driver: Driver,
  query: Query,
  parameters?: unknown
) => Promise<QueryResult | undefined>;

const run: Transaction = async (driver, query, parameters = {}) => {
  const session: Session = driver.session({ database });
  try {
    return await session.run(query, parameters);
  } catch (error) {
    console.log("run error", error);
    throw new ApiError({
      message: "Neo4j failed run Cypher query",
      name: "neo4j-run",
      context: { query, parameters, error },
    });
  } finally {
    session && (await session.close());
  }
};

const write: Transaction = async (driver, query, parameters = {}) => {
  const session: Session = driver.session({ database });
  try {
    return await session.writeTransaction((tx) => tx.run(query, parameters));
  } catch (error) {
    throw new ApiError({
      message: "Neo4j failed write transaction",
      name: "neo4j-write",
      context: { query, parameters, error },
    });
  } finally {
    session && (await session.close());
  }
};

const read: Transaction = async (driver, query, parameters = {}) => {
  const session = driver.session({ database });
  try {
    return await session.readTransaction((tx) => tx.run(query, parameters));
  } catch (error) {
    throw new ApiError({
      message: "Neo4j failed read transaction",
      name: "neo4j-read",
      context: { query, parameters, error },
    });
  } finally {
    session && (await session.close());
  }
};

export type Neo4jAction = <T = void>(driver: Driver) => Promise<T>;

export const dbRun = async (
  query: Query,
  parameters?: unknown
): Promise<QueryResult | undefined> => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
  try {
    return await run(driver, query, parameters);
  } catch (error) {
    console.log("error", error);
    throw new ApiError({
      message: "Neo4j failed to perform Cypher query",
      name: "neo4j-dbRun",
      context: { error },
    });
  } finally {
    driver && (await driver.close());
  }
};

export const dbRead = async (
  query: Query,
  parameters?: unknown
): Promise<QueryResult | undefined> => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
  try {
    return await read(driver, query, parameters);
  } catch (error) {
    throw new ApiError({
      message: "Neo4j failed to perform read query",
      name: "neo4j-dbRead",
      context: { error },
    });
  } finally {
    driver && (await driver.close());
  }
};

export const dbWrite = async (
  query: Query,
  parameters?: unknown
): Promise<QueryResult | undefined> => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
  try {
    return await write(driver, query, parameters);
  } catch (error) {
    throw new ApiError({
      message: "Neo4j failed to perform write query",
      name: "neo4j-dbWrite",
      context: { error },
    });
  } finally {
    driver && (await driver.close());
  }
};
