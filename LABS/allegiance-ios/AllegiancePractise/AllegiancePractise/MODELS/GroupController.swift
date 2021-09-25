//
//  GroupController.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/30/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import Foundation
import CoreData

class GroupController {
    
    //var groups: [Group] = []     We only do this when NOT using CoreData (I think)
    
    func put(group: Group) {
        _ = group
        do {
            let moc = CoreDataStack.shared.mainContext
            try moc.save()
        } catch {
            NSLog("Error saving group to persistent store \(error)")
            return
        }
    }
    
    // optional: you could write a dedicated saveToPersistentStore() throws { function here
    
    func fetch() -> [Group] {
        
        let fetchRequest: NSFetchRequest<Group> = Group.fetchRequest()
        do {
            let moc = CoreDataStack.shared.mainContext
            return try moc.fetch(fetchRequest)
        } catch {
            NSLog("Error fetching groups from iPhone memory \(error)")
            return []
        }
    }
    
}
