const DEFAULT_INTERVAL_LENGTH = 1000 * 60; // One minute
const DEFAULT_MAX_INTERVALS = 60;

/**
 * Processes an array of timestamp objects and returns a nested array that is
 * ready for our LineChart to display.
 * @constructor
 * @param {array} dataSets - An array of objects, each in the shape of:
 * {timestamp: val, timestamp2: val, timestamp3: val}
 * @param {object} options - Specify the length of time between intervals and
 * the number of intervals to return. Keys for the options are maxIntervals
 * and intervalLength.
 * @returns {array} - In the shape of: [[val, val, val], [val, val, val], ...]
 */
let Utils = {
  normalizeTimeSeriesData: function(dataSets, options = {}) {
    const INTERVAL_LENGTH = options.intervalLength || DEFAULT_INTERVAL_LENGTH;
    const MAX_INTERVALS = options.maxIntervals || DEFAULT_MAX_INTERVALS;
    let currentTime = Date.now();
    let dataSetsToCheckForNullValues = [];
    let normalizedDataSets = [];
    let timestamps = [];

    // Add all received timestamps to the timestamps array.
    dataSets.forEach(function (dataSet, index) {
      normalizedDataSets[index] = [];
      Object.keys(dataSet).forEach(function (timestamp) {
        if (timestamps.indexOf(timestamp) === -1) {
          timestamps.push(timestamp);
        }
      });
    });

    timestamps.sort();

    // Remove all timestamps that exceed the maximum number of intervals.
    if (timestamps.length > MAX_INTERVALS) {
      timestamps = timestamps.slice(timestamps.length - MAX_INTERVALS);
    }

    // For each timestamp, loop through the datasets and create the normalized
    // data array.
    timestamps.forEach(function (timestamp) {
      dataSets.forEach(function (dataSet, dataSetIndex) {
        // If the timestamp value is undefined, we need to check the entire
        // array for null values.
        if (!dataSet[timestamp]
          && dataSetsToCheckForNullValues.indexOf(dataSetIndex) === -1) {
          dataSetsToCheckForNullValues.push(dataSetIndex);
        }
        // Add null if the data doesn't exist for that timestamp.
        normalizedDataSets[dataSetIndex].push(dataSet[timestamp] || null);
      });
    });

    if (timestamps.length === MAX_INTERVALS
      && dataSetsToCheckForNullValues.length === 0) {
      // Return now if we have the desired number of intervals.
      return normalizedDataSets;
    }

    // Check if the most recent timestamp is greater than the interval length.
    let arrayAction;
    if (timestamps[timestamps.length - 1] > currentTime - INTERVAL_LENGTH) {
      // Need to fill in zeroes at beginning of array.
      arrayAction = 'unshift';
    } else {
      // Need to fill in zeroes at end of array.
      arrayAction = 'push';
    }

    for (let i = timestamps.length; i < MAX_INTERVALS; i++) {
      dataSets.forEach(function (dataSet, dataSetIndex) {
        if (dataSetsToCheckForNullValues.indexOf(dataSetIndex) === -1) {
          dataSetsToCheckForNullValues.push(dataSetIndex);
        }
        normalizedDataSets[dataSetIndex][arrayAction](null);
      });
    }

    // Loop over the arrays that need to be checked for full null values.
    dataSetsToCheckForNullValues.forEach(function (dataSetIndex) {
      let allValuesNull = true;

      // If we find any value that is not null, then we don't need to replace
      // the null values with 0.
      normalizedDataSets[dataSetIndex].forEach(function (datum) {
        if (datum != null) {
          allValuesNull = false;
        }
      });

      // If we found only null values, then we need to replace all of the null
      // values with 0.
      if (allValuesNull) {
        normalizedDataSets[dataSetIndex].forEach(function (datum, index) {
          normalizedDataSets[dataSetIndex][index] = 0;
        });
      }
    });

    return normalizedDataSets;
  }
};

module.exports = Utils;
