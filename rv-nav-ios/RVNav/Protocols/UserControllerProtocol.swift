//
//  UserControllerProtocol.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/16/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation

protocol UserControllerDelegateProtocol {
    func didLogout()
}

protocol UserControllerProtocol {
    var currentUserID: Int? {get set}
    var delegate: UserControllerDelegateProtocol? {get set}
    
    func register(with user: User, completion: @escaping (Error?) -> Void)
    func signIn(with signInInfo: SignInInfo, completion: @escaping (Int?, Error?) -> Void)
    func logout(completion: @escaping () -> Void)
}
