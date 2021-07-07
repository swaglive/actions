const index = require("../index.js");
const moment = require('moment');
const assert = require('assert');


describe('closestWeekDayBiweekly()', function () {
    describe('startDate = 2019-11-11', function () {
        it('currentDate 2019-11-13 -> 2019-11-11', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2019-11-13'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-11');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-25');
        });
        it('currentDate 2019-11-14 -> 2019-11-11', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2019-11-14'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-11');
        });
        it('currentDate 2019-11-21 -> 2019-11-11', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2019-11-21'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-11');
        });
        it('currentDate 2019-12-22 -> 2019-12-09', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2019-12-22'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-09');
        });
        it('currentDate 2019-12-31 -> 2019-12-23', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2019-12-31'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-23');
        });
        it('currentDate 2020-01-01 -> 2019-12-23', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2020-01-01'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-23');
        });
        it('currentDate 2020-01-05 -> 2019-12-23', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2020-01-05'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-23');
        });
        it('currentDate 2020-01-06 -> 2020-01-06', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2020-01-06'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2020-01-06');
        });
        it('currentDate 2020-01-07 -> 2020-01-06', function () {
            const result = index.closestWeekDayBiweekly(moment('2019-11-11'), moment('2020-01-07'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2020-01-06');
        });
    });
    describe('startDate = startOf("w")', function () {
        it('currentDate 2019-11-13 -> 2019-11-10', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2019-11-13'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-10');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-24');
        });
        it('currentDate 2019-11-14 -> 2019-11-10', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2019-11-14'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-10');
        });
        it('currentDate 2019-11-23 -> 2019-11-10', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2019-11-23'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-10');
        });
        it('currentDate 2019-11-24 -> 2019-11-24', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2019-11-24'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-24');
        });
        it('currentDate 2019-12-31 -> 2019-12-22', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2019-12-31'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-22');
        });
        it('currentDate 2020-01-01 -> 2019-12-22', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2020-01-01'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-22');
        });
        it('currentDate 2020-01-04 -> 2019-12-22', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2020-01-04'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-22');
        });
        it('currentDate 2020-01-05 -> 2020-01-05', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2020-01-05'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2020-01-05');
        });
        it('currentDate 2020-01-06 -> 2020-01-05', function () {
            const result = index.closestWeekDayBiweekly(moment().startOf('w'), moment('2020-01-06'));
            assert.equal(result.from.format('YYYY-MM-DD'), '2020-01-05');
        });
    });
});


describe('getCurrentMilestone()', function () {
    describe(`duration = 'W'`, function () {
        it(`startDate = '2019-11-11', currentDate = 2019-11-18`, function () {
            const result = index.getCurrentMilestone(moment('2019-11-11'), moment('2019-11-18'), 'W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-18');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-25');
        });
        it(`startDate = '2019-11-12', currentDate = 2019-11-18`, function () {
            const result = index.getCurrentMilestone(moment('2019-11-12'), moment('2019-11-18'), 'W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-12');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-19');
        });
        it(`startDate = '2019-11-16', currentDate = 2019-11-18`, function () {
            const result = index.getCurrentMilestone(moment('2019-11-16'), moment('2019-11-18'), 'W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-16');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-23');
        });
        it(`startDate = '2020-01-05', currentDate = 2019-12-30`, function () {
            const result = index.getCurrentMilestone(moment('2019-12-30'), moment('2020-01-05'), 'W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-12-30');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2020-01-06');
        });
    });
    describe(`duration = '2W'`, function () {
        it(`startDate = '2019-11-11', currentDate = 2019-11-18`, function () {
            const result = index.getCurrentMilestone(moment('2019-11-11'), moment('2019-11-18'), '2W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-11');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-25');
        });
        it(`startDate = moment().startOf('w'), currentDate = 2019-11-17`, function () {
            const result = index.getCurrentMilestone(moment().startOf('w'), moment('2019-11-17'), '2W');
            assert.equal(result.from.format('YYYY-MM-DD'), '2019-11-10');
            assert.equal(result.dueOn.format('YYYY-MM-DD'), '2019-11-24');
        });
    });
});