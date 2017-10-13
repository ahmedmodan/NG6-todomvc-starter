
export class TodoItemController {
  constructor() {
    "ngInject";

    this.isEditing = false;
  }

  $onInit() {
    this.text = this.task.text;
    this.completed = this.task.completed
  }

  $OnChanges(changes) {
    if (changes.task) {
      this.task = { ...changes.task.currentValue };
      this.text = this.task.text;
      this.completed = this.task.completed
    }
  }

  onDestroyClick() {
    this.onDestroy({ id: this.task.id });
  }

  onSave(description) {
    if (!description) {
      this.onDestroy({ id: this.task.id });
    } else {
      const todo = { ...this.task, text: description }
      this.onEdit({ todo });
    }

    this.isEditing = false;
  }

  toggleStatus() {
      return this.onComplete({ id: this.task.id });;
  }

  /**
   * This hack is needed due angular doesn't have one-way bindings (atleast for now)
   * It allows not to override model value from inside this component.
   *
   * @returns {boolean}
   */
}

export default {
  bindings: {
    task: '=todo',
    onComplete: '&',
    onDestroy: '&',
    onEdit: '&'
  },
  template: `
    <li ng-class="{'completed': vm.completed, 'editing': vm.isEditing}">
      <div class="view" ng-show="!vm.isEditing">
        <input
          class="toggle"
          type="checkbox"
          ng-model="vm.completed"
          ng-change="vm.toggleStatus()" />
        </input>
        <label ng-dblclick="vm.isEditing = true" class="todo-text" >{{vm.task.text}}</label>
        <button class="destroy" ng-click="vm.onDestroyClick($event)"></button>
      </div>
      <div class="edit-container" ng-if="vm.isEditing">
        <todo-text-input
          class="edit"
          on-save="vm.onSave(task)"
          value="{{vm.text}}">
        </todo-text-input>
      </div>
    </li>
  `,
  controller: TodoItemController,
  controllerAs: 'vm'
}
