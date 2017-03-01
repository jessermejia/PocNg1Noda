import angular from 'angular';
import uiRouter from 'angular-ui-router';
import common from '../../common/common';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  common,
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', homeComponent)
  
.name;

export default homeModule;
