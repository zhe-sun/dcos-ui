import _ from 'underscore';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import {Route} from 'react-router';

import _DirectoriesTab from './pages/DirectoriesTab';

module.exports = (PluginSDK) => {

  let DirectoriesTab = _DirectoriesTab(PluginSDK);
  let {Hooks} = PluginSDK;

  let DirectoriesPluginHooks = {
    configuration: {
      enabled: false
    },

    defaults: {
      route: {
        type: Route,
        name: 'settings-organization-directories',
        path: 'directories/?',
        handler: DirectoriesTab,
        children: [{
          type: Route,
          name: 'settings-organization-directories-panel'
        }]
      },
      tabs: {
        'settings-organization-directories': {
          content: 'External Directory',
          priority: 5
        }
      }
    },

    getOrganizationRoutes(route) {
      route.routes.push(this.defaults.route);
      return route;
    },

    /**
     * @param  {Object} Hooks The Hooks API
     */
    initialize() {
      Hooks.addFilter('getOrganizationRoutes',
        this.getOrganizationRoutes.bind(this));

      Hooks.addFilter('getTabsFor_settings-organization',
        this.getTabs.bind(this));
    },

    getTabs(tabs) {
      return _.extend(tabs, this.defaults.tabs);
    }
  };

  return DirectoriesPluginHooks;
};
