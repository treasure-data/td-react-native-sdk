/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TextInput
} from 'react-native';
import TreasureData from 'td-react-native-sdk';
import DefaultConfiguration from './credentials/DefaultConfiguration';
import Row from './Row';
import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'com.treasuredata.iaptest.consumable1'
  ],
  android: [
    'gas'
  ]
});

class App extends React.Component {
  constructor(props) {
    super(props);
    config = DefaultConfiguration ? DefaultConfiguration : {};
    TreasureData.setup(config);

    this.state = {
      sessionTable: 'session_table',
      sessionDatabase: undefined,
      audienceTokens: config.audienceTokens,
      userSegmentKeys: config.userSegmentKeys,
      defaultValueKey: undefined,
      defaultValueValue: undefined,
      eventTable: config.eventTable,
      eventDatabase: config.eventDatabase
    }

    console.log("Start testing");
  }

  alert = (title, message) => {
    Alert.alert(title, message);
  }

  // Add Event

  onEventTableChange = (text) => {
    this.setState({eventTable: text});
  }

  onEventDatabaseChange = (text) => {
    this.setState({eventDatabase: text});
  }

  addEvent = () => {
    const testEvent = {origin: 'react native app', data: new Date().getSeconds()}
    console.log("Adding event");
    TreasureData.addEvent(testEvent, this.state.eventTable, this.state.eventDatabase);
  }

  addEventWithCallback = () => {
    const testEvent = {origin: 'react native app', data: new Date().getSeconds()}
    console.log("Adding event with callback");
    TreasureData.addEventWithCallback(testEvent, this.state.eventTable, this.state.eventDatabase, () => {
      this.alert("Add event successfully")
    }, (errorCode, errorMessage) => {
      this.alert('Failed to add events', 'Error: ' + errorCode + ' ' + errorMessage);
    });
  }

  // Send Event

  uploadEvents = () => {
    TreasureData.uploadEvents();
  }

  uploadEventsWithCallback = () => {
    TreasureData.uploadEventsWithCallback(() => {
      this.alert("Upload events successfully")
    }, (errorCode, errorMessage) => {
      this.alert('Failed to upload events', 'Error: ' + errorCode + ' ' + errorMessage);
    });
  };

  // UUID

  getUUID = () => {
    TreasureData.getUUID((uuid) => this.alert("Get UUID", uuid));
  }

  enableAutoAppendUniqId = () => {
    TreasureData.enableAutoAppendUniqId();
  }

  disableAutoAppendUniqId = () => {
    TreasureData.disableAutoAppendUniqId();
  }

  resetUniqId = () => {
    TreasureData.resetUniqId();
  }

  // Auto Append Model Information

  enableAutoAppendModelInformation = () => {
    TreasureData.enableAutoAppendModelInformation();
  }

  disableAutoAppendModelInformation = () => {
    TreasureData.disableAutoAppendModelInformation();
  }

  // Auto Append App Information

  enableAutoAppendAppInformation = () => {
    TreasureData.enableAutoAppendAppInformation();
  }

  disableAutoAppendAppInformation = () => {
    TreasureData.disableAutoAppendAppInformation();
  }

  // Auto Append Locale Information

  enableAutoAppendLocaleInformation = () => {
    TreasureData.enableAutoAppendLocaleInformation();
  }

  disableAutoAppendLocaleInformation = () => {
    TreasureData.disableAutoAppendLocaleInformation();
  }

  // Server Side Upload Timestamp
  onServerSideUploadTimestampColumnNameChange = (text) => {
    this.setState({serverSideUploadTimestampColumnName: text});
  }

  enableServerSideUploadTimestamp = () => {
    TreasureData.enableServerSideUploadTimestamp(this.state.serverSideUploadTimestampColumnName);
  }

  disableServerSideUploadTimestamp = () => {
    TreasureData.disableServerSideUploadTimestamp();
  }

  // Auto Append Record UUID
  onRecordUUIDColumnNameChange = (text) => {
    this.setState({recordUUIDColumnName: text});
  }

  enableAutoAppendRecordUUID = () => {
    TreasureData.enableAutoAppendRecordUUID(this.state.recordUUIDColumnName);
  }

  disableAutoAppendRecordUUID = () => {
    TreasureData.disableAutoAppendRecordUUID();
  }

  // Auto Append Advertising Identifier

  onAAIDColumnNameChange = (text) => {
    this.setState({aaidColumnName: text});
  }

  enableAutoAppendAdvertisingIdentifier = () => {
    TreasureData.enableAutoAppendAdvertisingIdentifier(this.state.aaidColumnName);
  }

