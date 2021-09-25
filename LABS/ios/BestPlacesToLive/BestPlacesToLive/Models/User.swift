//
//  User.swift
//  BestPlacesToLive
//
//  Created by Thomas Cacciatore on 8/27/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct User: Codable {
    
    let name: String
    let email: String
    let password: String
    let password2: String
    
}

struct UpdateUser: Codable {
    
    let name: String?
    let email: String?
    let password: String?
    
    init(name: String? = nil, email: String? = nil, password: String? = nil) {
        
        self.name = name
        self.email = email
        self.password = password
        
    }
}
