import { Router } from "express";

import asyncWrapper from "../../../../utils/async-wrapper";
import { CityController } from "./cities.controller";
const router = Router();
const controller = CityController.getInstance();

router.get("/", asyncWrapper(controller.getAll));
router.get("/:id", asyncWrapper(controller.get));

export default router;