  disableAutoAppendAdvertisingIdentifier = () => {
    TreasureData.disableAutoAppendAdvertisingIdentifier();
  }

  // Session

  startSession = () => {
    const {sessionTable, sessionDatabase} = this.state;
    if (sessionDatabase) {
      TreasureData.startSession(sessionTable, sessionDatabase);
    } else {
      TreasureData.startSession(sessionTable, undefined);
    }
  }

  endSession = () => {
    const {sessionTable, sessionDatabase} = this.state;
    if (sessionDatabase) {
      TreasureData.endSession(sessionTable, sessionDatabase);
    } else {
      TreasureData.endSession(sessionTable, undefined);
    }
  }

  getSessionId = () => {
    TreasureData.getSessionId(sessionId => this.alert('SessionId', sessionId));
  }

  startGlobalSession = () => {
    TreasureData.startGlobalSession();
  }

  endGlobalSession = () => {
    TreasureData.endGlobalSession();
  }

  setGlobalSessionTimeoutMilli = () => {
    TreasureData.setGlobalSessionTimeoutMilli(20000);
  }

  getGlobalSessionId = () => {
    TreasureData.getGlobalSessionId(sessionId => this.alert('Global SessionId', sessionId));
  }

  resetGlobalSessionId = () => {
    TreasureData.resetGlobalSessionId();
  }

  onSessionTableTextChange = (text) => {
    this.setState({sessionTable: text});
  }

  onSessionDatabaseTextChange = (text) => {
    this.setState({sessionDatabase: text});
  }

  // Custom Event

  enableCustomEvent = () => {
    TreasureData.enableCustomEvent();
  }

  disableCustomEvent = () => {
    TreasureData.disableCustomEvent();
  }

  isCustomEventEnabled = () => {
    TreasureData.isCustomEventEnabled(enabled => this.alert('Custom event', 'is ' + (enabled ? "enabled" : "not enabled")));
  }

  // App Lifecycle Event

  enableAppLifecycleEvent = () => {
    TreasureData.enableAppLifecycleEvent();
  }

  disableAppLifecycleEvent = () => {
    TreasureData.disableAppLifecycleEvent();
  }

  isAppLifecycleEventEnabled = () => {
    TreasureData.isAppLifecycleEventEnabled(enabled => this.alert('App Lifecycle Event', 'is ' + (enabled ? "enabled" : "not enabled")));
  }

  // In App Purchase Event

  enableInAppPurchaseEvent = () => {
    TreasureData.enableInAppPurchaseEvent();
  }

  disableInAppPurchaseEvent = () => {
    TreasureData.disableInAppPurchaseEvent();
  }

  isInAppPurchaseEventEnabled = () => {
    TreasureData.isInAppPurchaseEventEnabled(enabled => this.alert('IAP Event', 'is ' + (enabled ? "enabled" : "not enabled")));
  }

