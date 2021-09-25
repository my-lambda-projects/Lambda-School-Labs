//
//  GroupsUsers.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/14/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import Foundation

class GroupsUsers: Codable {
    
    var id: Int
    var userID: Int    // relationship to User id property
    var userType: String   // for instance, admin / creator
    var groupID: Int    // relationship to 
    
}
