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
#define SecondsBetween(Time, Reference) (double)(((Time - Reference) * info.numer / info.denom) / eLGGTUnitSeco)

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
    }
    return self;
}
- (LGGLogPoint *)pinPoint:(NSString *)name {
    LGGLogPoint *p = [LGGLogPoint pointWithName:name];
    dispatch_async(_queue, ^{
      DDLogVerbose(@"%@ %llu", name, p.startTime);
      [self.graph addObject:p];
    });
    return p;
}
@end
