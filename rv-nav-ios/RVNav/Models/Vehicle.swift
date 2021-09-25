//
//  Vehicle.swift
//  RVNav
//
//  Created by Ryan Murphy on 8/26/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation

enum VehicleClassDataBaseRepresentation: String, Codable {
    case classA = "ClassA"
    case classB = "ClassB"
    case classC = "ClassC"
    case fifthWheel = "5thWheel"
    case tagalong = "tagalong"
}

enum VehicleClassDisplayString: String, CaseIterable {
    case classA = "Class A"
    case classB = "Class B"
    case classC = "Class C"
    case fifthWheel = "5th Wheel"
    case tagalong = "Bumper Pull"
}

class Vehicle: Codable {
    
    var id: Int?
    let name: String?
    let height: Float?
    let weight: Float?
    let width: Float?
    let length: Float?
    let axelCount: Int?
    let vehicleClass: String?
    let dualTires: Bool?
    let trailer: Bool?
    
    init(id: Int?, name: String?, height: Float?, weight: Float?, width: Float?, length: Float?, axelCount: Int?, vehicleClass: String?, dualTires: Bool?, trailer: Bool?) {
        
        self.id = id
        self.name = name
        self.height = height
        self.weight = weight
        self.width = width
        self.length = length
        self.axelCount = axelCount
        self.vehicleClass = vehicleClass
        self.dualTires = dualTires
        self.trailer = trailer
    
    }
}

extension Vehicle: Equatable {
    static func == (lhs: Vehicle, rhs: Vehicle) -> Bool {
        return lhs.id == rhs.id
    }
    
    
}
