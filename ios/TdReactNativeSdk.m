#import "TdReactNativeSdk.h"
#import "TreasureData.h"

@implementation TdReactNativeSdk

RCT_EXPORT_MODULE()

#pragma mark - Set up

RCT_EXPORT_METHOD(setup:(NSDictionary *)configuration)
{
    [TreasureData initializeApiEndpoint:configuration[@"apiEndpoint"]];
    [TreasureData initializeEncryptionKey:configuration[@"encryptionKey"]];
    [TreasureData initializeWithApiKey:configuration[@"apiKey"]];
    [[TreasureData sharedInstance] setDefaultDatabase:configuration[@"defaultDatabase"]];
    [[TreasureData sharedInstance] setDefaultTable:configuration[@"defaultTable"]];
    [[TreasureData sharedInstance] setCdpEndpoint:configuration[@"cdpEndpoint"]];
}

#pragma mark - Add Event

RCT_EXPORT_METHOD(addEvent:(NSDictionary *)event table:(NSString *)table database:(NSString *)database)
{
    if (database == nil) {
        [[TreasureData sharedInstance] addEvent:event table:table];
    } else {
        [[TreasureData sharedInstance] addEvent:event database:database table:table];
    }
}

RCT_EXPORT_METHOD(addEventWithCallback:(NSDictionary *)event table:(NSString *)table database:(NSString *)database onSuccess:(RCTResponseSenderBlock)onSuccess onError:(RCTResponseSenderBlock)onError)
{
    if (database == nil) {
        [[TreasureData sharedInstance] addEventWithCallback:event table:table onSuccess:^() {
            onSuccess(@[]);
        } onError:^(NSString* errorCode, NSString* errorMessage) {
            onError(@[errorCode, errorMessage]);
        }];
    } else {
        [[TreasureData sharedInstance] addEventWithCallback:event database:database table:table onSuccess:^() {
            onSuccess(@[]);
        } onError:^(NSString* errorCode, NSString* message) {
            onError(@[errorCode, message]);
        }];
    }
}

#pragma mark - Upload Events

RCT_EXPORT_METHOD(uploadEvents)
{
    [[TreasureData sharedInstance] uploadEvents];
}

RCT_EXPORT_METHOD(uploadEventsWithCallback:(RCTResponseSenderBlock)onSuccess onError:(RCTResponseSenderBlock)onError)
{
    [[TreasureData sharedInstance] uploadEventsWithCallback:^{
        onSuccess(@[]);
    } onError:^(NSString * _Nonnull errorCode, NSString * _Nullable errorMessage) {
        onError(@[errorCode, errorMessage]);
    }];
}

#pragma mark - UUID

RCT_EXPORT_METHOD(getUUID:(RCTResponseSenderBlock)callback)
{
    NSString *uuid = [[TreasureData sharedInstance] getUUID];
    if (uuid != nil) {
        callback(@[uuid]);
    } else {
        callback(@[]);
    }
}

RCT_EXPORT_METHOD(enableAutoAppendUniqId)
{
    [[TreasureData sharedInstance] enableAutoAppendUniqId];
}

RCT_EXPORT_METHOD(disableAutoAppendUniqId)
{
    [[TreasureData sharedInstance] disableAutoAppendUniqId];
}

RCT_EXPORT_METHOD(resetUniqId)
{
    [[TreasureData sharedInstance] resetUniqId];
}

#pragma mark - Auto Append Model Information

RCT_EXPORT_METHOD(enableAutoAppendModelInformation)
{
    [[TreasureData sharedInstance] enableAutoAppendModelInformation];
}

RCT_EXPORT_METHOD(disableAutoAppendModelInformation)
{
    [[TreasureData sharedInstance] disableAutoAppendModelInformation];
}

#pragma mark - Auto Append App Information

RCT_EXPORT_METHOD(enableAutoAppendAppInformation)
{
    [[TreasureData sharedInstance] enableAutoAppendAppInformation];
}

RCT_EXPORT_METHOD(disableAutoAppendAppInformation)
{
    [[TreasureData sharedInstance] disableAutoAppendAppInformation];
}

