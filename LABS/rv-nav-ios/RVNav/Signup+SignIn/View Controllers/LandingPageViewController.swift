//
//  LandingPageViewController.swift
//  RVNav
//
//  Created by Jake Connerly on 12/17/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit

class LandingPageViewController: UIViewController {
    
    // MARK: - Properties
    var userController: UserControllerProtocol?
    
    // MARK: - IBOutlets
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var getStartedButton: UIButton!
    
    // MARK: - View LifeCycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        buttonUISetup()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SignUpSegue" {
            if let destinationVC = segue.destination as? OnboardingViewController {
                destinationVC.userController = userController
            }
        }
    }
    
    // MARK: - IBActions & Methods
    //Get Started or Let's GO lead to the "Sign Up" Flow
    @IBAction func SignUpLetsGoButtonTapped(_ sender: UIButton) {
        performSegue(withIdentifier: "SignUpSegue", sender: self)
    }
    
    @IBAction func loginButtonTapped(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    
    // MARK: - Private Methods
    private func buttonUISetup() {
        // Login Button UI
        loginButton.layer.borderWidth = 1
        loginButton.layer.borderColor = UIColor.babyBlue.cgColor
        loginButton.titleLabel?.textColor = .babyBlue
        loginButton.layer.cornerRadius = 4
        
        // Get Started Button UI
        getStartedButton.backgroundColor = .mustardYellow
        getStartedButton.layer.cornerRadius = 4
    }
}

// MARK: - Extensions
extension LandingPageViewController: UIScrollViewDelegate {
}
