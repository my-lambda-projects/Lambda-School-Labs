//
//  GroupSearchViewController.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/26/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import UIKit

class GroupSearchViewController: UIViewController {
    
    @IBOutlet weak var favoriteTeamTextField: UITextField!
    @IBOutlet weak var zipcodeTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    @IBAction func useLocationButtonTapped(_ sender: Any) {
        
        //authorize user to allow iphone to read location, this will likely require a change in info.plist or file permissions.
        //get the zipcode for the user's current location and enter it into zipcodeTextField.text
        
        
        
        // Future Feature: place the map on the GroupsExist result page and throw down all the different groups onto the map allowing user to press group he wants to join.
        
    }
    
    @IBAction func findGroupsButtonTapped(_ sender: Any) {
        
        //using favoriteTeamTextField.text locate all Groups which have that favorite team words (like Dallas or Mavericks) in the Group name, OR locate nearby groups via zipcode proximity.
        
        
    }
    

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let groupExistVC = segue.destination as? GroupsExistViewController,
            let zipcode = Int(zipcodeTextField.text!) {
            
            groupExistVC.favoriteTeam = favoriteTeamTextField.text
            groupExistVC.zipcode = zipcode
        }
    }
}
