//
//  User.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/20/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct User: Codable {
    let username: String
    let password: String
    var receivePush: Bool
    
    enum CodingKeys: String, CodingKey {
        case username
        case password
        case receivePush = "receive_push"
    }
    
}
