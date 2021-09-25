//
//  City.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 8/22/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation


struct City: Codable, Equatable {
    
    let id: String
    let name: String
    let photo: String
    let scoreTotal: Float
    let gradeTotal: String
    let scoreCostOfLiving: Float
    let gradeCostOfLiving: String
    let scoreCommute: Float
    let gradeCommute: String
    let scoreSafety: Float
    let gradeSafety: String
    let scoreTolerance: Float
    let gradeTolerance: String
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name
        case photo
        case scoreTotal = "score_total"
        case gradeTotal = "grade_total"
        case scoreCostOfLiving = "score_cost_of_living"
        case gradeCostOfLiving = "grade_cost_of_living"
        case scoreCommute = "score_commute"
        case gradeCommute = "grade_commute"
        case scoreSafety = "score_safety"
        case gradeSafety = "grade_safety"
        case scoreTolerance = "score_tolerance"
        case gradeTolerance = "grade_tolerance"
        
    }
}

struct TopCities: Codable {
    var cities: [City]
}

struct SearchedCities: Codable {
    var cities: [City]
}

struct CityIDs: Codable {
    var ids: [String]
}

struct SavedCity: Codable {
    let cityID: String
    let cityName: String
    let cityPhoto: String
    
    enum CodingKeys: String, CodingKey {
        case cityID = "city_id"
        case cityName = "city_name"
        case cityPhoto = "city_photo"
    }
}

struct ReturnedSavedCity: Codable {
    let id: String
    let name: String
    let photo: String
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name
        case photo
    }
}

struct CityData: Codable {
    let data: [City]
}
