import sequelize from "./config";
import os from "os";
import { Application } from "express"; // Import the Application type from Express
// Update the path to your Sequelize configuration file
import("./../../models/users.model");
import("./../../models/admins.model");

import("./../../models/cities.model");
import("./../../models/regions.model");

// city_region_association
import("./../../models/cities_regions.associtation");

export const initialize = async (app: Application): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection to  database has been established successfully.");

    await sequelize.sync({
      alter: true,
      // logging: console.log
    });
    console.log("All models were synchronized successfully.");

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    app.listen(port, () =>
      console.log(`⚡️Server is running at ${os.hostname()}:${port}`)
    );
  } catch (e) {
    console.error("Error during initialization:", e);

    process.exit(1);
  }
};
