/*
POST : https://gorest.co.in/public/v2/users
GET : https://gorest.co.in/public/v2/users/7374890
PATCH : https://gorest.co.in/public/v2/users/7374890
DELETE : https://gorest.co.in/public/v2/users/7374890


*/

describe("Go-Rest API Chaining",()=>{
  //  const access_token= 'Bearer access_token'
    it("Create New User",()=>{
        cy.request({
            method : 'POST',
            url : "https://gorest.co.in/public/v2/users",
            body: {
                name : 'Sachin API',
                gender : "male",
                email : Math.random().toString(36).substring(2)+'@gmail.com',
                status : "active"
              },
          //    headers:{ Authorization : access_token}

        }).then((response)=>{
            expect(response.status).to.eq(201);
            const id=response.body.id;
            console.log("New User Create : ",response.body);

            // Get User Details
            cy.request({
                method: 'GET',
                url : `https://gorest.co.in/public/v2/users/${id}`,
                headers:{ Authorization : access_token}
            }).then((response)=>{
                expect(response.status).to.eq(200);
                console.log("Get User Create : ",response.body);
            })

            // UPdate User details
            cy.request({
                method : 'PUT',
                url : `https://gorest.co.in/public/v2/users/${id}`,
           //     headers:{ Authorization : access_token},
                body : {
                    name : 'Sachin Sherki',
                gender : "male",
                email : Math.random().toString(36).substring(2)+'@gmail.com',
                status : "active"
                }
            }).then((response)=>{
                expect(response.status).to.eq(200);
                console.log("Updated User Data : ",response.body);
            })

            // deleting User
            cy.request({
                method: 'DELETE',
                url : `https://gorest.co.in/public/v2/users/${id}`,
                headers:{ Authorization : access_token}
            }).then((response)=>{
                expect(response.status).to.eq(204);
                console.log(`User with ID ${id} delete successfully.`)
            })

            // Get Deleted User Details
            cy.request({
                method: 'GET',
                url : `https://gorest.co.in/public/v2/users/${id}`,
                headers:{ Authorization : access_token},
                failOnStatusCode : false
            }).then((response)=>{
                expect(response.status).to.eq(404);
                console.log(`No data found with UserID : ${id}`);
            })
        })
    })
})