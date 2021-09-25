//
//  AddVehicleViewController+TextFieldFlow.swift
//  RVNav
//
//  Created by Jake Connerly on 1/16/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit

extension AddVehicleViewController {
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case vehicleNameTextField:
            if let vehicleName = vehicleNameTextField.text,
                !vehicleName.isEmpty {

                dismissKeyboard()
                heightFeetTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                vehicleNameTextField.becomeFirstResponder()
                return false
            }
        case heightFeetTextField:
            if let heightFeet = heightFeetTextField.text,
                !heightFeet.isEmpty {
                dismissKeyboard()
                heightInchesTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                heightFeetTextField.becomeFirstResponder()
                return false
            }
        case heightInchesTextField:
            if let heightInches = heightInchesTextField.text,
                !heightInches.isEmpty {
                dismissKeyboard()
                widthFeetTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                heightInchesTextField.becomeFirstResponder()
                return false
            }
        case widthFeetTextField:
            if let widthFeet = widthFeetTextField.text,
                !widthFeet.isEmpty {
                dismissKeyboard()
                widthInchesTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                widthFeetTextField.becomeFirstResponder()
                return false
            }
        case widthInchesTextField:
            if let widthInches = widthFeetTextField.text,
                !widthInches.isEmpty {
                dismissKeyboard()
                lengthFeetTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                widthInchesTextField.becomeFirstResponder()
                return false
            }
        case lengthFeetTextField:
            if let lengthFeet = lengthFeetTextField.text,
                !lengthFeet.isEmpty {
                dismissKeyboard()
                lengthInchesTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                lengthFeetTextField.becomeFirstResponder()
                return false
            }
        case lengthInchesTextField:
            if let widthInches = lengthInchesTextField.text,
                !widthInches.isEmpty {
                dismissKeyboard()
                weightTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                lengthInchesTextField.becomeFirstResponder()
                return false
            }
        case weightTextField:
            if let vehicleWeight = weightTextField.text,
                !vehicleWeight.isEmpty {
                dismissKeyboard()
                axelCountTextField.becomeFirstResponder()
                return true
            } else {
                dismissKeyboard()
                weightTextField.becomeFirstResponder()
                return false
            }
        case axelCountTextField:
            if let axelCount = axelCountTextField.text,
                !axelCount.isEmpty {
                dismissKeyboard()
                return true
            } else {
                dismissKeyboard()
                axelCountTextField.becomeFirstResponder()
                return false
            }
        default:
            return true
        }
    }
}
