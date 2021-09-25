//
//  ux17SideMenuTableViewController.swift
//  RVNav
//
//  Created by Lambda_School_Loaner_214 on 1/13/20.
//  Copyright © 2020 RVNav. All rights reserved.
//

import UIKit

class ux17SideMenuTableViewController: UITableViewController {

  
    // MARK: - Properties
    var modelController: ModelController?
    // This is the array that the tableview data source uses for menu options.
    var menuItemController = MenuItemController()
    var menuDelegate: MenuDelegateProtocol?
    
    // MARK: - IBOutlets
    @IBOutlet weak var topView: UIView!
    
    // MARK: - IBActions
    @IBAction func unwindToMenu(segue:UIStoryboardSegue) { }

    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        switch segue.identifier {
        case "ShowVehichleInfo":
            if let vc = segue.destination as? VehicleListTableViewController {
                vc.vehicleController = modelController?.vehicleController
            }
        default:
            break
        }
    }

    // MARK: - Table view data source
    override func numberOfSections(in tableView: UITableView) -> Int {
        return menuItemController.sections.count
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerCell = tableView.dequeueReusableCell(withIdentifier: "HeaderCell") as! MenuSectionTableViewCell
            //else { return UIView()}
        headerCell.sectionLabel = menuItemController.sections[section].name
        return headerCell
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return menuItemController.sections[section].name
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 40.0
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return menuItemController.sections[section].menuItems.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "MenuCell", for: indexPath) as? MenuItemTableViewCell else { return UITableViewCell() }

        let menuItem = menuItemController.sections[indexPath.section].menuItems[indexPath.row]
        cell.menuItem = menuItem
        let view = UIView()
        view.backgroundColor = .darkBlue
        cell.selectedBackgroundView = view
        return cell
    }

    @objc func logout() {
        UserController.shared.logout(completion: {
            DispatchQueue.main.async {
                self.dismiss(animated: true, completion: nil)
                self.menuDelegate?.performSegue(segueIdentifier: "SignInSegue")
            }
        })

    }
    
    // The switch determines which index of the menu array you are tapping.
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let menuItem = menuItemController.sections[indexPath.section].menuItems[indexPath.row]
        if !menuItem.segueID.isEmpty {
            performSegue(withIdentifier: menuItem.segueID, sender: self)
        } else if !menuItem.selector.isEmpty {
            let selector = NSSelectorFromString(menuItem.selector)
            performSelector(onMainThread: selector, with: nil, waitUntilDone: false)
        }
    }
    
    private func setupUI () {
        tableView.separatorStyle = .none
        tableView.backgroundColor = .darkBlue
        topView.backgroundColor = .darkBlue
        
    }
}
