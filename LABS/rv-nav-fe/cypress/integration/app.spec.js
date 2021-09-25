// import { cyan } from "ansi-colors";
//Local host imput 
// describe('Start Input', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/map')
//     })
 
//     it('focuses start input on load', () => {
//         cy.focused()
//             .should('have.id', 'start')
//     })

//     it('accepts input', () => {
//         const typedText = 'Detroit'
       
//         cy.get('#start')
//             .type(typedText)
//             .should('have.value', typedText)

//         const typeText = 'Miami'

//         cy.get('#end')
//             .type(typeText)
//             .should('have.value', typeText)

            
//         cy.get('#button').click() 
        
    
//             })
   


//Needs Autofocus in "Add a vehicle ID" for test to pass 
    // it('focuses start input on load', () => {

    //     cy.focused()
    //         .should('have.id', 'selected')
    // })
//Needs Autofocus in "Add a vehicle ID" for test to pass 
    // it('focuses start input on load', () => {

    //     cy.focused()
    //         .should('have.id', 'sidebar-tab')
    // })

// })

describe('Landing Page/Auth Testing', () => {
    it('tests Get Started button', () => {
        cy.visit("https://rvnavstaging1.netlify.com/")
        cy.contains('Get Started').click()
        cy.url().should('include', '/register')
    })

    it('test Login link button', () => {
        cy.visit("https://rvnavstaging1.netlify.com/")
        cy.contains('Login').click()
        cy.url().should('include', '/login')
    })

    it('checks input on email field', () => {
        cy.get('input[name="email"]').type('mt@mt.com')
        cy.get('input[name="email"]').should('have.value', 'mt@mt.com')
    })

    it('checks login function button', () => {
        cy.get('input[name="password"]').type('password')
        cy.get('.login-lets-go-button').click()
        cy.url().should('include', '/map')
    })
})

describe('Routing Menu Testing', () => {
    it('tests hamburger menu popup', () => {
        cy.get('.hammenu').click()
        cy.get('.dropdownitem1').should('be.visible')
    })

    it('tests hamburger menu close', () => {
        cy.get('.hammenu').click()
        cy.get('.dropdownitem1').should('not.be.visible')
    })

    it('tests vehicle dropdown open', () => {
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').should('be.visible')
    })

    it('tests vehicle dropdown closes', () => {
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').should('not.be.visible')
    })
})

