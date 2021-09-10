<a name="module_TreasureData"></a>

## TreasureData
`TreasureData` <br /><br />
Here is the API Reference for the Treasure Data React Native module.
To get started, navigate to the [Quickstart](/docs/react-native-sdk/quickstart/).
:::warning
**This SDK is still in beta and contains experimental features. It may not be ready for use in a production application.**
:::


* * *

<a name="module_TreasureData.setup"></a>

### setup
`TreasureData.setup(configuration)` <br /><br />
Initialize the Treasure Data object.


| Param | Type | Description |
| --- | --- | --- |
| configuration | <code>json</code> | The configuration options |
| configuration.apiEndpoint | <code>string</code> | Valid API endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints) |
| configuration.apiKey | <code>string</code> | Write only TD Api Key |
| configuration.defaultDatabase | <code>string</code> | Database name in TD Account |
| configuration.defaultTable | <code>string</code> | Table name in TD database |
| [configuration.cdpEndpoint] | <code>string</code> | Valid CDP endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints) |
| [configuration.encryptionKey] | <code>string</code> | Encryption key used to locally encrypt events when saved to device storage. This key will be used to generate a aes128 encrytpion key. Any string will work. |

**Example**  
```js
import TreasureData from 'td-react-native-sdk';

TreasureData.setup({
  apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
  encryptionKey: 'xxxxx',
  apiKey: 'xxxxx', /// You should use write only api key
  defaultDatabase: 'default_database',
  defaultTable: 'default_table_name',
  cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
})
```

* * *

<a name="module_TreasureData.addEvent"></a>

### addEvent
`TreasureData.addEvent(event, table, database)` <br /><br />
Add a custom event to a specified database and table. 
The event will be buffered untill `uploadEvents()` is called.
The total combined length of the database and table names must be <=128 characters.
If the database parameters are not specified, `defaultDatabase` from the `setup()` will be used.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>json</code> | JSON data to be uploded |
| table | <code>string</code> | Table name |
| database | <code>string</code> | Database name |

**Example**  
```js
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureData.addEvent(customEvent, 'table', 'database');
// or
TreasureData.addEvent(customEvent, 'table');
```

* * *

<a name="module_TreasureData.addEventWithCallback"></a>

### addEventWithCallback
`TreasureData.addEventWithCallback(event, table, database, callback)` <br /><br />
Add an event to a specified database and table. Use callback to confirm success / failure.

You can pass 'null' or 'undefined' as the database parameter and 'defaultDatabase' configuration in 'TreasureData.setup({...})' is used instead.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>json</code> | JSON data to be uploaded |
| table | <code>string</code> | Table name |
| database | <code>string</code> | Database name |
| callback | <code>function</code> | Callback function |

**Example**  
```js
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureData.addEventWithCallback(customEvent, 'table', 'database', () => {
  console.log('Add Event Successfully');
}, (errorCode, errorMessage) => {
  console.log('Add Event Failed', errorCode, errorMessage);
});
```

* * *

<a name="module_TreasureData.uploadEvents"></a>

### uploadEvents
`TreasureData.uploadEvents()` <br /><br />
Upload all buffered events to Treasure Data.

**Example**  
```js
TreasureData.uploadEvents();
```

* * *

<a name="module_TreasureData.uploadEventsWithCallback"></a>

### uploadEventsWithCallback
`TreasureData.uploadEventsWithCallback(onSuccess, onFailure)` <br /><br />
Upload all buffered events to Treasure Data.
Use callback function to verify success / failure.


| Param | Type | Description |
| --- | --- | --- |
| onSuccess | <code>function</code> | Callback Function called post event in case of success. |
| onFailure | <code>function</code> | Callback Function called post event in case of failure. |

**Example**  
```js
TreasureData.uploadEventsWithCallback(() => {
  console.log('Upload events successfully')
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', errorCode, errorMessage);
});
```

* * *

<a name="module_TreasureData.getUUID"></a>

### getUUID
`TreasureData.getUUID(callback)` <br /><br />
Get the UUID value assigned to every event as td_uuid by the enableAutoAppendUniqID function.
This function assumes you have first called enableAutoApprendUniqID  , which causees all events to have a td_uuid field added to them. getUUID()  returns the value of this td_uuid key for the user to use as they see fit. Note that all events will have the same UUID appended to them.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | passes the UUID. |


* * *

<a name="module_TreasureData.enableAutoAppendUniqId"></a>

### enableAutoAppendUniqId
`TreasureData.enableAutoAppendUniqId()` <br /><br />
UUID of the device will be added to each event automatically if you call `TreasureData.enableAutoAppendUniqId()`. 
This value won't change until the application is uninstalled.

