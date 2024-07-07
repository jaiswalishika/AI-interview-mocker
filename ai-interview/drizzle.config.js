/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI%20mock_owner:b72AjMFuilIG@ep-plain-sun-a54i4546.us-east-2.aws.neon.tech/AI%20mock?sslmode=require',
    }
  };