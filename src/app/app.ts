import * as angular from 'angular';
import * as ngRedux from 'ng-redux';
import {INgReduxProvider} from 'ng-redux';
import 'normalize.css';

import AppComponent from './app.component';
import Components from './components/components';
import services from './services/services';
import rootReducer from './reducers/reducers';
import thunk from 'redux-thunk';


console.log(ngRedux)
angular.module('app', [
  Components.name,
  services.name,
  ngRedux.default
])
.component('app', AppComponent)
.config(($ngReduxProvider: INgReduxProvider) => {
  'ngInject';

  $ngReduxProvider.createStoreWith(
      rootReducer,
      [thunk],
      window['__REDUX_DEVTOOLS_EXTENSION__'] ? [window['__REDUX_DEVTOOLS_EXTENSION__']()] : null
  )
})
.run(($ngRedux, $rootScope, $timeout) => {
  'ngInject';

  $ngRedux.subscribe(() => {
    $timeout(() => { $rootScope.$apply(() => {}) }, 100)
  })
})

angular.bootstrap(document.body, ['app'])
