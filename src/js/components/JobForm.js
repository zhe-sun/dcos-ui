import React from 'react';

import SchemaForm from './SchemaForm';
import SchemaFormUtil from '../utils/SchemaFormUtil';

const METHODS_TO_BIND = [
  'handleFormChange',
  'validateForm'
];

const SCHEDULE_FIELDS = ['cron', 'timezone', 'startingDeadlineSeconds'];

class JobForm extends SchemaForm {
  constructor() {
    super(...arguments);

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    this.multipleDefinition = this.getNewDefinition();

    this.props.getTriggerSubmit(this.handleExternalSubmit);
  }

  handleExternalSubmit() {
    this.validateForm();
    let model = this.triggerTabFormSubmit();

    return this.getDataTriple(model);
  }

  handleFormChange(formData, eventObj) {
    // Fire changes only on blur
    // and on schedule runOnSchedule checkbox change to show/hide fields
    let scheduleEnabledChange =
      Object.prototype.hasOwnProperty.call(formData, 'cron') &&
      eventObj.eventType === 'change' &&
      eventObj.fieldName === 'runOnSchedule';
    if (eventObj.eventType !== 'blur' && !scheduleEnabledChange) {
      return;
    }

    this.validateForm();
    // Provide updated model to get new multipleDefinition
    let model = this.triggerTabFormSubmit();
    this.multipleDefinition = this.getNewDefinition(model);
    this.props.onChange(this.getDataTriple(model));
    // Only update if schedule changed
    if (scheduleEnabledChange) {
      this.forceUpdate();
    }
  }

  handleTabClick(tab) {
    this.props.onTabChange(tab);
  }

  // Fallback to props model, if provided model is not defined,
  // i.e. more up to date
  getNewDefinition(model = this.props.model) {
    let multipleDefinition = super.getNewDefinition();

    let scheduleEnabled = model.schedule.runOnSchedule;
    if (!scheduleEnabled) {
      multipleDefinition.schedule.definition.forEach(function (definition) {
        if (SCHEDULE_FIELDS.includes(definition.name)) {
          definition.formElementClass = 'hidden';
          definition.value = null;
        }
      });
    }

    return multipleDefinition;
  }

  // Fallback to props model, if provided model is not defined,
  // i.e. more up to date
  getDataTriple(model = this.props.model) {
    return {
      model: SchemaFormUtil.processFormModel(model, this.getNewDefinition(model))
    };
  }

  validateForm() {
    // TODO: Overwrite the default behaviour until DCOS-7669 is fixed.
    return true;
  }
}

JobForm.defaultProps = {
  className: 'multiple-form row',
  defaultTab: '',
  getTriggerSubmit() {},
  isEdit: false,
  onChange() {},
  onTabChange() {},
  schema: {}
};

JobForm.propTypes = {
  className: React.PropTypes.string,
  defaultTab: React.PropTypes.string,
  isEdit: React.PropTypes.bool,
  getTriggerSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onTabChange: React.PropTypes.func,
  schema: React.PropTypes.object
};

module.exports = JobForm;
