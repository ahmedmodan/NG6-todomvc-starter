
class TodoFooterController {

  $onChanges(changes) {
    if (changes.todos) {
      this.todos = [...changes.todos.currentValue];
      this.completedCount = this.todos.reduce((count, todo, i) => todo.completed ? i === 0 ? i + 1 : i  + count : count, 0);
      this.activeCount = this.todos.length - this.completedCount;
    }
  }

  clearCompleted() {
    this.onClearCompleted();
  }
}

export default {
  bindings: {
    todos: '<',
    onClearCompleted: '&'
  },
  transclude: true,
  template: `
    <footer class="footer">
      <span class="todo-count">
        {{vm.activeCount}} {{vm.activeCount == 1 ? 'todo' : 'todos'}} left
      </span>
      <ng-transclude></ng-transclude>
      <button
        class="clear-completed"
        ng-click="vm.onClearCompleted()"
        ng-show="vm.completedCount >= 1">
        Clear Completed ({{ vm.completedCount }})
      </button>
    </footer>
  `,
  controller: TodoFooterController,
  controllerAs: 'vm'
}
