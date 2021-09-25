//
//  OnboardingViewController.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 12/17/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit
import GoogleSignIn
import FacebookCore
import FacebookLogin

struct FormData {
    var email: String?
    var password: String?
    var password2: String?
    var username: String?
    var firstname: String?
    var lastname: String?
    var age: Int?
    func readyPage1() ->  Bool {
        guard let email = self.email,
            !email.isEmpty,
            let password = self.password,
            !password.isEmpty,
            let password2 = self.password2,
            !password2.isEmpty,
            self.password == self.password2 else {
                return false
        }
        return true
    }
    func readyPage2() ->  Bool {
        guard let username = self.username,
            !username.isEmpty,
            let firstname = self.firstname,
            !firstname.isEmpty,
            let lastname = self.lastname,
            !lastname.isEmpty,
            let _ = self.age else {
                return false
        }
        return true
    }
}

class OnboardingViewController: ShiftableViewController {
    
    // MARK: - Properties
    private var formData = FormData()
    var userController: UserControllerProtocol!
    
    // MARK: - IBOutlets
    @IBOutlet weak var backgroundImageView: UIImageView!
    @IBOutlet weak var backgroundImageContainerView: UIView!
    @IBOutlet weak var googleSignInButton: UIButton!
    @IBOutlet weak var facebookSignInButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var password2TextField: UITextField!
    @IBOutlet weak var signInButton: UIButton!
    @IBOutlet weak var signUpButton: UIButton!
    
    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        if #available(iOS 13.0, *) {
            overrideUserInterfaceStyle = .light
        }
        UISetup()
        tapOutsideToDismissKeyBoard()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        switch segue.identifier {
        case "Onboarding2":
            guard let vc = segue.destination as? Onboarding2ViewController else { return }
            vc.formData = self.formData
            vc.userController = userController
        default:
            break
        }
    }
    
    // MARK: - Private Methods
    private func UISetup() {
        googleFacebookButtonUISetup()
        signUpButtonUISetup()
        signInButton.setTitleColor(.babyBlue, for: .normal)
    }
    
    private func googleFacebookButtonUISetup() {
        //Google Button UI Set Up
        googleSignInButton.layer.cornerRadius = 4
        googleSignInButton.layer.maskedCorners = [.layerMinXMaxYCorner, .layerMinXMinYCorner]
        googleSignInButton.layer.borderWidth = 0.2
        
        //Facebook Button UI Set Up
        facebookSignInButton.layer.cornerRadius = 4
        facebookSignInButton.layer.maskedCorners = [.layerMaxXMaxYCorner, .layerMaxXMinYCorner]
        googleSignInButton.layer.borderWidth = 0.2
    }
    
    private func signUpButtonUISetup() {
        signUpButton.layer.borderWidth = 0.4
        signUpButton.layer.cornerRadius = 4
        if self.formData.readyPage1() {
            signUpButton.isEnabled = true
            signUpButton.backgroundColor = .babyBlue
        } else {
            signUpButton.isEnabled = false
            signUpButton.backgroundColor = .clear
        }
    }
    
    private func tapOutsideToDismissKeyBoard() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }
    
    // MARK: - IBActions

    @IBAction func signupWithGoogleTapped(_ sender: UIButton) {
        GIDSignIn.sharedInstance().presentingViewController = self
        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().signIn()
    }
    
    @IBAction func signUpWithFacebookTapped(_ sender: UIButton) {
        LoginManager().logIn(permissions: ["email", "public_profile"], from: self) { (result, error) in
            if let error = error {
                NSLog("Error signing up with facebook:\(error)")
                return
            }
            self.signUpWithFacebook()
        }
    }
    
    private func signUpWithFacebook() {
        GraphRequest(graphPath: "/me", parameters: ["fields" : "id, name, email"]).start { (connection, result, error) in
            if let error = error {
                NSLog("Error getting FB graph request: \(error)")
                return
            }
            guard let result = result as? [String: String],
                let emailFromFacebook: String = result["email"],
                let idFromFacebook: String = result["id"],
                let fullNameFromFacebook: String = result["name"] else { return }
            
            var names = fullNameFromFacebook.components(separatedBy: " ")
            var firstName = ""
            var lastName = ""
            if names.count > 0 {
                firstName = names.removeFirst()
                lastName = names.joined(separator: " ")
            }
            
            let facebookUser = User(firstName: firstName, lastName: lastName, password: idFromFacebook, email: emailFromFacebook, username: fullNameFromFacebook)
            self.userController.register(with: facebookUser) { (error) in
                if let error = error {
                    NSLog("Error signing up with Facebook: \(error)")
                    DispatchQueue.main.async {
                        let alert = UIAlertController(title: "Username or Password incorrect", message: "Please try again.", preferredStyle: .alert)
                        let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                        alert.addAction(alertAction)
                        
                        self.present(alert, animated: true)
                    }
                }
                
                
                DispatchQueue.main.async {
                    let facebookSignInInfo = SignInInfo(email: emailFromFacebook, password: idFromFacebook)
                    self.userController.signIn(with: facebookSignInInfo) { (_, error) in
                        if let error = error {
                            NSLog("Error when signing in with google after registration:\(error)")
                            return
                        }
                        DispatchQueue.main.async {
                            self.performSegue(withIdentifier: "unwindToMapView", sender: self)
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Extensions
extension OnboardingViewController {

    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
        switch textField {
        case emailTextField:
            guard let email = emailTextField.text,
                !email.isEmpty,
                email.isValidEmail() else {
                    let emailAlert = UIAlertController(title: "Error", message: "This email is invalid.", preferredStyle: .alert)
                    emailAlert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(emailAlert, animated: true) {
                        DispatchQueue.main.async {
                            self.emailTextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            formData.email = email
            dismissKeyboard()
            emailTextField.resignFirstResponder()

        case passwordTextField:
            guard let password = passwordTextField.text,
                !password.isEmpty else {
                    let password1Alert = UIAlertController(title: "Error", message: "You must enter a password.", preferredStyle: .alert)
                    password1Alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(password1Alert, animated: true) {
                        DispatchQueue.main.async {
                            self.passwordTextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            formData.password = password
            dismissKeyboard()
            passwordTextField.resignFirstResponder()

        case password2TextField:
            guard let password2 = password2TextField.text,
                !password2.isEmpty else {
                    let password2Alert = UIAlertController(title: "Error", message: "You must enter the matching password.", preferredStyle: .alert)
                    password2Alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(password2Alert, animated: true) {
                        DispatchQueue.main.async {
                            self.password2TextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            if password2 != formData.password {
                let passwordMatchAlert = UIAlertController(title: "Error", message: "Passwords do not match.", preferredStyle: .alert)
                passwordMatchAlert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                present(passwordMatchAlert, animated: true) {
                    DispatchQueue.main.async {
                        self.password2TextField.text = ""
                        self.password2TextField.resignFirstResponder()
                    }
                }
            }
            formData.password2 = password2
            dismissKeyboard()
            signUpButtonUISetup()
            password2TextField.resignFirstResponder()
        default:
            return true
        }
        return true
    }

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case emailTextField:
            guard let email = emailTextField.text,
                !email.isEmpty,
                email.isValidEmail() else {
                    let emailAlert = UIAlertController(title: "Error", message: "This email is invalid.", preferredStyle: .alert)
                    emailAlert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(emailAlert, animated: true) {
                        DispatchQueue.main.async {
                            self.emailTextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            formData.email = email
            dismissKeyboard()
            passwordTextField.becomeFirstResponder()

        case passwordTextField:
            guard let password = passwordTextField.text,
                !password.isEmpty else {
                    let password1Alert = UIAlertController(title: "Error", message: "You must enter a password.", preferredStyle: .alert)
                    password1Alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(password1Alert, animated: true) {
                        DispatchQueue.main.async {
                            self.passwordTextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            formData.password = password
            dismissKeyboard()
            password2TextField.becomeFirstResponder()

        case password2TextField:
            guard let password2 = password2TextField.text,
                !password2.isEmpty else {
                    let password2Alert = UIAlertController(title: "Error", message: "You must enter the matching password.", preferredStyle: .alert)
                    password2Alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    present(password2Alert, animated: true) {
                        DispatchQueue.main.async {
                            self.password2TextField.resignFirstResponder()
                        }
                    }
                    return true
            }
            if password2 != formData.password {
                let passwordMatchAlert = UIAlertController(title: "Error", message: "Passwords do not match.", preferredStyle: .alert)
                passwordMatchAlert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                present(passwordMatchAlert, animated: true) {
                    DispatchQueue.main.async {
                        self.password2TextField.text = ""
                        self.password2TextField.resignFirstResponder()
                    }
                }
            }
            formData.password2 = password2
            dismissKeyboard()
            signUpButtonUISetup()
            password2TextField.resignFirstResponder()
        default:
            return true
        }
        return true
    }
}

extension OnboardingViewController: GIDSignInDelegate {
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        if let error = error {
            NSLog("Error logging in user with google :\(error)")
            return
        }
        
        guard let googleUser = user else { return }
        guard let firstName = googleUser.profile.givenName,
            let lastName = googleUser.profile.familyName,
            let googleEmail = googleUser.profile.email,
            let googlePassword = googleUser.userID else { return }
        
        let userToRegister = User(firstName: firstName, lastName: lastName, password: googlePassword, email: googleEmail, username: googleEmail)
        
        userController.register(with: userToRegister) { (error) in
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
                let googleSignInInfo = SignInInfo(email: googleEmail, password: googlePassword)
                self.userController.signIn(with: googleSignInInfo) { (_, error) in
                    if let error = error {
                        NSLog("Error when signing in with google after registration:\(error)")
                        return
                    }
                    DispatchQueue.main.async {
                        self.performSegue(withIdentifier: "unwindToMapView", sender: self)
                    }
                }
            }
        }
    }
}

extension OnboardingViewController: LoginButtonDelegate {
    func loginButton(_ loginButton: FBLoginButton, didCompleteWith result: LoginManagerLoginResult?, error: Error?) {
    }
    
    func loginButtonDidLogOut(_ loginButton: FBLoginButton) {
    }
    
    
}

