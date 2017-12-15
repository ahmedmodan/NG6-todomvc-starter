
class TodoFooterController {
  public numCompleted;
  public numRemaining;

  $onChanges(changes) {
    if (changes.todos) {
      this.numCompleted = changes.todos.currentValue.reduce((total, todo) => todo.completed ? total + 1 : total, 0);
      this.numRemaining = changes.todos.currentValue.length - this.numCompleted;
    }
  }

}

export default {
  bindings: {
    clearCompleted: '&',
    todos: '<'
  },
  transclude: true,
  template: `
    <footer class="footer">
      <span class="todo-count">
        {{vm.numRemaining}} {{vm.numRemaining == 1 ? 'todo' : 'todos'}} left
      </span>
      <ng-transclude></ng-transclude>
      <button
        class="clear-completed"
        ng-click="vm.clearCompleted()"
        ng-show="vm.numCompleted >= 1">
        Clear Completed ({{ vm.numCompleted }})
      </button>
    </footer>
  `,
  controller: TodoFooterController,
  controllerAs: 'vm'
}
