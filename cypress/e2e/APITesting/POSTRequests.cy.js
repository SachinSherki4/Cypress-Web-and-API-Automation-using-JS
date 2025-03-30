
describe("POST Request JSON Body", ()=>{

    it("Approch 1 - Hard Coding the JSON data",() =>{
        const request={
            userId: 11,
            title: "First New User Post",
            body: "Lets Verify New User."
        }
        cy.request({
            method: 'POST',
            url:"https://jsonplaceholder.typicode.com/posts",
            body: request
        }).then((response)=>{
            if(response.status==201){
                console.log(response.body);
                expect(response.body.title).to.eq("First New User Post"); // assertion in JS
                expect(response.body.body).to.eq("Lets Verify New User.");
                cy.log(response.body);
            }
        })
    })
// Generating JSON data randomlly using JS Math Module
    it("Approach 2 - Generating JSON data Dynamically..",()=>{
        const request={
            userId: 11,
            title: Math.random().toString(5).substring(2),
            body: Math.random().toString(5),
            //n: String.random
            //email: Math.random().toString()+"@gmail.com"
        }
        cy.request({
            method: "POST",
            url:"https://jsonplaceholder.typicode.com/posts",
            body:request
        }).then((response)=>{
            if(response.status==201){
                expect(response.body.title).to.eq(request.title);
                expect(response.body.body).to.eq(request.body);
                cy.log(response.body);
                console.log(response.body);
            }
            else{
                console.log("Test Case Failed..")
            }
        })
    })

    it("Approach 3- Using Fixture from cypress..",()=>{
        // all code we have to write inside fixture block.
        cy.fixture("UserData").then((data)=>{
            const requestBody=data
            cy.request("POST","https://jsonplaceholder.typicode.com/posts",requestBody)
            .then((response)=>{
                if(response.status==201){
                    expect(response.body.title).to.eq(requestBody.title);
                    expect(response.body.body).to.eq(requestBody.body);
                }
                // verify title present
                if("title" in response.body){
                    console.log("Title present.");
                }
                else{
                    console.log("Title not present..");
                }
                // verify property and its value present using expect
                expect(response.body).has.property("title",requestBody.title);
                expect(response.body).to.have.property("title",requestBody.title);
            })
        })
    })
})


// if want to run only fixture test case use 
// it.only()