import * as angular from 'angular';

import todoTextInput from './todoTextInput/todoTextInput';

import todoItemComponent from './todoItem.component';
import todoFooterComponent from './todoFooter.component';
import todoBatchToggle from './todoBatchToggle.component';
import todoListFilter from './todoListFilter.component';

const components = angular
    .module('app.components', [
        todoTextInput.name
    ])
    .component('todoItem', todoItemComponent)
    .component('todoFooter', todoFooterComponent)
    .component('todoBatchToggle', todoBatchToggle)
    .component('todoListFilter', todoListFilter);

export default components;
