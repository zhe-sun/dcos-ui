/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import ContainerSettings from './service-schema/ContainerSettings';
import EnvironmentVariables from './service-schema/EnvironmentVariables';
import General from './service-schema/General';
import HealthChecks from './service-schema/HealthChecks';
import Labels from './service-schema/Labels';
import Optional from './service-schema/Optional';
import Volumes from './service-schema/Volumes';

let ServiceSchema = {
  type: 'object',
  properties: {
    general: General,
    containerSettings: ContainerSettings,
    optional: Optional,
    environmentVariables: EnvironmentVariables,
    volumes: Volumes,
    labels: Labels,
    healthChecks: HealthChecks
  },
  required: [
    'general'
  ]
};

module.exports = ServiceSchema;
