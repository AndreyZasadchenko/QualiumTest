import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TodoService {
  constructor(private _authHttp: AuthHttp) {}

  // POST /todos
  addTodo(todo) {
    return this._authHttp.post('http://localhost:9000/todos/', todo);
  };

  // DELETE /todos/:id
  deleteTodoById(id) {
    return this._authHttp.delete(`http://localhost:9000/todos/${id}`);
  }

  // PUT /todos/:id
  updateTodoById(todo) {
    return this._authHttp.put(`http://localhost:9000/todos/${todo.id}`, todo);
  };

  // GET /todos
  getAllTodos() {
    return this._authHttp.get('http://localhost:9000/todos?sort=complete');
  };
}
