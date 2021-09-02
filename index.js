import { NativeModules } from 'react-native';

const { TdReactNativeSdk } = NativeModules;

/**
 * TreasureData React Native module.
 * @module TreasureData
 */

export default {
  
/**
 * Initialize Treasure Data object. 
 * 
 * @param {json} configuration The configuration options 
 *   @param {string}  configuration.apiEndpoint      - Valid API endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints)
 *   @param {string}  configuration.apiKey           - Write only TD Api Key
 *   @param {string}  configuration.defaultDatabase  - Database name in TD Account
 *   @param {string}  configuration.defaultTable     - Table name in TD database
 *   @param {string}  [configuration.cdpEndpoint]    - Valid CDP endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints)
 *   @param {string}  [configuration.encryptionKey]  - Encryption key used to locally encrypt events when saved to device storage. This key will be used to generate a aes128 encrytpion key. Any string will work. 
 * 
 * @example
 * import TreasureData from 'td-react-native-sdk';
 * 
 * TreasureData.setup({
 *   apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
 *   encryptionKey: 'xxxxx',
 *   apiKey: 'xxxxx', /// You should use write only api key
 *   defaultDatabase: 'default_database',
 *   defaultTable: 'default_table_name',
 *   cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
 * })
 * 
 * */
  setup: (configuration) => {
    TdReactNativeSdk(configuration);
  },

  /**
  * Add custom event to specified database and table. 
  * The event will be buffered untill `uploadEvents()` is called.
  * The total length of database and table must be shorter than 129 characters.
  * If database param is not specified, `defaultDatabase` from the `setup()` will be used.
  * 
  * @param {json}    event       JSON data to be uploded
  * @param {string}  table       Table name
  * @param {string}  database    Database name
  * 
  * @see {@link `uploadEvents`}
  * 
  * @example
  * const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
  * TreasureData.addEvent(customEvent, 'table', 'database');
  * // or
  * TreasureData.addEvent(customEvent, 'table');
  * 
  * */
  addEvent: (event, table, database = undefined) => {
    TdReactNativeSdk.addEvent(event, table, database);
  },
  
  /**
  * Add event to specified database and table. Use callback to confirm success / failure.
  * 
  * You can pass 'null' or 'undefined' as database param and 'defaultDatabase' configuration in 'TreasureData.setup({...})' will be used instead.
  * 
  * @param {json}     event       JSON data to be uploded
  * @param {string}   table       Table name
  * @param {string}   database    Database name
  * @param {function} callback    Callback function
  * 
  * @example
  * const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
  * TreasureData.addEventWithCallback(customEvent, 'table', 'database', () => {
  *   console.log('Add Event Successfully');
  * }, (errorCode, errorMessage) => {
  *   console.log('Add Event Failed', errorCode, errorMessage);
  * });
  * 
  * */
  addEventWithCallback: (event, table, database = undefined, onSuccess, onError) => {
    TdReactNativeSdk.addEvent(event, table, database, onSuccess, onError);
  },

  /**
  * Upload all buffered events to Treasure Data.
  * 
  * @see {@link addEvents}
  * 
  * @example
  * TreasureData.uploadEvents();
  * 
  * */
  uploadEvents: () => {
    TdReactNativeSdk.uploadEvents();
  },
  
  /**
  * Upload all buffered events to Treasure Data.
  * Use callback function to verify success / failure.
  * 
  * @param {function} onSuccess Callback Function called post event in case of success. 
  * @param {function} onFailure Callback Function called post event in case of failure.
  * 
  * @example
  * TreasureData.uploadEventsWithCallback(() => {
  *   console.log('Upload events successfully')
  * }, (errorCode, errorMessage) => {
  *   console.log('Failed to upload events', errorCode, errorMessage);
  * });
  * 
  * */
  uploadEventsWithCallback: (onSuccess, onError) => {
    TdReactNativeSdk.uploadEventsWithCallback(onSuccess, onError);
  },

  /**
  * @summary Get UUID generated from TreasureData. 
  * 
  * @description The value will be set to `td_uuid` column for every events if `enableAutoAppendUniqId` is called.
  * 
  * @param {function} callback - passes the UUID.
  * */
  getUUID: (callback) => {
    TdReactNativeSdk.getUUID(callback);
  },
  
  /**
  * UUID of the device will be added to each event automatically if you call `TreasureData.enableAutoAppendUniqId()`. 
  * This value won't change until the application is uninstalled.
  * 
  * @see {@link disableAutoAppendUniqId}
  * @see {@link resetUniqId}
  * 
  * @example
  * TreasureData.enableAutoAppendUniqId();
  * 
  * */
  enableAutoAppendUniqId: () => {
    TdReactNativeSdk.enableAutoAppendUniqId();
  },
  
  /**
  * Disable adding UUID of device to each event automatically.
  * 
  * @see {@link enableAutoAppendUniqId}
  * @see {@link resetUniqId}
  * 
  * @example
  * TreasureData.disableAutoAppendUniqId();
  * 
  * */
  disableAutoAppendUniqId: () => {
    TdReactNativeSdk.disableAutoAppendUniqId();
  },
  
  /**
  * Reset UUID of device.
  * 
  * @see {@link enableAutoAppendUniqId}
  * @see {@link disableAutoAppendUniqId}
  * 
  * @example
  * TreasureData.resetUniqId();
  * 
  * */
  resetUniqId: () => {
    TdReactNativeSdk.resetUniqId();
  },

  /**
  * Add device model information to each event automatically.
  * 
  * @see {@link add device model information to each event automatically}
  * 
  * @example
  * TreasureData.enableAutoAppendModelInformation();
  * 
  * */
  enableAutoAppendModelInformation: () => {
    TdReactNativeSdk.enableAutoAppendModelInformation();
  },
  
  /**
  * Disable adding device model information to each event automatically.
  * 
  * @see {@link enableAutoAppendModelInformation}
  * 
  * @example
  * TreasureData.disableAutoAppendModelInformation();
  * 
  * */
  disableAutoAppendModelInformation: () => {
    TdReactNativeSdk.disableAutoAppendModelInformation();
  },

  /**
  * Add application version information to each event automatically.
  * 
  * @see {@link disableAutoAppendAppInformation}
  * 
  * @example
  * TreasureData.enableAutoAppendAppInformation();
  * 
  * */
  enableAutoAppendAppInformation: () => {
    TdReactNativeSdk.enableAutoAppendAppInformation();
  },
  
  /**
  * Disable adding application version information to each event automatically.
  * 
  * @see {@link enableAutoAppendAppInformation}
  * 
  * @example
  * TreasureData.disableAutoAppendAppInformation();
  * 
  * */
  disableAutoAppendAppInformation: () => {
    TdReactNativeSdk.disableAutoAppendAppInformation();
  },

  /**
  * Add locale configuration information to each event automatically.
  * 
  * @see {@link disableAutoAppendLocaleInformation}
  * 
  * @example
  * TreasureData.enableAutoAppendLocaleInformation();
  * 
  * */
  enableAutoAppendLocaleInformation: () => {
    TdReactNativeSdk.enableAutoAppendLocaleInformation();
  },
  
  /**
  * Disable adding locale configuration information to each event automatically.
  * 
  * @see {@link enableAutoAppendLocaleInformation}
  * 
  * @example
  * TreasureData.disableAutoAppendLocaleInformation();
  * 
  * */
  disableAutoAppendLocaleInformation: () => {
    TdReactNativeSdk.disableAutoAppendLocaleInformation();
  },

  /**
  * Use server side upload timestamp not only client device time that is recorded when your application calls addEvent.
  * 
  * @param {string} [columnName] Optional column name to store information to.
  * 
  * @see {@link disableServerSideUploadTimestamp}
  * 
  * @example
  * TreasureData.enableServerSideUploadTimestamp();
  * // Or specify custom column
  * TreasureData.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
  * 
  * */
  enableServerSideUploadTimestamp: (columnName = undefined) => {
    TdReactNativeSdk.enableServerSideUploadTimestamp(columnName);
  },
  
  /**
  * Disable server side upload of timestamp. 
  * 
  * @see {@link enableServerSideUploadTimestamp}
  * 
  * @example
  * TreasureData.disableServerSideUploadTimestamp();
  * 
  * */
  disableServerSideUploadTimestamp: () => {
    TdReactNativeSdk.disableServerSideUploadTimestamp();
  },

  /**
  * Append UUID to each event record automatically. Each event has different UUID.
  * 
  * @see {@link disableAutoAppendRecordUUID}
  * 
  * @example
  * TreasureData.enableAutoAppendRecordUUID();
  * 
  * */
  enableAutoAppendRecordUUID: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendRecordUUID(columnName);
  },
  
  /**
  * Disable automatically 
  * 
  * @see {@link enableAutoAppendRecordUUID}
  * 
  * @example
  * TreasureData.disableAutoAppendRecordUUID();
  * 
  * */
  disableAutoAppendRecordUUID: () => {
    TdReactNativeSdk.disableAutoAppendRecordUUID();
  },

  /**
  * @summary Add Advertising Id to each event record automatically.
  * 
  * @description 
  * In Android, you must install Google Play Service Ads (`Gradle com.google.android.gms:play-services-ads`) as a dependency for this feature to work.  <br />
  * 
  * In iOS, you must link Ad Support framework in Link Binary With Libraries build phase for this feature to work.  <br />
  * 
  * User must also not turn on Limit Ad Tracking feature in their device, otherwise, Treasure Data will not attach Advertising Id to the record. Due to asynchronous nature of getting Advertising Id, after `enableAutoAppendAdvertisingIdentifier` method called, it may take some time for Advertising Id to be available to be added to the record. However, Treasure Data does cache the Advertising Id in order to add to the next event without having to wait for the fetch Advertising Id task to complete.  <br />
  * 
  * @param {string} [columnName] Optional column name to record advertising ID to.
  * 
  * @see {@link disableAutoAppendAdvertisingIdentifier}
  * 
  * @example
  * TreasureData.enableAutoAppendAdvertisingIdentifier();
  * // Or specify custom column
  * TreasureData.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
  * 
  * */
  enableAutoAppendAdvertisingIdentifier: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendAdvertisingIdentifier(columnName);
  },
  
  /**
  * Disable adding the Advertising ID to every event.
  * 
  * @see {@link enableAutoAppendAdvertisingIdentifier}
  * 
  * @example
  * TreasureData.disableAutoAppendAdvertisingIdentifier();
  * 
  * */
  disableAutoAppendAdvertisingIdentifier: () => {
    TdReactNativeSdk.disableAutoAppendAdvertisingIdentifier();
  },

  /**
  * Start tracking a session.
  * 
  * @param {string} table     Table in database to log data to.
  * @param {string} database  Database to log data to.
  * 
  * @see {@link endSession}
  * 
  * @example
  * TreasureData.startSession(sessionTable, sessionDatabase);
  * 
  * */
  startSession: (table, database = undefined) => {
    TdReactNativeSdk.startSession(table, database);
  },
  
  /**
  * End tracking current session.
  * 
  * @param {string} table     Table in database to log data to.
  * @param {string} database  Database to log data to.
  * 
  * @see {@link startSession}
  * 
  * @example
  * TreasureData.endSession(sessionTable, sessionDatabase);
  * 
  * */
  endSession: (table, database = undefined) => {
    TdReactNativeSdk.endSession(table, database);
  },
  
  /**
  * Get current Session ID.
  * 
  * @param {function} callback Callback function with session id in first parameter.
  * 
  * */
  getSessionId: (callback) => {
    TdReactNativeSdk.getSessionId(callback);
  },

  /**
  * Start tracking a global session
  * 
  * @see {@link endGlobalSession}
  * @see {@link setGlobalSessionTimeoutMilli}
  * @see {@link getGlobalSessionId}
  * 
  * */
  startGlobalSession: () => {
    TdReactNativeSdk.startGlobalSession();
  },
  
  /**
  * End tracking global session.
  * 
  * @see {@link startGlobalSession}
  * @see {@link setGlobalSessionTimeoutMilli}
  * @see {@link getGlobalSessionId}
  * 
  * */
  endGlobalSession: () => {
    TdReactNativeSdk.endGlobalSession();
  },
  
  /**
  * Set the Global Session timeout in milliseconds.
  * 
  * @param {integer} timeout Timeout in milliseconds
  * 
  * @see {@link startGlobalSession}
  * @see {@link endGlobalSession}
  * @see {@link getGlobalSessionId}
  * 
  * */
  setGlobalSessionTimeoutMilli: (to) => {
    TdReactNativeSdk.setGlobalSessionTimeoutMilli(to);
  },
  
  /**
  * Get the current global session ID.
  * 
  * @param {function} callback Global session ID is passed to the callback function.
  * 
  * @see {@link startGlobalSession}
  * @see {@link endGlobalSession}
  * @see {@link setGlobalSessionTimeoutMilli}
  * 
  * */
  getGlobalSessionId: (callback) => {
    TdReactNativeSdk.getGlobalSessionId(callback);
  },

  /**
  * Enabled by default. Use this function to re-enable if disabled. 
  * 
  * @see {@link disableCustomEvent}
  * 
  * @example
  * TreasureData.enableCustomEvent();
  * 
  * */
  enableCustomEvent: () => {
    TdReactNativeSdk.enableCustomEvent();
  },
  
  /**
  * Disable custom events.
  * 
  * @see {@link enableCustomEvent}
  * 
  * @example
  * TreasureData.disableCustomEvent();
  * 
  * */
  disableCustomEvent: () => {
    TdReactNativeSdk.disableCustomEvent();
  },
  
  /**
  * Whether or not the custom event tracking is enable.
  * 
  * @param {function} callback callback, passes in true/false accordingly. 
  * 
  * */
  isCustomEventEnabled: (callback) => {
    TdReactNativeSdk.isCustomEventEnabled(callback);
  },

  /**
  * @summary *Android Only* Enable tracking app lifecycle events automatically. Not enabled by default. 
  * 
  * @param {type}
  * 
  * @see {@link disableAppLifecycleEvent}
  * @see {@link isAppLifecycleEventEnabled}
  * 
  * @example
  * TreasureData.enableAppLifecycleEvent();
  * 
  * */
  enableAppLifecycleEvent: () => {
    TdReactNativeSdk.enableAppLifecycleEvent();
  },
  
  /**
  * *Android Only* Disable tracking app lifecycle events.
  * 
  * @param {type}
  * 
  * @see {@link enableAppLifecycleEvent}
  * @see {@link isAppLifecycleEventEnabled}
  * 
  * @example
  * TreasureData.disableAppLifecycleEvent();
  * 
  * */
  disableAppLifecycleEvent: () => {
    TdReactNativeSdk.disableAppLifecycleEvent();
  },
  
  /**
  * *Android Only* Check if tracking app lifecycle events are enabled.
  * 
  * @param {function} callback Callback function that is passed `true` or `false` as an input
  * 
  * @see {@link enableAppLifecycleEvent}
  * @see {@link disableAppLifecycleEvent}
  * 
  * @example
  * TreasureData.isAppLifecycleEventEnabled((enabled) => {
  *   console.log('Tracking app lifecycle event is enabled?', enabled);
  * })
  * 
  * */
  isAppLifecycleEventEnabled: (callback) => {
    TdReactNativeSdk.isAppLifecycleEventEnabled(callback);
  },

  /**
  * @summary Track in app purchase events automatically. Optional, not enabled by default.
  * 
  * @description You don't need to check for platform when calling this feature's APIs, they will simply be no-op. In app purchase event tracking is optional and not enable by default.
  * 
  * @see {@link disableInAppPurchaseEvent} 
  * @see {@link isInAppPurchaseEventEnabled}
  * 
  * @example
  * TreasureData.enableInAppPurchaseEvent();
  * 
  * */
  enableInAppPurchaseEvent: () => {
    TdReactNativeSdk.enableInAppPurchaseEvent();
  },
  
  /**
  * Disable in app purchase events.
  * 
  * @see {@link enableInAppPurchaseEvent}
  * @see {@link isInAppPurchaseEventEnabled}
  * 
  * @example
  * TreasureData.disableInAppPurchaseEvent();
  * 
  * */
  disableInAppPurchaseEvent: () => {
    TdReactNativeSdk.disableInAppPurchaseEvent();
  },
  
  /**
  * Check if tracking in app purchase events is enabled.
  * 
  * @param {function} callback 
  * 
  * @see {@link enableInAppPurchaseEvent}
  * @see {@link disableInAppPurchaseEvent} 
  * 
  * @example
  * TreasureData.isInAppPurchaseEventEnabled((enabled) => {
  *   console.log('Tracking in app purchase event is enabled?', enabled);
  * })
  * 
  * */
  isInAppPurchaseEventEnabled: (callback) => {
    TdReactNativeSdk.isInAppPurchaseEventEnabled(callback);
  },

  /**
  * @summary Profile API.
  * 
  * @description This feature is not enabled on accounts by default, please contact support for more information. Important! You must set cdpEndpoint property of TreasureData's sharedInstance. 
  * 
  * @param {string}   audienceTokens  Audience Tokens 
  * @param {string}   keys            Keys to access the Profile API 
  * @param {function} onSuccess       Callback function to call on success.
  * @param {function} onError         Callback function to call on failure.
  * 
  * @example
  * TreasureData.fetchUserSegments(audienceTokens, keys, (jsonResponse) => {
  *   console.log('Fetch User Segments', JSON.stringify(jsonResponse));
  * }, (errorCode, errorMessage) => {
  *   console.log('Failed to upload events', 'Error: ' + errorCode + ' ' + errorMessage);
  * });
  * 
  * */
  fetchUserSegments: (audienceTokens, keys, onSuccess, onError) => {
    TdReactNativeSdk.fetchUserSegments(audienceTokens, keys, onSuccess, onError);
  },

  /**
  * Enable retry uploading.
  * 
  * @see {@link disableRetryUploading}
  * 
  * @example
  * TreasureData.enableRetryUploading();
  * 
  * */
  enableRetryUploading: () => {
    TdReactNativeSdk.enableRetryUploading();
  },
  
  /**
  * Disable retry uploading.
  * 
  * @see {@link enableRetryUploading}
  * 
  * @example
  * TreasureData.disableRetryUploading();
  * 
  * */
  disableRetryUploading: () => {
    TdReactNativeSdk.disableRetryUploading();
  },

  /**
  * Event data will be compressed before uploading to server.
  * 
  * @see {@link disableEventCompression}
  * 
  * */
  enableEventCompression: () => {
    TdReactNativeSdk.enableEventCompression();
  },
  
  /**
  * Event data will be uploaded in full uncompressed format.
  * 
  * @see {@link enableEventCompression}
  * 
  * */
  disableEventCompression: () => {
    TdReactNativeSdk.disableEventCompression();
  },

  /**
  * Enable debug log.
  * 
  * @see {@link disableLogging}
  * 
  * @example
  * TreasureData.enableLogging();
  * 
  * */
  enableLogging: () => {
    TdReactNativeSdk.enableLogging();
  },
  
  /**
  * Disable debug log.
  * 
  * @see {@link enableLogging}
  * 
  * @example
  * TreasureData.disableLogging();
  * 
  * */
  disableLogging: () => {
    TdReactNativeSdk.disableLogging();
  },

  /**
  * Is this the first run, true/false.
  * 
  * @param {function} callback Callback function that true/false is passed to accordingly.
  * 
  * @see {@link clearFirstRun}
  * 
  * */
  isFirstRun: (callback) => {
    TdReactNativeSdk.isFirstRun(callback);
  },
  
  /**
  * Clear first run flag.
  * 
  * @see {@link isFirstRun}
  * 
  * */
  clearFirstRun: () => {
    TdReactNativeSdk.clearFirstRun();
  }
};
