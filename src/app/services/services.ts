import * as angular from 'angular';

import todoList from './todoList';

const services = angular
  .module('app.services', [])
  .service({
    todoList
  });

export default services;
