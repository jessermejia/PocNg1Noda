'use strict';

describe('The zdtService', () => {
  var zdtService;
  var $httpBackend;

  beforeEach(window.module('app.common'));
  beforeEach(inject((_zdtService_, _$httpBackend_) => {
    zdtService = _zdtService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('getAll function should', () => {
    it('exist', () => {
      // ASSERT
      expect(zdtService.getAll).toBeDefined();
    });
    it('get all the zdts', () => {
      // ARRANGE
      var zdts = [
        {
          id: '1',
          zonedDateTime: '2016-01-01T00:00:00-08 America/Los_Angeles'
        },
        {
          id: '2',
          zonedDateTime: '2017-01-01T00:00:00-08 America/Los_Angeles'
        }
      ];
      $httpBackend.expectGET('api/zdt').respond(200, zdts);

      // ACT
      var response;
      zdtService.getAll()
        .then((data) => {
          response = data;
        });
      $httpBackend.flush();

      // ASSERT
      expect(response).toEqual(zdts);
    });
  });

  describe('getById function should', () => {
    it('exist', () => {
      // ASSERT
      expect(zdtService.getById).toBeDefined();
    });
    it('get a zdt by id', () => {
      // ARRANGE
      var zdt = {
        id: '1',
        zonedDateTime: '2016-01-01T00:00:00-08 America/Los_Angeles'
      };
      $httpBackend.expectGET('api/zdt/1').respond(200, zdt);

      // ACT
      var response;
      zdtService.getById(1)
        .then((data) => {
          response = data;
        });
      $httpBackend.flush();

      // ASSERT
      expect(response).toEqual(zdt);
    });
  });

  describe('create function should', () => {
    it('exist', () => {
      // ASSERT
      expect(zdtService.create).toBeDefined();
    });
    it('create a zdt', () => {
      // ARRANGE
      var zdt = {
        id: '1',
        zonedDateTime: '2016-01-01T00:00:00-08 America/Los_Angeles'
      };
      $httpBackend.expectPOST('api/zdt', zdt).respond(200);

      // ACT
      zdtService.create(zdt);
      $httpBackend.flush();

      // ASSERT
      // nothing to assert
    });
  });

  describe('update function should', () => {
    it('exist', () => {
      // ASSERT
      expect(zdtService.update).toBeDefined();
    });
    it('update a zdt', () => {
      // ARRANGE
      var zdt = {
        id: '1',
        zonedDateTime: '2016-01-01T00:00:00-08 America/Los_Angeles'
      };
      $httpBackend.expectPUT('api/zdt/' + zdt.id, zdt).respond(200);

      // ACT
      var response;
      zdtService.update(zdt);
      $httpBackend.flush();

      // ASSERT
      // nothing to assert
    });
  });

  describe('delete function should', () => {
    it('exist', () => {
      // ASSERT
      expect(zdtService.delete).toBeDefined();
    });
    it('update a zdt', () => {
      // ARRANGE
      var zdt = {
        id: '1',
        zonedDateTime: '2016-01-01T00:00:00-08 America/Los_Angeles'
      };
      $httpBackend.expectDELETE('api/zdt/' + zdt.id).respond(200);

      // ACT
      var response;
      zdtService.delete(zdt.id);
      $httpBackend.flush();

      // ASSERT
      // nothing to assert
    });
  });
});
