//
//  LoggedInUser.swift
//  BestPlacesToLive
//
//  Created by Thomas Cacciatore on 9/3/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct LoggedInUser: Codable {
    
    let name: String
    let id: String
    let email: String
    let cities: [ReturnedSavedCity]
    
    
    enum CodingKeys: String, CodingKey {
        case name
        case id = "_id"
        case email
        case cities
    }
    
}
