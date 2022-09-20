import { Query } from "neo4j/core/types.ts";
import { dbRead, dbRun, dbWrite } from "../transaction.ts";

export const findPeople = async () => {
  await findPerson("Alice");
  await findPerson("David");
};

export const createFriendship = async (name1: string, name2: string) => {
  const query: Query = `
    MERGE (p1:Person { name: $name1 })
    MERGE (p2:Person { name: $name2 })
    MERGE (p1)-[:KNOWS]->(p2)
    RETURN p1, p2`;

  const result = await dbWrite(query, { name1, name2 });

  if (result) {
    result.records.forEach((record) => {
      const person1Node = record.get("p1");
      const person2Node = record.get("p2");
      console.info(
        `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
      );
    });
  }
};

export const findPerson = async (name: string) => {
  const query: Query = `
      MATCH (p:Person)
      WHERE p.name = $name
      RETURN p.name AS name`;

  const result = await dbRead(query, { name });

  if (result) {
    result.records.forEach((record) => {
      console.log(`Found person: ${record.get("name")}`);
    });
  }
};
