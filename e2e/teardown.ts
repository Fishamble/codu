import postgres from "postgres";
import { E2E_USER_ONE_ID, E2E_USER_TWO_ID } from "./constants";

export const teardown = async () => {
  try {
    const db = postgres("postgresql://postgres:secret@127.0.0.1:5432/postgres");

    await Promise.all([
      // the test suit adds posts created by the E2E users. We want to remove them between test runs
      db`
    DELETE FROM "Post" WHERE "userId" IN(${E2E_USER_ONE_ID}, ${E2E_USER_TWO_ID})
  `,
      // the test suite adds comments created by the E2E user. We want to remove them between test runs
      db`
    DELETE FROM "Comment" WHERE "userId" IN(${E2E_USER_ONE_ID}, ${E2E_USER_TWO_ID})
  `,
      db`
    DELETE FROM "user" WHERE "id" IN(${E2E_USER_ONE_ID}, ${E2E_USER_TWO_ID})`,
    ]);
    console.log("DB clean up successful");
  } catch (err) {
    console.log("Error while cleaning up DB after E2E test run", err);
  }
};

export default teardown;
