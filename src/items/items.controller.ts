import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from '../interfaces/item.interface';
import { TodoListsService } from '../todo_lists/todo_lists.service';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item';
import { UpdateItemDto } from './dtos/update-item';

@Controller('api/todolists/:todoListId/items')
export class ItemsController {
    constructor(
        private todoListsService: TodoListsService,
        private itemsService: ItemsService,
    ) { }

    @Get()
    index(@Param('todoListId') todoListId: number): Item[] {
        return this.todoListsService.getItems(todoListId);
    }

    @Post()
    add(@Param('todoListId') todoListId: number, @Body() item: CreateItemDto): Item {
        return this.todoListsService.addItem(todoListId, item);
    }

    @Get('/:itemId/complete')
    complete(@Param('todoListId') todoListId: number,
        @Param('itemId') itemId: number,): Item {
        return this.todoListsService.completeTodoItem(todoListId, itemId);
    }

    @Get('/:itemId')
    show(@Param('todoListId') todoListId: number,
        @Param('itemId') itemId: number,): Item {
        return this.todoListsService.getItemFromTodoList(todoListId, itemId);
    }

    @Put('/:itemId')
    update(@Param('todoListId') todoListId: number,
        @Param('itemId') itemId: number,
        @Body() updatedItem: UpdateItemDto,): Item {
        return this.todoListsService.updateItem(todoListId, itemId, updatedItem);
    }

    @Delete('/:itemId')
    delete(@Param('todoListId') todoListId: number,
        @Param('itemId') itemId: number,): void {
        this.todoListsService.deleteItem(todoListId, itemId);
    }
}

