//
//  VehicleFormViewController.swift
//  RVNav
//
//  Created by Ryan Murphy on 8/26/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit



class VehicleFormViewController: UIViewController {
    
    var vehicle: Vehicle?
    var vehicles: [Vehicle]?
    var avoidance: [Avoid] = []
    
    var networkController = NetworkController()
    @IBOutlet weak var vehicleNameTextField: UITextField!
    @IBOutlet weak var vehicleHeightTextField: UITextField!
    @IBOutlet weak var vehicleWeightTextField: UITextField!
    @IBOutlet weak var vehicleWidthTextField: UITextField!
    @IBOutlet weak var vehicleLengthTextField: UITextField!
    @IBOutlet weak var axleCountTextField: UITextField!
    @IBOutlet weak var vehicleClassSegmentedControl: UISegmentedControl!
    @IBOutlet weak var hasDualTiresSwitch: UISwitch!
    @IBOutlet weak var hasTrailerSwitch: UISwitch!

    override func viewDidLoad() {
        super.viewDidLoad()
        updateViews()
        
        //Looks for single or multiple taps.
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        
        view.addGestureRecognizer(tap)
    }
    
    //Calls this function when the tap is recognized.
    @objc func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
        
    }

  
    
    func updateViews() {
        guard let vehicle = vehicle else { return }
            vehicleNameTextField.text = vehicle.name
            vehicleHeightTextField.text = "\(vehicle.height ?? 0)"
            vehicleWeightTextField.text = "\(vehicle.weight ?? 0)"
            vehicleWidthTextField.text = "\(vehicle.width ?? 0)"
            vehicleLengthTextField.text = "\(vehicle.length ?? 0)"
            axleCountTextField.text = "\(vehicle.axelCount ?? 0)"
        switch vehicle.vehicleClass {
        case "A":
            vehicleClassSegmentedControl.selectedSegmentIndex = 0
        case "B":
            vehicleClassSegmentedControl.selectedSegmentIndex = 1
        case "C":
            vehicleClassSegmentedControl.selectedSegmentIndex = 2
        case "D":
            vehicleClassSegmentedControl.selectedSegmentIndex = 3
        default:
            print("No segment selected")
        }
        
        hasDualTiresSwitch.isOn = vehicle.dualTires!
        hasTrailerSwitch.isOn = vehicle.trailer!
        
        }


    @IBAction func saveButtonPressed(_ sender: Any) {

        guard let height = vehicleHeightTextField.text,
            let weight = vehicleWeightTextField.text,
            let width = vehicleWidthTextField.text,
            let length = vehicleLengthTextField.text,
            let axleCount = axleCountTextField.text,
            let name = vehicleNameTextField.text else { return }
        var vehicleClass: VehicleClass?
        switch vehicleClassSegmentedControl.selectedSegmentIndex {
        case 0:
            vehicleClass = "A"
        case 1:
            vehicleClass = "B"
        case 2:
            vehicleClass = "C"
        case 3:
            vehicleClass = "D"
        default:
            break;
        }

        let newVehicle = Vehicle(id: nil, name: name, height: Float(height), weight: Float(weight), width: Float(width), length: Float(length), axelCount: Int(axleCount), vehicleClass: vehicleClass, dualTires: hasDualTiresSwitch.isOn, trailer: hasTrailerSwitch.isOn)
        
        if self.vehicle == nil {
            networkController.createVehicle(with: newVehicle) { (error) in
                if let error = error {
                    NSLog("Error Creating Vehicle \(error)")
                }
            }
        } else {
            guard let vehicle = vehicle else { return }
            
            networkController.editVehicle(with: newVehicle, id: vehicle.id!) { (error) in
                if let error = error {
                    NSLog("Error Creating Vehicle \(error)")
            }
        }
        
    }
        navigationController?.popViewController(animated: true)
}

    @IBAction func vehicleClassChanged(_ sender: UISegmentedControl) {
        print("Class Changed")
        }

}

