//
//  SettingsViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/18/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import UserNotifications

class SettingsViewController: UIViewController {

    var apiController: APIController?
    var notificationEnabled: Bool?
    let network = NetworkManager.sharedInstance
    
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var defaultStyleSwitch: UISwitch!
    @IBOutlet weak var outdoorStyleSwitch: UISwitch!
    @IBOutlet weak var lightStyleSwitch: UISwitch!
    @IBOutlet weak var darkStyleSwitch: UISwitch!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let gradient = CAGradientLayer()
        gradient.colors = [AppearanceHelper.macAndCheese.cgColor, AppearanceHelper.begonia.cgColor, AppearanceHelper.turkishRose.cgColor, AppearanceHelper.oldLavender.cgColor, AppearanceHelper.ming.cgColor]
        gradient.frame = view.bounds
        view.layer.insertSublayer(gradient, at: 0)
        
        stylize()
        updateStyleSwitches()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        NetworkManager.isUnreachable { _ in
            self.performSegue(withIdentifier: "NetworkUnavailable", sender: self)
        }
    }
    
    
    func stylize() {
        let closeImage = UIImage(named: "closeButton")
        let tintedImage = closeImage?.withRenderingMode(.alwaysTemplate)
        closeButton.setImage(tintedImage, for: .normal)
        closeButton.tintColor = AppearanceHelper.ming
        
    }
    
    
    func updateStyleSwitches() {
        if UserDefaults.standard.bool(forKey: "outdoorStyle") == true {
            defaultStyleSwitch.isOn = false
            outdoorStyleSwitch.isOn = true
            lightStyleSwitch.isOn = false
            darkStyleSwitch.isOn = false
        } else if UserDefaults.standard.bool(forKey: "lightStyle") == true {
            defaultStyleSwitch.isOn = false
            outdoorStyleSwitch.isOn = false
            lightStyleSwitch.isOn = true
            darkStyleSwitch.isOn = false
        } else if UserDefaults.standard.bool(forKey: "darkStyle") == true {
            defaultStyleSwitch.isOn = false
            outdoorStyleSwitch.isOn = false
            lightStyleSwitch.isOn = false
            darkStyleSwitch.isOn = true
        } else {
            defaultStyleSwitch.isOn = true
            outdoorStyleSwitch.isOn = false
            lightStyleSwitch.isOn = false
            darkStyleSwitch.isOn = false
        }
    }

    
    @IBAction func closeButtonPressed(_ sender: Any) {
        dismiss(animated: true, completion: {
            NotificationCenter.default.post(Notification(name: UIApplication.didBecomeActiveNotification))
        })
    }
    

    
    // MARK: IBActions
    @IBAction func defaultStylePressed(_ sender: Any) {
        let userDefaults = UserDefaults.standard
        userDefaults.set(false, forKey: "outdoorStyle")
        userDefaults.set(false, forKey: "lightStyle")
        userDefaults.set(false, forKey: "darkStyle")
        updateStyleSwitches()
    }
    
    
    @IBAction func outdoorStylePressed(_ sender: Any) {
        let userDefaults = UserDefaults.standard
        userDefaults.set(true, forKey: "outdoorStyle")
        userDefaults.set(false, forKey: "lightStyle")
        userDefaults.set(false, forKey: "darkStyle")
        updateStyleSwitches()
    }
    
    @IBAction func lightStylePressed(_ sender: Any) {
        let userDefaults = UserDefaults.standard
        userDefaults.set(false, forKey: "outdoorStyle")
        userDefaults.set(true, forKey: "lightStyle")
        userDefaults.set(false, forKey: "darkStyle")
        updateStyleSwitches()
    }
    
    @IBAction func darkStylePressed(_ sender: Any) {
        let userDefaults = UserDefaults.standard
        userDefaults.set(false, forKey: "outdoorStyle")
        userDefaults.set(false, forKey: "lightStyle")
        userDefaults.set(true, forKey: "darkStyle")
        updateStyleSwitches()
    }
    
}
