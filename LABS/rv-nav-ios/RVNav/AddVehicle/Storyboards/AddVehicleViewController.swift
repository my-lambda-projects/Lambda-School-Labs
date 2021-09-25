//
//  AddVehicleViewController.swift
//  RVNav
//
//  Created by Jake Connerly on 1/13/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit

class AddVehicleViewController: ShiftableViewController {
    
    // MARK: - IBOutlets

    @IBOutlet weak var addEditVehicleBarLabel: UILabel!
    @IBOutlet weak var addEditVehicleLabel: UILabel!
    @IBOutlet weak var exitButton: UIButton!
    @IBOutlet weak var backButton: UIButton!
    @IBOutlet weak var vehicleNameTextField: UITextField!
    @IBOutlet weak var heightFeetTextField: UITextField!
    @IBOutlet weak var heightInchesTextField: UITextField!
    @IBOutlet weak var widthFeetTextField: UITextField!
    @IBOutlet weak var widthInchesTextField: UITextField!
    @IBOutlet weak var lengthFeetTextField: UITextField!
    @IBOutlet weak var lengthInchesTextField: UITextField!
    @IBOutlet weak var weightTextField: UITextField!
    @IBOutlet weak var axelCountTextField: UITextField!
    @IBOutlet weak var duelWheelSwitch: UISwitch!
    @IBOutlet weak var rvTypeTextField: UITextField!
    @IBOutlet weak var addButton: UIButton!
    @IBOutlet weak var cancelButton: UIButton!
    
    // MARK: - Properties
    var vehicle: Vehicle?
    var vehicleController: VehicleModelControllerProtocol?
    
