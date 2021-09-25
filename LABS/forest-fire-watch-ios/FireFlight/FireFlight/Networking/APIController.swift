//
//  APIController.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/20/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation
import CoreLocation
import UIKit

class APIController {
    
    var bearer: Bearer?
    var deviceId: String? {
        didSet { sendDeviceToken(deviceIdString: deviceId!) }
    }
    
    enum HTTPMethod: String {
        case get = "GET"
        case put = "PUT"
        case post = "POST"
        case delete = "DELETE"
    }
    
    
    
    // MARK: - Register User
    func registerUser(username: String, password: String, completion: @escaping (Error?, String?) -> Void) {
        
        let requestURL = Config.baseURL
            .appendingPathComponent("auth")
            .appendingPathComponent("register")
        
        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.post.rawValue
        
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let user = User(username: username, password: password, receivePush: true)
        
        do {
            request.httpBody = try JSONEncoder().encode(user)
        } catch {
            NSLog("Error encoding user: \(error)")
            completion(error, nil)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            guard let data = data else {
                NSLog("No bearer token returned")
                completion(NSError(domain: "No data returned", code: 001, userInfo: [NSLocalizedDescriptionKey : "No data returned from URLSession Data Task"]), nil)
                return
            }
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 201 {
                NSLog("something went wrong: Error Code: \(response.statusCode)")
                
                let responseError = String(data: data, encoding: String.Encoding.utf8)
                
                completion(nil, responseError)
                return
            }
            
            if let error = error {
                NSLog("Error signing up user: \(error)")
                completion(error, nil)
                return
            }
            
            do {
                let apiBearer = try JSONDecoder().decode(Bearer.self, from: data)
                self.bearer = apiBearer
                completion(nil, nil)
            } catch {
                NSLog("Error decoding Bearer: \(error)")
                completion(error, nil)
                return
            }
            
        }.resume()
    }
    
    
    // MARK: - Log in User
    
    func loginUser(username: String, password: String, completion: @escaping (Error?, String?) -> Void) {

        let requestURL = Config.baseURL
            .appendingPathComponent("auth")
            .appendingPathComponent("login")

        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let user = User(username: username, password: password, receivePush: true)

        do {
            request.httpBody = try JSONEncoder().encode(user)
        } catch {
            NSLog("Error encoding user: \(error)")
            completion(error, nil)
            return
        }

        URLSession.shared.dataTask(with: request) { (data, response, error) in

            if let error = error {
                NSLog("Error signing up user: \(error)")
                completion(error, nil)
                return
            }
            
            guard let data = data else {
                NSLog("No bearer token returned")
                completion(NSError(domain: "No data returned", code: 001, userInfo: [NSLocalizedDescriptionKey : "No data returned from URLSession Data Task"]), nil)
                return
            }
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                NSLog("Response code was not 200: Error Code: \(response.statusCode)")
                
                let responseError = String(data: data, encoding: String.Encoding.utf8)
                
                completion(nil, responseError)
                return
            }


            do {
                let apiBearer = try JSONDecoder().decode(Bearer.self, from: data)
                self.bearer = apiBearer
                completion(nil, nil)
            } catch {
                NSLog("Error decoding Bearer: \(error)")
                completion(error, nil)
                return
            }

        }.resume()
    }
    
    
    
    
    // MARK: - Fetch Saved Addresses
    
    func getAddresses(completion: @escaping ([UserAddress]?, Error?) -> Void) {
        
        let requestURL = Config.baseURL
            .appendingPathComponent("locations")
        
        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue(bearer?.token, forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            if let error = error {
                NSLog("Error getting saved addresses: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned when getting saved addresses")
                completion(nil, NSError(domain: "No data returned", code: 001, userInfo: [NSLocalizedDescriptionKey : "No data returned from URLSession Data Task"]))
                return
            }
            
            do {
                let locations = try JSONDecoder().decode([UserAddress].self, from: data)
                completion(locations, nil)
            } catch {
                NSLog("Error decoding addresses: \(error)")
                completion(nil, error)
                return
            }
        }
        .resume()
    }
    
    
    // MARK: - Post new Address
    
    func postAddress(label: String, address: String, location: CLLocation, shownFireRadius: Int, completion: @escaping (Error?) -> Void) {
        
        let newAddress = UserAddress(id: nil, latitude: location.coordinate.latitude, longitude: location.coordinate.longitude, address: address, label: label, radius: shownFireRadius, notifications: true)
        
        let requestURL = Config.baseURL.appendingPathComponent("locations")
        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue(bearer?.token, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONEncoder().encode(newAddress)
        } catch {
            NSLog("Error encoding address")
            completion(error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error with posting address: \(error)")
                completion(error)
                return
            }
            completion(nil)
        }.resume()
    }
    
    
    // MARK: - Edit existing address
    
    func editAddress(id: Int, label: String, address: String, location: CLLocation, shownFireRadius: Int, completion: @escaping (Error?) -> Void) {
        
        let editedAddress = UserAddress(id: id, latitude: location.coordinate.latitude, longitude: location.coordinate.longitude, address: address, label: label, radius: shownFireRadius, notifications: true)
        
        let requestURL = Config.baseURL.appendingPathComponent("locations").appendingPathComponent("\(id)")
        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue(bearer?.token, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONEncoder().encode(editedAddress)
        } catch {
            NSLog("Error encoding address")
            completion(error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error putting new address: \(error)")
                completion(error)
                return
            }
            completion(nil)
        }.resume()
    }
    
    
    // MARK: - Delete a saved Address
    
    func deleteAddress(id: Int, completion: @escaping (Error?) -> Void) {
        
        let requestURL = Config.baseURL.appendingPathComponent("locations").appendingPathComponent("\(id)")
        var request = URLRequest(url: requestURL)
        request.httpMethod = HTTPMethod.delete.rawValue
        request.setValue(bearer?.token, forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                NSLog("Error deleting address: \(error)")
                completion(error)
                return
            }
            completion(nil)
        }.resume()
    }
    
    
    
    // MARK: - Fire API
    
    func checkForFires(location: CLLocation, distance: Double, completion: @escaping ([Fire]?, Error?) -> Void) {
        let address = AddressToCheck(coords: [location.coordinate.longitude, location.coordinate.latitude], distance: distance)
        let url = Config.fireURL.appendingPathComponent("check_fires")
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONEncoder().encode(address)
        } catch {
            NSLog("Error encoding location")
            completion(nil, error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            if let error = error {
                NSLog("Error getting fires: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned when fetching fires")
                completion(nil, NSError(domain: "No data returned", code: 001, userInfo: [NSLocalizedDescriptionKey : "No data returned from URLSession Data Task"]))
                return
            }
            
            var firesArray: [Fire] = []
            do {
                
                let results = try JSONDecoder().decode(FireResults.self, from: data)
                guard let fireLocations = results.fires else {
                    completion(nil, NSError(domain: "No data returned", code: 001, userInfo: [NSLocalizedDescriptionKey : "No data returned from URLSession Data Task"]))
                    return
                }
                
                for fire in fireLocations {
                    let fire = fire.first
                    let coords = fire?.coords
                    let lat = coords?.last
                    let long = coords?.first
                    let newFire = Fire(latitude: lat!, longitude: long!)
                    firesArray.append(newFire)
                }
                completion(firesArray, nil)
                
                
            } catch {
                NSLog("Error decoding fire results: \(error)")
                completion(nil, error)
                return
            }
        }.resume()
    }
    
}
