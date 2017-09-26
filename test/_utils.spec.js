import { assert } from 'chai';
import * as utils from '../lib/src/_utils';

describe('_utils.js', () => {
    describe('sortObject', () => {
        it('Should return a sorted Object', () => {
            const unSortedObject = {
                b: 2,
                a: 1,
                d: 4,
                c: 3
            };
            const sortedObject = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };
            assert.deepEqual(JSON.stringify(utils.sortObject(unSortedObject)), JSON.stringify(sortedObject), 'Passing an Object');
        });
    });

    describe('convertStringToArray', () => {
        it('Should return an empty Array', () => {
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(false)), JSON.stringify([]), 'Passing false');
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(undefined)), JSON.stringify([]), 'Passing false');
            assert.deepEqual(JSON.stringify(utils.convertStringToArray([])), JSON.stringify([]), 'Passing empty Array');
        });

        it('Should return the same Array/Object', () => {
            const flatArray = [1, 2, 3];
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(flatArray)), JSON.stringify(flatArray), 'Given a flat Array');

            const deepArray = [[1, 2, 3], [4, 5, 6], 3];
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(deepArray)), JSON.stringify(deepArray), 'Given a deep Array');

            const flatObject = {
                a: 1,
                b: 2,
                c: 3
            };
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(flatObject)), JSON.stringify(Object.values(flatObject)), 'Given a flat Object');

            const deepObject = {
                a: [1, 2, 3],
                b: [4, 5, 6],
                c: 3
            };
            assert.deepEqual(JSON.stringify(utils.convertStringToArray(deepObject)), JSON.stringify(Object.values(deepObject)), 'Given a deep Object');

            assert.deepEqual(JSON.stringify(utils.convertStringToArray('1, 2, 3')), JSON.stringify([1, 2, 3]), 'Given a string with spaces');
            assert.deepEqual(JSON.stringify(utils.convertStringToArray('1,2,3')), JSON.stringify([1, 2, 3]), 'Given a string without spaces');
        });

        it('Should replace the underscores with spaces', () => {
            assert.deepEqual(JSON.stringify(utils.convertStringToArray('one_1, two_2, three_3')), JSON.stringify(['one 1', 'two 2', 'three 3']));
        });
    });

    describe('formatDate', () => {
        it('Should return the string of the formatted date', () => {
            assert.deepEqual(utils.formatDate(new Date(0)), '01/01/1970', 'Given a date object.');
        });
    });

    describe('dashToCamelCase', () => {
        it('Should return a camelCase string', () => {
            assert.deepEqual(utils.dashToCamelCase('this-is-a-string'), 'thisIsAString', 'Given a string with dashes.');
            assert.deepEqual(utils.dashToCamelCase('tHIs-Is-a-sTriNg'), 'thisIsAString', 'Given a string with random capital letters');
        });
    });

    describe('isInRange', () => {
        it('Should return if a number is in between a range', () => {
            assert.deepEqual(utils.isInRange(2, 1, 3), true, 'Given a number in range');
            assert.deepEqual(utils.isInRange(1, 2, 3), false, 'Given a number below range');
            assert.deepEqual(utils.isInRange(4, 1, 3), false, 'Given a number above range');
            assert.deepEqual(utils.isInRange(-1, 1, 3), false, 'Given a number above range, negative');
            assert.deepEqual(utils.isInRange(-1, -3, 0), true, 'Given a number in range, negative');
            assert.deepEqual(utils.isInRange(2, 2, 5), true, 'Given same number as first range value');
            assert.deepEqual(utils.isInRange(5, 2, 5), false, 'Given same number as last range value');
        });
    })
});
