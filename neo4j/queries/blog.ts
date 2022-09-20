import { Query } from "neo4j/core/types.ts";
import { v4 } from "std/uuid/mod.ts";
import Blog from "../../interfaces/Blog.ts";
import { dbWrite } from "../transaction.ts";
import { getNodesByLabel } from "./query-util.ts";

export const getAllBlogs = async (): Promise<Array<Blog>> => {
  const result = await getNodesByLabel("Blog", "b");

  if (result) {
    return result.records.map((record) => {
      const properties = record.get("b").properties;
      const { uuid, created, updated } = properties;
      return {
        uuid,
        created: created.toString(),
        updated: updated.toString(),
      };
    });
  }

  return [];
};

export const createBlog = async () => {
  const query: Query = `
    CREATE (
        b:Blog {
            uuid: '${v4.generate()}', 
            created: datetime(), 
            updated: datetime()
        }
    )`;

  const result = await dbWrite(query);
  console.log("createBlog::result", result);
};

export const getBlogById = async () => {
  const query: Query = `
  MATCH (j:Person {name: 'Jennifer'})
RETURN j;`;
};
