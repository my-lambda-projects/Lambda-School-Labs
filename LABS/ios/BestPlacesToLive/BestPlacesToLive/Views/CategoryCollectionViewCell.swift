//
//  CategoryCollectionViewCell.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 9/18/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class CategoryCollectionViewCell: UICollectionViewCell {
    
    var cityCategory: CityCategory? {
        didSet {
            updateViews()
        }
    }
    
    
    @IBOutlet weak var categoryImageView: UIImageView!
    
    private func updateViews() {
        
        guard let cityCategory = cityCategory else { return }
        categoryImageView.image = cityCategory.image
        
    }
    
    
    
}
