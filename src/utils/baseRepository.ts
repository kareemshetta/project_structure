// import {
//   Model,
//   FindOptions,
//   CreateOptions,
//   UpdateOptions,
//   DestroyOptions,
//   FindAndCountOptions,
//   ModelStatic,
//   BulkCreateOptions,
//   CountOptions,
//   FindOrCreateOptions,
// } from "sequelize";
// import { AppError } from "./appError";
// export class BaseRepository<T extends Model<any, any>> {
//   private model: ModelStatic<T>;
//   private errorMessage;

//   constructor(model: ModelStatic<T>, errorMessage?: string) {
//     this.model = model;
//     this.errorMessage = errorMessage || "entityNotFount";
//   }

//   async findAll(options?: FindOptions<any>): Promise<T[]> {
//     return this.model.findAll(options);
//   }
//   async findAndCountAll(options: FindAndCountOptions<T>) {
//     return this.model.findAndCountAll(options);
//   }

//   async findOne(options: FindOptions<any>): Promise<T | null> {
//     return this.model.findOne(options);
//   }
//   async findOneById(id: string, options: FindOptions = {}) {
//     return this.model.findByPk(id, options);
//   }
//   async findOneByIdOrThrowError(id: string, options: FindOptions = {}) {
//     const one = await this.findOneById(id, options);
//     if (!one) {
//       throw new AppError(this.errorMessage, 404, this.model.tableName);
//     }
//     return one;
//   }
//   async updateOneByIdOrThrowError(id: string, data: object) {
//     const one = await this.findOneByIdOrThrowError(id);
//     return await one.update(data);
//   }

//   async create(data: any, options?: CreateOptions): Promise<T> {
//     return this.model.create(data, options);
//   }
//   async bulkCreate(data: any[], options?: BulkCreateOptions): Promise<T[]> {
//     return this.model.bulkCreate(data, options);
//   }

//   async update(
//     data: any,
//     options: UpdateOptions
//   ): Promise<[affectedCount: number, updated?: T[]]> {
//     const updated = await this.model.update(data, options);
//     return updated;
//   }

//   async delete(options: DestroyOptions): Promise<number> {
//     return this.model.destroy(options);
//   }

//   async count(options: CountOptions): Promise<any> {
//     return this.model.count(options);
//   }
//   async findOneOrCreate(
//     options: FindOrCreateOptions<any>,
//     data: any
//   ): Promise<[T, boolean]> {
//     return this.model.findOrCreate(options);
//   }
// }

import {
  Model,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  FindAndCountOptions,
  ModelStatic,
  BulkCreateOptions,
  CountOptions,
} from "sequelize";
import { AppError } from "./appError";

export class BaseRepository<T extends Model<any, any>> {
  private static instances: Map<ModelStatic<any>, BaseRepository<any>> =
    new Map();

  private model: ModelStatic<T>;
  private errorMessage: string;

  // Make the constructor private to prevent direct instantiation
  private constructor(model: ModelStatic<T>, errorMessage?: string) {
    this.model = model;
    this.errorMessage =
      errorMessage || `This ${this.model.tableName} not found`;
  }

  // Static method to get the singleton instance
  public static getInstance<T extends Model<any, any>>(
    model: ModelStatic<T>,
    errorMessage?: string
  ): BaseRepository<T> {
    if (!BaseRepository.instances.has(model)) {
      BaseRepository.instances.set(
        model,
        new BaseRepository<T>(model, errorMessage)
      );
    }
    return BaseRepository.instances.get(model)!;
  }

  async findAll(options?: FindOptions<any>): Promise<any[]> {
    const results = await this.model.findAll(options);
    return results.map((result) => result.get());
  }

  async findAndCountAll(options: FindAndCountOptions<T>): Promise<{
    rows: any[];
    count: number;
  }> {
    const { rows, count } = await this.model.findAndCountAll(options);
    return { rows: rows.map((row) => row.get()), count };
  }

  async findOne(options: FindOptions<any>): Promise<any | null> {
    const result = await this.model.findOne(options);
    return result ? result.get() : null;
  }

  async findOneById(
    id: string,
    options: FindOptions = {}
  ): Promise<any | null> {
    const result = await this.model.findByPk(id, options);
    return result || null;
  }

  async findOneByIdOrThrowError(
    id: string,
    options: FindOptions = {}
  ): Promise<any> {
    const one = await this.findOneById(id, options);
    if (!one) {
      throw new AppError(this.errorMessage, 404, this.model.tableName);
    }
    return one;
  }

  async updateOneByIdOrThrowError(id: string, data: object): Promise<any> {
    const one = await this.findOneByIdOrThrowError(id);
    console.log("onew", one);
    const updated = await one.update(data);
    return updated.get();
  }

  async create(data: any, options?: CreateOptions): Promise<any> {
    const result = await this.model.create(data, options);
    return result.get();
  }

  async bulkCreate(data: any[], options?: BulkCreateOptions): Promise<any[]> {
    const results = await this.model.bulkCreate(data, options);
    return results.map((result) => result.get());
  }

  async update(data: any, options: UpdateOptions): Promise<any> {
    const updated = await this.model.update(data, {
      ...options,
      returning: true,
    });
    return updated && updated[1] ? updated[1][0].get() : null;
  }

  async delete(options: DestroyOptions): Promise<number> {
    return this.model.destroy(options);
  }

  async count(options: CountOptions): Promise<number> {
    return this.model.count(options);
  }
}
