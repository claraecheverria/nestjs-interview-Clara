import { Module } from '@nestjs/common';
import { TodoListsController } from './todo_lists.controller';
import { TodoListsService } from './todo_lists.service';
import { ItemsService } from 'src/items/items.service';
import { ItemsController } from 'src/items/items.controller';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [],
  controllers: [TodoListsController],
  providers: [
    { provide: TodoListsService, useValue: new TodoListsService(new ItemsService(),[]) },
  ],
  exports: [TodoListsService]
})
export class TodoListsModule {}
