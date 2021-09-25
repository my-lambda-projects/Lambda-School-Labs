//
//  PasswordTextField.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/6/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit

class PasswordTextField: UITextField {
    
    private var showPassword: Bool = false
    private let rightViewPadding: CGFloat = 40
    private let eyeButton = UIButton()
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    @objc private func toggleShowPassword() {
        showPassword.toggle()
        if showPassword {
            eyeButton.setImage(UIImage(named: "eye"), for: .normal)
        } else {
            eyeButton.setImage(UIImage(named: "eye-off"), for: .normal)
        }
        self.togglePasswordVisibility()
    }
    
    private func setupView() {
        eyeButton.setImage(UIImage(named: "eye-off"), for: .normal)
        eyeButton.addTarget(self, action: #selector (self.toggleShowPassword), for: .touchUpInside)
        
        self.rightViewMode = .always
        self.rightView = eyeButton
        self.isSecureTextEntry = true
    }
    
    override func rightViewRect(forBounds bounds: CGRect) -> CGRect {
        let rightBounds = CGRect(x: bounds.size.width - rightViewPadding, y: 10, width: 24, height: 24)
        return rightBounds
    }
}

extension UITextField {
    func togglePasswordVisibility() {
        isSecureTextEntry = !isSecureTextEntry
        
        if let existingText = text, isSecureTextEntry {
            /* When toggling to secure text, all text will be purged if the user
             continues typing unless we intervene. This is prevented by first
             deleting the existing text and then recovering the original text. */
            deleteBackward()
            
            if let _/*textRange*/ = textRange(from: beginningOfDocument, to: endOfDocument) {
                //replace(textRange, withText: existingText)
                text = existingText
            }
        }
        
        /* Reset the selected text range since the cursor can end up in the wrong
         position after a toggle because the text might vary in width */
        if let existingSelectedTextRange = selectedTextRange {
            selectedTextRange = nil
            selectedTextRange = existingSelectedTextRange
        }
    }
}
