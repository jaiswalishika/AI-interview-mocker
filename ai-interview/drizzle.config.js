/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-interview-mocker_owner:DbtpT7kF8vHw@ep-steep-limit-a5195wp3.us-east-2.aws.neon.tech/AI-interview-mocker?sslmode=require',
    }
  };