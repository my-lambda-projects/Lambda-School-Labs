//
//  FirebaseNetworkController.swift
//  RVNav
//
//  Created by Jake Connerly on 1/15/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation
import SwiftKeychainWrapper
import ArcGIS

class FirebaseNetworkController: NetworkControllerProtocol {
    
    // MARK: - Properties
    
    let webAPIController: NetworkControllerProtocol = WebRESTAPINetworkController()
    var vehicle: Vehicle?
    let baseURL = URL(string: "https://labs-rv-life-staging-1.herokuapp.com/")!
    let firebaseURL = URL(string: "https://rvnav-ios.firebaseio.com/")!
    var result: Result?
    
    
    init() {
    }
    
    // MARK: - Public Methods
    // Register
    func register(with user: User, completion: @escaping (Error?) -> Void) {
        webAPIController.register(with: user, completion: completion)
    }
    
    // Log In
    func signIn(with signInInfo: SignInInfo, completion: @escaping (Int?, Error?) -> Void) {
        webAPIController.signIn(with: signInInfo, completion: completion)
    }
    
    func logout(completion: @escaping () -> Void) {
        webAPIController.logout(completion: completion)
    }

    
    // Create Vehicle
    func createVehicle(with vehicle: Vehicle, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void) {
        //creating cutom ID for Firebase
        vehicle.id = getNextFBVehicleID(userID: userID)
        guard let vehicleID = vehicle.id else { return }
        
        let url = firebaseURL.appendingPathComponent("vehicles").appendingPathComponent("\(userID)").appendingPathComponent("\(vehicleID)").appendingPathExtension("json")
        
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "PUT"
        
        do {
            let jsonEncoder = JSONEncoder()
            jsonEncoder.keyEncodingStrategy = .convertToSnakeCase
            request.httpBody = try jsonEncoder.encode(vehicle)
        } catch {
            completion(nil,error)
            return
        }
        URLSession.shared.dataTask(with: request) { (_, response, error) in
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil,NSError(domain: "", code: response.statusCode, userInfo: nil))
                return
            }
            if let error = error {
                completion(nil,error)
                return
            }
            completion(vehicle,nil)
        }.resume()
    }
    
    // Edit a stored vehicle with a vehicle id.
    func editVehicle(with vehicle: Vehicle, vehicleID: Int, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void) {
        let url = firebaseURL.appendingPathComponent("vehicles").appendingPathComponent("\(userID)")
            .appendingPathComponent("\(vehicleID)")
            .appendingPathExtension("json")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "PUT"
        do {
            let jsonEncoder = JSONEncoder()
            jsonEncoder.keyEncodingStrategy = .convertToSnakeCase
            request.httpBody = try jsonEncoder.encode(vehicle)
        } catch {
            completion(nil,error)
            return
        }
        URLSession.shared.dataTask(with: request) { (_, response, error) in
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil,NSError(domain: "", code: response.statusCode, userInfo: nil))
                return
            }
            if let error = error {
                completion(nil,error)
                return
            }
            completion(vehicle,nil)
        }.resume()
    }
    
    // Delete a stored vehicle with vehivle id.
    func deleteVehicle(vehicle: Vehicle, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void) {
        guard let vehicleID = vehicle.id else { return }
        let url = firebaseURL.appendingPathComponent("vehicles").appendingPathComponent("\(userID)").appendingPathComponent("\(vehicleID)").appendingPathExtension("json")
        
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "DELETE"
        
        URLSession.shared.dataTask(with: request) { (_, _, error) in
            if let error = error {
                NSLog("Error Deleting entry to server: \(error)")
                completion(nil,error)
                return
            }
            completion(vehicle,nil)
        }.resume()
    }
    
    // Gets all currently stored vehicles for a user
    func getVehicles(for userID: Int, completion: @escaping ([Vehicle]?, Error?) -> Void) {
        let url = firebaseURL.appendingPathComponent("vehicles").appendingPathComponent("\(userID)").appendingPathExtension("json")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "GET"
        URLSession.shared.dataTask(with: request) { (data, _, error) in
            if let error = error {
                NSLog("Error fetching vehicle: \(error)")
                completion([], error)
                return
            }
            guard let data = data else {
                NSLog("No data returned from dataTask")
                completion([], error)
                return
            }
            if data.count != 0 {
                let decoder = JSONDecoder()
                decoder.keyDecodingStrategy = .convertFromSnakeCase
                do {
                    let vehicles = try decoder.decode([Vehicle].self, from: data)
                    completion(vehicles, nil)
                    return
                } catch {
                    NSLog("Error decoding vehicle: \(error)")
                    completion([], error)
                    return
                }
            } else {
                completion([], nil)
            }
        }.resume()
    }
    
    //Get next vehicle ID based on what's in FB
    func getNextFBVehicleID (userID: Int) -> Int {
        let group = DispatchGroup()
        var nextID: Int = 0
        
        group.enter()
        getVehicles (for: userID) { (vehicles, error) in
            if let error = error {
                NSLog("FirebaseNetworkController - Error fetching vehicles for next ID: \(error)")
                group.leave()
                return
            }
            guard let vehicles = vehicles else
            {
                group.leave()
                return
            }
            guard vehicles.count > 0 else {
                group.leave()
                return
            }
            if let lastid = vehicles.compactMap ( {$0.id} ).sorted (by: {$0 < $1}).last
            {
                nextID =  lastid + 1
            }
            group.leave()
        }
        group.wait()
        return nextID
    }
}

