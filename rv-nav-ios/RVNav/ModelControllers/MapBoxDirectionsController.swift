//
//  MapBoxDirectionsController.swift
//  RVNav
//
//  Created by Jonathan Ferrer on 8/30/19.
//  Copyright © 2019 RVNav. All rights reserved.
//

import Foundation
import MapboxGeocoder


class MapBoxDirectionsController {

    // MARK: - Properties
    // instance of the geocoder (address look up and converter)
    let avoidanceController: AvoidanceControllerProtocol
    let geocoder = Geocoder.shared
    var destinationAddress: Placemark?
    let avoidURL = URL(string: "https://dr7ajalnlvq7c.cloudfront.net/fetch_low_clearance")!
    
    init (avaoidanceController: AvoidanceControllerProtocol = AvoidanceController()) {
        self.avoidanceController = avaoidanceController
    }

    // MARK: - Public Methods
    func search(with address: String, completion: @escaping ([Placemark]?) -> Void) {
        let options = ForwardGeocodeOptions(query: address)
        options.allowedScopes = [.address, .pointOfInterest]

        _ = geocoder.geocode(options) { (placemarks, attribution, error) in
            guard let placemarks = placemarks else { return }

            completion(placemarks)
        }
    }
}
