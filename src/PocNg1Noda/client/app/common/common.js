import angular from 'angular';
import zdtService from './zdt/zdt.service';

let commonModule = angular.module('app.common', [])

.service('zdtService', zdtService)

.name;

export default commonModule;
