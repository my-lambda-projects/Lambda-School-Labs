//
//  APIController+DataUpdater.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/16/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation
import UIKit

extension APIController {

    func sendDeviceToken(deviceIdString: String) {
        let url = Config.updaterURL
        var request = URLRequest(url: url)
        
        let token = DeviceToken(deviceId: deviceIdString)
        
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(bearer?.token, forHTTPHeaderField: "Authorization")
        
        do {
            request.httpBody = try JSONEncoder().encode(token)
        } catch {
            NSLog("Error encoding device ID")
            return
        }
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            if let error = error {
                NSLog("Error posting device id: \(error)")
                return
            }
            
        }.resume()
    }
    
}