#pragma mark - Auto Append Local Information

RCT_EXPORT_METHOD(enableAutoAppendLocaleInformation)
{
    [[TreasureData sharedInstance] enableAutoAppendLocaleInformation];
}

RCT_EXPORT_METHOD(disableAutoAppendLocaleInformation)
{
    [[TreasureData sharedInstance] disableAutoAppendLocaleInformation];
}

#pragma mark - Server Side Upload Timestamp

RCT_EXPORT_METHOD(enableServerSideUploadTimestamp:(NSString *)columnName)
{
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableServerSideUploadTimestamp];
    } else {
        [[TreasureData sharedInstance] enableServerSideUploadTimestamp:columnName];
    }
}

RCT_EXPORT_METHOD(disableServerSideUploadTimestamp)
{
    [[TreasureData sharedInstance] disableServerSideUploadTimestamp];
}

#pragma mark - Auto Append Record UUID

RCT_EXPORT_METHOD(enableAutoAppendRecordUUID:(NSString *)columnName)
{
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableAutoAppendRecordUUID];
    } else {
        [[TreasureData sharedInstance] enableAutoAppendRecordUUID:columnName];
    }
}

RCT_EXPORT_METHOD(disableAutoAppendRecordUUID)
{
    [[TreasureData sharedInstance] disableAutoAppendRecordUUID];
}

#pragma mark - Auto Append Advertising Identifier

RCT_EXPORT_METHOD(enableAutoAppendAdvertisingIdentifier:(NSString *)columnName)
{
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableAutoAppendAdvertisingIdentifier];
    } else {
        [[TreasureData sharedInstance] enableAutoAppendAdvertisingIdentifier:columnName];
    }
}

RCT_EXPORT_METHOD(disableAutoAppendAdvertisingIdentifier)
{
    [[TreasureData sharedInstance] disableAutoAppendAdvertisingIdentifier];
}

#pragma mark - Session

RCT_EXPORT_METHOD(startSession:(NSString *)table database:(NSString *)database)
{
    if (database == nil) {
        [[TreasureData sharedInstance] startSession:table];
    } else {
        [[TreasureData sharedInstance] startSession:table database:database];
    }
}

RCT_EXPORT_METHOD(endSession:(NSString *)table database:(NSString *)database)
{
    if (database == nil) {
        [[TreasureData sharedInstance] endSession:table];
    } else {
        [[TreasureData sharedInstance] endSession:table database:database];
    }
}

RCT_EXPORT_METHOD(getSessionId:(RCTResponseSenderBlock)callback)
{
    NSString *sessionId = [[TreasureData sharedInstance] getSessionId];
    if (sessionId != nil) {
        callback(@[sessionId]);
    } else {
        callback(@[]);
    }
}

RCT_EXPORT_METHOD(startGlobalSession)
{
    [TreasureData startSession];
}

RCT_EXPORT_METHOD(endGlobalSession)
{
    [TreasureData endSession];
}

RCT_EXPORT_METHOD(setGlobalSessionTimeoutMilli:(double)to)
{
    [TreasureData setSessionTimeoutMilli:to];
}

RCT_EXPORT_METHOD(getGlobalSessionId:(RCTResponseSenderBlock)callback)
{
    NSString *sessionId = [TreasureData getSessionId];
    if (sessionId != nil) {
        callback(@[sessionId]);
    } else {
        callback(@[]);
    }
}

#pragma mark - Automatically tracked events

#pragma mark Custom Event

RCT_EXPORT_METHOD(enableCustomEvent)
{
    [[TreasureData sharedInstance] enableCustomEvent];
}

RCT_EXPORT_METHOD(disableCustomEvent)
{
    [[TreasureData sharedInstance] disableCustomEvent];
}

RCT_EXPORT_METHOD(isCustomEventEnabled:(RCTResponseSenderBlock)callback)
{
    BOOL isCustomEventEnabled = [[TreasureData sharedInstance] isCustomEventEnabled];
    callback(@[@(isCustomEventEnabled)]);
}

#pragma mark App Lifecycle Event

RCT_EXPORT_METHOD(enableAppLifecycleEvent)
{
    [[TreasureData sharedInstance] enableAppLifecycleEvent];
}

