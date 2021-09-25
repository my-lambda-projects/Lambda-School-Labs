//
//  VehiclesTableViewController.swift
//  RVNav
//
//  Created by Ryan Murphy on 8/28/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import UIKit


class VehiclesTableViewController: UITableViewController {

    var networkController = WebRESTAPINetworkController()
    var vehicles: [Vehicle] = []
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.reloadData()
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        fetchVehicles()
        tableView.reloadData()
    }

    private func fetchVehicles() {
        networkController.getVehicles { (vehicles, error) in
            if let error = error {
                NSLog("Error fetching Vehicles: \(error)")
                return
            }
            if let vehicles = vehicles {
                self.vehicles = vehicles
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }
    // MARK: - Table view data source


    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return vehicles.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "VehicleCell", for: indexPath)

        let vehicle = vehicles[indexPath.row]
        cell.textLabel?.text = vehicle.name

        return cell
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            
            let vehicle = vehicles[indexPath.row]
            guard let id = vehicle.id else { return }
            networkController.deleteVehicle(id: id) { (error) in
                if let error = error {
                    NSLog("Error deleting: \(error)")
                }
                self.vehicles.remove(at: indexPath.row)
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
            
        }
    }
    
    
    // MARK: - Navigation

   
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "AddVehicleSegue" {
            
            
        }
        
//        if segue.identifier == "EditVehicleSegue" {
//            guard let destinationVC = segue.destination as? VehicleFormViewController,
//            let index = tableView.indexPathForSelectedRow else { return }
//            let vehicle = vehicles[index.row]
//            destinationVC.vehicle = vehicle
//            
//        }
        
    }
    

}
