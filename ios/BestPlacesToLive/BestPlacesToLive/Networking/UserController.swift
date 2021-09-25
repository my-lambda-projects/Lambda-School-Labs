//
//  UserController.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 9/17/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

class UserController {
    
    private let baseURL = URL(string: "https://stagebe.letsmovehomie.com/users/profile/")!
    var errorMessage: ErrorMessage?
    
    func updateUser(user: UpdateUser, completion: @escaping (LoggedInUser?, Error?) -> Void) {
        
        var request = URLRequest(url: baseURL)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let token = UserDefaults.standard.object(forKey: "token")
        request.addValue(token as! String, forHTTPHeaderField: "Authorization")
        
        let jsonEncoder = JSONEncoder()
        
        do {
            let jsonData = try jsonEncoder.encode(user)
            print(jsonData)
            request.httpBody = jsonData
        } catch {
            print("Error encoding user id: \(error)")
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
                NSLog("Error posting user photo: \(error)")
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
}
