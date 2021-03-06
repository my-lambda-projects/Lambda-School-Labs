//
//  FoodsCollectionViewController.swift
//  Labs8-MealHelper
//
//  Created by De MicheliStefano on 03.12.18.
//  Copyright © 2018 De MicheliStefano. All rights reserved.
//

import UIKit

class RecipeCollectionViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    // MARK: - Public properties
    
    var selectedRecipeAtIndex = [Int]() {
        didSet {
            if selectedRecipeAtIndex.isEmpty {
                navigationItem.setRightBarButton(noItemSelectedbarButton, animated: true)
            } else {
                navigationItem.setRightBarButton(itemsSelectedBarButton, animated: true)
            }
        }
    }
    
    var recipes = [Recipe]()
    var navTitle: String?
    var cellId = "RecipeCell"
    
    // MARK: - Private properties
    
    
    lazy var noItemSelectedbarButton: UIBarButtonItem = {
        return UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(didTapBarButtonWithoutSelectedItems))
    }()
    
    lazy var itemsSelectedBarButton: UIBarButtonItem = {
        return UIBarButtonItem(barButtonSystemItem: .save, target: self, action: #selector(didTapBarButtonWithSelectedItems))
    }()
    
    lazy var cancelBarButton: UIBarButtonItem = {
        return UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(dismissView))
    }()
    
    // MARK: - Life Cycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupCollectionView()        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        selectedRecipeAtIndex.removeAll()
        
        FoodClient.shared.fetchRecipes { (response) in
            DispatchQueue.main.async {
                switch response {
                case .success(let recipes):
                    self.recipes = recipes.reversed()
                    self.collectionView.reloadData()
                case .error:
                    self.showAlert(with: "We couldn't get your recipes, please check your internet connection and try again.")
                    return
                }
            }
        }
    }
    
    // MARK: - CollectionViewDelegate
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return recipes.count
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! FoodCell<Recipe>
        
        let food = recipes[indexPath.item]
        cell.food = food
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.bounds.width - 16, height: 65)
    }
    
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let food = recipes[indexPath.item]
        didSelect(food)
    }
    
    override func collectionView(_ collectionView: UICollectionView, didDeselectItemAt indexPath: IndexPath) {
        let food = recipes[indexPath.item]
        didSelect(food)
    }
    
    func didSelect(_ food: Recipe) {
        guard let index = recipes.index(of: food) else { return }
        
        if selectedRecipeAtIndex.contains(index) {
            guard let index = selectedRecipeAtIndex.index(of: index) else { return }
            selectedRecipeAtIndex.remove(at: index)
        } else {
            selectedRecipeAtIndex.append(index)
        }
    }
    
    private func getSelectedRecipes() -> [Recipe] {
        var selectedRecipes = [Recipe]()
        for index in selectedRecipeAtIndex {
            let food = recipes[index]
            selectedRecipes.append(food)
        }
        return selectedRecipes
    }
    
    // MARK: - User Actions
    
    @objc func didTapBarButtonWithoutSelectedItems() {
        let layout = UICollectionViewFlowLayout()
        let searchIngredientVC = SearchIngredientCollectionViewController(collectionViewLayout: layout)
        navigationController?.pushViewController(searchIngredientVC, animated: true)
    }
    
    @objc func didTapBarButtonWithSelectedItems() {
        let selectedRecipes = self.selectedRecipes()
        
        guard !selectedRecipes.isEmpty else {
            showAlert(with: "Please select a meal")
            return
        }
        
        let saveMealVC = SaveMealViewController()
        saveMealVC.recipes = selectedRecipes
        navigationController?.pushViewController(saveMealVC, animated: true)
    }
    
    @objc func dismissView() {
        dismiss(animated: true, completion: nil)
    }
    
    // MARK: - Private methods
    
    private func selectedRecipes() -> [Recipe] {
        var selectedRecipes = [Recipe]()
        for index in selectedRecipeAtIndex {
            selectedRecipes.append(recipes[index])
        }
        return selectedRecipes
    }
    
    // MARK: - Configuration
    
    private func setupCollectionView() {
        collectionView.register(FoodCell<Recipe>.self, forCellWithReuseIdentifier: cellId)
        collectionView.allowsMultipleSelection = true
        collectionView.backgroundColor = UIColor.init(white: 0, alpha: 0.35)
        collectionView.contentInset = UIEdgeInsets(top: 8, left: 0, bottom: 0, right: 0)
        collectionView.layer.borderWidth = 0.5
        collectionView.layer.borderColor = UIColor.init(white: 0, alpha: 0.6).cgColor
        collectionView.layer.masksToBounds = true
        
        view.backgroundColor = .mountainDark
        navigationItem.setRightBarButton(noItemSelectedbarButton, animated: true)
        navigationItem.leftBarButtonItem = cancelBarButton
        
        title = "Add Meals to Journal"
    }
    
}
