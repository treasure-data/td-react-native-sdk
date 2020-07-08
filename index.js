import { NativeModules } from 'react-native';

const { TdReactNativeSdk } = NativeModules;

export default {
  ...TdReactNativeSdk,
  addEvent: (event, table, database = undefined) => {
    TdReactNativeSdk.addEvent(event, table, database)
  },
  enableServerSideUploadTimestamp: (columnName = undefined) => {
    TdReactNativeSdk.enableServerSideUploadTimestamp(columnName);
  },
  enableAutoAppendRecordUUID: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendRecordUUID(columnName);
  },
  enableAutoAppendAdvertisingIdentifier: (columnName = undefined) => {
    TdReactNativeSdk.enableAutoAppendAdvertisingIdentifier(columnName);
  },
  startSession: (table, database = undefined) => {
    TdReactNativeSdk.startSession(table, database);
  }
};
