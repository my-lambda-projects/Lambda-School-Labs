//
//  SavedCityCollectionViewCell.swift
//  BestPlacesToLive
//
//  Created by Lambda_School_Loaner_148 on 9/13/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit

class SavedCityCollectionViewCell: UICollectionViewCell {
    
    var savedCity: ReturnedSavedCity? {
        didSet {
            updateViews()
        }
    }
    
    @IBOutlet weak var savedImageView: UIImageView!
    @IBOutlet weak var cityNameLabel: UILabel!
    
    private func updateViews() {
        
        cityNameLabel.text = savedCity?.name
        cityNameLabel.textColor = .white
        
        
        do {
            let imageURL = URL(string: savedCity!.photo)
            let data = try Data(contentsOf: imageURL!)
            savedImageView.image = UIImage(data: data)
            
        } catch {
            NSLog("Error getting image")
            return
        }
        
        
    }
    
    
    
}
