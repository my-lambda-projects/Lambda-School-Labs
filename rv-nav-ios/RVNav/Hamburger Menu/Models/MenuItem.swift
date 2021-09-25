//
//  MenuItem.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/13/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import Foundation

struct MenuItem {
    var label: String
    var imageName: String
    var order: Int
    var segueID: String = ""
    var selector: String = ""
}

struct MenuItemSection {
    var name: String
    var order: Int
    var menuItems: [MenuItem]
}
