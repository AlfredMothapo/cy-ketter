
describe("Login test",()=>{

    beforeEach(()=>{
        //do something before each test
    })

    it("checks if the login form is loaded",()=>{
        
    })
    it("populate inputs in the login form",()=>{

    })
    it("clicks the submit button",()=>{

    })
    it("checks if validation rules passed",()=>{

    })
    it("Check if the user is redirected after successfull login",()=>{

    })

    after(()=>{
        cy.window().then((win) => {
            cy.spy(win.console, "log")
          })
    })
})