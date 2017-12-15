import * as TodoActions from './actions/todoActions';
import './app.less';
import {SHOW_ACTIVE, SHOW_COMPLETED} from './constants/todoConstants';

export class TodoAppController {
  /**
   * @param {TodoList} todoList
   */
  public showAll;
  public showActive;
  public showCompleted;
  public todos;

  constructor($ngRedux, $scope, todoList) {
    "ngInject";

    let unsubscribe = $ngRedux.connect((state) => ({ todos: state.todos }), TodoActions)(this);
    $scope.$on('$destroy', unsubscribe);
    this.todoFilter = this.todoFilter.bind(this);
  }

  todoFilter(todo) {
    switch (this.todos.visibilityFilter) {
        case SHOW_COMPLETED:
          return todo.completed;
        case SHOW_ACTIVE:
          return !todo.completed;
        default:
          return true;
    }
  }

  onFilter(state) {
    switch (state) {
      case 'all':
        this.showAll();
        break;
      case 'active':
        this.showActive();
        break;
      case 'completed':
        this.showCompleted();
        break;
    }
  }

}

const AppComponent = {
  template: `
    <section class="todoapp">
      <section class="header">
        <h1>todos</h1>
        <header class="header-input">
          <todo-text-input
            placeholder="What needs to get done?"
            on-save="$ctrl.addTodo(task)">
          </todo-text-input>
        </header>
      </section>
      <section class="main">
        <todo-batch-toggle on-toggle="$ctrl.completeAll()" todos="$ctrl.todos.todos"></todo-batch-toggle>
        <div class="todo-list">
          <todo-item todo="todo" 
                     on-edit="$ctrl.editTodo(id, text)" 
                     on-delete="$ctrl.deleteTodo(id)"
                     on-toggle-todo="$ctrl.toggleTodo(id)"
                     ng-repeat="todo in $ctrl.todos.todos | filter:$ctrl.todoFilter track by todo.id">
          </todo-item>
        </div>
      </section>
      <todo-footer ng-if="$ctrl.todos.todos.length > 0" clear-completed="$ctrl.clearCompleted()" todos="$ctrl.todos.todos">
        <todo-list-filter on-filter="$ctrl.onFilter(state)" filter-state="$ctrl.todos.visibilityFilter"></todo-list-filter>
      </todo-footer>
    </section>
  `,
  controller: TodoAppController
};

export default AppComponent;
