import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Utility from './utility/utility';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import moment from 'moment';
require('angular-bootstrap-datetimepicker');
require('angular-bootstrap-datetimepicker/src/css/datetimepicker.css');

import $ from "jquery";
// We need to expose jQuery as global variable
window.jQuery = window.$ = $;
// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');


// overriding this here with the expectation that it will run before the rest of the app
// TODO(jesse): see if it would be better to move this out
moment.fn.toJSON = function() {
    if (this.isValid()) {
        return this.format() + " " + this.tz();
    } else{
        return null;
    }
};

angular.module('app', [
    uiRouter,
    Common,
    Components,
    'ui.bootstrap.datetimepicker',
    Utility
])
    .config(($httpProvider, $locationProvider, transformServiceProvider) => {
        "ngInject";

        var transformService = new transformServiceProvider.$get[0]();
        $httpProvider.defaults.transformResponse.push(function (responseData) {
            transformService.transformResponse(responseData);
            return responseData;
        });

        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

  .component('app', AppComponent);
