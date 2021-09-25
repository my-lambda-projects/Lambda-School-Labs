//
//  SavedCitiesController.swift
//  BestPlacesToLive
//
//  Created by Thomas Cacciatore on 9/15/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

class SavedCitiesController {

    var errorMessage: ErrorMessage?
    private let baseURL = URL(string: "https://stagebe.letsmovehomie.com/users/profile/")!
    
    func addSavedCity(savedCity: SavedCity, completion: @escaping (LoggedInUser?, Error?) -> Void) {
        
        var request = URLRequest(url: baseURL.appendingPathComponent("cities"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let token = UserDefaults.standard.object(forKey: "token")
        if token != nil {
            request.addValue(token as! String, forHTTPHeaderField: "Authorization")
        }
        let jsonEncoder = JSONEncoder()
        
        do {
            let jsonData = try jsonEncoder.encode(savedCity)
            request.httpBody = jsonData
        } catch {
            print("Error encoding saved city: \(error)")
            completion(nil, error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                guard let data = data else { return }
                let decoder = JSONDecoder()
                do {
                    self.errorMessage = try decoder.decode(ErrorMessage.self, from: data)
                    completion(nil, self.errorMessage)
                } catch {
                    completion(nil, NSError(domain: "", code: response.statusCode, userInfo: nil))
                }
                
                return
            }

            
            if let error = error {
                NSLog("Error posting saved city: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned")
                completion(nil, error)
                return
            }
            let decoder = JSONDecoder()
            
            do {
                let loggedInUser = try decoder.decode(LoggedInUser.self, from: data)
                completion(loggedInUser, nil)
            } catch {
                NSLog("Error decoding loggedInUser: \(error)")
                completion(nil, error)
                return
            }
            }.resume()
    }
    
    func deleteSavedCity(savedCity: SavedCity, completion: @escaping (LoggedInUser?, Error?) -> Void) {
        
        var request = URLRequest(url: baseURL.appendingPathComponent("cities"))
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let token = UserDefaults.standard.object(forKey: "token")
        request.addValue(token as! String, forHTTPHeaderField: "Authorization")
        
        let jsonEncoder = JSONEncoder()
        
        do {
            let jsonData = try jsonEncoder.encode(savedCity)
            request.httpBody = jsonData
        } catch {
            print("Error encoding saved city: \(error)")
            completion(nil, error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                guard let data = data else { return }
                let decoder = JSONDecoder()
                do {
                    self.errorMessage = try decoder.decode(ErrorMessage.self, from: data)
                    completion(nil, self.errorMessage)
                } catch {
                    completion(nil, NSError(domain: "", code: response.statusCode, userInfo: nil))
                }
                
                return
            }
            
            if let error = error {
                NSLog("Error posting saved city: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned")
                completion(nil, error)
                return
            }
            let decoder = JSONDecoder()
            
            do {
                let loggedInUser = try decoder.decode(LoggedInUser.self, from: data)
                completion(loggedInUser, nil)
            } catch {
                NSLog("Error decoding loggedInUser: \(error)")
                completion(nil, error)
                return
            }
            }.resume()
    }
    
    func getAllSavedCity(completion: @escaping (LoggedInUser?, Error?) -> Void) {
        
        var request = URLRequest(url: baseURL)
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let token = UserDefaults.standard.object(forKey: "token")
        request.addValue(token as! String, forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil, NSError(domain: "", code: response.statusCode, userInfo: nil))
                
                return
            }
            
            if let error = error {
                NSLog("Error getting saved cities: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned")
                completion(nil, error)
                return
            }
            let decoder = JSONDecoder()
            
            do {
                let loggedInUser = try decoder.decode(LoggedInUser.self, from: data)
                completion(loggedInUser, nil)
            } catch {
                NSLog("Error decoding loggedInUser: \(error)")
                completion(nil, error)
                return
            }
            }.resume()
    }
    
    func getSavedCityDetails(cityIDs: CityIDs, completion: @escaping (City?, Error?) -> Void) {
        let cityURL = URL(string: "https://stagebe.letsmovehomie.com/city/")!
        var request = URLRequest(url: cityURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let jsonEncoder = JSONEncoder()
        
        do {
            let jsonData = try jsonEncoder.encode(cityIDs)
            request.httpBody = jsonData
        } catch {
            print("Error encoding saved city: \(error)")
            completion(nil, error)
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil, NSError(domain: "", code: response.statusCode, userInfo: nil))
                
                return
            }
            
            if let error = error {
                NSLog("Error posting city id: \(error)")
                completion(nil, error)
                return
            }
            
            guard let data = data else {
                NSLog("No data returned")
                completion(nil, error)
                return
            }
            let decoder = JSONDecoder()
            
            do {
                let cityData = try decoder.decode(CityData.self, from: data)
                let city = cityData.data.first
                completion(city, nil)
            } catch {
                NSLog("Error decoding city details: \(error)")
                completion(nil, error)
                return
            }
            }.resume()
        
    }

}

