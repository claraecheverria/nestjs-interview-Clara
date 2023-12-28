import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

@Module({
    imports: [TodoListsModule],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService],
})
export class ItemsModule { }
