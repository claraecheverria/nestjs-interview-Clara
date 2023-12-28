import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TodoListsModule,ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
