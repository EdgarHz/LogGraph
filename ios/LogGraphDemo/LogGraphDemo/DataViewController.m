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
    [[LGGLogProfile shared] setServerURL:[NSURL URLWithString:@"http://127.0.0.1:3000"]];
    NSLog(@"[LGGLogProfile shared]");
    self.logSwitcher.on = NO;
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
- (IBAction)switchLogState:(UISwitch *)sender {
    sender.on ? [[LGGLogProfile shared] startUpload] : [[LGGLogProfile shared] stopUpload];
}
- (IBAction)commit:(id)sender {
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
      NSString *name = self.eventTextField.text;
      int cnt = self.repeatTextField.text.intValue;
      double interval = self.intervalTextField.text.doubleValue;
      cnt = cnt > 50 ? 50 : cnt;
      cnt = cnt < 0 ? 0 : cnt;
      for (int i = 0; i < cnt; i++) {
          LGGLogPoint *p = [[LGGLogProfile shared] pinPoint:name];
          sleep(self.durationTextField.text.floatValue);
          [p close];
          sleep(interval);
      }
    });
}
@end
