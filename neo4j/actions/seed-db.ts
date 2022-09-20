import { enforceConstraints } from "./constraints.ts";

export const seedDatabase = async (): Promise<void> => {
  await enforceConstraints();
};
