//
//  SideMenuViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/12/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import SideMenu

class SideMenuViewController: UIViewController {

    var apiController: APIController?
    
    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var profileStackView: UIStackView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        profileImage.layer.cornerRadius = 32
        
        let gradient = CAGradientLayer()
        gradient.colors = [AppearanceHelper.macAndCheese.cgColor, AppearanceHelper.begonia.cgColor, AppearanceHelper.turkishRose.cgColor, AppearanceHelper.oldLavender.cgColor, AppearanceHelper.ming.cgColor]
        gradient.frame = view.bounds
        view.layer.insertSublayer(gradient, at: 0)
    }
    

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SavedAddressesSegue" {
            guard let destinationVC = segue.destination as? SavedAddressesViewController else { return }
            destinationVC.apiController = apiController
        }
        
        if segue.identifier == "SettingsSegue" {
            guard let destinationVC = segue.destination as? SettingsViewController else { return }
            destinationVC.apiController = apiController
        }
    }
}
