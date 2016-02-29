import {Route, Redirect, NotFoundRoute} from 'react-router';

import dashboard from './dashboard';
import {Hooks} from 'PluginSDK';
import Index from '../pages/Index';
import network from './network';
import nodes from './nodes';
import NotFoundPage from '../pages/NotFoundPage';
import Settings from './factories/settings';
import services from './services';
import universe from './universe';

// Statically defined routes
let applicationRoutes = [
  dashboard,
  services,
  nodes,
  network,
  universe,
  {
    type: Redirect,
    from: '/',
    to: 'dashboard'
  },
  {
    type: NotFoundRoute,
    handler: NotFoundPage
  }
];

// Modules that produce routes
let routeFactories = [Settings];

function getApplicationRoutes() {
  let routes = applicationRoutes.slice();

  routeFactories.forEach(function (routeFactory) {
    routes.push(routeFactory.getRoutes());
  });

  return [
    {
      type: Route,
      name: 'home',
      path: '/',
      children: [
        {
          type: Route,
          id: 'index',
          handler: Index,
          children: routes
        }
      ]
    }
  ];
}

function getRoutes() {
  // Get application routes
  let routes = getApplicationRoutes();
  // Provide opportunity for plugins to inject routes
  return Hooks.applyFilter('applicationRoutes', routes);
}

module.exports = {
  getRoutes
};