  purchaseInAppPurchase = async () => {
    const productId = itemSkus[0];
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('products', products);
      const productPurchase = await RNIap.requestPurchase(productId, false)
      this.alert('Purchased successfully', JSON.stringify(productPurchase));
      await RNIap.consumeAllItemsAndroid();
    } catch (error) {
      this.alert('Purchase Error', 'Error: ' + error.code + ' ' + error.message);
    }
  }

  // Profile API

  fetchUserSegments = () => {
    const audienceTokens = this.state.audienceTokens;
    const keys = this.state.userSegmentKeys;
    TreasureData.fetchUserSegments(audienceTokens, keys, (jsonResponse) => {
      this.alert('Fetch User Segments', JSON.stringify(jsonResponse));
    }, (errorCode, errorMessage) => {
      this.alert('Failed to upload events', 'Error: ' + errorCode + ' ' + errorMessage);
    });
  }

  onAudienceTokensChange = (text) => {
    const audienceTokens = JSON.parse(text);
    this.setState({audienceTokens});
  }

  onUserSegmentKeysChange = (text) => {
    const userSegmentKeys = JSON.parse(text);
    this.setState({userSegmentKeys});
  }

  // Default Values

  setDefaultValue = () => {
    const {eventTable, eventDatabase, defaultValueKey, defaultValueValue} = this.state;
    if (!defaultValueKey || !defaultValueValue) { this.alert('Key and Value must be set'); return }

    TreasureData.setDefaultValue(defaultValueValue, defaultValueKey, eventDatabase, eventTable);
  }

  getDefaultValue = () => {
    const {eventTable, eventDatabase, defaultValueKey} = this.state;
    if (!defaultValueKey) { this.alert('Key must be set'); return }

    TreasureData.defaultValue(defaultValueKey, eventDatabase, eventTable, (defaultValue) => {
      this.alert('Default Value', defaultValue);
    });
  }

  removeDefaultValue = () => {
    const {eventTable, eventDatabase, defaultValueKey} = this.state;
    if (!defaultValueKey) { this.alert('Key must be set'); return }
    
    TreasureData.removeDefaultValue(defaultValueKey, eventDatabase, eventTable);
  }

  onDefaultValueKeyChange = (text) => {
    this.setState({defaultValueKey: text});
  }

  onDefaultValueValueChange = (text) => {
    this.setState({defaultValueValue: text});
  }

  // Retry Uploading

  enableRetryUploading = () => {
    TreasureData.enableRetryUploading();
  }

  disableRetryUploading = () => {
    TreasureData.disableRetryUploading();
  }

  // Event Compression

  enableEventCompression = () => {
    TreasureData.enableEventCompression();
  }

  disableEventCompression = () => {
    TreasureData.disableEventCompression();
  }

  // Loging

  enableLogging = () => {
    TreasureData.enableLogging();
  }

  disableLogging = () => {
    TreasureData.disableLogging();
  }

  // First run

  isFirstRun = () => {
    TreasureData.isFirstRun((firstRun) => this.alert("Is First Run", firstRun ? "Yes" : "No"));
  }

  clearFirstRun = () => {
    TreasureData.clearFirstRun();
  }

  render() {
    const {sessionTable, sessionDatabase, audienceTokens, userSegmentKeys, defaultValueKey, defaultValueValue} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
           >
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>Configurations</Text>
              <View style={styles.sectionContainer}>
              </View>
              <Text style={styles.sectionTitle}>Actions</Text>
              <View style={styles.sectionContainer}>
                <Row title="Event Table">
                  <TextInput style={styles.textInput} onChangeText={this.onEventTableChange} value={this.state.eventTable} />
                </Row>
                <Row title="Event Database">
                  <TextInput style={styles.textInput} onChangeText={this.onEventDatabaseChange} value={this.state.eventDatabase} />
                </Row>
                <Row title="Add Event" onPress={this.addEvent} />
                <Row title="Add Event With Callback" onPress={this.addEventWithCallback} />
                <Row title="Upload Events" onPress={this.uploadEvents} />
                <Row title="Upload Events With Callback" onPress={this.uploadEventsWithCallback} />
              </View>
              <Text style={styles.sectionTitle}>UUID</Text>
              <View style={styles.sectionContainer}>
                <Row title="Get" onPress={this.getUUID} />
                <Row title="Enable" onPress={this.enableAutoAppendUniqId} />
                <Row title="Disable" onPress={this.disableAutoAppendUniqId} />
                <Row title="Reset" onPress={this.resetUniqId} />
              </View>
              <Text style={styles.sectionTitle}>Auto Append Model Information</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableAutoAppendModelInformation} />
                <Row title="Disable" onPress={this.disableAutoAppendModelInformation} />
              </View>
              <Text style={styles.sectionTitle}>Auto Append App Information</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableAutoAppendAppInformation} />
                <Row title="Disable" onPress={this.disableAutoAppendAppInformation} />
              </View>
              <Text style={styles.sectionTitle}>Auto Append Local Information</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableAutoAppendLocaleInformation} />
                <Row title="Disable" onPress={this.disableAutoAppendLocaleInformation} />
              </View>
              <Text style={styles.sectionTitle}>Server Side Upload Timestamp</Text>
              <View style={styles.sectionContainer}>
                <Row title='Column name'>
                  <TextInput style={styles.textInput} onChangeText={this.onServerSideUploadTimestampColumnNameChange} value={this.state.serverSideUploadTimestampColumnName} />
                </Row>
                <Row title="Enable" onPress={this.enableServerSideUploadTimestamp} />
                <Row title="Disable" onPress={this.disableServerSideUploadTimestamp} />
              </View>
              <Text style={styles.sectionTitle}>Auto Append Record UUID</Text>
              <View style={styles.sectionContainer}>
                <Row title='Column name'>
                  <TextInput style={styles.textInput} onChangeText={this.onRecordUUIDColumnNameChange} value={this.state.recordUUIDColumnName} />
                </Row>
                <Row title="Enable" onPress={this.enableAutoAppendRecordUUID} />
                <Row title="Disable" onPress={this.disableAutoAppendRecordUUID} />
              </View>
              <Text style={styles.sectionTitle}>Auto Append Advertising Identifier</Text>
              <View style={styles.sectionContainer}>
                <Row title='Column name'>
                  <TextInput style={styles.textInput} onChangeText={this.onAAIDColumnNameChange} value={this.state.aaidColumnName} />
                </Row>
                <Row title="Enable" onPress={this.enableAutoAppendAdvertisingIdentifier} />
                <Row title="Disable" onPress={this.disableAutoAppendAdvertisingIdentifier} />
              </View>
              <Text style={styles.sectionTitle}>Session</Text>
              <View style={styles.sectionContainer}>
                <Row title='Session table'>
                  <TextInput style={styles.textInput} onChangeText={this.onSessionTableTextChange} value={sessionTable} />
                </Row>
                <Row title='Session database'>
                  <TextInput style={styles.textInput} onChangeText={this.onSessionDatabaseTextChange} value={sessionDatabase} />
                </Row>
                <Row title="Get session id" onPress={this.getSessionId} />
                <Row title="Start session" onPress={this.startSession} />
                <Row title="End session" onPress={this.endSession} />
                <Row title="Get global session id" onPress={this.getGlobalSessionId} />
                <Row title="Start global session" onPress={this.startGlobalSession} />
                <Row title="End global session" onPress={this.endGlobalSession} />
                <Row title="Reset global session" onPress={this.resetGlobalSessionId} />
                <Row title="Set timeout" onPress={this.setGlobalSessionTimeoutMilli} />
              </View>
              <Text style={styles.sectionTitle}>Custom Event</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableCustomEvent} />
                <Row title="Disable" onPress={this.disableCustomEvent} />
                <Row title="Is Enabled?" onPress={this.isCustomEventEnabled} />
              </View>
              <Text style={styles.sectionTitle}>App Lifecycle Event</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableAppLifecycleEvent} />
                <Row title="Disable" onPress={this.disableAppLifecycleEvent} />
                <Row title="Is Enabled?" onPress={this.isAppLifecycleEventEnabled} />
              </View>
              <Text style={styles.sectionTitle}>IAP Event</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableInAppPurchaseEvent} />
                <Row title="Disable" onPress={this.disableInAppPurchaseEvent} />
                <Row title="Is Enabled?" onPress={this.isInAppPurchaseEventEnabled} />
                <Row title="Purchase" onPress={this.purchaseInAppPurchase} />
              </View>
              <Text style={styles.sectionTitle}>Profile API</Text>
              <View style={styles.sectionContainer}>
                <Row title='Audience Tokens'>
                  <TextInput style={styles.textInput} onChangeText={this.onAudienceTokensChange} value={JSON.stringify(audienceTokens)} />
                </Row>
                <Row title='Audience Keys'>
                  <TextInput style={styles.textInput} onChangeText={this.onUserSegmentKeysChange} value={JSON.stringify(userSegmentKeys)} />
                </Row>
                <Row title="Fetch User Segments" onPress={this.fetchUserSegments} />
              </View>
              <Text style={styles.sectionTitle}>Default Values</Text>
              <View style={styles.sectionContainer}>
                <Row title='Key'>
                  <TextInput style={styles.textInput} onChangeText={this.onDefaultValueKeyChange} value={defaultValueKey} />
                </Row>
                <Row title='Value'>
                  <TextInput style={styles.textInput} onChangeText={this.onDefaultValueValueChange} value={defaultValueValue} />
                </Row>
                <Row title="Set Default Value" onPress={this.setDefaultValue} />
                <Row title="Get Default Value" onPress={this.getDefaultValue} />
                <Row title="Remove Default Value" onPress={this.removeDefaultValue} />
              </View>
              <Text style={styles.sectionTitle}>Retry Uploading</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableRetryUploading} />
                <Row title="Disable" onPress={this.disableRetryUploading} />
              </View>
              <Text style={styles.sectionTitle}>Event Compression</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableEventCompression} />
                <Row title="Disable" onPress={this.disableEventCompression} />
              </View>
              <Text style={styles.sectionTitle}>Logging</Text>
              <View style={styles.sectionContainer}>
                <Row title="Enable" onPress={this.enableLogging} />
                <Row title="Disable" onPress={this.disableLogging} />
              </View>
              <Text style={styles.sectionTitle}>First Run</Text>
              <View style={styles.sectionContainer}>
                <Row title="Is first run?" onPress={this.isFirstRun} />
                <Row title="Clear first run" onPress={this.clearFirstRun} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
      );
    }
};

const backgroundColor = '#f5f5f5';
const dividerColor = '#d3d3d3';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor,
  },
  sectionContainer: {
    borderTopWidth: 1,
    borderTopColor: dividerColor,
    marginBottom: 32,
    backgroundColor: 'white'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    padding: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 4,
    padding: 4
  }
});

export default App;
