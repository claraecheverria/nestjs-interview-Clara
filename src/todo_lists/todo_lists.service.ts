import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { TodoList } from '../interfaces/todo_list.interface';
import { Item } from 'src/interfaces/item.interface';
import { ItemsService } from '../items/items.service';
import { CreateItemDto } from 'src/items/dtos/create-item';
import { UpdateItemDto } from 'src/items/dtos/update-item';

@Injectable()
export class TodoListsService {
  private readonly todolists: TodoList[];

  constructor(private itemsService: ItemsService, todoLists: TodoList[] = []) {
    this.todolists = todoLists;
  }

  all(): TodoList[] {
    return this.todolists;
  }

  get(id: number): TodoList {
    return this.todolists.find((x) => x.id === Number(id));
  }

  create(dto: CreateTodoListDto): TodoList {
    const todoList: TodoList = {
      id: this.nextId(),
      name: dto.name,
      items: [],
    };

    this.todolists.push(todoList);

    return todoList;
  }

  update(id: number, dto: UpdateTodoListDto): TodoList {
    const todolist = this.todolists.find((x) => x.id == Number(id));

    // Update the record
    todolist.name = dto.name;

    return todolist;
  }

  delete(id: number): void {
    const index = this.todolists.findIndex((x) => x.id == Number(id));

    if (index > -1) {
      this.todolists.splice(index, 1);
    }
  }

  private nextId(): number {
    const last = this.todolists
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }

  getItems(todoListId: number): Item[] {
    const todoList = this.get(todoListId);
    return todoList.items;
  }

  addItem(todoListId: number, item: CreateItemDto): Item {
    const todoList = this.get(todoListId);
    const newItem = this.itemsService.createItem(todoList.items, item);

    todoList.items.push(newItem);

    return newItem;
  }

  getItemFromTodoList(todoListId: number, itemId: number): Item {
    const todoList = this.get(todoListId);

    const todoItem = todoList.items.find((x) => x.id === Number(itemId));

    if (!todoItem) {
      throw new NotFoundException(`Todo item with ID ${itemId} not found`);
    }

    return todoItem;
  }

  updateItem(todoListId: number, itemId: number, updatedItem: UpdateItemDto): Item {//revisar
    const todoList = this.get(todoListId);
    const item = todoList.items.find((x) => x.id === Number(itemId));

    if (!item) {
      throw new NotFoundException(`Todo item with ID ${itemId} not found`);
    }

    item.description = updatedItem.description;

    return item;
  }

  completeTodoItem(todoListId: number, itemId: number): Item {//revisar 
    const item = this.getItemFromTodoList(todoListId, itemId);
    item.completed = true;

    return item;
  }

  deleteItem(todoListId: number, itemId: number): void {
    const todoList = this.get(todoListId);
    const index = todoList.items.findIndex((x) => x.id === Number(itemId));

    if (index > -1) {
      todoList.items.splice(index, 1);
    }
  }
}
