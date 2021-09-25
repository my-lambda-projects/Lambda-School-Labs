//
//  SignInViewController.swift
//  RVNav
//
//  Created by Jake Connerly on 12/16/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit
import GoogleSignIn
import FacebookCore
import FacebookLogin

class SignInViewController: ShiftableViewController {

    // MARK: - IBOutlets & Properties

    @IBOutlet weak var backgroundImageView: UIImageView!
    @IBOutlet weak var backgroundImageContainerView: UIView!
    @IBOutlet weak var googleSignInButton: UIButton!
    @IBOutlet weak var facebookSignInButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var signInButton: UIButton!
    @IBOutlet weak var signUpButton: UIButton!
    
    var userController: UserControllerProtocol?
    var progress = ARSLineProgress()
    
    // MARK: - View LifeCycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if #available(iOS 13.0, *) {
            overrideUserInterfaceStyle = .light
        }
        UISetup()
        tapOutsideToDismissKeyBoard()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SignUpSegue" {
            if let destinationVC = segue.destination as? OnboardingViewController {
                destinationVC.userController = userController
            }
        }
    }
    
    // MARK: - Private Methods
    
    private func UISetup() {
        googleSignInButtonSetup()
        facebookSignInButtonSetup()
        signInButtonButtonUISetup()
        signUpButton.setTitleColor(.babyBlue, for: .normal)
    }
    
    private func googleSignInButtonSetup() {
        googleSignInButton.layer.cornerRadius = 4
        googleSignInButton.layer.maskedCorners = [.layerMinXMaxYCorner, .layerMinXMinYCorner]
        googleSignInButton.layer.borderWidth = 0.2
    }
    
    private func facebookSignInButtonSetup() {
        facebookSignInButton.layer.cornerRadius = 4
        facebookSignInButton.layer.maskedCorners = [.layerMaxXMaxYCorner, .layerMaxXMinYCorner]
        facebookSignInButton.layer.borderWidth = 0.2
    }
    
    private func signInButtonButtonUISetup() {
        signInButton.layer.borderWidth = 0.4
        signInButton.layer.cornerRadius = 4
        if let email = emailTextField.text,
                !email.isEmpty,
            let password = passwordTextField.text,
            !password.isEmpty
        {
            signInButton.isEnabled = true
            signInButton.backgroundColor = .babyBlue
        } else {
            signInButton.isEnabled = false
            signInButton.backgroundColor = .clear
        }
    }
    
    private func tapOutsideToDismissKeyBoard() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
    
    private func loginWithFacebook() {
        GraphRequest(graphPath: "/me", parameters: ["fields" : "id, name, email"]).start { (connection, result, error) in
            if let error = error {
                NSLog("Error getting FB graph request: \(error)")
                return
            }
            guard let facebookUser = result as? [String: String],
                let emailFromFacebook: String = facebookUser["email"],
                let idFromFacebook: String = facebookUser["id"] else { return }
            DispatchQueue.main.async {
                let facebookSignInInfo = SignInInfo(email: emailFromFacebook, password: idFromFacebook)
                self.emailTextField.text = emailFromFacebook
                self.passwordTextField.text = idFromFacebook
                ARSLineProgress.show()
                self.userController?.signIn(with: facebookSignInInfo) { (_, error) in
                    if let error = error {
                        NSLog("Error signing up: \(error)")
                        DispatchQueue.main.async {
                            ARSLineProgress.showFail()
                            let alert = UIAlertController(title: "Username or Password incorrect", message: "Please try again.", preferredStyle: .alert)
                            let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                            alert.addAction(alertAction)
                            self.present(alert, animated: true)
                        }
                    }
                    DispatchQueue.main.async {
                        ARSLineProgress.showSuccess()
                        self.dismiss(animated: true, completion: nil)
                        ARSLineProgress.hide()
                    }
                }
            }
        }
    }
    
    // MARK: - IBActions
    
    @IBAction func signInButtonTapped(_ sender: UIButton) {
        guard let email = emailTextField.text,
            let password = passwordTextField.text,
            !email.isEmpty,
            !password.isEmpty else { return }
        
        let signInInfo = SignInInfo(email: email, password: password)
        userController?.signIn(with: signInInfo) { (_, error) in
            if let error = error {
                NSLog("Error signing up: \(error)")
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Username or Password incorrect", message: "Please try again.", preferredStyle: .alert)
                    let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                    alert.addAction(alertAction)
                    
                    self.present(alert, animated: true)
                }
            }
            DispatchQueue.main.async {
                self.dismiss(animated: true, completion: nil)
            }
        }
    }
    
    @IBAction func signInWithGoogleButtonTapped(_ sender: UIButton) {
        GIDSignIn.sharedInstance().presentingViewController = self
        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().signIn()
    }
    
    @IBAction func signInFacebookButtonTapped(_ sender: UIButton) {
        LoginManager().logIn(permissions: ["email", "public_profile"], from: self) { (result, error) in
            if let error = error {
                NSLog("Error signing up with facebook:\(error)")
                return
            }
            self.loginWithFacebook()
        }
    }
}

// MARK: - Extensions

extension SignInViewController {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case emailTextField:
            if let email = emailTextField.text,
                !email.isEmpty {
                signInButtonButtonUISetup()
                dismissKeyboard()
                passwordTextField.becomeFirstResponder()
                return true
            } else {
                signInButtonButtonUISetup()
                return false
            }
        case passwordTextField:
            if let password = passwordTextField.text,
                !password.isEmpty {
                signInButtonButtonUISetup()
                dismissKeyboard()
                signInButton.becomeFirstResponder()
                return true
            } else {
                return false
            }
        default:
            return true
        }
    }
}

extension SignInViewController: GIDSignInDelegate {
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        
        if let error = error {
            NSLog("Error logging in user with google :\(error)")
            return
        }
        
        guard let googleUser = user,
              let googleEmail = googleUser.profile.email,
              let googlePassword = googleUser.userID else { return }
        
        emailTextField.text = googleEmail
        passwordTextField.text = googlePassword
        
        let signInInfo = SignInInfo(email: googleEmail, password: googlePassword)
        
        userController?.signIn(with: signInInfo) { (_, error) in
            if let error = error {
                NSLog("Error signing up: \(error)")
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Username or Password incorrect", message: "Please try again.", preferredStyle: .alert)
                    let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                    alert.addAction(alertAction)
                    
                    self.present(alert, animated: true)
                }
                return
            }
            DispatchQueue.main.async {
                self.dismiss(animated: true, completion: nil)
            }
        }
    }
}

extension SignInViewController: LoginButtonDelegate {
    func loginButton(_ loginButton: FBLoginButton, didCompleteWith result: LoginManagerLoginResult?, error: Error?) {
    }
    
    func loginButtonDidLogOut(_ loginButton: FBLoginButton) {
        print("user has logged out of facebook")
    }
}