    // MARK: - View LifeCycle
    override func viewDidLoad() {
        super.viewDidLoad()
        if #available(iOS 13.0, *) {
            overrideUserInterfaceStyle = .light
        }
        buttonUISetup()
        dismissTapGestureRecogniser()
        updateViews()
    }
    
    // MARK: - Private Methods
    
    private func updateViews() {
        if let vehicle = vehicle,
            let vehicleName = vehicle.name,
            let vehicleWeight = vehicle.weight,
            let axelCount = vehicle.axelCount,
            let duelTire = vehicle.dualTires,
            let vehicleTypeFromDB = vehicle.vehicleClass,
            let height = vehicle.height,
            let width = vehicle.width,
            let length = vehicle.length {
            
            let heightFeet = feetAndInchesHandlerFromDB(totalFeet: height).feet
            let heightInches = feetAndInchesHandlerFromDB(totalFeet: height).inches
            
            let widthFeet = feetAndInchesHandlerFromDB(totalFeet: width).feet
            let widthInches = feetAndInchesHandlerFromDB(totalFeet: width).inches
            
            let lengthFeet = feetAndInchesHandlerFromDB(totalFeet: length).feet
            let lengthInches = feetAndInchesHandlerFromDB(totalFeet: length).inches
            
            vehicleNameTextField.text = vehicleName
            heightFeetTextField.text = String(heightFeet)
            heightInchesTextField.text = String(heightInches)
            widthFeetTextField.text = String(widthFeet)
            widthInchesTextField.text = String(widthInches)
            lengthFeetTextField.text = String(lengthFeet)
            lengthInchesTextField.text = String(lengthInches)
            weightTextField.text = String(vehicleWeight)
            axelCountTextField.text = String(axelCount)
            duelWheelSwitch.isOn = duelTire
            
            let vehicleType: String
            switch vehicleTypeFromDB {
            case VehicleClassDataBaseRepresentation.classA.rawValue:
                vehicleType = VehicleClassDisplayString.classA.rawValue
            case VehicleClassDataBaseRepresentation.classB.rawValue:
                vehicleType = VehicleClassDisplayString.classB.rawValue
            case VehicleClassDataBaseRepresentation.classC.rawValue:
                vehicleType = VehicleClassDisplayString.classC.rawValue
            case VehicleClassDataBaseRepresentation.fifthWheel.rawValue:
                vehicleType = VehicleClassDisplayString.fifthWheel.rawValue
            case VehicleClassDataBaseRepresentation.tagalong.rawValue:
                vehicleType = VehicleClassDisplayString.tagalong.rawValue
            default:
                return
            }
            rvTypeTextField.text = vehicleType
            
            addEditVehicleBarLabel.text = "Edit Vehicle"
            addEditVehicleLabel.text = "Edit \(vehicleName)"
        } else {
            addEditVehicleBarLabel.text = "Add Vehicle"
            addEditVehicleLabel.text = "Add New Vehicle"
        }
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
    
    private func dismissTapGestureRecogniser() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    private func buttonUISetup() {
        //cancel button
        cancelButton.layer.borderWidth = 0.4
        cancelButton.layer.borderColor = UIColor.babyBlue.cgColor
        cancelButton.layer.cornerRadius = 4
        //add button
        addButton.layer.cornerRadius = 4
        if let _ = vehicle {
            addButton.setTitle("Save", for: .normal)
        } else {
            addButton.setTitle("Add", for: .normal)
        }
    }
    
   override func textFieldDidBeginEditing(_ textField: UITextField) {
        if textField == rvTypeTextField {
            view.endEditing(true)
            performSegue(withIdentifier: "ShowRVTypesSegue", sender: self)
        }
    }
    
    private func feetAndInchesHandlerToDB(feet: String, inches: String) -> Float {
        guard let feetFloat = Float(feet),
            let inchesFloat = Float(inches) else { return 0.0 }
        //convert heightFloat to inches
        let feetInInches: Float = feetFloat * 12.0
        
        var totalInInches: Float = feetInInches + inchesFloat
        totalInInches /= 12
        return totalInInches
    }
    
    private func feetAndInchesHandlerFromDB(totalFeet: Float) -> (feet: Int, inches: Int) {
        let feet = Int(floor(totalFeet))
        var decimal = totalFeet.truncatingRemainder(dividingBy: 1)
        decimal *= 12
        let inches = Int(roundf(decimal))
        return (feet, inches)
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowRVTypesSegue" {
            guard let pickerVC = segue.destination as? RVTypePickerViewController else { return }
            pickerVC.rvTypeDelegate = self
        }
    }
    
    // MARK: - IBActions
    @IBAction func cancelTapped(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    
    @IBAction func addVehicleTapped(_ sender: UIButton) {
        guard let vehicleName = vehicleNameTextField.text,
            let heightFeet = heightFeetTextField.text,
            let heightInches = heightInchesTextField.text,
            let widthFeet = widthFeetTextField.text,
            let widthInches = widthInchesTextField.text,
            let lengthFeet = lengthFeetTextField.text,
            let lengthInches = lengthInchesTextField.text,
            let weightString = weightTextField.text,
            let vehicleWeight = Float(weightString),
            let axelCountString = axelCountTextField.text,
            let vehicleAxelCount = Int(axelCountString),
            let vehicleTypeString = rvTypeTextField.text else {
                #warning("Add better error handling here")
                return
            }
        
        let vehicleType: String
        switch vehicleTypeString {
        case VehicleClassDisplayString.classA.rawValue:
            vehicleType = VehicleClassDataBaseRepresentation.classA.rawValue
        case VehicleClassDisplayString.classB.rawValue:
            vehicleType = VehicleClassDataBaseRepresentation.classB.rawValue
        case VehicleClassDisplayString.classC.rawValue:
            vehicleType = VehicleClassDataBaseRepresentation.classC.rawValue
        case VehicleClassDisplayString.fifthWheel.rawValue:
            vehicleType = VehicleClassDataBaseRepresentation.fifthWheel.rawValue
        case VehicleClassDisplayString.tagalong.rawValue:
            vehicleType = VehicleClassDataBaseRepresentation.tagalong.rawValue
        default:
            return
        }
        
        let vehicleHeight = feetAndInchesHandlerToDB(feet: heightFeet, inches: heightInches)
        let vehicleWidth = feetAndInchesHandlerToDB(feet: widthFeet, inches: widthInches)
        let vehicleLength = feetAndInchesHandlerToDB(feet: lengthFeet, inches: lengthInches)
        
        let newVehicle = Vehicle(id: nil, name: vehicleName, height: vehicleHeight, weight: vehicleWeight, width: vehicleWidth, length: vehicleLength, axelCount: vehicleAxelCount, vehicleClass: vehicleType, dualTires: duelWheelSwitch.isOn, trailer: nil)
        
        if let vehicle = vehicle,
            let id = vehicle.id {
            newVehicle.id = id
            vehicleController?.editVehicle(with: newVehicle, vehicleID: id, completion: { (error) in
                if let error = error {
                    print("Error Editing vehicle: \(error)")
                } else {
                    DispatchQueue.main.async {
                        self.navigationController?.popViewController(animated: true)
                    }
                }
            })
        } else {
            vehicleController?.createVehicle(with: newVehicle) { error in
                if let error = error {
                    NSLog("Error Creating Vehicle \(error)")
                } else {
                    DispatchQueue.main.async {
                        self.navigationController?.popViewController(animated: true)
                    }
                }
            }
        }
        
        
    }
}

// MARK: - Extensions

extension AddVehicleViewController: RVTypePickerDelegate {
    func typeOfRVWasChosen(RVType: String) {
        rvTypeTextField.text = RVType
    }
}
