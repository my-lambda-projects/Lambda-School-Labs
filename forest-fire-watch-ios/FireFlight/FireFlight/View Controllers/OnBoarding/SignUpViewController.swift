//
//  SignUpViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/20/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import Lottie

class SignUpViewController: UIViewController, UITextFieldDelegate {
    

    var apiController: APIController?
    let network = NetworkManager.sharedInstance
    
    @IBOutlet weak var animationView: AnimationView!
    @IBOutlet weak var iconImageView: UIImageView!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBOutlet weak var signUpButton: UIButton!
    @IBOutlet weak var signInButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        stylize()
        passwordTextField.delegate = self
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(self.dismissKeyboard (_:)))
        self.view.addGestureRecognizer(tapGesture)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        NetworkManager.isUnreachable { _ in
            self.performSegue(withIdentifier: "NetworkUnavailable", sender: self)
        }
    }
    

    func stylize() {
        animationView.backgroundColor = .clear
        
        signUpButton.layer.cornerRadius = 10
        signUpButton.setTitleColor(AppearanceHelper.ming, for: .normal)
        signUpButton.backgroundColor = .white
        
        usernameTextField.backgroundColor = AppearanceHelper.ming
        usernameTextField.textColor = .white
        usernameTextField.attributedPlaceholder = NSAttributedString(string: "Username", attributes: [NSAttributedString.Key.foregroundColor: UIColor.lightText])
        
        passwordTextField.backgroundColor = AppearanceHelper.ming
        passwordTextField.textColor = .white
        passwordTextField.attributedPlaceholder = NSAttributedString(string: "Password", attributes: [NSAttributedString.Key.foregroundColor: UIColor.lightText])
        
        iconImageView.image = UIImage(named: "FFLogo2")
        
        let gradient = CAGradientLayer()
        gradient.colors = [AppearanceHelper.macAndCheese.cgColor, AppearanceHelper.begonia.cgColor, AppearanceHelper.turkishRose.cgColor, AppearanceHelper.oldLavender.cgColor, AppearanceHelper.ming.cgColor]
        gradient.frame = view.bounds
        view.layer.insertSublayer(gradient, at: 0)

    }
    
    
    @IBAction func signUpButtonPressed(_ sender: Any) {
        
        var username: String?
        var password: String?
        if usernameTextField.text != "" && passwordTextField.text != "" {
            username = usernameTextField.text
            password = passwordTextField.text
        } else {
            NSLog("Entered username or password is not valid")
            return
        }
        
        startLoadingAnimation()
        
        apiController?.registerUser(username: username!, password: password!, completion: { (error, customError) in
            if let error = error {
                NSLog("Error registering user: \(error)")
                return
            } else if let customError = customError {
                NSLog(customError)
                DispatchQueue.main.async {
                    self.stopLoadingAnimation()
                    let alert = UIAlertController(title: "Error Logging In", message: customError, preferredStyle: .alert)
                    let dimissAction = UIAlertAction(title: "Ok", style: .default, handler: nil)
                    alert.addAction(dimissAction)
                    self.present(alert, animated: true, completion: nil)
                }
                return
            }
            
            DispatchQueue.main.async {
                self.stopLoadingAnimation()
                self.performSegue(withIdentifier: "RegisterToMap", sender: self)
                let appDelegate = UIApplication.shared.delegate as! AppDelegate
                appDelegate.registerForPushNotifications()
            }
        })
    }
    
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    
    @objc func dismissKeyboard(_ sender: UIGestureRecognizer) {
        usernameTextField.resignFirstResponder()
        passwordTextField.resignFirstResponder()
    }
    
    func startLoadingAnimation() {
        signUpButton.isEnabled = false
        animationView.isHidden = false
        animationView.animation = Animation.named("loaderMacAndCheese")
        animationView.loopMode = .loop
        animationView.play()
    }
    
    func stopLoadingAnimation() {
        signUpButton.isEnabled = true
        animationView.isHidden = true
        animationView.stop()
    }
    
    
    
    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SignUpToLogIn" {
            guard let destinationVC = segue.destination as? LogInViewController else { return }
            destinationVC.apiController = apiController
        }
        else if segue.identifier == "RegisterToMap" {
            guard let destinationVC = segue.destination as? MapViewController else { return }
            destinationVC.apiController = apiController
        }
    }
 

}
