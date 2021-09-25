//
//  WebRESTAPINetworkController.swift
//  RVNav
//
//  Created by Jonathan Ferrer on 8/21/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation
import SwiftKeychainWrapper
import ArcGIS
import GoogleSignIn
import FacebookCore
import FacebookLogin

enum WebAPIError: Error {
    case encodingError(Any)
    case decodingError(Any)
    case dataTaskResponse(Any)
    case dataTaskError(Error)
    case dataTaskData(Any)
    case responseNoToken(Any)
    case responseNoUserID(Any)
}

@objc
class WebRESTAPINetworkController : NSObject, NetworkControllerProtocol {
    
    // MARK: - Properties
    let baseURL = URL(string: "https://labs-rv-life-staging-1.herokuapp.com/")!
    let avoidURL = URL(string: "https://dr7ajalnlvq7c.cloudfront.net/fetch_low_clearance")!
    
    // MARK: - Public Methods
    // Register
    func register(with user: User, completion: @escaping (Error?) -> Void) {
        let url = baseURL.appendingPathComponent("users").appendingPathComponent("register")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        guard let username = user.email,
            let password = user.password else { return }
        let userSignInInfo = SignInInfo(email: username, password: password)
        do {
            let jsonEncoder = JSONEncoder()
            jsonEncoder.keyEncodingStrategy = .convertToSnakeCase
            request.httpBody = try jsonEncoder.encode(userSignInInfo)
        } catch {
            completion(error)
            return
        }
        URLSession.shared.dataTask(with: request) { (_, response, error) in
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 && response.statusCode != 201 {
                completion(NSError(domain: "", code: response.statusCode, userInfo: nil))
                return
            }
            if let error = error {
                completion(error)
                return
            }
            completion(nil)
        }.resume()
    }
    
    // Log In
    func signIn(with signInInfo: SignInInfo, completion: @escaping (Int?, Error?) -> Void) {
        var result: Result?
        var userID: Int?
        let url = baseURL.appendingPathComponent("users").appendingPathComponent("login")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        do {
            let jsonEncoder = JSONEncoder()
            request.httpBody = try jsonEncoder.encode(signInInfo)
        } catch {
            completion(nil,WebAPIError.encodingError("Error encoding JSON from object: \(error)"))
            return
        }
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil, WebAPIError.dataTaskResponse("Resonse: \(response.statusCode)"))
                return
            }
            if let error = error {
                completion(nil,WebAPIError.dataTaskError(error))
                return
            }
            guard let data = data else {
                completion(nil,WebAPIError.dataTaskData("No data in DataTask response"))
                return
            }
            do {
                let jsonDecoder = JSONDecoder()
                jsonDecoder.keyDecodingStrategy = .convertFromSnakeCase
                result = try jsonDecoder.decode(Result.self, from: data)
                let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? NSDictionary
                if let parseJSON = json {
                    let accessToken = parseJSON["token"] as? String
                    //Store the AuthToken in the keychain
                    let saveAccessToken: Bool = KeychainWrapper.standard.set(accessToken!, forKey: "accessToken")
                    print("The access token save result: \(saveAccessToken)")
                    if let result = result,
                        let user = result.user,
                        let id = user.id {
                        userID = id
                        NSLog("UserID: \(id)")
                    } else {
                        userID = nil
                    }
                    if (accessToken?.isEmpty)! {
                        completion(userID,WebAPIError.responseNoToken("Access Token is Empty"))
                        return
                    }
                }
            } catch {
                completion(nil,WebAPIError.decodingError("WebAPI - Error decoding JSON response to signin: \(error)"))
                return
            }
            if let userID = userID {
                completion(userID,nil)
            } else {
                completion(nil,WebAPIError.responseNoUserID("WebAPI - No userID returned."))
            }
        }.resume()
        return
    }
    
    //Logout all sessions and remove autologin from Userdefaults
    @objc public func logout(completion: @escaping () -> Void = { }) {
        let removeSuccessful: Bool = KeychainWrapper.standard.removeObject(forKey: "accessToken")
        GIDSignIn.sharedInstance().signOut()
        let fbLoginManager = LoginManager()
        fbLoginManager.logOut()
        print("Remove successful: \(removeSuccessful)")
        completion()
    }
    
    // Creates vehicle in api for the current user.
    
    func createVehicle(with vehicle: Vehicle, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void) {
        let url = baseURL.appendingPathComponent("vehicle")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(KeychainWrapper.standard.string(forKey: "accessToken"), forHTTPHeaderField: "Authorization")
        request.httpMethod = "POST"
        
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
            #warning("Get vehicleID from response and save it")
            completion(vehicle,nil)
        }.resume()
    }
    
    // Edit a stored vehicle with a vehivle id.
    func editVehicle(with vehicle: Vehicle, vehicleID: Int, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void) {
        let url = baseURL.appendingPathComponent("vehicle").appendingPathComponent("\(vehicleID)")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(KeychainWrapper.standard.string(forKey: "accessToken"), forHTTPHeaderField: "Authorization")
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
        let url = baseURL.appendingPathComponent("vehicle").appendingPathComponent("\(vehicleID)")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(KeychainWrapper.standard.string(forKey: "accessToken"), forHTTPHeaderField: "Authorization")
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
        let url = baseURL.appendingPathComponent("vehicle")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(KeychainWrapper.standard.string(forKey: "accessToken"), forHTTPHeaderField: "Authorization")
        request.httpMethod = "GET"
        URLSession.shared.dataTask(with: request) { (data, _, error) in
            if let error = error {
                NSLog("Error fetching vehicle: \(error)")
                completion(nil, error)
                return
            }
            guard let data = data else {
                NSLog("No data returned from dataTask")
                completion([], error)
                return
            }
            let decoder = JSONDecoder()
            decoder.keyDecodingStrategy = .convertFromSnakeCase
            do {
                let vehicles = try decoder.decode([Vehicle].self, from: data)
                completion(vehicles, nil)
            } catch {
                NSLog("Error decoding vehicle: \(error)")
                completion([], error)
            }
        }.resume()
    }
}
