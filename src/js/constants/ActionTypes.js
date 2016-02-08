let ActionTypes = {};
[
  'INTERCOM_ACTION',
  'REQUEST_ACL_DIRECTORIES_SUCCESS',
  'REQUEST_ACL_DIRECTORIES_ERROR',
  'REQUEST_ACL_DIRECTORY_ADD_SUCCESS',
  'REQUEST_ACL_DIRECTORY_ADD_ERROR',
  'REQUEST_ACL_DIRECTORY_DELETE_SUCCESS',
  'REQUEST_ACL_DIRECTORY_DELETE_ERROR',
  'REQUEST_ACL_DIRECTORY_TEST_SUCCESS',
  'REQUEST_ACL_DIRECTORY_TEST_ERROR',
  'REQUEST_ACL_CREATE_SUCCESS',
  'REQUEST_ACL_CREATE_ERROR',
  'REQUEST_ACL_GROUPS_ERROR',
  'REQUEST_ACL_GROUPS_SUCCESS',
  'REQUEST_ACL_GROUP_ADD_USER_ERROR',
  'REQUEST_ACL_GROUP_ADD_USER_SUCCESS',
  'REQUEST_ACL_GROUP_CREATE_ERROR',
  'REQUEST_ACL_GROUP_CREATE_SUCCESS',
  'REQUEST_ACL_GROUP_DELETE_ERROR',
  'REQUEST_ACL_GROUP_DELETE_SUCCESS',
  'REQUEST_ACL_GROUP_DETAILS_ERROR',
  'REQUEST_ACL_GROUP_DETAILS_SUCCESS',
  'REQUEST_ACL_GROUP_ERROR',
  'REQUEST_ACL_GROUP_GRANT_ACTION_ERROR',
  'REQUEST_ACL_GROUP_GRANT_ACTION_SUCCESS',
  'REQUEST_ACL_GROUP_PERMISSIONS_ERROR',
  'REQUEST_ACL_GROUP_PERMISSIONS_SUCCESS',
  'REQUEST_ACL_GROUP_REMOVE_USER_ERROR',
  'REQUEST_ACL_GROUP_REMOVE_USER_SUCCESS',
  'REQUEST_ACL_GROUP_REVOKE_ACTION_ERROR',
  'REQUEST_ACL_GROUP_REVOKE_ACTION_SUCCESS',
  'REQUEST_ACL_GROUP_SUCCESS',
  'REQUEST_ACL_GROUP_UPDATE_ERROR',
  'REQUEST_ACL_GROUP_UPDATE_SUCCESS',
  'REQUEST_ACL_GROUP_USERS_ERROR',
  'REQUEST_ACL_GROUP_USERS_SUCCESS',
  'REQUEST_ACL_LOGIN_ERROR',
  'REQUEST_ACL_LOGIN_SUCCESS',
  'REQUEST_ACL_RESOURCE_ACLS_ERROR',
  'REQUEST_ACL_RESOURCE_ACLS_SUCCESS',
  'REQUEST_ACL_ROLE_ERROR',
  'REQUEST_ACL_ROLE_SUCCESS',
  'REQUEST_ACL_USERS_ERROR',
  'REQUEST_ACL_USERS_SUCCESS',
  'REQUEST_ACL_USER_CREATE_ERROR',
  'REQUEST_ACL_USER_CREATE_SUCCESS',
  'REQUEST_ACL_USER_DELETE_ERROR',
  'REQUEST_ACL_USER_DELETE_SUCCESS',
  'REQUEST_ACL_USER_ERROR',
  'REQUEST_ACL_USER_GRANT_ACTION_ERROR',
  'REQUEST_ACL_USER_GRANT_ACTION_SUCCESS',
  'REQUEST_ACL_USER_GROUPS_ERROR',
  'REQUEST_ACL_USER_GROUPS_SUCCESS',
  'REQUEST_ACL_USER_PERMISSIONS_ERROR',
  'REQUEST_ACL_USER_PERMISSIONS_SUCCESS',
  'REQUEST_ACL_USER_REVOKE_ACTION_ERROR',
  'REQUEST_ACL_USER_REVOKE_ACTION_SUCCESS',
  'REQUEST_ACL_USER_SUCCESS',
  'REQUEST_ACL_USER_UPDATE_ERROR',
  'REQUEST_ACL_USER_UPDATE_SUCCESS',
  'REQUEST_CLI_INSTRUCTIONS',
  'REQUEST_CONFIG_ERROR',
  'REQUEST_CONFIG_SUCCESS',
  'REQUEST_COSMOS_PACKAGES_SEARCH_ERROR',
  'REQUEST_COSMOS_PACKAGES_SEARCH_SUCCESS',
  'REQUEST_DCOS_METADATA',
  'REQUEST_INTERCOM_CLOSE',
  'REQUEST_INTERCOM_OPEN',
  'REQUEST_MARATHON_APPS',
  'REQUEST_MARATHON_APPS_ERROR',
  'REQUEST_MARATHON_APPS_ONGOING',
  'REQUEST_MARATHON_APPS_SUCCESS',
  'REQUEST_MESOS_HISTORY_ERROR',
  'REQUEST_MESOS_HISTORY_SUCCESS',
  'REQUEST_MESOS_LOG_ERROR',
  'REQUEST_MESOS_LOG_SUCCESS',
  'REQUEST_PREVIOUS_MESOS_LOG_SUCCESS',
  'REQUEST_PREVIOUS_MESOS_LOG_ERROR',
  'REQUEST_MESOS_LOG_OFFSET_ERROR',
  'REQUEST_MESOS_LOG_OFFSET_SUCCESS',
  'REQUEST_MESOS_STATE_ERROR',
  'REQUEST_MESOS_STATE_ONGOING',
  'REQUEST_MESOS_STATE_SUCCESS',
  'REQUEST_MESOS_SUMMARY_ERROR',
  'REQUEST_MESOS_SUMMARY_ONGOING',
  'REQUEST_MESOS_SUMMARY_SUCCESS',
  'REQUEST_METADATA',
  'REQUEST_SIDEBAR_CLOSE',
  'REQUEST_SIDEBAR_OPEN',
  'REQUEST_TASK_DIRECTORY_ERROR',
  'REQUEST_TASK_DIRECTORY_SUCCESS',
  'REQUEST_TOUR_START',
  'REQUEST_VERSIONS_ERROR',
  'REQUEST_VERSIONS_SUCCESS',
  'SERVER_ACTION',
  'SIDEBAR_ACTION'
].forEach(function (actionType) {
  ActionTypes[actionType] = actionType;
});

export default ActionTypes;
