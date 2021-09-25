//
//  RVSettings.swift
//  RVNav
//
//  Created by Ryan Murphy on 9/3/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation

class RVSettings {
    static let shared = RVSettings()
    private init() {}
    
    var selectedVehicle: Vehicle?
    var selectedVehicleIndex: Int = 0 
    
}

