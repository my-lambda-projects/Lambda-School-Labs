//
//  FindFansSignup2VC.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/16/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import UIKit

class FindFansSignup2VC: UIViewController {
    

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
            // Goto "buildCommunityVC" storyboardID viewController
            performSegue(withIdentifier: "SwipeLeft2", sender: nil)
        }
        if (sender.direction == .right) {
            // goto "supportTeamsVC" storyboardID viewController
            performSegue(withIdentifier: "SwipeRight2", sender: nil)
        }
    }
}
