import { Query } from "neo4j/core/types.ts";
import { remove } from "../../utils/remove.ts";
import { dbRun } from "../transaction.ts";

const UNIQUE_PROPERTY_CONSTRAINTS: Record<
  string,
  { label: string; property: string }
> = {
  unique_blog_uuid: {
    label: "Blog",
    property: "uuid",
  },
};

export const getExistingConstraints = async (): Promise<Array<string>> => {
  const query: Query = `CALL db.constraints()`;
  const result = await dbRun(query);
  const constraints: Array<string> = [];
  if (result) {
    result.records.forEach((record) => {
      const name = record.get("name");
      constraints.push(name);
    });
  }
  return constraints;
};

export const createUniquePropertyConstraint = async (
  name: string,
  label: string,
  property: string
) => {
  const query: Query = `
      CREATE CONSTRAINT ${name} 
      FOR (n:${label}) 
      REQUIRE n.${property} IS UNIQUE`;
  await dbRun(query);
};

export const dropConstraint = async (name: string) => {
  const query: Query = `DROP CONSTRAINT ${name}`;
  await dbRun(query);
};

export const enforceConstraints = async () => {
  console.log("\n=== CONSTRAINTS ===");
  const existingConstraints = await getExistingConstraints();
  const danglingConstraints = [...existingConstraints];
  console.log("Unique property constraints:");
  for (const name in UNIQUE_PROPERTY_CONSTRAINTS) {
    const { label, property } = UNIQUE_PROPERTY_CONSTRAINTS[name];
    if (existingConstraints.includes(name)) {
      console.log(`  - Constraint "${name}" exists`);
      console.log(`    - Removing old constraint".`);
      await dropConstraint(name);
      console.log(`    - Creating new constraint"`);
      await createUniquePropertyConstraint(name, label, property);
      remove(danglingConstraints, name);
    } else {
      console.log(`  - Creating constraint "${name}"`);
      await createUniquePropertyConstraint(name, label, property);
    }
  }
  if (danglingConstraints.length) {
    console.log("Removing unused constraints:");
  }
  for (const name of danglingConstraints) {
    console.log(`  - Removing constraint "${name}".`);
    await dropConstraint(name);
  }
  console.log("\n");
};
