import { NativeModules } from 'react-native';

const { TdReactNativeSdk } = NativeModules;

export default {
  setup: (configuration) => {
    TdReactNativeSdk(configuration);
  },

  addEvent: (event, table, database = undefined) => {
    TdReactNativeSdk.addEvent(event, table, database);
  },
  addEventWithCallback: (event, table, database = undefined, onSuccess, onError) => {
    TdReactNativeSdk.addEvent(event, table, database, onSuccess, onError);
  },

  uploadEvents: () => {
    TdReactNativeSdk.uploadEvents();
  },
  uploadEventsWithCallback: (onSuccess, onError) => {
    TdReactNativeSdk.uploadEventsWithCallback(onSuccess, onError);
  },

  getUUID: (callback) => {
    TdReactNativeSdk.getUUID(callback);
  },
  enableAutoAppendUniqId: () => {
    TdReactNativeSdk.enableAutoAppendUniqId();
  },
  disableAutoAppendUniqId: () => {
    TdReactNativeSdk.disableAutoAppendUniqId();
  },
  resetUniqId: () => {
    TdReactNativeSdk.resetUniqId();
  },

  enableAutoAppendModelInformation: () => {
    TdReactNativeSdk.enableAutoAppendModelInformation();
  },
  disableAutoAppendModelInformation: () => {
    TdReactNativeSdk.disableAutoAppendModelInformation();
  },

  enableAutoAppendAppInformation: () => {
    TdReactNativeSdk.enableAutoAppendAppInformation();
  },
  disableAutoAppendAppInformation: () => {
    TdReactNativeSdk.disableAutoAppendAppInformation();
  },

  enableAutoAppendLocaleInformation: () => {
    TdReactNativeSdk.enableAutoAppendLocaleInformation();
  },
  disableAutoAppendLocaleInformation: () => {
    TdReactNativeSdk.disableAutoAppendLocaleInformation();
  },

  enableServerSideUploadTimestamp: (columnName = undefined) => {
    TdReactNativeSdk.enableServerSideUploadTimestamp(columnName);
  },
  disableServerSideUploadTimestamp: () => {
    TdReactNativeSdk.disableServerSideUploadTimestamp();
  },

  enableAutoAppendRecordUUID: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendRecordUUID(columnName);
  },
  disableAutoAppendRecordUUID: () => {
    TdReactNativeSdk.disableAutoAppendRecordUUID();
  },

  enableAutoAppendAdvertisingIdentifier: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendAdvertisingIdentifier(columnName);
  },
  disableAutoAppendAdvertisingIdentifier: () => {
    TdReactNativeSdk.disableAutoAppendAdvertisingIdentifier();
  },

  startSession: (table, database = undefined) => {
    TdReactNativeSdk.startSession(table, database);
  },
  endSession: (table, database = undefined) => {
    TdReactNativeSdk.endSession(table, database);
  },
  getSessionId: (callback) => {
    TdReactNativeSdk.getSessionId(callback);
  },

  startGlobalSession: () => {
    TdReactNativeSdk.startGlobalSession();
  },
  endGlobalSession: () => {
    TdReactNativeSdk.endGlobalSession();
  },
  setGlobalSessionTimeoutMilli: (to) => {
    TdReactNativeSdk.setGlobalSessionTimeoutMilli(to);
  },
  getGlobalSessionId: (callback) => {
    TdReactNativeSdk.getGlobalSessionId(callback);
  },

  enableCustomEvent: () => {
    TdReactNativeSdk.enableCustomEvent();
  },
  disableCustomEvent: () => {
    TdReactNativeSdk.disableCustomEvent();
  },
  isCustomEventEnabled: (callback) => {
    TdReactNativeSdk.isCustomEventEnabled(callback);
  },

  enableAppLifecycleEvent: () => {
    TdReactNativeSdk.enableAppLifecycleEvent();
  },
  disableAppLifecycleEvent: () => {
    TdReactNativeSdk.disableAppLifecycleEvent();
  },
  isAppLifecycleEventEnabled: (callback) => {
    TdReactNativeSdk.isAppLifecycleEventEnabled(callback);
  },

  enableInAppPurchaseEvent: () => {
    TdReactNativeSdk.enableInAppPurchaseEvent();
  },
  disableInAppPurchaseEvent: () => {
    TdReactNativeSdk.disableInAppPurchaseEvent();
  },
  isInAppPurchaseEventEnabled: (callback) => {
    TdReactNativeSdk.isInAppPurchaseEventEnabled(callback);
  },

  fetchUserSegments: (audienceTokens, keys, onSuccess, onError) => {
    TdReactNativeSdk.fetchUserSegments(audienceTokens, keys, onSuccess, onError);
  },

  enableRetryUploading: () => {
    TdReactNativeSdk.enableRetryUploading();
  },
  disableRetryUploading: () => {
    TdReactNativeSdk.disableRetryUploading();
  },

  enableEventCompression: () => {
    TdReactNativeSdk.enableEventCompression();
  },
  disableEventCompression: () => {
    TdReactNativeSdk.disableEventCompression();
  },

  enableLogging: () => {
    TdReactNativeSdk.enableLogging();
  },
  disableLogging: () => {
    TdReactNativeSdk.disableLogging();
  },

  isFirstRun: (callback) => {
    TdReactNativeSdk.isFirstRun(callback);
  },
  clearFirstRun: () => {
    TdReactNativeSdk.clearFirstRun();
  }
};
