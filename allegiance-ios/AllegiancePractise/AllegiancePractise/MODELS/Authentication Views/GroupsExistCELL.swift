//
//  GroupsExistCELL.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/27/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import UIKit

class GroupsExistCELL: UICollectionViewCell {
    
    @IBOutlet weak var cellImage: UIImageView!
    @IBOutlet weak var groupNameLabel: UILabel!
    @IBOutlet weak var membersLabel: UILabel!
    
    func displayCellContent(image: UIImage, groupName: String, members: String) {
        
        cellImage.image = image
        groupNameLabel.text = groupName
        membersLabel.text = members
    }
}
