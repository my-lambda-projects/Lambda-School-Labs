//
//  GroupsExistViewController.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/26/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import UIKit
import CoreData

class GroupsExistViewController: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate, NSFetchedResultsControllerDelegate {
    
    
    var groupController = GroupController()                     // again, am I allowed to bang this? Instructor says yes.
    
    @IBOutlet weak var groupsExistCollectionV: UICollectionView!
    
    @IBOutlet weak var groupsFoundLabel: UILabel!
    
    var favoriteTeam: String?
    var zipcode: Int?
    var groupsMatched: [Group]? // = example group
    
    lazy var fetchedResultsController: NSFetchedResultsController<Group> = {
        let fetchRequest: NSFetchRequest<Group> = Group.fetchRequest()
        let moc = CoreDataStack.shared.mainContext
        fetchRequest.sortDescriptors = [NSSortDescriptor(key: "groupName", ascending: true), NSSortDescriptor(key: "location", ascending: true)]
        let frc = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: moc, sectionNameKeyPath: "groupName", cacheName: nil)
        frc.delegate = self
        try! frc.performFetch()
        return frc
    }()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.groupsExistCollectionV.dataSource = self
        self.groupsExistCollectionV.delegate = self
        
        
        groupsMatched = groupController.fetch()
        
        updateViews()
    }
    
//    func numberOfSections(in collectionView: UICollectionView) -> Int {
//        return 1 //fetchedResultsController.sections?.count ?? 1
//    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return groupsMatched?.count ?? 0 //fetchedResultsController.sections?[section].numberOfObjects ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "GroupsExistCell", for: indexPath) as! GroupsExistCELL
        
        //let group = fetchedResultsController.object(at: indexPath)
        //print(group!)
        
        guard let name = groupsMatched?[indexPath.item].groupName else { return cell } //group.groupName
        let sampleImage = UIImage(named: "allegianceIcon-76")!
        //let members = group.users.numberOfObjects
            
        cell.displayCellContent(image: sampleImage, groupName: name, members: "1")  // will be groupsMatched[indexPath.row].name & .count
        
        return cell
    }
    
    
    func updateViews() {
        
        guard let userTeamEntry = favoriteTeam else {print("user entered nil for group search, segue back to previous view?"); return}
        groupsFoundLabel.text = "Check out some \(userTeamEntry) groups near you!"
        groupsExistCollectionV.reloadData()
    }
   
    // not sure this is even needed given the button can be made to segue to Create Groups controller via interface builder drag/drop
    @IBAction func createGroupButton(_ sender: Any) {
        
    }
    
    
    //MARK: - NSFetchedResultsControllerDelegate methods
    
//    func controllerWillChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
//        groupsExistCollectionV.performBatchUpdates(<#T##updates: (() -> Void)?##(() -> Void)?##() -> Void#>, completion: <#T##((Bool) -> Void)?##((Bool) -> Void)?##(Bool) -> Void#>)
//    }
//
//    func controllerDidChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
//        groupsExistCollectionV.
//    }
    
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>, didChange sectionInfo: NSFetchedResultsSectionInfo, atSectionIndex sectionIndex: Int, for type: NSFetchedResultsChangeType) {
        switch type {
        case .insert:
            groupsExistCollectionV.insertSections(IndexSet(integer: sectionIndex))
        case .delete:
            groupsExistCollectionV.deleteSections(IndexSet(integer: sectionIndex))
        default:
            break
        }
    }
    
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>, didChange anObject: Any, at indexPath: IndexPath?, for type: NSFetchedResultsChangeType, newIndexPath: IndexPath?) {
        switch type {
        case .insert:
            guard let newIndexPath = newIndexPath else {return}
            groupsExistCollectionV.insertItems(at: [newIndexPath])
        case .update:
            guard let indexPath = indexPath else {return}
            groupsExistCollectionV.reloadItems(at: [indexPath])
        case .move:
            guard let oldIndexPath = indexPath,
                let newIndexPath = newIndexPath else {return}
            groupsExistCollectionV.deleteItems(at: [oldIndexPath])
            groupsExistCollectionV.insertItems(at: [newIndexPath])
        case .delete:
            guard let indexPath = indexPath else {return}
            groupsExistCollectionV.deleteItems(at: [indexPath])
        default:
            break
        }
    }
    
}
