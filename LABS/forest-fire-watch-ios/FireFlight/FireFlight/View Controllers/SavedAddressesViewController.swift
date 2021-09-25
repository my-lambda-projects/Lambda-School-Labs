//
//  SavedAddressesViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/12/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class SavedAddressesViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var apiController: APIController?
    var selectedAddress: UserAddress?
    let network = NetworkManager.sharedInstance
    
    var addresses: [UserAddress]? {
        didSet { updateViews() }
    }
    
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var addressTableView: UITableView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addressTableView.delegate = self
        addressTableView.dataSource = self
        updateViews()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        getAddresses()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        NetworkManager.isUnreachable { _ in
            self.performSegue(withIdentifier: "NetworkUnavailable", sender: self)
        }
    }
    
    func updateViews() {
        DispatchQueue.main.async {
            self.stylize()
            self.addressTableView.reloadData()
        }
    }
    
    
    
    func stylize() {
        let closeImage = UIImage(named: "closeButton")
        let tintedImage = closeImage?.withRenderingMode(.alwaysTemplate)
        closeButton.setImage(tintedImage, for: .normal)
        closeButton.tintColor = AppearanceHelper.ming
        addressTableView.backgroundColor = .clear
        
        let gradient = CAGradientLayer()
        gradient.colors = [AppearanceHelper.macAndCheese.cgColor, AppearanceHelper.begonia.cgColor, AppearanceHelper.turkishRose.cgColor, AppearanceHelper.oldLavender.cgColor, AppearanceHelper.ming.cgColor]
        gradient.frame = view.bounds
        view.layer.insertSublayer(gradient, at: 0)
    }
    
    
    func getAddresses() {
        apiController?.getAddresses(completion: { (addresses, error) in
            if let error = error {
                NSLog("Error gettng user addresses: \(error)")
                return
            }
            self.addresses = addresses
        })
    }
    
    
    @IBAction func closeButtonPressed(_ sender: Any) {
        dismiss(animated: true, completion: {
            NotificationCenter.default.post(Notification(name: UIApplication.didBecomeActiveNotification))
        })
    }
    
    
    
    // MARK: TableView Delegate Functions
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return addresses?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = addressTableView.dequeueReusableCell(withIdentifier: "AddressCell"),
            let address = addresses?[indexPath.row] else { return UITableViewCell() }
        
        cell.selectionStyle = .default
        cell.textLabel?.text = address.label ?? "Address"
        cell.detailTextLabel?.text = address.address
        
        return cell
    }
    
    
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let address = addresses?[indexPath.row]
        self.selectedAddress = address
        performSegue(withIdentifier: "EditAddressSegue", sender: self)
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            
            guard let address = addresses?[indexPath.row],
            let id = address.id else { return }
            
            self.addresses?.remove(at: indexPath.row)
            apiController?.deleteAddress(id: id, completion: { (error) in
                if let error = error {
                    NSLog("Error deleting address: \(error)")
                    return
                }
            })
        }
    }
    
    
    // MARK: Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "EditAddressSegue" {
            let destinationVC = segue.destination as! NewAddressViewController
            destinationVC.apiController = apiController
            destinationVC.savedAddress = selectedAddress
        }
    }

}
