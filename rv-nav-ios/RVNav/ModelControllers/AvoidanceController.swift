//
//  AvoidanceController.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/16/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation

class AvoidanceController: AvoidanceControllerProtocol {
    
    // Gets an array of avoidance coordinates from DS backend.
    func getAvoidances(with routeInfo: RouteInfo, completion: @escaping ([Avoid]?,Error?) -> Void) {
        
        let avoidURL = URL(string: "https://dr7ajalnlvq7c.cloudfront.net/fetch_low_clearance")!
        var request = URLRequest(url: avoidURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        do {
            let jsonEncoder = JSONEncoder()
            jsonEncoder.keyEncodingStrategy = .convertToSnakeCase
            request.httpBody = try jsonEncoder.encode(routeInfo)
        } catch {
            NSLog("error encoding\(error)")
            completion(nil, error)
            return
        }
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let response = response as? HTTPURLResponse,
                response.statusCode != 200 {
                completion(nil, NSError())
                return
            }
            if let error = error {
                completion(nil, error)
                return
            }
            guard let data = data else {
                completion(nil, NSError())
                return
            }
            let jsonDecoder = JSONDecoder()
            jsonDecoder.keyDecodingStrategy = .convertFromSnakeCase
            do {
                let avoidArray: [Avoid] = try jsonDecoder.decode([Avoid].self, from: data)
                completion(avoidArray, nil)
                
            } catch {
                completion(nil, error)
                return
            }
        }.resume()
    }
}