**Example**  
```js
TreasureData.enableAutoAppendUniqId();
```

* * *

<a name="module_TreasureData.disableAutoAppendUniqId"></a>

### disableAutoAppendUniqId
`TreasureData.disableAutoAppendUniqId()` <br /><br />
Disable adding the UUID of a device to each event automatically.

**Example**  
```js
TreasureData.disableAutoAppendUniqId();
```

* * *

<a name="module_TreasureData.resetUniqId"></a>

### resetUniqId
`TreasureData.resetUniqId()` <br /><br />
Reset the UUID of the device.

**Example**  
```js
TreasureData.resetUniqId();
```

* * *

<a name="module_TreasureData.enableAutoAppendModelInformation"></a>

### enableAutoAppendModelInformation
`TreasureData.enableAutoAppendModelInformation()` <br /><br />
Add device model information to each event automatically.

**Example**  
```js
TreasureData.enableAutoAppendModelInformation();
```

* * *

<a name="module_TreasureData.disableAutoAppendModelInformation"></a>

### disableAutoAppendModelInformation
`TreasureData.disableAutoAppendModelInformation()` <br /><br />
Disable adding device model information to each event automatically.

**Example**  
```js
TreasureData.disableAutoAppendModelInformation();
```

* * *

<a name="module_TreasureData.enableAutoAppendAppInformation"></a>

### enableAutoAppendAppInformation
`TreasureData.enableAutoAppendAppInformation()` <br /><br />
Add application version information to each event automatically.

**Example**  
```js
TreasureData.enableAutoAppendAppInformation();
```

* * *

<a name="module_TreasureData.disableAutoAppendAppInformation"></a>

### disableAutoAppendAppInformation
`TreasureData.disableAutoAppendAppInformation()` <br /><br />
Disable adding application version information to each event automatically.

**Example**  
```js
TreasureData.disableAutoAppendAppInformation();
```

* * *

<a name="module_TreasureData.enableAutoAppendLocaleInformation"></a>

### enableAutoAppendLocaleInformation
`TreasureData.enableAutoAppendLocaleInformation()` <br /><br />
Add locale configuration information to each event automatically.

**Example**  
```js
TreasureData.enableAutoAppendLocaleInformation();
```

* * *

<a name="module_TreasureData.disableAutoAppendLocaleInformation"></a>

### disableAutoAppendLocaleInformation
`TreasureData.disableAutoAppendLocaleInformation()` <br /><br />
Disable adding locale configuration information to each event automatically.

**Example**  
```js
TreasureData.disableAutoAppendLocaleInformation();
```

* * *

<a name="module_TreasureData.enableServerSideUploadTimestamp"></a>

### enableServerSideUploadTimestamp
`TreasureData.enableServerSideUploadTimestamp([columnName])` <br /><br />
Use the server side upload timestamp in addition to the client device time that is recorded when your application calls addEvent.


| Param | Type | Description |
| --- | --- | --- |
| [columnName] | <code>string</code> | Optional column name to store information to. |

**Example**  
```js
TreasureData.enableServerSideUploadTimestamp();
// Or specify custom column
TreasureData.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
```

* * *

<a name="module_TreasureData.disableServerSideUploadTimestamp"></a>

### disableServerSideUploadTimestamp
`TreasureData.disableServerSideUploadTimestamp()` <br /><br />
Disable server side upload timestamp.

**Example**  
```js
TreasureData.disableServerSideUploadTimestamp();
```

* * *

<a name="module_TreasureData.enableAutoAppendRecordUUID"></a>

### enableAutoAppendRecordUUID
`TreasureData.enableAutoAppendRecordUUID()` <br /><br />
Append UUID to each event record automatically. Each event has a different UUID.

**Example**  
```js
TreasureData.enableAutoAppendRecordUUID();
```

* * *

<a name="module_TreasureData.disableAutoAppendRecordUUID"></a>

### disableAutoAppendRecordUUID
`TreasureData.disableAutoAppendRecordUUID()` <br /><br />
Disable appending UUID to each event record automatically.

**Example**  
```js
TreasureData.disableAutoAppendRecordUUID();
```

* * *

<a name="module_TreasureData.enableAutoAppendAdvertisingIdentifier"></a>

### enableAutoAppendAdvertisingIdentifier
`TreasureData.enableAutoAppendAdvertisingIdentifier([columnName])` <br /><br />
Add Advertising Id to each event record automatically.

In Android, you must install Google Play Service Ads (`Gradle com.google.android.gms:play-services-ads`) as a dependency for this feature to work.  <br />

