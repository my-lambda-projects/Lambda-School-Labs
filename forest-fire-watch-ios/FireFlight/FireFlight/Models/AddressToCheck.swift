//
//  AddressToCheck.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/28/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct AddressToCheck: Codable {
    
    var coords: [Double]
    var distance: Double
    
    enum CodingKeys: String, CodingKey {
        case coords = "user_coords"
        case distance
    }
}
