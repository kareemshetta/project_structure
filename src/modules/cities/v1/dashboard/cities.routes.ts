import { Router } from "express";
import * as validator from "./city.validation";
import asyncWrapper from "../../../../utils/async-wrapper";

import { validateSchema } from "../../../../middlewares/validation.middleware";
import { CityController } from "./cities.controller";
const router = Router();
const controller = CityController.getInstance();

router.post(
  "/",
  asyncWrapper(validateSchema(validator.createSchema)),
  asyncWrapper(controller.create)
);
router.get("/", asyncWrapper(controller.getAll));
router.get("/:id", asyncWrapper(controller.get));
router.put(
  "/:id",
  asyncWrapper(validateSchema(validator.updateSchema)),
  asyncWrapper(controller.update)
);
router.delete("/:id", asyncWrapper(controller.delete));

export default router;
