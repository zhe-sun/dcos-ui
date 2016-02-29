import {Store} from 'mesosphere-shared-reactjs';

import {
  REQUEST_ACL_GROUPS_SUCCESS,
  REQUEST_ACL_GROUPS_ERROR
} from '../constants/ActionTypes';

import {
  ACL_GROUPS_CHANGE,
  ACL_GROUPS_REQUEST_ERROR
} from '../constants/EventTypes';

import _ACLGroupsActions from '../actions/ACLGroupsActions';

import GroupsList from '../../../../../src/js/structs/GroupsList';

import AppDispatcher from '../../../../../src/js/events/AppDispatcher';
import {SERVER_ACTION} from '../../../../../src/js/constants/ActionTypes';

let cachedStore;

module.exports = (PluginSDK) => {
  // Return cached version if exists
  if (cachedStore) {
    return cachedStore;
  }
  let PluginGetSetMixin = PluginSDK.get('PluginGetSetMixin');
  let {APP_STORE_CHANGE} = PluginSDK.constants;

  let ACLGroupsActions = _ACLGroupsActions(PluginSDK);

  const ACLGroupsStore = Store.createStore({
    storeID: 'groups',

    mixins: [PluginGetSetMixin],

    getSet_data: {
      groups: new GroupsList()
    },

    onSet() {
      PluginSDK.dispatch({
        type: APP_STORE_CHANGE,
        storeID: this.storeID,
        data: this.getSet_data
      });
    },

    addChangeListener: function (eventName, callback) {
      this.on(eventName, callback);
    },

    removeChangeListener: function (eventName, callback) {
      this.removeListener(eventName, callback);
    },

    fetchGroups: ACLGroupsActions.fetch,

    processGroups: function (groups) {
      this.set({
        groups: new GroupsList({
          items: groups
        })
      });
      this.emit(ACL_GROUPS_CHANGE);
    },

    processGroupsError: function (error) {
      this.emit(ACL_GROUPS_REQUEST_ERROR, error);
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
      let source = payload.source;
      if (source !== SERVER_ACTION) {
        return false;
      }

      let action = payload.action;

      switch (action.type) {
        case REQUEST_ACL_GROUPS_SUCCESS:
          ACLGroupsStore.processGroups(action.data);
          break;
        case REQUEST_ACL_GROUPS_ERROR:
          ACLGroupsStore.processGroupsError(action.data);
          break;
      }

      return true;
    })
  });

  cachedStore = ACLGroupsStore;

  return ACLGroupsStore;
};

