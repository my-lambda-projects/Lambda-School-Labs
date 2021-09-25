//
//  AppConfiguration.swift
//  RoutingTesting
//
//  Created by Jonathan Ferrer on 9/5/19.
//  Copyright © 2019 Jonathan Ferrer. All rights reserved.
//

import Foundation

// This file stores the app configuration for ArcGIS

struct AppConfiguration {

    static let clientID: String = "taIMz5a6FZ8j6ZCs"
    static let urlScheme: String = "my-devlab-app"
    static let urlAuthPath: String = "auth"
    static let keychainIdentifier: String = "\(Bundle.main.bundleIdentifier!).keychainIdentifier"
}
