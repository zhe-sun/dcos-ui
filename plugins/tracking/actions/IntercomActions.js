import {
  REQUEST_INTERCOM_OPEN,
  REQUEST_INTERCOM_CLOSE
} from '../constants/ActionTypes';

var AppDispatcher = require('../../../src/js/events/AppDispatcher');

let cached;

module.exports = (PluginSDK) => {
  if (cached) {
    return cached;
  }
  var IntercomActions = {

    open: function () {
      AppDispatcher.handleIntercomAction({
        type: REQUEST_INTERCOM_OPEN,
        data: true
      });
    },

    close: function () {
      AppDispatcher.handleIntercomAction({
        type: REQUEST_INTERCOM_CLOSE,
        data: false
      });
    }

  };
  cached = IntercomActions;

  return IntercomActions;
};
