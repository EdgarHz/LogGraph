//
//  DataViewController.m
//  LogGraphDemo
//
//  Created by hzy on 5/6/16.
//  Copyright © 2016 hzy. All rights reserved.
//

#import "DataViewController.h"
#import "LGGLogProfile.h"
@interface DataViewController ()

@end

@implementation DataViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [[LGGLogProfile shared] startUpload];
    [[LGGLogProfile shared] pinPoint:@"haha"];
    [[LGGLogProfile shared] pinPoint:@"haha"];
    sleep(2);
    NSLog(@"[LGGLogProfile shared]");
    [[LGGLogProfile shared] setServerURL:[NSURL URLWithString:@""]];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    self.dataLabel.text = [self.dataObject description];
}

@end
