//
//  DirectionsSearchTableViewController.swift
//  RVNav
//
//  Created by Jonathan Ferrer on 8/30/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit
import MapboxGeocoder

class DirectionsSearchTableViewController: UITableViewController, UISearchBarDelegate, UIPickerViewDelegate, UIPickerViewDataSource {
    
    
    @IBOutlet weak var vehiclePickerView: UIPickerView!
    @IBOutlet weak var startSearchBar: UISearchBar!
    let networkController = WebRESTAPINetworkController()
    let geocoder = Geocoder.shared
    var vehicles: [Vehicle] = [] {
        didSet {
            DispatchQueue.main.async {
                self.vehiclePickerView.reloadAllComponents()
                self.vehiclePickerView.selectRow(RVSettings.shared.selectedVehicleIndex, inComponent: 0, animated: false)
                RVSettings.shared.selectedVehicle = self.vehicles[self.vehiclePickerView.selectedRow(inComponent: 0)]
            }
//
        }
    }
    
    var directionsController: MapBoxDirectionsController?
    var addresses: [Placemark] = []
    let defaults = UserDefaults.standard

    override func viewDidLoad() {
        super.viewDidLoad()
        startSearchBar.delegate = self
        vehiclePickerView.delegate = self
        vehiclePickerView.dataSource = self
        fetchVehicles()

        // Line 41 to 52 dismiss keyboard when user taps off of the text field.
        //Looks for single or multiple taps.
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        
        view.addGestureRecognizer(tap)
    }
    
    //Calls this function when the tap is recognized.
    @objc func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }

    // Gets all the vehicles for the current user from the backend.  If there are no vehicles currently stored, a default vehicle is used.
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }

    // Gets all the vehicles for the current user from the backend.  If there are no vehicles currently stored, a default vehicle is used.

    private func fetchVehicles() {
        networkController.getVehicles { (vehicles, error) in
            if let error = error {
                NSLog("Error fetching Vehicles: \(error)")
                return
            }
            if let vehicles = vehicles {
                if vehicles.count == 0 {
    //                self.vehicles = [Vehicle(id: 0, name: "Default", height: 11, weight: 30_000.0, width: 9.5, length: 32, axelCount: 2, vehicleClass: "A", dualTires: true, trailer: false)]
                } else {
                    self.vehicles = vehicles
                }
            }
        }
    }


    // Line 75 to 89 setup the pickerView with fetched user vehicles.

    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return vehicles.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        let vehicle = vehicles[row]
        return vehicle.name
    }

    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        RVSettings.shared.selectedVehicle = vehicles[row]
        RVSettings.shared.selectedVehicleIndex = row
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        guard let searchTerm = startSearchBar.text,
        let directionsController = directionsController else { return }
        directionsController.search(with: searchTerm) { (addresses) in
            if let addresses = addresses {
                self.addresses = addresses
                self.tableView.reloadData()
            }
        }
    }

    @IBAction func backButtonPressed(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }

    // MARK: - Table view data source
   override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return addresses.count
    }


    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "AddressCell", for: indexPath)
        let address = addresses[indexPath.row]

        cell.textLabel?.text = address.qualifiedName

        return cell
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let directionsController = directionsController else { return }
        let address = addresses[indexPath.row]
        directionsController.destinationAddress = address
        dismiss(animated: true, completion: nil)
    }


}


