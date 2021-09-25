//
//  CoreDataStack.swift
//  AllegiancePractise
//
//  Created by John Pitts on 8/28/19.
//  Copyright © 2019 johnpitts. All rights reserved.
//

import Foundation
import CoreData

class CoreDataStack {
    
    // PROPERTIES:
    static let shared = CoreDataStack()
    
    lazy var container: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "AllegiancePractise")
        container.loadPersistentStores { (_, error) in
            if let error = error {
                fatalError("Failed to load persistent CoreData stores \(error)")
            }
        }
        container.viewContext.automaticallyMergesChangesFromParent = true
        return container
    }()
    
    var mainContext: NSManagedObjectContext {
        return container.viewContext
    }
    
    
    // METHOD: save
    func save(context: NSManagedObjectContext = CoreDataStack.shared.mainContext) throws {
        
        var error: Error?
        
        context.performAndWait {
            do {
                try context.save()
            } catch let saveError {
                error = saveError
            }
        }
        if let error = error { throw error }
    }
}
