import _ from 'underscore';

import BackendList from './BackendList';
let SDK = require('../SDK').getSDK();

let Item = SDK.get('Item');

module.exports = class VIPDetail extends Item {
  getBackends() {
    return new BackendList({items: this.get('backends')});
  }

  getRequestSuccesses() {
    return this.get('request_success');
  }

  getRequestFailures() {
    return this.get('request_fail');
  }

  getApplicationReachability50() {
    return this.get('application_reachability_50');
  }

  getApplicationReachability75() {
    return this.get('application_reachability_75');
  }

  getApplicationReachability90() {
    return this.get('application_reachability_90');
  }

  getApplicationReachability95() {
    return this.get('application_reachability_95');
  }

  getApplicationReachability99() {
    return this.get('application_reachability_99');
  }

  getMachineReachability50() {
    return this.get('machine_reachability_50');
  }

  getMachineReachability75() {
    return this.get('machine_reachability_75');
  }

  getMachineReachability90() {
    return this.get('machine_reachability_90');
  }

  getMachineReachability95() {
    return this.get('machine_reachability_95');
  }

  getMachineReachability99() {
    return this.get('machine_reachability_99');
  }
};
