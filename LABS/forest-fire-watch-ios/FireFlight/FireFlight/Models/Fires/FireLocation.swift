//
//  Fire.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/26/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation

struct FireLocation: Codable {
    
    var coords: [Double]?
    //var distance: Double?
    
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let x = try? container.decode([Double].self) {
            coords = x
            return
        } else if let x = try? container.decode(Double.self) {
            //distance = x
            return
        }
        throw DecodingError.typeMismatch(FireLocation.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Wrong type for FireLocation"))
        
    }
    
    
    
    //TODO: For later implementation of Distance to fire
//    func encode(to encoder: Encoder) throws {
//        var container = encoder.singleValueContainer()
//        switch self {
//        case .distance(let x):
//            try container.encode(x)
//        case .coords(let x):
//            try container.encode(x)
//        }
//    }
    
    
    
    
}
