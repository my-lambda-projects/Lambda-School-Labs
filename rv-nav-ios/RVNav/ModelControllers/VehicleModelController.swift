//
//  VehicleModelController.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/15/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation
// MARK: - Protocols
protocol VehicleModelDataDelegate {
    func dataDidChange()
}

class VehicleModelController: VehicleModelControllerProtocol {
    // MARK: - Properties
    var networkController: NetworkControllerProtocol
    var userID: Int
    var delegate: VehicleModelDataDelegate?
    var vehicles: [Vehicle] = [] {
        didSet{
            delegate?.dataDidChange()
        }
    }
    
    // MARK: - Public Methods
    required init (userID: Int, networkController: NetworkControllerProtocol, delegate: VehicleModelDataDelegate? = nil) {
        self.networkController = networkController
        self.userID = userID
        self.delegate = delegate
        networkController.getVehicles(for: userID) { (vehicles, error) in
            if let error = error {
                print ("VehicleModelController: Failed to fetch vehicles: \(error)")
            }
            if let vehicles = vehicles {
                self.vehicles = vehicles
            }
        }
    }
    
    func createVehicle(with vehicle: Vehicle, completion: @escaping (Error?) -> Void) {
        networkController.createVehicle(with: vehicle, userID: userID) { (vehicle, error) in
            if let error = error {
                completion(error)
                return
            } else {
                if let vehicle = vehicle {
                    self.vehicles.append(vehicle)
                    completion(nil)
                    return
                }
            }
            
        }
    }
    
    func editVehicle(with vehicle: Vehicle, vehicleID: Int, completion: @escaping (Error?) -> Void) {
        networkController.editVehicle(with: vehicle, vehicleID: vehicleID, userID: userID) { (vehicle, error) in
            if let error = error {
                completion(error)
                return
            } else {
                if let vehicle = vehicle {
                    if let index = self.vehicles.firstIndex(where: {$0 == vehicle}) {
                        self.vehicles[index] = vehicle
                    }
                    completion(nil)
                    return
                }
            }
        }
        
    }
    
    func deleteVehicle(vehicle: Vehicle, completion: @escaping (Vehicle?, Error?) -> Void) {
        networkController.deleteVehicle(vehicle: vehicle, userID: userID) { (vehicle, error) in
            if let error = error {
                completion(nil,error)
                return
            } else {
                if let vehicle = vehicle {
                    if let index = self.vehicles.firstIndex(where: {$0 == vehicle}) {
                        self.vehicles.remove(at: index)
                    }
                    completion(vehicle,nil)
                    return
                }
            }
        }
    }
    
    func getVehicles(completion: @escaping ([Vehicle]?, Error?) -> Void) {
        networkController.getVehicles(for: userID) { (vehicles, error) in
            if let error = error {
                completion(nil,error)
            } else {
                if let vehicles = vehicles {
                    self.vehicles = vehicles
                    completion(vehicles,nil)
                }
            }
        }
    }
}
