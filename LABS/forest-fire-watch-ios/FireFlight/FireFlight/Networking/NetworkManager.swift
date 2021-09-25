//
//  NetworkManager.swift
//  FireFlight
//
//  Created by Kobe McKee on 9/22/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import Foundation
import Reachability


class NetworkManager: NSObject {
    
    
    var reachability: Reachability!
    
    static let sharedInstance: NetworkManager = { return NetworkManager() }()
    
    override init() {
        super.init()
        
        // Initialize reachability
        reachability = Reachability()!
        
        // Register an observer for network status
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(networkStatusChanged(_:)),
                                               name: .reachabilityChanged,
                                               object: reachability
        )
        
        do {
            // Start the network status notifier
            try reachability.startNotifier()
        } catch {
            NSLog("Unable to start reachability notifier")
        }
    }
    
    
    @objc func networkStatusChanged(_ notification: Notification) {
        // Do something
    }
    
    
    
    static func stopNotifier() -> Void {
        do {
            // Stop the network status notifier
            try (NetworkManager.sharedInstance.reachability).startNotifier()
        } catch {
            NSLog("Error stopping notifier")
        }
    }
    
    
    // Network is reachable
    static func isReachable(completion: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection != .none {
            completion(NetworkManager.sharedInstance)
        }
    }
    
    
    // Network is unreachable
    static func isUnreachable(completion: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection == .none {
            completion(NetworkManager.sharedInstance)
        }
    }
    
    
    
    
    
    
}
