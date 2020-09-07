# td-react-native-sdk

td-react-native-sdk is React Native module that uses native iOS and Android SDK underneath to provide Treasure Data Mobile SDK features for React Native apps. You can see more detailed documentation in repositories for [Treasure Data iOS SDK](https://github.com/treasure-data/td-ios-sdk) and [Treasure Data Android SDK](https://github.com/treasure-data/td-android-sdk).

## Getting started

`$ npm install td-react-native-sdk --save`

### Mostly automatic installation
If you use react-native less than 0.60.0, you will have to link the module yourself:
`$ react-native link td-react-native-sdk`

## Usage

## Configuration
```javascript
import TreasureData from 'td-react-native-sdk';

TreasureData.setup({
  apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
  encryptionKey: 'xxxxx',
  ***REMOVED***: 'xxxxx', /// You should use write only api key
  defaultDatabase: 'default_database',
  defaultTable: 'default_table_name',
  cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
})
```

## Add an event to local buffer
You can add custom events to a specific database and table. If database param is not specified, `defaultDatabase` configuration in `TreasureData.setup({...})` will be used instead. 
Specify the database and table to which you want to import the events. The total length of database and table must be shorter than 129 characters.
```javascript
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureData.addEvent(customEvent, 'table', 'database');
// or
TreasureData.addEvent(customEvent, 'table');
```

Or if you need to know when `addEvent` is successful or has failed, use `addEventWithCallback` instead. You can pass `null` or `undefined` as database param and `defaultDatabase` configuration in `TreasureData.setup({...})` will be used instead.
```javascript
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureData.addEventWithCallback(customEvent, 'table', 'database', () => {
  console.log('Add Event Successfully');
}, (errorCode, errorMessage) => {
  console.log('Add Event Failed', errorCode, errorMessage);
});
```

## Upload buffered events to TreasureData
You can upload all buffered events to Treasure Data at anytime with `uploadEvent` function
```javascript
TreasureData.uploadEvents();
```

Or if you need to know when `uploadEvents` is successful or has failed, use `uploadEventsWithCallback` instead.
```javascript
TreasureData.uploadEventsWithCallback(() => {
  console.log('Upload events successfully')
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', errorCode, errorMessage);
});
```

## Custom Events
Add and upload custom events are enabled by default. However you can disable and enable this feature at any time using:
```javascript
TreasureData.enableCustomEvent();
```
To disable custom events
```javascript
TreasureData.disableCustomEvent();
```

## (Android only) Track app lifecycle events automatically
This feature is only available in Android. App lifecycle event tracking is optional and not enable by default. You can track app lifecycle events automatically using:
```javascript
TreasureData.enableAppLifecycleEvent();
```
To disable tracking app lifecycle events:
```javascript
TreasureData.disableAppLifecycleEvent();
```
To check if tracking app lifecycle events is enabled:
```javascript
TreasureData.isAppLifecycleEventEnabled((enabled) => {
  console.log('Tracking app lifecycle event is enabled?', enabled);
})
```

## Track in app purchase events automatically
You don't need to check for platform when calling this feature's APIs, they will simply be no-op.
In app purchase event tracking is optional and not enable by default. To track in app purchase events automatically, you only need to add a line of code:
```javascript
TreasureData.enableInAppPurchaseEvent();
```
To disable tracking in app purchase events:
```javascript
TreasureData.disableInAppPurchaseEvent();
```
To check if tracking in app purchase events is enabled:
```javascript
TreasureData.isInAppPurchaseEventEnabled((enabled) => {
  console.log('Tracking in app purchase event is enabled?', enabled);
})
```

## Adding UUID of the device to each event automatically
UUID of the device will be added to each event automatically if you call `TreasureData.enableAutoAppendUniqId()`. This value won't change until the application is uninstalled.
```javascript
TreasureData.enableAutoAppendUniqId();
```
To disable adding UUID of device to each event automatically:
```javascript
TreasureData.disableAutoAppendUniqId();
```
To reset UUID of device
```javascript
TreasureData.resetUniqId();
```

## Adding an UUID to each event record automatically
UUID will be added to each event record automatically if you call `enableAutoAppendRecordUUID`. Each event has different UUID.
```javascript
TreasureData.enableAutoAppendRecordUUID();
```
To disable adding record UUID to each event automatically:
```javascript
TreasureData.disableAutoAppendRecordUUID();
```

## Adding Advertising Id to each event record automatically
Advertising Id will be added to each event record automatically if you call `enableAutoAppendAdvertisingIdentifier`.
In Android, you must install Google Play Service Ads (Gradle `com.google.android.gms:play-services-ads`) as a dependency for this feature to work.
In iOS, you must link Ad Support framework in Link Binary With Libraries build phase for this feature to work.
User must also not turn on Limit Ad Tracking feature in their device, otherwise, Treasure Data will not attach Advertising Id to the record. Due to asynchronous nature of getting Advertising Id, after `enableAutoAppendAdvertisingIdentifier` method called, it may take some time for Advertising Id to be available to be added to the record. However, Treasure Data does cache the Advertising Id in order to add to the next event without having to wait for the fetch Advertising Id task to complete.
```javascript
TreasureData.enableAutoAppendAdvertisingIdentifier();
// Or specify custom column
TreasureData.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
```
To disable adding Advertising Id:
```javascript
TreasureData.disableAutoAppendAdvertisingIdentifier();
```

## Adding device model information to each event automatically
To add device model information to each event automatically
```javascript
TreasureData.enableAutoAppendModelInformation();
```
To disable:
```javascript
TreasureData.disableAutoAppendModelInformation();
```

## Adding application package version information to each event automatically
To add application version information to each event automatically
```javascript
TreasureData.enableAutoAppendAppInformation();
```
To disable:
```javascript
TreasureData.disableAutoAppendAppInformation();
```

## Adding locale configuration information to each event automatically
To add locale configuration information to each event automatically
```javascript
TreasureData.enableAutoAppendLocaleInformation();
```
To disable:
```javascript
TreasureData.disableAutoAppendLocaleInformation();
```

## Use server side upload timestamp
To use server side upload timestamp not only client device time that is recorded when your application calls addEvent
```javascript
TreasureData.enableServerSideUploadTimestamp();
// Or specify custom column
TreasureData.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
```
To disable:
```javascript
TreasureData.disableServerSideUploadTimestamp();
```

## Start/End session
Call `startSession` to start tracking a session
```javascript
TreasureData.startSession(sessionTable, sessionDatabase);
```
Call `endSession` to end tracking current session
```javascript
TreasureData.endSession(sessionTable, sessionDatabase);
```

## Profile API
This feature is not enabled on accounts by default, please contact support for more information. Important! You must set cdpEndpoint property of TreasureData's sharedInstance. Usage example:
```javascript
TreasureData.fetchUserSegments(audienceTokens, keys, (jsonResponse) => {
  console.log('Fetch User Segments', JSON.stringify(jsonResponse));
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', 'Error: ' + errorCode + ' ' + errorMessage);
});
```

## Enable/Disable debug log
To enable debug log
```javascript
TreasureData.enableLogging();
```
To disable:
```javascript
TreasureData.disableLogging();
```

## Enable/Disable retry uploading
To enable retry uploading
```javascript
TreasureData.enableRetryUploading();
```
To disable:
```javascript
TreasureData.disableRetryUploading();
```

## Device and OS support
See native SDKs repository for more information about supported devices and OS
