//
//  EmailSignUpViewController.swift
//  Future-Hope
//
//  Created by Hector Steven on 8/20/19.
//  Copyright © 2019 Hector Steven. All rights reserved.
//

import UIKit

import Firebase

import MaterialComponents.MaterialTextFields
import MaterialComponents.MaterialButtons

class EmailSignUpViewController: UIViewController {

	@IBOutlet var fullNameTextField: MDCTextField!
	@IBOutlet var emailTextFields: MDCTextField!
	@IBOutlet var passwordTextField: MDCTextField!
	@IBOutlet var confirmPasswordTextField: MDCTextField!
	

	override func viewDidLoad() {
        super.viewDidLoad()
    }
	
	@IBAction func submitButtonPressed(_ sender: MDCButton) {
		guard let fullName = fullNameTextField.text,
			let email = emailTextFields.text,
			let password = passwordTextField.text,
			let confirmPassword = confirmPasswordTextField.text else { return }
		
		if !checkTextIsSafe(fullName: fullName, password: password, confirmPassword: confirmPassword) {
			return
		}

		Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
			if let error = error {
				
				NSLog("Error with Auth Sign In email/password: \(error)\n With authResult: \(authResult.debugDescription)")
				let alertController = ApplicationController().simpleActionSheetAllert(with: "Error Loging In with email/password with Sign Up", message: "Please Try Again!")
				self.present(alertController, animated: true)
				
				return
			}
			
			print("\(fullName) - \(email) - \(password)")
			// MARK: Save to User Defaults
			// MARK: send user data to firestore and new view
			// MARK: segue to app
			
		}
	}
	
	@IBAction func cancelButtonPressed(_ sender: MDCButton) {
		navigationController?.popViewController(animated: true)
	}
	
}

extension EmailSignUpViewController{
	
	private func checkTextIsSafe(fullName: String, password: String, confirmPassword: String) -> Bool{
		if fullName.isEmpty {
			let alertController = ApplicationController().simpleActionSheetAllert(with: "full name is empty", message: nil)
			present(alertController, animated: true)
			return false
		}else if password != confirmPassword {
			let alertController = ApplicationController().simpleActionSheetAllert(with: "passwords do not match", message: nil)
			present(alertController, animated: true)
			return false
		}else if !passwordIsSafe(with: password) {
			let alertController = ApplicationController().simpleActionSheetAllert(with: "please use a safe password", message: "password must be 6 characters")
			present(alertController, animated: true)
			return false
		}
		return true
	}
	
	private func passwordIsSafe(with password: String) -> Bool {
		// Mark: Check for valid passwor
		if password.count < 6 {
			return  false
		}
		return true
	}
	
	private func gooToMainView() {
//		guard let homeVC = storyboard?.instantiateViewController(withIdentifier: "HomeVC") as? ViewController else {
//			print("homeVC was not found!")
//			return
//		}
//		view.window?.rootViewController = homeVC
//		view.window?.makeKeyAndVisible()
	}
}
