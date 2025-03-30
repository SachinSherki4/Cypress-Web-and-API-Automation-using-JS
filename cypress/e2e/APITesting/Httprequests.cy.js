
describe("HTTP Request", ()=>{

    it("GET Call", ()=>{
        cy.request("GET","https://jsonplaceholder.typicode.com/posts/11")
        .its("status")
        .should('equal',200);
    })

    it("POST Call", ()=>{
        //cy.visit('data:text/html,<h2>API Response Below:</h2>');
        cy.request({
            method: 'POST',
            url: "https://jsonplaceholder.typicode.com/posts",
            body: {
                "userId": 11,
                "title": "First New User Post",
                "body": "Lets Verify New User."
            }
        })// if want to print response in console us cy.lo(JSON.stringyfy(response.body, null, 2))  will print response in console prity formmat
        .then((response) =>{
            if(response.status ==201){
                cy.log("POST Response : ",JSON.stringify(response.body,null,2));
            }
            /* if want to prinnt our output in UI tab use this cy.document().then((doc)=>{}) */
            cy.document().then((doc)=>{
                doc.body.innerHTML=`<pre>${JSON.stringify(response.body, null, 2)}</pre>`;
            });
        
        // .then((response) =>{
        //     if(response.status == 201){
        //         console.log(response.body);
        //     }
        //     else{
        //         console.log("SOmething Went Wrong..",response.status);
        //     }
        
        // verify status code then print response in console of browser
        // .should((response) =>{
        //     if (expect(response.status).to.eq(201)){
        //         const res=response.body;
        //         console.log(res);
        //     }

        
        // .its("status")
        // .should('equal',201)
    })

    })

    // update user data using PUT request.
    it("PUT Call",()=>{
        cy.request("PUT","https://jsonplaceholder.typicode.com/posts/2",
            { 
                    "userId": 12,
                    "title": "MOdify User",
                    "body": "Modify.",
                    "id": 2
            }
        ).then((response)=>{
            if(response.status==200){
                console.log("User Data Updated Successfully..",response.body,null,2);
            }
        });
    })

    it("PATCH Call..",()=>{
        cy.request("PATCH","https://jsonplaceholder.typicode.com/posts/2",  
            {
                "userId": 12,
                "title": "Partially Updating User"
            }
        ).then((response)=>{
            if(response.status==200){
                console.log("User Data Updated Successfully..");
            }
            else{
                console.log("PATCH request Failed..",response.status);
            }
        })
    })

    // Deleting Existing User
    it("DELETE Call",()=>{
        cy.request("DELETE","https://jsonplaceholder.typicode.com/posts/1")
        .then((response)=>{
            if(response.status==200){
                console.log("User Delete Successfully..");
            }
            else{
                console.log("User not Deleted...");
            }
        })
    })
})