In iOS, you must link the Ad Support framework in the Link Binary With Libraries build phase for this feature to work.  <br />

Users must also not turn on the Limit Ad Tracking feature in their device or Treasure Data will not attach the Advertising Id to the record. Due to the asynchronous nature of getting the Advertising Id, after the enableAutoAppendAdvertisingIdentifier method is called, it may take some time for the Advertising Id to be added to the record. However, Treasure Data does cache the Advertising Id in order to add it to the next event without having to wait for the fetch Advertising Id task to complete.  <br />


| Param | Type | Description |
| --- | --- | --- |
| [columnName] | <code>string</code> | Optional column name to record advertising ID to. |

**Example**  
```js
TreasureData.enableAutoAppendAdvertisingIdentifier();
// Or specify custom column
TreasureData.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
```

* * *

<a name="module_TreasureData.disableAutoAppendAdvertisingIdentifier"></a>

### disableAutoAppendAdvertisingIdentifier
`TreasureData.disableAutoAppendAdvertisingIdentifier()` <br /><br />
Disable adding the Advertising ID to every event.

**Example**  
```js
TreasureData.disableAutoAppendAdvertisingIdentifier();
```

* * *

<a name="module_TreasureData.startSession"></a>

### startSession
`TreasureData.startSession(table, database)` <br /><br />
Start tracking a session.


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table in database to log data to. |
| database | <code>string</code> | Database to log data to. |

**Example**  
```js
TreasureData.startSession(sessionTable, sessionDatabase);
```

* * *

<a name="module_TreasureData.endSession"></a>

### endSession
`TreasureData.endSession(table, database)` <br /><br />
End tracking the current session.


| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table in database to log data to. |
| database | <code>string</code> | Database to log data to. |

**Example**  
```js
TreasureData.endSession(sessionTable, sessionDatabase);
```

* * *

<a name="module_TreasureData.getSessionId"></a>

### getSessionId
`TreasureData.getSessionId(callback)` <br /><br />
Get current Session ID.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function with session id in first parameter. |


* * *

<a name="module_TreasureData.startGlobalSession"></a>

### startGlobalSession
`TreasureData.startGlobalSession()` <br /><br />
Start tracking a global session.

**Example**  
```js
TreasureData.startGlobalSession()
```

* * *

<a name="module_TreasureData.endGlobalSession"></a>

### endGlobalSession
`TreasureData.endGlobalSession()` <br /><br />
End tracking a global session.

**Example**  
```js
TreasureData.endGlobalSession()
```

* * *

<a name="module_TreasureData.setGlobalSessionTimeoutMilli"></a>

### setGlobalSessionTimeoutMilli
`TreasureData.setGlobalSessionTimeoutMilli(timeout)` <br /><br />
Set the global session timeout in milliseconds.


| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>integer</code> | Timeout in milliseconds |


* * *

<a name="module_TreasureData.getGlobalSessionId"></a>

### getGlobalSessionId
`TreasureData.getGlobalSessionId(callback)` <br /><br />
Get the current global session ID.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Global session ID is passed to the callback function. |


* * *

<a name="module_TreasureData.enableCustomEvent"></a>

### enableCustomEvent
`TreasureData.enableCustomEvent()` <br /><br />
Enabled by default. Use this function to re-enable if disabled.

**Example**  
```js
TreasureData.enableCustomEvent();
```

* * *

<a name="module_TreasureData.disableCustomEvent"></a>

### disableCustomEvent
`TreasureData.disableCustomEvent()` <br /><br />
Disable custom events.

**Example**  
```js
TreasureData.disableCustomEvent();
```

* * *

<a name="module_TreasureData.isCustomEventEnabled"></a>

### isCustomEventEnabled
`TreasureData.isCustomEventEnabled(callback)` <br /><br />
Whether or not the custom event tracking is enabled.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback, passes in true/false accordingly. |


* * *

<a name="module_TreasureData.enableAppLifecycleEvent"></a>

### enableAppLifecycleEvent
`TreasureData.enableAppLifecycleEvent()` <br /><br />
*Android Only* Enable tracking app lifecycle events automatically. Not enabled by default.

**Example**  
```js
TreasureData.enableAppLifecycleEvent();
```

* * *

<a name="module_TreasureData.disableAppLifecycleEvent"></a>

### disableAppLifecycleEvent
`TreasureData.disableAppLifecycleEvent()` <br /><br />
*Android Only* Disable tracking app lifecycle events.

**Example**  
```js
TreasureData.disableAppLifecycleEvent();
```

