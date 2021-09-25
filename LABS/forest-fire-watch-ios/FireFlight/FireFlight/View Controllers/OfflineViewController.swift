//
//  OfflineViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/22/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class OfflineViewController: UIViewController {

    let network = NetworkManager.sharedInstance
    
    override func viewDidLoad() {
        super.viewDidLoad()
        network.reachability.whenReachable = { _ in
            self.dismiss(animated: true, completion: nil)
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
