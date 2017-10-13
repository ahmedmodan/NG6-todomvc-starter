import './app.less';
import * as todoActions from './store/actions';


export class TodoAppController {
  /**
   * @param {TodoList} todoList
   */
  constructor($ngRedux, $scope, todoList) {
    "ngInject";

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, todoActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.filterState = 'all';
    this.onFilter = this.onFilter.bind(this);
    this.todoFilter = this.todoFilter.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  $ngOnInit() {

  }

  mapStateToThis(state) {
    return {
      todos: state.todos
    }
  }

  onSave(task) {
    if (!task) return;
    this.addTodo(task);
  }

  todoFilter(todo) {
    return this.filterState === 'completed' ? todo.completed : true;
  }

  onFilter(filterState) {
    this.filterState = filterState;
  }

  handleEdit({ todo }) {
    this.editTodo(todo.id, todo.text);
  }

  handleDelete({ id }) {
    this.deleteTodo(id);
  }

  handleComplete({ id }) {
    this.completeTodo(id);
  }

  handleClearCompleted() {
    this.clearCompleted();
  }

}

export default {
  template: `
    <section class="todoapp">
      <section class="header">
        <h1>todos</h1>
        <header class="header-input">
          <todo-text-input
            placeholder="What needs to get done?"
            on-save="$ctrl.onSave(task)">
          </todo-text-input>
        </header>
      </section>
      <section class="main">
        <div class="todo-list">
          <todo-item 
                      todo="todo" 
                      ng-repeat="todo in $ctrl.todos | filter:$ctrl.todoFilter track by todo.id" 
                      on-destroy="$ctrl.handleDelete({ id: id })"
                      on-edit="$ctrl.handleEdit({ todo: todo })"
                      on-complete="$ctrl.handleComplete({ id: id })">
          </todo-item>
        </div>
      </section>
      <todo-footer ng-if="$ctrl.todos" todos="$ctrl.todos" on-clear-completed="$ctrl.handleClearCompleted()">
        <todo-list-filter on-filter="$ctrl.onFilter(state)" filter-state="$ctrl.filterState"></todo-list-filter>
      </todo-footer>
    </section>
  `,
  controller: TodoAppController
};
