//
//  SavedCitiesViewController.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 9/13/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class SavedCitiesViewController: UIViewController {
    
    
    var savedCities: [ReturnedSavedCity]? = []
    var savedCitiesController = SavedCitiesController()
    
    @IBOutlet weak var savedCityCollectionView: UICollectionView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        savedCityCollectionView.delegate = self
        savedCityCollectionView.dataSource = self
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        savedCitiesController.getAllSavedCity(completion: { (loggedInUser, error) in
            if let error = error {
                NSLog("Error fetching saved Cities in SavedCitiesViewController: \(error)")
                return
            }
            if let cities = loggedInUser?.cities {
                DispatchQueue.main.async {
                    self.savedCities = cities
                    self.savedCityCollectionView.reloadData()
                }
            }
            
        })
        
    }
    
    @IBAction func homebuttonTapped(_ sender: Any) {
        
        self.dismiss(animated: true, completion: nil)

    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SavedDetailSegue" {
            let destinationVC = segue.destination as! SavedCitiesDetailViewController
            let cell = sender as! SavedCityCollectionViewCell
            guard let index = savedCityCollectionView.indexPath(for: cell) else { return }
            destinationVC.savedCitiesController = savedCitiesController
            destinationVC.savedCity = savedCities?[index.item]
        }
    }

}

extension SavedCitiesViewController: UICollectionViewDelegate, UICollectionViewDataSource {
    
    
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return savedCities?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = savedCityCollectionView.dequeueReusableCell(withReuseIdentifier: "SavedCityCell", for: indexPath) as? SavedCityCollectionViewCell else { fatalError() }
        
        let savedCity = savedCities?[indexPath.item]
        
        cell.savedCity = savedCity
        cell.layer.cornerRadius = 20.0
        
        return cell
        
    }
    
    
}
