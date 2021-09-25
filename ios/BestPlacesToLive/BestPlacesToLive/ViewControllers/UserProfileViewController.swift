//
//  UserProfileViewController.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 9/13/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import Photos

class UserProfileViewController: UIViewController {
    
    
    let userController = UserController()
    
    
    private var originalImage: UIImage? {
        didSet {
            updateImageView()
        }
    }
    
    
    @IBOutlet weak var profilePhotoView: UIView!
    
    @IBOutlet weak var userImageView: UIImageView!
    
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var userNameTextField: UITextField!
    
    @IBOutlet weak var emailTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

     //   profilePhotoView.layer.cornerRadius = profilePhotoView.frame.width / 2
        userImageView.clipsToBounds = true
    }
    
    private func updateImageView() {
        
        guard let image = originalImage else { return }
        userImageView.image = image
       userImageView.layer.cornerRadius = userImageView.frame.width / 2
       // profilePhotoView.layer.cornerRadius = profilePhotoView.frame.width / 2
        userImageView.clipsToBounds = true
    }
    
    
    
    
    @IBAction func saveProfileUpdatesButtonTapped(_ sender: Any) {
        
        var userName = userNameTextField.text
        if userName == "" {
            userName = nil
        }
        var password = passwordTextField.text
        if password == "" {
            password = nil
        }
        var email = emailTextField.text
        if email == "" {
            email = nil
        }
   
        let user = UpdateUser(name: userName, email: email, password: password)
        
        
        userController.updateUser(user: user) { (loggedUser, error) in
            
            if let error = error {
                DispatchQueue.main.async {
                    let alertController = UIAlertController(title: "Error saving city", message: "\(error)", preferredStyle: .alert)
                    let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                    alertController.addAction(alertAction)
                    self.present(alertController, animated: true)
                }
            }
            DispatchQueue.main.async {
                let alertController = UIAlertController(title: "Success!", message: "Profile Info Updated.", preferredStyle: .alert)
                let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
                alertController.addAction(alertAction)
                self.present(alertController, animated: true)
            }
        }
    }
    
    
    @IBAction func backButtonTapped(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    
    @IBAction func changeProfileButtonTapped(_ sender: Any) {
        
        let authorizationStatus = PHPhotoLibrary.authorizationStatus()
        
        switch authorizationStatus {
        case .authorized:
            presentImagePicker()
        case .notDetermined:
            PHPhotoLibrary.requestAuthorization { (status) in
                guard status == .authorized else {
                    NSLog("user did not authoize us access to photo library")
                    self.presentInformationalAlertController(title: "Error", message: "We need access to your photo Library in order to post pictures")
                    return
                }
                
                self.presentImagePicker()
            }
        case .restricted:
            self.presentInformationalAlertController(title: "Error", message: "You have been Restricted from using this feature")
        case .denied:
            self.presentInformationalAlertController(title: "Error", message: "We need access to your photo Library in order to post pictures")
        @unknown default:
            break
        }
    }
    
    
    
    
    @IBAction func changePhotoButtonTapped(_ sender: Any) {
        
        let authorizationStatus = PHPhotoLibrary.authorizationStatus()
        
        switch authorizationStatus {
        case .authorized:
            presentImagePicker()
        case .notDetermined:
            PHPhotoLibrary.requestAuthorization { (status) in
                guard status == .authorized else {
                    NSLog("user did not authoize us access to photo library")
                    self.presentInformationalAlertController(title: "Error", message: "We need access to your photo Library in order to post pictures")
                    return
                }
                
                self.presentImagePicker()
            }
        case .restricted:
            self.presentInformationalAlertController(title: "Error", message: "You have been Restricted from using this feature")
        case .denied:
            self.presentInformationalAlertController(title: "Error", message: "We need access to your photo Library in order to post pictures")
        @unknown default:
            break
        }
    }
    
    private func presentImagePicker() {
        
        guard UIImagePickerController.isSourceTypeAvailable(.photoLibrary) else {
            presentInformationalAlertController(title: "Error", message: "The photo library is unavailable")
            return
            
        }
        
        let imagePicker = UIImagePickerController()
        imagePicker.delegate = self
        imagePicker.sourceType = .photoLibrary
        present(imagePicker, animated: true, completion: nil)
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

extension UserProfileViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        picker.dismiss(animated: true, completion: nil)
        
        originalImage = info[.originalImage] as? UIImage
        
    }
    
}
