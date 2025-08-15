import { Request, Response, Router } from 'express';

import { HelloWorldModel } from '../models';

import { IHelloItem } from '../types';

export class HelloWorldController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getAllHelloItems.bind(this));
    this.router.get('/:id', this.getHelloItemById.bind(this));
    this.router.post('/', this.createHelloItem.bind(this));
    this.router.put('/:id', this.updateHelloItem.bind(this));
    this.router.delete('/:id', this.deleteHelloItem.bind(this));
  }

  public async getAllHelloItems(req: Request, res: Response) {
    try {
      const hellos = await HelloWorldModel.findAll({});

      return res.status(200).json({
        success: true,
        data: hellos,
        count: hellos.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve items',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  public async getHelloItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await HelloWorldModel.findOne({ id });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Item with id ${id} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve item',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  public async createHelloItem(req: Request, res: Response) {
    try {
      const { greeting, shoutout }: IHelloItem = req.body;

      if (!greeting) {
        return res.status(400).json({
          success: false,
          message: 'Greeting is required',
        });
      }

      const createdItem = await HelloWorldModel.create({
        shoutout,
        greeting,
      });

      return res.status(201).json({
        success: true,
        data: createdItem,
        message: 'Item created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create item',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  public async updateHelloItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { greeting, shoutout }: IHelloItem = req.body;

      const item = await HelloWorldModel.findOne({ id });
      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Item with id ${id} not found`,
        });
      }

      const updatedItem = await HelloWorldModel.updateOne({ id }, { greeting, shoutout });

      return res.status(200).json({
        success: true,
        data: updatedItem,
        message: 'Item updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update item',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  public async deleteHelloItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await HelloWorldModel.findOne({ id });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Item with id ${id} not found`,
        });
      }

      await HelloWorldModel.deleteOne({ id });

      return res.status(200).json({
        success: true,
        message: 'Item deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete item',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
