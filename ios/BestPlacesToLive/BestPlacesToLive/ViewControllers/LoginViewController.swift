//
//  LoginViewController.swift
//  BestPlacesToLive
//
//  Created by Thomas Cacciatore on 8/26/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import MaterialComponents.MaterialTextFields

enum LoginType {
    case signUp
    case signIn
}

class LoginViewController: UIViewController {
    
    var loginController = LoginController()
    var loginType = LoginType.signUp

    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var loginTypeSegmentedControl: UISegmentedControl!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var password2TextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        styleButton()
    }
    
    func styleButton() {
        loginButton.layer.cornerRadius = 10
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        
            if loginType == .signUp {
                if let name = usernameTextField.text,
                    !name.isEmpty,
                    let email = emailTextField.text,
                    !email.isEmpty,
                    let password = passwordTextField.text,
                    !password.isEmpty,
                    let password2 = password2TextField.text,
                    !password2.isEmpty {
                    let user = User(name: name, email: email, password: password, password2: password2)
                
                loginController.signUp(with: user) { (error) in
                    if let error = error {
                        DispatchQueue.main.async {
                            let alertController = UIAlertController(title: "Error signing up", message: "\(error)", preferredStyle: .alert)
                            let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                            alertController.addAction(alertAction)
                            self.present(alertController, animated: true)
                            print("Error occured during sign up: \(error)")
                        }
                    } else {
                        DispatchQueue.main.async {
                            let alertController = UIAlertController(title: "Sign Up Successful", message: "Now please log in.", preferredStyle: .alert)
                            let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                            alertController.addAction(alertAction)
                            self.present(alertController, animated: true, completion: {
                                self.loginType = .signIn
                                self.loginTypeSegmentedControl.selectedSegmentIndex = 1
                                self.loginButton.setTitle("Sign In", for: .normal)
                                self.usernameTextField.isHidden = true
                                self.password2TextField.isHidden = true
                            })
                        }
                    }
                }
            }
                
            } else {
                    if let email = emailTextField.text,
                        !email.isEmpty,
                        let password = passwordTextField.text,
                        !password.isEmpty {
                        let signInUser = SignInUser(email: email, password: password)
                        
                loginController.signIn(with: signInUser) { (error) in
                    if let error = error {
                        DispatchQueue.main.async {
                            let alertController = UIAlertController(title: "Error signing in", message: "\(error)", preferredStyle: .alert)
                            let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                            alertController.addAction(alertAction)
                            self.present(alertController, animated: true)
                            print("Error occured during sign in: \(error)")
                        }
                    } else {
                        UserDefaults.standard.set(self.loginController.bearer?.token, forKey: "token")
                        UserDefaults.standard.set(self.loginController.bearer?.name, forKey: "userName")
                        
                        DispatchQueue.main.async {
                            print("Log In Success!")
                            self.dismiss(animated: true, completion: nil)
                        }
                    }
                }
            }
        }
        
        
    }
    
    @IBAction func signInTypeChanged(_ sender: UISegmentedControl) {
        
        if sender.selectedSegmentIndex == 0 {
            loginType = .signUp
            loginButton.setTitle("Sign Up", for: .normal)
            password2TextField.isHidden = false
            usernameTextField.isHidden = false
        } else {
            loginType = .signIn
            loginButton.setTitle("Sign In", for: .normal)
            password2TextField.isHidden = true
            usernameTextField.isHidden = true
            
        }
    }
    
    @IBAction func backButtonTapped(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    
}
