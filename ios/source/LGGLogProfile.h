//
//  LGGLogProfile.h
//  LogGraphDemo
//
//  Created by hzy on 5/6/16.
//  Copyright © 2016 hzy. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef enum {
    eLGGTUnitNano = 1,
    eLGGTUnitMicr = 1000,
    eLGGTUnitMill = 1000000,
    eLGGTUnitSeco = 1000000000,
} eLGGTimeUnit;

typedef enum {
    eLGGPointIsComplete = 1 << 0,
    eLGGPointHasFlowEnd = 1 << 1,
} ELGGPointStatus;

///  测量点，名称，起始时间点，结束时间点
@interface LGGLogPoint : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) unsigned long long startTime;
@property (nonatomic, assign) unsigned long long endTime;
+ (instancetype)pointWithName:(NSString *)name;
///  close this log point with end time;
- (void)close;

///  LGGPointStatus set;sometimes, a flow has some period which may has same name. so when one flow cut off by some err,
///  then mark it.
@property (nonatomic, assign) int status;
///  close this log, and tag a flow end.
- (void)cutoff;
@end

@interface LGGLogProfile : NSObject {
    dispatch_queue_t _queue;
}
@property (nonatomic, assign) unsigned long long referencePoint;
@property (nonatomic, strong) NSMutableOrderedSet *graph;
+ (instancetype)shared;
///  add one point to graph, which set current time as startTime
///
///  @param name point.name
///
///  @return one point which should call close/cutoff to set endTime;
- (LGGLogPoint *)pinPoint:(NSString *)name;
@end
