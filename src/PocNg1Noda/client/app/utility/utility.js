import angular from 'angular';
import transformService from './transform.service';

let utilityModule = angular.module('utility', [])

.provider('transformService', function transformServiceProvider() {
    this.$get = [function transformServiceFactory() {
        return new transformService();
    }];
})

.name;

export default utilityModule;
