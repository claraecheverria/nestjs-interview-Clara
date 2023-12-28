import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../interfaces/item.interface';
import { CreateItemDto } from './dtos/create-item';
import { UpdateItemDto } from './dtos/update-item';

@Injectable()
export class ItemsService {
  private readonly items: Item[];

  constructor() {
    this.items = [];
  }

  getItems(todoListId: number): Item[] {//no va?
    return this.items;
  }

  createItem(todoListItems: Item[], item: CreateItemDto): Item {
    const newItem: Item = {
      id: this.nextItemId(todoListItems),
      description: item.description,
      completed: false,
    };

    this.items.push(newItem);

    return newItem;
  }

  getItem(itemId: number): Item {
    const item = this.items.find((x) => x.id === itemId);

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    return item;
  }

  updateItem(itemId: number, updatedItem: UpdateItemDto): Item {
    const item = this.getItem(itemId);

    item.description = updatedItem.description;

    return item;
  }

  completeItem(itemId: number): Item {
    const item = this.getItem(itemId);
    item.completed = true;

    return item;
  }

  deleteItem(itemId: number): void {
    const index = this.items.findIndex((x) => x.id === itemId);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  private nextItemId(todoListItems: Item[]): number {
    const last = todoListItems.map((x) => x.id).sort().reverse()[0];

    return last ? last + 1 : 1;
  }
}

