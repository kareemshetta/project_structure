import express from "express";
import { Application, Request, Response } from "express";

import uploadsRoute from "./modules/uploads/versions.routes";

import citiesRoute from "./modules/cities/versions.routes";

import path from "path";
export const injectRoutes = (app: Application): void => {
  // Basic route
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from MasterTech!" });
  });

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.use("/upload", uploadsRoute);

  app.use("/cities", citiesRoute);
};
