//
//  LGGLogProfile.m
//  LogGraphDemo
//
//  Created by hzy on 5/6/16.
//  Copyright © 2016 hzy. All rights reserved.
//

#import "LGGLogProfile.h"
#import <OCUtilCollection/UTLHeader.h>
#import <mach/mach_time.h>


static mach_timebase_info_data_t info;
#define SecondsBetween(Time, Reference) (double)(((Time - Reference) * info.numer / info.denom) / NSEC_PER_SEC)

@implementation LGGLogPoint
+ (instancetype)pointWithName:(NSString *)name {
    unsigned long long t = mach_absolute_time();
    LGGLogPoint *d = [[[self class] alloc] init];
    d.startTime = t;
    d.name = name;
    return d;
}
- (void)close {
    self.endTime = mach_absolute_time();
    self.status |= eLGGPointIsComplete;
}
- (void)cutoff {
    self.endTime = mach_absolute_time();
    self.status |= eLGGPointHasFlowEnd;
}
@end

@interface LGGLogProfile () {
}
@property (nonatomic, strong) dispatch_source_t timer;
@end

@implementation LGGLogProfile
SharedInstanceImplementation(shared, LGGLogProfile);
- (instancetype)init {
    self = [super init];
    if (self) {
        if (mach_timebase_info(&info) != KERN_SUCCESS) {
            DDLogDebug(@" mach_timebase_info failed\n");
            return nil;
        }
        _queue = dispatch_queue_create("time_profile", DISPATCH_QUEUE_SERIAL);
        self.graph = [NSMutableOrderedSet orderedSetWithCapacity:20];
        self.referencePoint = mach_absolute_time();
        self.timeIntervalToUploadLog = 1;
    }
    return self;
}
- (LGGLogPoint *)pinPoint:(NSString *)name {
    LGGLogPoint *p = [LGGLogPoint pointWithName:name];
    @weakify(self);
    dispatch_async(_queue, ^{
      @strongify(self);
      DDLogVerbose(@"%@ %llu", name, p.startTime);
      [self.graph addObject:p];
    });
    return p;
}
- (void)startUpload {
    [self stopUpload];
    self.timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, _queue);
    int64_t ti = self.timeIntervalToUploadLog * NSEC_PER_SEC;
    dispatch_source_set_timer(self.timer, DISPATCH_TIME_NOW, ti, ti);
    @weakify(self);
    dispatch_source_set_event_handler(self.timer, ^{
      @strongify(self);
      [self upload];
    });
    dispatch_resume(self.timer);
}
- (void)stopUpload {
    if (self.timer) {
        dispatch_source_cancel(self.timer);
        self.timer = nil;
    }
}
- (void)upload {
    return;
    [UTLSimpleHttpClient requestDataFromURL:self.serverURL
        method:kUTLHTTPMethodPOST
        params:@{}
        headers:nil
        handler:^(id data, NSError *error){

        }];
}
@end