RCT_EXPORT_METHOD(disableAppLifecycleEvent)
{
    [[TreasureData sharedInstance] disableAppLifecycleEvent];
}

RCT_EXPORT_METHOD(isAppLifecycleEventEnabled:(RCTResponseSenderBlock)callback)
{
    BOOL isAppLifecycleEventEnabled = [[TreasureData sharedInstance] isAppLifecycleEventEnabled];
    callback(@[@(isAppLifecycleEventEnabled)]);
}

#pragma mark In App Purchase Event

RCT_EXPORT_METHOD(enableInAppPurchaseEvent)
{
    [[TreasureData sharedInstance] enableInAppPurchaseEvent];
}

RCT_EXPORT_METHOD(disableInAppPurchaseEvent)
{
    [[TreasureData sharedInstance] disableInAppPurchaseEvent];
}

RCT_EXPORT_METHOD(isInAppPurchaseEventEnabled:(RCTResponseSenderBlock)callback)
{
    BOOL isInAppPurchaseEventEnabled = [[TreasureData sharedInstance] isInAppPurchaseEventEnabled];
    callback(@[@(isInAppPurchaseEventEnabled)]);
}

#pragma mark - Profile API

RCT_EXPORT_METHOD(fetchUserSegments:(nonnull NSArray<NSString *> *)audienceTokens keys:(nonnull NSDictionary<NSString *,id> *)keys onSuccess:(RCTResponseSenderBlock)onSuccess onError:(RCTResponseSenderBlock)onError) {
    [[TreasureData sharedInstance] fetchUserSegments:audienceTokens keys:keys options:nil completionHandler:^(NSArray * _Nullable jsonResponse, NSError * _Nullable error) {
        if (jsonResponse != nil) {
            onSuccess(@[jsonResponse]);
        } else if (error != nil) {
            onError(@[@(error.code), error.localizedDescription]);
        }
    }];
}

#pragma mark - Default values

RCT_EXPORT_METHOD(setDefaultValue:(nonnull id)value forKey:(nonnull NSString *)key database:(nullable NSString *)database table:(nullable NSString *)table) {
    [[TreasureData sharedInstance] setDefaultValue:value forKey:key database:database table:table];
}

RCT_EXPORT_METHOD(defaultValue:(nonnull NSString*)key database:(nullable NSString *)database table:(nullable NSString *)table callback:(RCTResponseSenderBlock)callback) {
    id defaultValue = [[TreasureData sharedInstance] defaultValueForKey:key database:database table:table];
    callback(defaultValue == nil ? @[] : @[defaultValue]);
}

RCT_EXPORT_METHOD(removeDefaultValueForKey:(nonnull NSString *)key database:(nullable NSString *)database table:(nullable NSString *)table) {
    [[TreasureData sharedInstance] removeDefaultValueForKey:key database:database table:table];
}

#pragma mark - Misc.

#pragma mark Retry uploading

RCT_EXPORT_METHOD(enableRetryUploading)
{
    [[TreasureData sharedInstance] enableRetryUploading];
}

RCT_EXPORT_METHOD(disableRetryUploading)
{
    [[TreasureData sharedInstance] disableRetryUploading];
}

#pragma mark Event Compression

RCT_EXPORT_METHOD(enableEventCompression)
{
    [TreasureData enableEventCompression];
}

RCT_EXPORT_METHOD(disableEventCompression)
{
    [TreasureData disableEventCompression];
}

#pragma mark Loggin

RCT_EXPORT_METHOD(enableLogging)
{
    [TreasureData enableLogging];
}

RCT_EXPORT_METHOD(disableLogging)
{
    [TreasureData disableLogging];
}

#pragma mark First Run

RCT_EXPORT_METHOD(isFirstRun:(RCTResponseSenderBlock)callback)
{
    BOOL isFirstRun = [[TreasureData sharedInstance] isFirstRun];
    callback(@[@(isFirstRun)]);
}

RCT_EXPORT_METHOD(clearFirstRun)
{
    [[TreasureData sharedInstance] clearFirstRun];
}

@end
