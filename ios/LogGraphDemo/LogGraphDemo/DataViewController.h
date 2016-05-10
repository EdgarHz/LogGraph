//
//  DataViewController.h
//  LogGraphDemo
//
//  Created by hzy on 5/6/16.
//  Copyright © 2016 hzy. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DataViewController : UIViewController

@property (strong, nonatomic) IBOutlet UILabel *dataLabel;
@property (strong, nonatomic) id dataObject;


@property (strong, nonatomic) IBOutlet UILabel *logTipLabel;
@property (strong, nonatomic) IBOutlet UISwitch *logSwitcher;
@property (strong, nonatomic) IBOutlet UITextField *eventTextField;
@property (strong, nonatomic) IBOutlet UITextField *durationTextField;
@property (strong, nonatomic) IBOutlet UITextField *repeatTextField;
@property (strong, nonatomic) IBOutlet UITextField *intervalTextField;
@property (strong, nonatomic) IBOutlet UIButton *okButton;
@end
