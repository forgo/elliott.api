import type { Driver } from "neo4j/mod.ts";

export type Neo4jAction = <T = void>(driver: Driver) => Promise<T>;
