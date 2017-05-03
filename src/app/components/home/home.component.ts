import { Component } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _todoService: TodoService, private _authService: AuthService) {}

  newTodo = {
    title: "",
    complete: false
  };

  todos = [];
  email = localStorage.getItem('email');

  ngOnInit() {
    this.loadAllTodos();
  }

  loadAllTodos() {
    this._todoService.getAllTodos().subscribe(response => {
      this.todos = response.json();
    }, err => {
      console.log(err);
    });
  }

  addTodo() {
    this._todoService.addTodo(this.newTodo).subscribe(response => {
      this.todos.push(response.json());
      this.newTodo.title = "";
    }, err => {
      console.log(err);
    });
  }

  removeTodo(id, index) {
    this._todoService.deleteTodoById(id).subscribe(response => {
      this.todos.splice(index, 1);
    }, err => {
      console.log(err);
    })
  }

  toggleTodoComplete(todo, index) {
    this._todoService.updateTodoById({
      id: todo.id,
      complete: !todo.complete,
      title: todo.title
    }).subscribe(response => {
      this.todos[index].complete = response.json().complete;
      this.todos.sort((a, b) => {return a.complete - b.complete});
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this._authService.logout();
  }
}
