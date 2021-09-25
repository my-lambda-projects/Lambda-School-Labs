//
//  ModelController.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/16/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation

class ModelController {
    var userController: UserControllerProtocol
    var vehicleController: VehicleModelControllerProtocol? {
        guard let userID = userController.currentUserID else {
            return nil
        }
        return VehicleModelController(userID: userID, networkController: FirebaseNetworkController())
    }

    init (userController: UserControllerProtocol = UserController()) {
        self.userController = userController
        self.userController.delegate = self
    }
}
extension ModelController: UserControllerDelegateProtocol {
    func didLogout() {
        //self.vehicleController = nil
    }
}