describe('Add Vehicle Page Testing', () => {
    context('resolution setting', () => {
        beforeEach( () => {
            cy.viewport(1280, 720)
        })
    })
    
    it('tests Add Vehicle link', () => {
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').click()
        cy.get('.hammenu').click()
        cy.contains('Logout').click()
        cy.get('input[name="email"]').type('mt@mt.com')
        cy.get('input[name="password"]').type('password')
        cy.get('.login-lets-go-button').click()
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').click()
        cy.get('input[name="name"]').should('be.visible')

    })

    it('tests Add Veh cancel button', () => {
        cy.get('#cancelButton').click()
        cy.contains('Name (required)').should('not.be.visible')
    })

    it('tests Add Veh cancel button', () => {
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').click()
        cy.contains('Back').click()
        cy.contains('Name (required)').should('not.be.visible')
    })

    it('tests name input', () => {
        cy.get('#arrowDown').click()
        cy.contains('Add a vehicle...').click()
        cy.get('input[name="name"]').type("Test Vehicle")
        cy.get('input[name="name"]').should('have.value', 'Test Vehicle')
    })

    it('tests height feet input', () => {
        cy.get('input[name="heightFeet"]').type('13')
        cy.get('input[name="heightFeet"]').should('have.value', '13')
    })

    it('tests height inches input', () => {
        cy.get('input[name="heightInches"]').type('6')
        cy.get('input[name="heightInches"]').should('have.value', '6')
    })

    it('tests width feet input', () => {
        cy.get('input[name="widthFeet"]').type('8')
        cy.get('input[name="widthFeet"]').should('have.value', '8')
    })

    it('tests width inches input', () => {
        cy.get('input[name="widthInches"]').type('4')
        cy.get('input[name="widthInches"]').should('have.value', '4')
    })

    it('tests length feet input', () => {
        cy.get('input[name="lengthFeet"]').type('22')
        cy.get('input[name="lengthFeet"]').should('have.value', '22')
    })

    it('tests length inches input', () => {
        cy.get('input[name="lengthInches"]').type('2')
        cy.get('input[name="lengthInches"]').should('have.value', '2')
    })

    it('tests weight input', () => {
        cy.get('input[name="weight"]').type('6000')
        cy.get('input[name="weight"]').should('have.value', '6000')
    })

    it('tests axel count input', () => {
        cy.get('input[name="axel_count"]').type('2')
        cy.get('input[name="axel_count"]').should('have.value', '2')
    })

    it('tests tires checkbox affirm', () => {
        cy.get('input[name="dual_tires"]').click()
        cy.get('input[name="dual_tires"]').should('be.checked')
    })

    it('tests tires checkbox deny', () => {
        cy.get('input[name="dual_tires"]').click()
        cy.get('input[name="dual_tires"]').should('not.be.checked')
    })

    it('tests class A radio button', () => {
        cy.get('input[value="ClassA"]').click()
        cy.get('input[value="ClassA"]').should('be.checked')
    })

    it('tests class B radio button', () => {
        cy.get('input[value="ClassB"]').click()
        cy.get('input[value="ClassB"]').should('be.checked')
    })

    it('tests class C radio button', () => {
        cy.get('input[value="ClassC"]').click()
        cy.get('input[value="ClassC"]').should('be.checked')
    })

    it('tests 5th wheel radio button', () => {
        cy.get('input[value="5thWheel"]').click()
        cy.get('input[value="5thWheel"]').should('be.checked')
    })

    it('tests tagalong radio button', () => {
        cy.get('input[value="tagalong"]').click()
        cy.get('input[value="tagalong"]').should('be.checked')
    })

    it('tests Add button', () => {
        cy.get('"add" > button').click()
        cy.contains('Name (required)').should('not.be.visible')
    })

    it('tests that vehicle was added',() => {
        cy.get('#arrowDown').click()
        cy.contains('Test Vehicle').should('be.visible')
    })
})

// describe('Test Edit Vehicle Form', () => {
     // can't be written yet
// })

describe('Tests Routing (Low bridge circumvention)', () => {
    it('tests select vehicle', () => {
        cy.get('#arrowDown').click()
        cy.contains('Edited Test Vehicle').click()
        cy.contains('Edited Test Vehicle').should('be.visible')
    })

    it('tests starting input', () => {
        cy.get('#start').type('1119 S. Summit St, Little Rock, AR')
        cy.get('#start').should('have.value', '1119 S. Summit St, Little Rock, AR')
    })

    it('tests destination input', () => {
        cy.get('#end').type('1119 S. Summit St, Little Rock, AR')
        cy.get('#end').should('have.value', '1923 W 10th St  Little Rock, AR')
    })

    it('routes correctly when Get Directions button is pressed', () => {
        cy.get('#route-button').click()
        // need to insert routing step on next line
        cy.contains('').should('be.visible')
    })

    it('tests hide directions affirm', () => {
        cy.get('svg > rect').click()
        cy.contains('Directions').should('not.be.visible')
    })

    it('tests hide directions deny', () => {
        cy.get('svg > rect').click()
        cy.contains('Directions').should('be.visible')
    })

    it('tests routing back button', () => {
        cy.get('.routineBackButton').click()
        cy.contains('What vehicle are you routing with?').should('be.visible')
    })
})

describe('Logout Button Test', () => {
    it('tests logout button', () => {
        cy.get('hammenu').click()
        cy.get('.dropdownitem1').click()
        cy.url().should('not.include', '/map')
    })
})