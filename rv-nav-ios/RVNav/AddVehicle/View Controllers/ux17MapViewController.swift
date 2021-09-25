//
//  MapViewController.swift
//  RVNav
//
//  Created by Jonathan Ferrer on 8/19/19.
//  Copied bu Joshua Sharp on 01/13/2020
//  Notes: Migrated UI over to new ux17 Design

//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit
import Mapbox
import MapboxNavigation
import MapboxCoreNavigation
import MapboxDirections
import SwiftKeychainWrapper
import FirebaseAnalytics
import MapboxGeocoder
import Contacts
import Floaty
import ArcGIS


class ux17MapViewController: UIViewController, AGSGeoViewTouchDelegate {
    
    // MARK: - Properties
    private var modelController: ModelController = ModelController(userController: UserController())
    //private let avoidanceController: AvoidanceControllerProtocol = AvoidanceController()
    private let directionsController = MapBoxDirectionsController()
    private let graphicsOverlay = AGSGraphicsOverlay()
    private var start: AGSPoint?
    private var end: AGSPoint?
    private let geocoder = Geocoder.shared
    private var avoidances: [Avoid] = []
    private var coordinates: [CLLocationCoordinate2D] = []
    private let routeTask = AGSRouteTask(url: URL(string: "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World")!)
    
    // MARK: - IBOutlets
    @IBOutlet private weak var mapView: AGSMapView!
    
    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        Analytics.logEvent("app_opened", parameters: nil)
        setupMap()
        setupFloaty()
        setupLocationDisplay()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if directionsController.destinationAddress != nil {
            let destination = directionsController.destinationAddress!.location!.coordinate
            end = AGSPoint(clLocationCoordinate2D: destination)
            let _ = createBarriers()
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if UserDefaults.isFirstLaunch() {
            performSegue(withIdentifier: "LandingPageSegue", sender: self)
        } else if KeychainWrapper.standard.string(forKey: "accessToken") == nil && !UserDefaults.isFirstLaunch() {
            performSegue(withIdentifier: "SignInSegue", sender: self)
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SignInSegue" {
            let destinationVC = segue.destination as! SignInViewController
            destinationVC.userController = modelController.userController
        }
        if segue.identifier == "ShowAddressSearch" {
//            let destinationVC = segue.destination as! DirectionsSearchTableViewController
//            destinationVC.directionsController = directionsController
        }
        if segue.identifier == "LandingPageSegue" {
            let destinationVC = segue.destination as! LandingPageViewController
            destinationVC.userController = modelController.userController
        }
        if segue.identifier == "HamburgerMenu" {
            let destinationVC = segue.destination as! CustomSideMenuNavigationController
            destinationVC.modelController = modelController
            destinationVC.menuDelegate = self
        }
    }
    
    // MARK: - IBActions
    @IBAction func logOutButtonTapped(_ sender: Any) {
        modelController.userController.logout {
            DispatchQueue.main.async {
                self.performSegue(withIdentifier: "SignInSegue", sender: self)
            }
        }
    }
    
    @IBAction func unwindToMapView(segue:UIStoryboardSegue) { }
    
    // MARK: - Private Methods
    private func convert(toLongAndLat xPoint: Double, andYPoint yPoint: Double) ->
        CLLocation {
            let originShift: Double = 2 * .pi * 6378137 / 2.0
            let lon: Double = (xPoint / originShift) * 180.0
            var lat: Double = (yPoint / originShift) * 180.0
            lat = 180 / .pi * (2 * atan(exp(lat * .pi / 180.0)) - .pi / 2.0)
            return CLLocation(latitude: lat, longitude: lon)
    }
    
