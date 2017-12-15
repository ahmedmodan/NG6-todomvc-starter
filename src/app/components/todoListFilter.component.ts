

import {SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED} from '../constants/todoConstants';

export default {
  bindings: {
    onFilter: '&',
    filterState: '<'
  },
  template: `
    <ul class="filters">
      <li><a href ng-class="{selected: vm.filterState == '${SHOW_ALL}'}" ng-click="vm.onFilter({state: 'all'})">All</a></li>
      <li><a href ng-class="{selected: vm.filterState == '${SHOW_ACTIVE}'}" ng-click="vm.onFilter({state: 'active'})">Active</a></li>
      <li><a href ng-class="{selected: vm.filterState == '${SHOW_COMPLETED}'}" ng-click="vm.onFilter({state: 'completed'})">Completed</a></li>
    </ul>
  `,
  controllerAs: 'vm'
}
