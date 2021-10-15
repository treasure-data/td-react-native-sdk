package com.reactlibrary;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.treasuredata.android.TDCallback;
import com.treasuredata.android.TreasureData;
import com.treasuredata.android.cdp.CDPAPIException;
import com.treasuredata.android.cdp.FetchUserSegmentsCallback;
import com.treasuredata.android.cdp.Profile;

import java.io.FileNotFoundException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class TdReactNativeSdkModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final String MODULE_NAME = "TdReactNativeSdk";
    private final String DEFAULT_DATABASE = "td_react_native_sdk";
    private final String DEFAULT_TABLE = "samples";
    private final String ERROR_404 = "Not Found";
    private final String ERROR_400 = "Bad Request";

    public TdReactNativeSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void setup(ReadableMap options) throws URISyntaxException {
        if (options.hasKey("apiEndpoint")) {
            TreasureData.initializeApiEndpoint(options.getString("apiEndpoint"));
        }

        if (options.hasKey("apiKey")) {
            String defaultDatabase = DEFAULT_DATABASE;

            if (options.hasKey("defaultDatabase")) {
                defaultDatabase = options.getString("defaultDatabase");
            }

            String defaultTable = DEFAULT_TABLE;
            if (options.hasKey("defaultTable")) {
                defaultTable = options.getString("defaultTable");
            }

            String cdpEndpoint = "";
            if (options.hasKey("cdpEndpoint")) {
                cdpEndpoint = options.getString("cdpEndpoint");
            }

            String encryptionKey = "";
            if (options.hasKey("encryptionKey")) {
                encryptionKey = options.getString("encryptionKey");
            }

            TreasureData.initializeSharedInstance(this.reactContext, options.getString("apiKey"));

            final TreasureData instance = TreasureData.sharedInstance();

            if (!cdpEndpoint.isEmpty()) {
                instance.setCDPEndpoint(cdpEndpoint);
            }

            if (!encryptionKey.isEmpty()) {
                TreasureData.initializeEncryptionKey(encryptionKey);
            }

            instance.setDefaultDatabase(defaultDatabase);
            instance.setDefaultTable(defaultTable);
            instance.setAddEventCallBack(new DefaultCallback("addEvent"));
            instance.setUploadEventsCallBack(new DefaultCallback("uploadEvents"));
        } else {
            throw new IllegalArgumentException("API key must be specified");
        }
    }

    @ReactMethod
    public void addEvent(ReadableMap event, String table, String database) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        final Map convertedEvent = Utils.toMap(event);

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().addEvent(table, convertedEvent);
        } else {
            TreasureData.sharedInstance().addEvent(database, table, convertedEvent);
        }

    }

    @ReactMethod
    public void addEventWithCallback(ReadableMap event, String table, String database, @Nullable final Callback success, @Nullable final Callback failure) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        final Map convertedEvent = Utils.toMap(event);
        final DefaultCallback callback = new DefaultCallback("addEvent", success, failure);

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().addEventWithCallback(table, convertedEvent, callback);
        } else {
            TreasureData.sharedInstance().addEventWithCallback(database, table, convertedEvent, callback);
        }
    }

    @ReactMethod
    public void uploadEvents() {
        TreasureData.sharedInstance().uploadEvents();
    }

    @ReactMethod
    public void uploadEventsWithCallback(@Nullable final Callback success, @Nullable final Callback failure) {
        final DefaultCallback callback = new DefaultCallback("uploadEvents", success, failure);
        TreasureData.sharedInstance().uploadEventsWithCallback(callback);
    }

    @ReactMethod
    public void fetchUserSegments(ReadableArray audienceTokens, ReadableMap keys, @Nullable final Callback success, @Nullable final Callback failure) {
        List<String> profileTokens = Utils.toStringList(audienceTokens);
        Map<String, Object> convertedMap = new HashMap<>();
        Map<String, String> keysMap = new HashMap<>();

        if (keys != null) {
            convertedMap = Utils.toMap(keys);
            for(Map.Entry<String, Object> entry : convertedMap.entrySet()) {
                keysMap.put(entry.getKey(), (String)entry.getValue());
            }
       }

        TreasureData.sharedInstance().fetchUserSegments(profileTokens, keysMap, new FetchUserSegmentsCallback() {
            @Override
            public void onSuccess(List<Profile> profiles) {
                WritableArray response = Arguments.createArray();

                for(Profile profile : profiles) {
                    WritableMap profileMap = Arguments.createMap();

                    WritableArray segments = Utils.toWritableArray(profile.getSegments().toArray());
                    profileMap.putArray("segments", segments);

                    WritableMap attributes = Utils.toWritableMap(profile.getAttributes());
                    profileMap.putMap("attributes", attributes);

                    profileMap.putString("audienceId", profile.getAudienceId());

                    WritableMap keyMap = Arguments.createMap();
                    keyMap.putString("name", profile.getKey().getName());
                    keyMap.putString("value", (String)profile.getKey().getValue());
                    profileMap.putMap("key", keyMap);

                    response.pushMap(profileMap);
                }

                if (success != null) {
                    success.invoke(response);
                } else {
                    Log.d(MODULE_NAME, "Fetching user segments successfully");
                }
            }

            @Override
            public void onError(Exception e) {
                if (failure != null) {
                    if (e instanceof CDPAPIException) {
                        final CDPAPIException cdpe = (CDPAPIException) e;

                        failure.invoke(cdpe.getStatus(), cdpe.getError());
                    } else if (e instanceof FileNotFoundException){
                        failure.invoke(404, ERROR_404);
                    } else {
                        failure.invoke(400, ERROR_400);
                    }
                } else {
                    Log.e(MODULE_NAME, e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void setDefaultValue(String value, String key, @Nullable String database, @Nullable String table) {
        TreasureData.sharedInstance().setDefaultValue(database, table, key, value);
    }

    @ReactMethod
    public void defaultValue(String key, @Nullable String database, @Nullable String table, @Nullable final Callback callback) {
        Object value = TreasureData.sharedInstance().getDefaultValue(database, table, key);
        callback.invoke(value);
    }

    @ReactMethod
    public void removeDefaultValue(String key, @Nullable String database, @Nullable String table) {
        TreasureData.sharedInstance().removeDefaultValue(database, table, key);
    }

    @ReactMethod
    public void enableAppLifecycleEvent() {
        TreasureData.sharedInstance().enableAppLifecycleEvent(true);
    }

    @ReactMethod
    public void disableAppLifecycleEvent() {
        TreasureData.sharedInstance().enableAppLifecycleEvent(false);
    }

    @ReactMethod
    public void enableAutoAppendUniqId() {
        TreasureData.sharedInstance().enableAutoAppendUniqId();
    }

    @ReactMethod
    public void disableAutoAppendUniqId() {
        TreasureData.sharedInstance().disableAutoAppendUniqId();
    }

    @ReactMethod
    public void resetUniqId() {
        TreasureData.sharedInstance().resetUniqId();
    }

    @ReactMethod
    public void enableAutoAppendModelInformation() {
        TreasureData.sharedInstance().enableAutoAppendModelInformation();
    }

    @ReactMethod
    public void disableAutoAppendModelInformation() {
        TreasureData.sharedInstance().disableAutoAppendModelInformation();
    }

    @ReactMethod
    public void enableAutoAppendAppInformation() {
        TreasureData.sharedInstance().enableAutoAppendAppInformation();
    }

    @ReactMethod
    public void disableAutoAppendAppInformation() {
        TreasureData.sharedInstance().disableAutoAppendAppInformation();
    }

    @ReactMethod
    public void enableAutoAppendLocaleInformation() {
        TreasureData.sharedInstance().enableAutoAppendLocaleInformation();
    }

    @ReactMethod
    public void disableAutoAppendLocaleInformation() {
        TreasureData.sharedInstance().disableAutoAppendLocaleInformation();
    }

    @ReactMethod
    public void enableServerSideUploadTimestamp(@Nullable String columnName) {
        if (columnName == null || columnName.isEmpty()) {
            TreasureData.sharedInstance().enableServerSideUploadTimestamp();
        } else {
            TreasureData.sharedInstance().enableServerSideUploadTimestamp(columnName);
        }
    }

    @ReactMethod
    public void disableServerSideUploadTimestamp() {
        TreasureData.sharedInstance().disableServerSideUploadTimestamp();
    }

    @ReactMethod
    public void enableAutoAppendRecordUUID(String columnName) {
        if (columnName == null || columnName.isEmpty()) {
            TreasureData.sharedInstance().enableAutoAppendRecordUUID();
        } else {
            TreasureData.sharedInstance().enableAutoAppendRecordUUID(columnName);
        }
    }

    @ReactMethod
    public void disableAutoAppendRecordUUID() {
        TreasureData.sharedInstance().disableAutoAppendRecordUUID();
    }

    @ReactMethod
    public void enableAutoAppendAdvertisingIdentifier(@Nullable String columnName) {
        if (columnName == null || columnName.isEmpty()) {
            TreasureData.sharedInstance().enableAutoAppendAdvertisingIdentifier();
        } else {
            TreasureData.sharedInstance().enableAutoAppendAdvertisingIdentifier(columnName);
        }
    }

    @ReactMethod
    public void disableAutoAppendAdvertisingIdentifier() {
        TreasureData.sharedInstance().disableAutoAppendAdvertisingIdentifier();
    }

    @ReactMethod
    public void getSessionId(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().getSessionId());
    }

    @ReactMethod
    public void setSessionTimeoutMilli(Integer timeout) {
        TreasureData.sharedInstance().setSessionTimeoutMilli(timeout);
    }

    @ReactMethod
    public void setGlobalSessionTimeoutMilli(Integer timeout) {
        TreasureData.setSessionTimeoutMilli(timeout);
    }

    @ReactMethod
    public void startGlobalSession() {
        TreasureData.startSession(this.reactContext);
    }

    @ReactMethod
    public void endGlobalSession() {
        TreasureData.endSession(this.reactContext);
    }

    @ReactMethod
    public void getGlobalSessionId(Callback callback) {
        callback.invoke(TreasureData.getSessionId(this.reactContext));
    }

    @ReactMethod
    public void resetGlobalSessionId() {
        TreasureData.resetSessionId(this.reactContext);
    }

    @ReactMethod
    public void isAppLifecycleEventEnabled(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().isAppLifecycleEventEnabled());
    }

    @ReactMethod
    public void startSession(@Nullable String table, String database) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().startSession(table);
        } else {
            TreasureData.sharedInstance().startSession(database, table);
        }
    }

    @ReactMethod
    public void endSession(@Nullable String table, @Nullable String database) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().endSession(table);
        } else {
            TreasureData.sharedInstance().endSession(database, table);
        }
    }

    @ReactMethod
    public void enableCustomEvent() {
        TreasureData.sharedInstance().enableCustomEvent();
    }

    @ReactMethod
    public void disableCustomEvent() {
        TreasureData.sharedInstance().disableCustomEvent();
    }

    @ReactMethod
    public void isCustomEventEnabled(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().isCustomEventEnabled());
    }

    @ReactMethod
    public void disableInAppPurchaseEvent() {
        TreasureData.sharedInstance().disableInAppPurchaseEvent();
    }

    @ReactMethod
    public void enableInAppPurchaseEvent() {
        TreasureData.sharedInstance().enableInAppPurchaseEvent();
    }

    @ReactMethod
    public void isInAppPurchaseEventEnabled(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().isInAppPurchaseEventEnabled());
    }

    @ReactMethod
    public void disableAppInstalledEvent() {
        TreasureData.sharedInstance().disableAppInstalledEvent();
    }

    @ReactMethod
    public void disableAppOpenEvent() {
        TreasureData.sharedInstance().disableAppOpenEvent();
    }

    @ReactMethod
    public void disableAppUpdatedEvent() {
        TreasureData.sharedInstance().disableAppUpdatedEvent();
    }

    @ReactMethod
    public void enableRetryUploading() {
        TreasureData.sharedInstance().enableAutoRetryUploading();
    }

    @ReactMethod
    public void disableRetryUploading() {
        TreasureData.sharedInstance().disableAutoRetryUploading();
    }

    @ReactMethod
    public void enableEventCompression() {
        TreasureData.enableEventCompression();
    }

    @ReactMethod
    public void disableEventCompression() {
        TreasureData.disableEventCompression();
    }

    @ReactMethod
    public void enableLogging() {
        TreasureData.enableLogging();
    }

    @ReactMethod
    public void disableLogging() {
        TreasureData.disableLogging();
    }

    @ReactMethod
    public void isFirstRun(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().isFirstRun(this.reactContext));
    }

    @ReactMethod
    public void clearFirstRun() {
        TreasureData.sharedInstance().clearFirstRun(this.reactContext);
    }

    @ReactMethod
    public void getUUID(Callback callback) {
        callback.invoke(TreasureData.sharedInstance().getUUID());
    }

    class DefaultCallback implements TDCallback {
        String eventName;
        Callback successCallback;
        Callback failureCallback;

        DefaultCallback(String eventName) {
            this.eventName = eventName;
        }

        DefaultCallback(String eventName, @Nullable Callback successCallback, @Nullable Callback failureCallback) {
            this.eventName = eventName;
            this.successCallback = successCallback;
            this.failureCallback = failureCallback;
        }

        @Override
        public void onSuccess() {
            String message = "TreasureData:onSuccess[" + eventName + "]";
            if (this.successCallback != null) {
                this.successCallback.invoke(message);
            } else {
                Log.d(MODULE_NAME, message);
            }
        }

        @Override
        public void onError(String errorCode, Exception e) {
            String message = "TreasureData:onError[" + eventName + ": errorCode=" + errorCode + ", ex=" + e + "]";
            if (this.failureCallback != null) {
                this.failureCallback.invoke(errorCode, e.getMessage());
            } else {
                Log.e(MODULE_NAME, message);
            }
        }
    }
}
