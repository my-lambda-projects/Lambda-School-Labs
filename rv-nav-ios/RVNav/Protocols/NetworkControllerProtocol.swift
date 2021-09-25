//
//  NetworkControllerProtocol.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/15/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation

protocol NetworkControllerProtocol {
    
    func register(with user: User, completion: @escaping (Error?) -> Void)
    
    func signIn(with signInInfo: SignInInfo, completion: @escaping (Int?, Error?) -> Void)
    
    func logout(completion: @escaping () -> Void)
    
    func createVehicle(with vehicle: Vehicle, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void)
    
    func editVehicle(with vehicle: Vehicle, vehicleID: Int, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void)
    
    func deleteVehicle(vehicle: Vehicle, userID: Int, completion: @escaping (Vehicle?, Error?) -> Void)
    
    func getVehicles(for userID: Int, completion: @escaping ([Vehicle]?, Error?) -> Void)
}
