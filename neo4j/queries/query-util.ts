import { Query } from "https://deno.land/x/neo4j_lite_client@4.4.6/core/types.ts";
import type { QueryResult } from "neo4j/mod.ts";
import { dbRead } from "../transaction.ts";

export const getNodesByLabel = (
  label: string,
  variable = "n",
  limit = 250
): Promise<QueryResult | undefined> => {
  const query: Query = `MATCH (${variable}:${label}) RETURN ${variable} LIMIT ${limit}`;
  return dbRead(query);
};
