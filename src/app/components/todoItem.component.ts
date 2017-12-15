
export class TodoItemController {
  public isEditing;
  public onDelete;
  public onEdit;
  public todo;

  constructor() {
    "ngInject";

    this.isEditing = false;
  }


  onSave(description) {
    if (!description) {
      this.onDelete({ id: this.todo.id });
    } else {
      this.onEdit({
          id: this.todo.id,
          text: description
      });
    }

    this.isEditing = false;
  }

  $onChanges(changes) {
    if (changes.todo) {
      this.completed = changes.todo.currentValue.completed;
    }
  }
}

export default {
  bindings: {
    todo: '<',
    onEdit: '&',
    onDelete: '&',
    onToggleTodo: '&'
  },
  template: `
    <li ng-class="{'completed': vm.todo.completed, 'editing': vm.isEditing}">
      <div class="view" ng-show="!vm.isEditing">
        <input
          class="toggle"
          type="checkbox"
          ng-model="vm.completed"
          ng-change="vm.onToggleTodo({id: vm.todo.id})" />
        </input>
        <label ng-dblclick="vm.isEditing = true" class="todo-text" >{{vm.todo.text}}</label>
        <button class="destroy" ng-click="vm.onDelete({id: vm.todo.id})"></button>
      </div>
      <div class="edit-container" ng-if="vm.isEditing">
        <todo-text-input
          class="edit"
          on-save="vm.onSave(task)"
          value="{{vm.todo.text}}">
        </todo-text-input>
      </div>
    </li>
  `,
  controller: TodoItemController,
  controllerAs: 'vm'
}
