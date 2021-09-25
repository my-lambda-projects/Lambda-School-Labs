//
//  AppDelegate.swift
//  Future-Hope
//
//  Created by Hector Steven on 8/15/19.
//  Copyright © 2019 Hector Steven. All rights reserved.
//

import UIKit
import Firebase
import GoogleSignIn
import FBSDKCoreKit


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

	var window: UIWindow?


	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
		FirebaseApp.configure()
		GIDSignIn.sharedInstance()?.clientID = FirebaseApp.app()?.options.clientID
		GIDSignIn.sharedInstance()?.delegate = self
		// Mark: FBSDK Loging Delegate - Not sure if required for later use
		//ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)
		return true
	}
	
	func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
		return ApplicationDelegate.shared.application(application, open: url, sourceApplication: sourceApplication, annotation: annotation)
	}
}


extension AppDelegate: GIDSignInDelegate {
	func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
		if let error = error {
			NSLog("Error with GidSignIN: \(error)")
			return
		}
		guard let auth = user.authentication else { return }
		let credentials = GoogleAuthProvider.credential(withIDToken: auth.idToken, accessToken: auth.accessToken)
		
		Auth.auth().signIn(with: credentials) { _, error in
			if let error = error {
				NSLog("Error with GidSignIN: \(error)")
				return
			}
			// send user data to db
			print("logged in")
		}
		
	}
	
	func sign(_ signIn: GIDSignIn!, didDisconnectWith user: GIDGoogleUser!, withError error: Error!) {
		if let error = error {
			NSLog("disconnect error: \(error)")
			return
		}
	}
	

	
}
