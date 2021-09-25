//
//  BuildCommunitiesSignup3VC.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/16/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import UIKit

class BuildCommunitiesSignup3VC: UIViewController {
    

    override func viewDidLoad() {
        super.viewDidLoad()

        let leftSwipe = UISwipeGestureRecognizer(target: self, action: #selector(swipeHandler(_:)))
        let rightSwipe = UISwipeGestureRecognizer(target: self, action: #selector(swipeHandler(_:)))
        
        leftSwipe.direction = .left
        rightSwipe.direction = .right
        
        view.addGestureRecognizer(leftSwipe)
        view.addGestureRecognizer(rightSwipe)
    }
    
    
    @IBAction func swipeHandler(_ sender: UISwipeGestureRecognizer) {
        
        if (sender.direction == .left) {
            // Goto "FeelPassionVC" storyboardID viewController
            performSegue(withIdentifier: "SwipeLeft3", sender: nil)
        }
        if (sender.direction == .right) {
            // goto "findFansVC" storyboardID viewController
            performSegue(withIdentifier: "SwipeRight3", sender: nil)
        }
    }
}
