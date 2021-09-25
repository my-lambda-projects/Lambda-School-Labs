//
//  HomeViewController.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 8/22/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController, UISearchBarDelegate {
    
    let networkController = NetworkingController()
    let transition = SlideInTransition()
    var cities: [City]?
    var topView: UIView?
    var spacing: CGFloat = 32.0
    
    
    @IBOutlet weak var searchBar: UISearchBar!
    @IBOutlet weak var cityCollectionView: UICollectionView!
    
    @IBOutlet weak var categoryCollectionView: UICollectionView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        searchBar.delegate = self
        self.cityCollectionView.delegate = self
        self.cityCollectionView.dataSource = self
        setupCategories()
       
      
        networkController.getTopCities { (cities, error) in
            if let error = error {
                NSLog("Error getting cities: \(error)")
            }
            
            if let cities = cities {
                DispatchQueue.main.async {
                    self.cities = cities
                    self.cityCollectionView.reloadData()
                }
            }
        }
        
    }
    
    private func setupCategories() {
        
        self.categoryCollectionView.delegate = self
        self.categoryCollectionView.dataSource = self
        let layout = UICollectionViewFlowLayout()
        layout.sectionInset = UIEdgeInsets(top: spacing, left: spacing, bottom: spacing, right: spacing)
        layout.minimumLineSpacing = spacing
        layout.minimumInteritemSpacing = spacing
        layout.scrollDirection = .horizontal
        self.categoryCollectionView.collectionViewLayout = layout
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.cityCollectionView.reloadData()
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        guard let searchWord = searchBar.text, !searchWord.isEmpty else { return }
        networkController.searchCities(searchTerm: searchWord) { (cities, error) in
            if let error = error {
                NSLog("Error searching cities: \(error)")
            }
            if let cities = cities {
                DispatchQueue.main.async {
                    self.cities = cities
                    self.cityCollectionView.reloadData()
                }
            }
        }
        
    }
    
    @IBAction func menuButtonTapped(_ sender: Any) {
        guard let menuTableViewController = storyboard?.instantiateViewController(withIdentifier: "MenuTableViewController") else { return }
        menuTableViewController.modalPresentationStyle = .overCurrentContext
        menuTableViewController.transitioningDelegate = self
        present(menuTableViewController, animated: true)
        
        
    }
    
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
  
        if segue.identifier == "CityDetailSegue" {
            guard let detailView = segue.destination as? CityDetailViewController,
                let cell = sender as? CityCollectionViewCell,
                let indexPath = cityCollectionView.indexPath(for: cell) else { return }
            detailView.city = cities?[indexPath.item]
            
        }
        
    }

}

extension HomeViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        if collectionView == categoryCollectionView {
            return networkController.categories.count
        }
        return cities?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        if collectionView == cityCollectionView {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CityCell", for: indexPath) as? CityCollectionViewCell else { fatalError() }
       let city = cities?[indexPath.row]
        cell.city = city
        cell.layer.cornerRadius = 20.0
        cell.layer.borderWidth = 1
        return cell
        } else {
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CategoryCell", for: indexPath) as? CategoryCollectionViewCell else { fatalError() }
            
            let cityCategory = networkController.categories[indexPath.item]
            cell.cityCategory = cityCategory
           
            
            return cell
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {

        if collectionView == categoryCollectionView {
            let category = networkController.categories[indexPath.item]
            self.title = category.name
            networkController.fetchCategory(category: category) { (cities, error) in
                if let error = error {
                    NSLog("Error getting categories to render: \(error)")
                    return
                }
                
                if let cities = cities {
                    DispatchQueue.main.async {
                        self.cities = cities
                        self.cityCollectionView.reloadData()
                        
                    }
                }
            }
            let categoryName = category.name.capitalized
            self.title = categoryName
        }

    }

}





extension HomeViewController: UIViewControllerTransitioningDelegate {
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        transition.isPresenting = true
        return transition
    }
    
    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        transition.isPresenting = false
        return transition
    }
}
