//
//  Avoid.swift
//  RVNav
//
//  Created by Jonathan Ferrer on 9/6/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation

struct Avoid: Codable {

    let uid: Int
    let latitude: Double
    let longitude: Double
    let name: String
}

struct RouteInfo: Codable {
    let height: Float
    let startLon: Double
    let startLat: Double
    let endLon: Double
    let endLat: Double
}
