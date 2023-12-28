import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TodoListsService } from '../todo_lists/todo_lists.service';


describe('ItemsController', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;
  let todoListService: TodoListsService;

  beforeEach(async () => {
    todoListService = new TodoListsService(new ItemsService(), [
        { id: 1, name: 'test1', items:[{id: 1, description: 'item1', completed: false}, {id: 2, description: 'item2', completed: false}] },
        { id: 2, name: 'test2', items:[{id: 1, description: 'item1', completed: false}] },
      ]);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{provide: TodoListsService,  useValue: todoListService}, ItemsService],
    }).compile();

    itemsController = module.get<ItemsController>(ItemsController);
  });

  describe('index', () => {
    it('should return an array of items from the todolist with the given id', () => {
      expect(itemsController.index(1)).toEqual([
        {id: 1, description: 'item1', completed: false},
        {id: 2, description: 'item2', completed: false}
    ]);
    });
  });

  describe('add', () => {
    it('should add a new item to the todolist with the given id', () => {
        expect(itemsController.add(1,{ description: 'new Item' })).toEqual({
            id: 3,
            description: 'new Item',
            completed:false
          });
    
          expect(todoListService.getItems(1).length).toBe(3);
          expect(itemsController.index(1)).toEqual([
            {id: 1, description: 'item1', completed: false},
            {id: 2, description: 'item2', completed: false},
            {id: 3, description: 'new Item', completed: false}
        ]);
    });
  });

  describe('show', () => {
    it('should return the item with the given id from the todolist with the given id', () => {
      expect(itemsController.show(1, 1)).toEqual({
        id: 1,
        description: 'item1',
        completed:false,
      });
    });
  });

  describe('update', () => {
    it('should update the item with the given id from the todolist with the given id', () => {
      expect(
        itemsController.update(1, 1,{ description: 'modified' }),
      ).toEqual({ id: 1, description: 'modified', completed:false });

      expect(todoListService.getItemFromTodoList(1,1).description).toEqual('modified');
    });
  });

  describe('complete', () => {
    it('should mark the item with the given id from the todolist with the given id as completed', () => {
      expect(
        itemsController.complete(1, 2),
      ).toEqual({ id: 2, description: 'item2', completed:true });
    });
  });

  describe('delete', () => {
    it('should delete the todolist with the given id', () => {
      expect(() => itemsController.delete(1,1)).not.toThrow();

      expect(todoListService.getItems(1).map((x) => x.id)).toEqual([2]);
    });
  });

});