* * *

<a name="module_TreasureData.isAppLifecycleEventEnabled"></a>

### isAppLifecycleEventEnabled
`TreasureData.isAppLifecycleEventEnabled(callback)` <br /><br />
*Android Only* Check if tracking app lifecycle events is enabled.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function that is passed `true` or `false` as an input |

**Example**  
```js
TreasureData.isAppLifecycleEventEnabled((enabled) => {
  console.log('Tracking app lifecycle event is enabled?', enabled);
})
```

* * *

<a name="module_TreasureData.enableInAppPurchaseEvent"></a>

### enableInAppPurchaseEvent
`TreasureData.enableInAppPurchaseEvent()` <br /><br />
Track in-app purchase events automatically. Optional, not enabled by default.
You don't need to check for platform when calling this feature's APIs as they will simply be no-op. In-app purchase event tracking is optional and not enabled by default.

**Example**  
```js
TreasureData.enableInAppPurchaseEvent();
```

* * *

<a name="module_TreasureData.disableInAppPurchaseEvent"></a>

### disableInAppPurchaseEvent
`TreasureData.disableInAppPurchaseEvent()` <br /><br />
Disable in-app purchase events.

**Example**  
```js
TreasureData.disableInAppPurchaseEvent();
```

* * *

<a name="module_TreasureData.isInAppPurchaseEventEnabled"></a>

### isInAppPurchaseEventEnabled
`TreasureData.isInAppPurchaseEventEnabled(callback)` <br /><br />
Check if tracking in-app purchase events is enabled.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function |

**Example**  
```js
TreasureData.isInAppPurchaseEventEnabled((enabled) => {
  console.log('Tracking in-app purchase event is enabled?', enabled);
})
```

* * *

<a name="module_TreasureData.fetchUserSegments"></a>

### fetchUserSegments
`TreasureData.fetchUserSegments(audienceTokens, keys, onSuccess, onError)` <br /><br />
Profiles API.
This feature is not enabled on accounts by default. Contact support for more information. Important! You must set cdpEndpoint property of TreasureData's sharedInstance.


| Param | Type | Description |
| --- | --- | --- |
| audienceTokens | <code>string</code> | Audience Tokens |
| keys | <code>string</code> | Keys to access the Profile API |
| onSuccess | <code>function</code> | Callback function to call on success. |
| onError | <code>function</code> | Callback function to call on failure. |

**Example**  
```js
TreasureData.fetchUserSegments(audienceTokens, keys, (jsonResponse) => {
  console.log('Fetch User Segments', JSON.stringify(jsonResponse));
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', 'Error: ' + errorCode + ' ' + errorMessage);
});
```

* * *

<a name="module_TreasureData.enableRetryUploading"></a>

### enableRetryUploading
`TreasureData.enableRetryUploading()` <br /><br />
Enable retry uploading.

**Example**  
```js
TreasureData.enableRetryUploading();
```

* * *

<a name="module_TreasureData.disableRetryUploading"></a>

### disableRetryUploading
`TreasureData.disableRetryUploading()` <br /><br />
Disable retry uploading.

**Example**  
```js
TreasureData.disableRetryUploading();
```

* * *

<a name="module_TreasureData.enableEventCompression"></a>

### enableEventCompression
`TreasureData.enableEventCompression()` <br /><br />
Event data will be compressed before uploading to server.

**Example**  
```js
TreasureData.enableEventCompression()
```

* * *

<a name="module_TreasureData.disableEventCompression"></a>

### disableEventCompression
`TreasureData.disableEventCompression()` <br /><br />
Event data will be uploaded in the full uncompressed format.

**Example**  
```js
TreasureData.disableEventCompression()
```

* * *

<a name="module_TreasureData.enableLogging"></a>

### enableLogging
`TreasureData.enableLogging()` <br /><br />
Enable the debug log.

**Example**  
```js
TreasureData.enableLogging();
```

* * *

<a name="module_TreasureData.disableLogging"></a>

### disableLogging
`TreasureData.disableLogging()` <br /><br />
Disable the debug log.

**Example**  
```js
TreasureData.disableLogging();
```

* * *

<a name="module_TreasureData.isFirstRun"></a>

### isFirstRun
`TreasureData.isFirstRun(callback)` <br /><br />
Is this the first run, true/false.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function that true/false is passed to accordingly. |


* * *

<a name="module_TreasureData.clearFirstRun"></a>

### clearFirstRun
`TreasureData.clearFirstRun()` <br /><br />
Clear first run flag.

**Example**  
```js
TreasureData.clearFirstRun()
```

* * *