    // Used to display barrier points retrieved from the DS backend.
    private func plotAvoidance() {
        let startCoor = convert(toLongAndLat: mapView.locationDisplay.mapLocation!.x, andYPoint: mapView.locationDisplay.mapLocation!.y)
        
        guard let vehicleInfo = RVSettings.shared.selectedVehicle, let height = vehicleInfo.height, let endLon = directionsController.destinationAddress?.location?.coordinate.longitude, let endLat = directionsController.destinationAddress?.location?.coordinate.latitude  else { return }
        
        let routeInfo = RouteInfo(height: height, startLon: startCoor.coordinate.longitude, startLat: startCoor.coordinate.latitude, endLon: endLon, endLat: endLat)
        
        directionsController.avoidanceController.getAvoidances(with: routeInfo) { (avoidances, error) in
            if let error = error {
                NSLog("error fetching avoidances \(error)")
            }
            if let avoidances = avoidances {
                self.avoidances = avoidances
                print(avoidances.count)
                
                DispatchQueue.main.async {
                    for avoid in avoidances {
                        let coor = CLLocationCoordinate2D(latitude: avoid.latitude, longitude: avoid.longitude)
                        let point = AGSPoint(clLocationCoordinate2D: coor)
                        self.addMapMarker(location: point, style: .X, fillColor: .red, outlineColor: .red)
                    }
                }
            }
        }
    }
    
    // This is for the Plus button floating on the map
    private func setupFloaty() {
        let carIcon = UIImage(named: "car")
        let floaty = Floaty()
        floaty.addItem("Directions", icon: carIcon) { (item) in
            DispatchQueue.main.async {
                self.performSegue(withIdentifier: "ShowAddressSearch", sender: self)
            }
        }
        floaty.addItem("Avoid", icon: carIcon) { (item) in
            DispatchQueue.main.async {
                self.plotAvoidance()
            }
        }
        floaty.paddingY = 42
        floaty.buttonColor = .black
        floaty.plusColor = .green
        self.view.addSubview(floaty)
    }
    
    // Creates a new instance of AGSMap and sets it to the mapView.
    
    private func setupMap() {
        mapView.map = AGSMap(basemapType: .navigationVector, latitude: 40.615518, longitude: -74.026005, levelOfDetail: 18)
        mapView.touchDelegate = self
        mapView.graphicsOverlays.add(graphicsOverlay)
    }
    
    // Allows users location to be used and displayed on the main mapView.
    private func setupLocationDisplay() {
        mapView.locationDisplay.autoPanMode = .compassNavigation
        mapView.locationDisplay.start { [weak self] (error:Error?) -> Void in
            if let error = error {
                self?.showAlert(withStatus: error.localizedDescription)
            }
        }
    }
    
