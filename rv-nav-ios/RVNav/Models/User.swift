//
//  User.swift
//  RVNav
//
//  Created by Ryan Murphy on 8/21/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation


struct Result: Codable, Equatable {
    var user: User?
    var token: String?
    var message: String
}

struct SignInInfo: Codable {
    var email: String
    var password: String
}

struct User: Codable, Equatable {
    var firstName: String?
    var lastName: String?
    var password: String?
    var email: String?
    var id: Int?
    var username: String?
    
    init( firstName: String?, lastName: String?, password: String?, email: String?, username: String?) {
        self.firstName = firstName
        self.lastName = lastName
        self.password = password
        self.email = email
        self.username = username
    }
    
    static func ==(lhs: User, rhs: User) -> Bool {
        return lhs.username == rhs.username && lhs.firstName == rhs.firstName
    }
    
}
