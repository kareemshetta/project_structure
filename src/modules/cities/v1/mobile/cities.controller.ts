import { Op } from "sequelize";
import { AppError } from "../../../../utils/appError";
import { ICity } from "../../../../utils/shared.types";
import CityService from "./cities.service";
import { Request, Response } from "express";
import { handlePaginationSort } from "../../../../utils/handle-sort-pagination";
import sequelize from "../../../../config/db/config";
export class CityController {
  private static instance: CityController | null = null;
  private service: CityService;

  private constructor() {
    this.service = CityService.getInstance();

    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public static getInstance(): CityController {
    if (!CityController.instance) {
      CityController.instance = new CityController();
    }
    return CityController.instance;
  }

  public async create(req: Request, res: Response) {
    const storeData: ICity = req.body;

    // Validate the incoming data
    this.service.validateCreate(storeData);

    const foundOneWithSameName = await this.service.findOne({
      where: { name: storeData.name },
    });
    if (foundOneWithSameName) {
      throw new AppError("entityWithNameExist", 409);
    }

    const city = await this.service.create(storeData);

    res.send({
      data: city,
      message: req.t("responses.succes"),
    });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData: Partial<ICity> = req.body;

    // Validate the update data
    this.service.validateUpdate(updateData);

    if (updateData.name) {
      const foundOneWithSameName = await this.service.findOne({
        where: { name: updateData.name, id: { [Op.ne]: id } },
      });
      if (foundOneWithSameName) {
        throw new AppError("entityWithNameExist", 409);
      }
    }

    // Find the city first
    const city = await this.service.findOneByIdOrThrowError(id);

    // Update the city
    // Update the city
    const updatedCat = await city.update(updateData);

    res.send({
      data: updatedCat,
      message: req.t("responses.succes"),
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await this.service.delete(id);

    res.send({
      data: deleted,
      message: req.t("responses.succes"),
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.params;
    const lng = req.language;
    const nameColumn = lng === "ar" ? "nameAr" : "name";
    const city = await this.service.findOneByIdOrThrowError(id, {
      attributes: ["id", [sequelize.col(`cities."${nameColumn}"`), "name"]],
    });

    res.send({
      data: city,
      message: req.t("responses.succes"),
    });
  }

  public async getAll(req: Request, res: Response) {
    // Calculate offset for pagination
    const { limit, offset, order, orderBy } = handlePaginationSort(req.query);
    let { search } = req.query;
    const lng = req.language;
    const nameColumn = lng === "ar" ? "nameAr" : "name";
    this.service.validateGetAllStoresQuery({ search });
    const options: any = {
      attributes: ["id", [sequelize.col(`cities."${nameColumn}"`), "name"]],
      offset,
      limit,
      order: [[orderBy, order]],
      where: {},
    };

    if (search) {
      search = search.toString().replace(/\+/g, "").trim();
      options.where = sequelize.where(
        sequelize.fn("LOWER", sequelize.col(`cities."${nameColumn}"`)),
        {
          [Op.like]: `%${search.toLowerCase()}%`,
        }
      );
    }

    const date = await this.service.getAll(options);

    res.send({
      data: date,
      message: req.t("responses.succes"),
    });
  }
}
