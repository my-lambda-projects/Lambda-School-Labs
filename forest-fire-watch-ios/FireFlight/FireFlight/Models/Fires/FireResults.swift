//
//  FireResults.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/26/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct FireResults: Codable {
    
    var alert: Bool?
    var fires: [[FireLocation]]?
    
    enum CodingKeys: String, CodingKey {
        case alert = "Alert"
        case fires = "Fires"
        
    }
}
