//
//  MenuSectionTableViewCell.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/15/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit

class MenuSectionTableViewCell: UITableViewCell {

    var sectionLabel: String? {
           didSet {
               updateViews()
           }
       }
    
    @IBOutlet weak var label: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    private func updateViews() {
        self.backgroundColor = .darkBlue
        label.text = sectionLabel
        label.textColor = .white
    }
}
