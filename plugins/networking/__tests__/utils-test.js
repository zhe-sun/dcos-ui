jest.dontMock('../utils');

const DEFAULT_MAX_INTERVALS = 60;
var utils = require('../utils');

describe('utils', function () {

  describe('#normalizeTimeSeriesData', function () {

    it('should return the same number of arrays it receives', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'bar'}, {0: 'baz'}
      ]);
      expect(normalizedData.length).toEqual(2);
    });

    it('should return arrays with the same number of values', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'bar'}, {0: 'baz', 1: 'qux'}
      ]);
      expect(normalizedData[0].length).toEqual(normalizedData[1].length);
    });

    it('should pad the arrays with specified number of data points',
      function () {
      var normalizedData = utils.normalizeTimeSeriesData(
        [
          {0: 'bar'}, {0: 'baz', 1: 'qux'}
        ],
        {maxIntervals: 10}
      );
      expect(normalizedData[0].length).toEqual(10);
      expect(normalizedData[1].length).toEqual(10);
    });

    it('should pad the arrays with the default number of data points if not ' +
    'specified', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'bar'}, {0: 'baz', 1: 'qux'}
      ]);
      expect(normalizedData[0].length).toEqual(DEFAULT_MAX_INTERVALS);
      expect(normalizedData[1].length).toEqual(DEFAULT_MAX_INTERVALS);
    });

    it('should pad the arrays at their end if the data is older than one ' +
      'minute before now', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {1: 'bar'}, {1: 'baz'}
      ]);
      expect(normalizedData[0][0]).toEqual('bar');
      expect(normalizedData[1][0]).toEqual('baz');
      expect(normalizedData[0][normalizedData[0].length - 1]).toEqual(null);
      expect(normalizedData[1][normalizedData[1].length - 1]).toEqual(null);
    });

    it('should pad the arrays at their beginning if the data is newer than ' +
      'one minute before now', function () {
      var futureTimestamp = Date.now() * 1.5;
      var normalizedData = utils.normalizeTimeSeriesData([
        {[futureTimestamp]: 'bar'}, {[futureTimestamp]: 'baz'}
      ]);
      expect(normalizedData[0][0]).toEqual(null);
      expect(normalizedData[1][0]).toEqual(null);
      expect(normalizedData[0][normalizedData[0].length - 1]).toEqual('bar');
      expect(normalizedData[1][normalizedData[1].length - 1]).toEqual('baz');
    });

    it('should match values with corresponding timestamps to corresponding ' +
      'positions in the normalized arrays', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {1: 'foo'}, {0: 'bar', 1: 'baz'}
      ]);
      expect(normalizedData[0].indexOf('foo')).toEqual(
        normalizedData[1].indexOf('baz')
      );
    });

    it('should add null values in positions where timestamps do not exist in ' +
      'the sibling data sets', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'foo', 2: 'qux'}, {0: 'bar', 1: 'baz'}
      ]);
      var unmatchedTimestampIndex = normalizedData[1].indexOf('baz');
      expect(normalizedData[0][unmatchedTimestampIndex]).toEqual(null);
    });

    it('should trim the oldest data points when there are more than desired',
      function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'foo', 1: 'bar', 2: 'baz'}, {0: 'qux', 1: 'quux', 2: 'grault'}
      ], {maxIntervals: 1});
      expect(normalizedData[0].length).toEqual(1);
      expect(normalizedData[1].length).toEqual(1);
      expect(normalizedData[0][0]).toEqual('baz');
      expect(normalizedData[1][0]).toEqual('grault');
    });

    it('properly sorts data points when they are out of order', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'foo', 3: 'bar', 2: 'baz'}
      ], {maxIntervals: 3});
      expect(normalizedData[0]).toEqual(['foo', 'baz', 'bar']);
    });

    it('should add values of 0 in positions where timestamps do not exist in ' +
      'the entirety of the sibling data sets', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'foo', 2: 'bar', 3: 'baz'}, {}
      ], {maxIntervals: 3});
      expect(normalizedData[1]).toEqual([0, 0, 0]);
    });

    it('should add values of null in positions where timestamps do not exist in ' +
      'only part of the requested dataset', function () {
      var normalizedData = utils.normalizeTimeSeriesData([
        {0: 'foo', 2: 'bar', 3: 'baz'}, {}
      ], {maxIntervals: 5});
      expect(normalizedData[0]).toEqual(['foo', 'bar', 'baz', null, null]);
    });

  });

});
