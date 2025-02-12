import { Router } from "express";
import dashboardRoutes from "./dashboard/cities.routes";
import webRoutes from "./mobile/cities.routes";

const portalRouter = Router();

portalRouter.use("/dashboard", dashboardRoutes);
portalRouter.use("/mobile", webRoutes);

export default portalRouter;
