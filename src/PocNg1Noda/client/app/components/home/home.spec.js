import HomeModule from './home';
import moment from 'moment';
require('moment-timezone');

describe('Home', () => {
  var zdtService;
  var $rootScope;
  var $state;
  var $location;
  var $componentController;
  var $compile;
  var $q;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($injector) => {
    zdtService = $injector.get('zdtService');
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $q = $injector.get('$q');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toEqual('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller.name).toBeTruthy();
    });

    describe('$onInit function should', () => {
      it('exist', () => {
        expect(controller.$onInit).toBeTruthy();
      });
      it('call zdtService.getAll', () => {
        // ARRANGE
        spyOn(zdtService, 'getAll').and.callFake(() => {
          return $q(function(resolve) {
            resolve([]);
          });
        });

        // ACT
        controller.$onInit();

        // ASSERT
        expect(zdtService.getAll).toHaveBeenCalled();
      });
      it('set this.datePickers', () => {
        // ARRANGE
        spyOn(zdtService, 'getAll').and.callFake(() => {
          return $q(function(resolve) {
            resolve([]);
          });
        });

        // ACT
        controller.$onInit();
        $rootScope.$apply();

        // ASSERT
        expect(controller.datePickers).toBeTruthy();
      });
    });

    describe('addDatePicker function should', () => {
      it('exist', () => {
        expect(controller.addDatePicker).toBeTruthy();
      });
      it('call zdtService.create', () => {
        // ARRANGE
        var tz = 'America/New_York';
        spyOn(zdtService, 'create').and.callFake(() => {
          return $q(function(resolve) {
            resolve([]);
          });
        });

        // ACT
        controller.addDatePicker(tz);

        // ASSERT
        expect(zdtService.create).toHaveBeenCalled();
      });
      it('add an item to this.datePickers on success', () => {
        // ARRANGE
        const expected = controller.datePickers.length + 1;
        var tz = 'America/New_York';
        spyOn(zdtService, 'create').and.callFake(() => {
          return $q(function(resolve) {
            resolve([]);
          });
        });

        // ACT
        controller.addDatePicker(tz);
        $rootScope.$apply();

        // ASSERT
        expect(expected).toEqual(controller.datePickers.length);
      });
      it('throw an error if tz is null', () => {
        // ARRANGE
        spyOn(zdtService, 'create').and.callFake(() => {
          return $q(function(resolve) {
            resolve([]);
          });
        });

        // ACT / ASSERT
        expect(controller.addDatePicker).toThrow(new Error('tz must not be null'));
      });
    });

    describe('removeDatePicker function should', () => {
      it('exist', () => {
        expect(controller.removeDatePicker).toBeTruthy();
      });
      it('call zdtService.delete', () => {
        // ARRANGE
        var id = new Date().getTime().toString();
        spyOn(zdtService, 'delete').and.callFake(() => {
          return $q(function(resolve) {
            resolve(null);
          });
        });

        // ACT
        controller.removeDatePicker(id);

        // ASSERT
        expect(zdtService.delete).toHaveBeenCalledWith(id);
      });
      it('remove an object from the array on success', () => {
        // ARRANGE
        var id = new Date().getTime().toString();
        controller.datePickers = [{id: id}];
        spyOn(zdtService, 'delete').and.callFake(() => {
          return $q(function(resolve) {
            resolve(null);
          });
        });
        const expected = controller.datePickers.length - 1;

        // ACT
        controller.removeDatePicker(id);
        $rootScope.$apply();

        // ASSERT
        expect(expected).toEqual(controller.datePickers.length);
      });

    });

    describe('updateDatePicker function should', () => {
      it('exist', () => {
        expect(controller.updateDatePicker);
      });
      it('call zdtService.update', () => {
        // ARRANGE
        const id = '1234';
        const date = new Date(2017, 11, 31);
        const mtz = moment.tz(date.toISOString(), 'America/Los_Angeles');
        controller.datePickers = [{id: id, zonedDateTime: mtz}];
        spyOn(zdtService, 'update').and.callFake(() => {
          return $q((resolve) => {
            resolve(null);
          });
        });

        // ACT
        controller.updateDatePicker(0);

        // ASSERT
        expect(zdtService.update).toHaveBeenCalledWith(controller.datePickers[0]);
      });
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      spyOn(zdtService, 'getAll').and.callFake(() => {
        return $q(function(resolve) {
          resolve([]);
        });
      });
      scope = $rootScope.$new();
      template = $compile('<home></home>')(scope);
      scope.$apply();
    });

    it('has main header', () => {
      expect(template.find('h1').html()).toEqual('0 Time Zone local datepickers!');
    });
  });
});
