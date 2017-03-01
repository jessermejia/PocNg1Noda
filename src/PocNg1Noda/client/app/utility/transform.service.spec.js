'use strict';

import TransformService from './transform.service';
import moment from 'moment';
// this is currently overridden during app bootstrap, but since we are not relying on
// angular's dependency injection we must do it again.
// TODO(jesse): determine why DI isn't working for the TransformService class
moment.fn.toJSON = function() {
    if (this.isValid()) {
        return this.format() + " " + this.tz();
    } else {
        return null;
    }
};

describe('TransformService', () => {
    let transformService;

    //beforeEach(window.module('utility'));
    beforeEach(() => {
        transformService = new TransformService;
    });

    describe('isZdt function should', () => {
        it('exist', () => {
            expect(transformService.isZdt).toBeDefined();
        });
        it('detect a valid zonedDateTime string', () => {
            // ARRANGE
            const zdts = [
                '2017-02-11T22:56:40.7496043-08 America/Los_Angeles',
                '2017-02-12T01:56:40.7496043-05 America/New_York',
                '2017-02-12T12:26:40.7496043+05:30 Asia/Kolkata',
                '2017-02-12T12:26:40Z UTC',
                '2017-02-29T17:56:40.7496043+11:00 Australia/Melbourne'
            ];

            // ACT
            const allResults = zdts
                .map((zdt) => {
                    return transformService.isZdt(zdt);
                })
                .reduce((curr, acc) => {
                    if (acc) {
                        return curr;
                    }
                    return false;
                }, true);

            // use this to find the invalid zdt
            //zdts.forEach((zdt) => {
            //    var isZdt = transformService.isZdt(zdt);
            //    if (!isZdt) throw new Error(zdt);
            //});

            // ASSERT
            expect(allResults).toEqual(true);
        });
        it('not have false positives on regular is08601 dates', () => {
            // ARRANGE
            const dates = [
                '2017-02-11T22:56:40.7496043-08',
                '2017-02-12T01:56:40.7496043-05',
                '2017-02-12T12:26:40.7496043+05:30',
                '2017-02-12T12:26:40Z',
                '2017-02-29T17:56:40.7496043+11:00'
            ];

            // ACT
            const allResults = dates
                .map((date) => {
                    return transformService.isZdt(date);
                })
                .reduce((curr, acc) => {
                    if (!acc) {
                        return curr;
                    }
                    return true;
                }, false);

            // use this to find the valid zdt
            // zdts.forEach((zdt) => {
            //     var isZdt = transformService.isZdt(zdt);
            //     if (!isZdt) throw new Error(zdt);
            // });

            // ASSERT
            expect(allResults).toEqual(false);
        });
    });

    describe('transformZonedDateTimeToMoment function should', () => {
        it('exist', () => {
            // ASSERT
            expect(transformService.transformZonedDateTimeToMoment).toBeDefined();
        });
        it('transform a zdt to a moment', () => {
            // ARRANGE
            var zdtString = '2017-02-12T12:26:40.7496043+05:30 Asia/Kolkata';

            // ACT
            var actual = transformService.transformZonedDateTimeToMoment(zdtString);

            // ASSERT
            expect(actual.isValid()).toEqual(true);
        });
        it('transform a zdt to a moment and be able to spit out the ISO 8601 date', () => {
            // ARRANGE
            var iso8601 = '2017-02-12T12:26:40.7496043+05:30';
            var ianaTz = 'Asia/Kolkata';
            var zdtString = iso8601 + ' ' + ianaTz;
            var expected = '2017-02-12T12:26:40+05:30';

            // ACT
            var actual = transformService.transformZonedDateTimeToMoment(zdtString);

            // ASSERT
            expect(actual.format()).toEqual(expected);
        });
        it('transform a zdt to a moment', () => {
            // ARRANGE
            var iso8601 = '2017-02-12T12:26:40.7496043+05:30';
            var ianaTz = 'Asia/Kolkata';
            var zdtString = iso8601 + ' ' + ianaTz;

            // ACT
            var actual = transformService.transformZonedDateTimeToMoment(zdtString);

            // ASSERT
            expect(actual.tz()).toEqual(ianaTz);
        });
    });

    describe('transformResponse function should', () => {
        it('exist', () => {
            // ASSERT
            expect(transformService.transformResponse).toBeDefined();
        });
        it('transform a single string zdt to a moment', () => {
            // ACT
            var actual = transformService.transformResponse('2016-01-01T00:00:00-08 America/New_York');

            // ASSERT
            expect(moment.isMoment(actual)).toEqual(true);
        });
        it('transform a zdt to a moment at the first level of an object', () => {
            // ARRANGE
            var zdtString = '2016-01-01T00:00:00-08 America/New_York';
            var obj = {
                zdt: zdtString
            };

            // ACT
            var actual = transformService.transformResponse(obj);

            // ASSERT
            expect(moment.isMoment(actual.zdt)).toEqual(true);
        });
        it('transform a zdt to a moment at the second level of an object', () => {
            // ARRANGE
            var zdtString = '2016-01-01T00:00:00-08 America/New_York';
            var obj = {
                firstLevel: {
                    zdt: zdtString
                }
            };

            // ACT
            var actual = transformService.transformResponse(obj);

            // ASSERT
            expect(moment.isMoment(actual.firstLevel.zdt)).toEqual(true);
        });
        it('transform a zdt to a moment at the third level of an object', () => {
            // ARRANGE
            var zdtString = '2016-01-01T00:00:00-08 America/New_York';
            var obj = {
                firstLevel: {
                    secondLevel: {
                        zdt: zdtString
                    }
                }
            };

            // ACT
            var actual = transformService.transformResponse(obj);

            // ASSERT
            expect(moment.isMoment(actual.firstLevel.secondLevel.zdt)).toEqual(true);
        });
        it('transform a zdt to a moment at the fourth level of an object', () => {
            // ARRANGE
            var zdtString = '2016-01-01T00:00:00-08 America/New_York';
            var obj = {
                firstLevel: {
                    secondLevel: {
                        thirdLevel: {
                            zdt: zdtString
                        }
                    }
                }
            };

            // ACT
            var actual = transformService.transformResponse(obj);

            // ASSERT
            expect(moment.isMoment(actual.firstLevel.secondLevel.thirdLevel.zdt)).toEqual(true);
        });
        it('transform an array of zdt\'s to moments', () => {
            // ARRANGE
            var zdtArray = ['2016-01-01T00:00:00-08 America/New_York'];

            // ACT
            var actual = transformService.transformResponse(zdtArray);

            // ASSERT
            expect(moment.isMoment(actual[0])).toEqual(true);
        });
        it('transform an array of zdt\'s to moments', () => {
            // ARRANGE
            var zdtArray = {
                zdts: [
                    '2016-01-01T00:00:00-08 America/New_York',
                    '2016-01-01T00:00:00-08 America/Los_Angeles'
                ]
            };

            // ACT
            var actual = transformService.transformResponse(zdtArray);

            // ASSERT
            expect(moment.isMoment(actual.zdts[0])).toEqual(true);
            expect(moment.isMoment(actual.zdts[1])).toEqual(true);
        });
        it('not transform an object when there are no zdt properties', () => {
            // ARRANGE
            var dateString = '2016-01-01T00:00:00-08';
            var obj = {
                str: "foo",
                firstLevel: {
                    num: 4,
                    secondLevel: {
                        bool: true,
                        thirdLevel: {
                            date: dateString,
                            fourthLevel: {
                                arr: ['bar']
                            }
                        }
                    }
                }
            };
            var expected = JSON.stringify(obj);

            // ACT
            var actual = transformService.transformResponse(obj);


            // ASSERT
            expect(expected).toEqual(JSON.stringify(actual));
            expect(obj).toEqual(actual);
        });
    });

    describe('moment.fn.toJSON should', () => {
        it('output a zdtString (and be tested in a different file)', () => {
            // ARRANGE
            var m = moment.tz('2016-01-01T00:00:00-08', 'America/Los_Angeles');
            var expected = '2016-01-01T00:00:00-08:00 America/Los_Angeles';

            // ACT
            var actual = m.toJSON();

            // ASSERT
            expect(expected).toEqual(actual);
        });
    });
});