    // Shows alert if there was an error displaying location.
    private func showAlert(withStatus: String) {
        let alertController = UIAlertController(title: "Alert", message:
            withStatus, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "Dismiss", style: .default, handler: nil))
        present(alertController, animated: true, completion: nil)
    }
    
    // Used to call DS backend for getting barriers coordinates.  Each coordinate is turned into a AGSPolygonBarrier and appended to an array.  The array is then returned.
    func createBarriers() -> [AGSPolygonBarrier]{
        let const = 0.0001
        var barriers: [AGSPolygonBarrier] = [] {
            didSet {
                self.findRoute(with: barriers)
            }
        }
        let startCoor = convert(toLongAndLat: mapView.locationDisplay.mapLocation!.x, andYPoint: mapView.locationDisplay.mapLocation!.y)
        
        guard let vehicleInfo = RVSettings.shared.selectedVehicle, let height = vehicleInfo.height, let endLon = directionsController.destinationAddress?.location?.coordinate.longitude, let endLat = directionsController.destinationAddress?.location?.coordinate.latitude  else { return []}
        
        let routeInfo = RouteInfo(height: height, startLon: startCoor.coordinate.longitude, startLat: startCoor.coordinate.latitude, endLon: endLon, endLat: endLat)
        
        directionsController.avoidanceController.getAvoidances(with: routeInfo) { (avoidances, error) in
            if let error = error {
                NSLog("error fetching avoidances \(error)")
            }
            if let avoidances = avoidances {
                var tempBarriers: [AGSPolygonBarrier] = []
                
                for avoid in avoidances {
                    let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (avoid.latitude + const), longitude: (avoid.longitude + const)))
                    let point1 = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (avoid.latitude + const), longitude: (avoid.longitude - const)))
                    let point2 = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (avoid.latitude - const), longitude: (avoid.longitude - const)))
                    let point3 = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (avoid.latitude - const), longitude: (avoid.longitude + const)))
                    let gon = AGSPolygon(points: [point, point1, point2, point3])
                    let barrier = AGSPolygonBarrier(polygon: gon)
                    
                    tempBarriers.append(barrier)
                    
                    // Used to print out the barriers for testing cxpurposes.
                    
                    //                    let routeSymbol = AGSSimpleLineSymbol(style: .solid, color: .red, width: 8)
                    //                    let routeGraphic = AGSGraphic(geometry: gon, symbol: routeSymbol, attributes: nil)
                    //                    self.graphicsOverlay.graphics.add(routeGraphic)
                }
                barriers = tempBarriers
                print(tempBarriers.count)
            }
        }
        return barriers
    }
    
    // This function sets the default paramaters for finding a route between 2 locations.  Barrier points are used as a parameter.  The route is drawn to the screen.
    
    private func findRoute(with barriers: [AGSPolygonBarrier]) {
        
        routeTask.defaultRouteParameters { [weak self] (defaultParameters, error) in
            guard error == nil else {
                print("Error getting default parameters: \(error!.localizedDescription)")
                return
            }
            
            guard let params = defaultParameters, let self = self, let start = self.mapView.locationDisplay.mapLocation, let end = self.end else { return }
            
            params.setStops([AGSStop(point: start), AGSStop(point: end)])
            params.setPolygonBarriers(barriers)
            
            self.routeTask.solveRoute(with: params, completion: { (result, error) in
                guard error == nil else {
                    print("Error solving route: \(error!.localizedDescription)")
                    return
                }
                
                if let firstRoute = result?.routes.first, let routePolyline = firstRoute.routeGeometry {
                    let routeSymbol = AGSSimpleLineSymbol(style: .solid, color: .blue, width: 8)
                    let routeGraphic = AGSGraphic(geometry: routePolyline, symbol: routeSymbol, attributes: nil)
                    self.graphicsOverlay.graphics.removeAllObjects()
                    self.graphicsOverlay.graphics.add(routeGraphic)
                    let totalDistance = Measurement(value: firstRoute.totalLength, unit: UnitLength.meters)
                    let totalDuration = Measurement(value: firstRoute.travelTime, unit: UnitDuration.minutes)
                    let formatter = MeasurementFormatter()
                    formatter.numberFormatter.maximumFractionDigits = 2
                    formatter.unitOptions = .naturalScale
                    
                    DispatchQueue.main.async {
                        let alert = UIAlertController(title: nil, message: """
                            Total distance: \(formatter.string(from: totalDistance))
                            Travel time: \(formatter.string(from: totalDuration))
                            """, preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                        self.present(alert, animated: true, completion: nil)
                    }
                }
            })
        }
    }
    
    // adds a mapmarker at a given location.
    private func addMapMarker(location: AGSPoint, style: AGSSimpleMarkerSymbolStyle, fillColor: UIColor, outlineColor: UIColor) {
        let pointSymbol = AGSSimpleMarkerSymbol(style: style, color: fillColor, size: 8)
        pointSymbol.outline = AGSSimpleLineSymbol(style: .solid, color: outlineColor, width: 2)
        let markerGraphic = AGSGraphic(geometry: location, symbol: pointSymbol, attributes: nil)
        graphicsOverlay.graphics.add(markerGraphic)
    }
}

extension ux17MapViewController: MenuDelegateProtocol {
    func performSegue(segueIdentifier: String) {
        performSegue(withIdentifier: segueIdentifier, sender: self)
    }
}
