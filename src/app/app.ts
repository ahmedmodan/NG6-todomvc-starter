import * as angular from 'angular';
import * as ngRedux from 'ng-redux';
import Components from './components/components';
import services from './services/services';
import rootReducer from './store/rootReducer';
import 'normalize.css';

import AppComponent from './app.component';

angular
    .module('app', [
        ngRedux.default,
        Components.name,
        services.name
    ])
    .config(($ngReduxProvider) => {
        'ngInject';

        $ngReduxProvider.createStoreWith(rootReducer, [],  window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : null)
    })
    .run(($ngRedux, $rootScope, $timeout) => {
        //To reflect state changes when disabling/enabling actions via the monitor
        //there is probably a smarter way to achieve that
        $ngRedux.subscribe(() => {
            $timeout(() => {
                $rootScope.$apply(() => {
                })
            }, 100);
        })
    })
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
