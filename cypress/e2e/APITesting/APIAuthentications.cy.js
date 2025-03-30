describe("Various Authentication",()=>{

    it("Basic Authentication",()=>{

        cy.request({
            method: 'GET',
            url : "https://postman-echo.com/basic-auth",
            auth:{
                user : "postman",  // user
                pass : "password"  // pass
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.be.true;
        })
    })

    it("Digest Authentication",()=>{
        cy.request({
            method: 'GET',
            url : "https://postman-echo.com/basic-auth", // keep method basic here
            auth:{
                username : 'postman',  // username
                password : 'password', // password
                method : 'degest' // add method name here
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.be.true;
        })
    })

    const token=access_token
    it("Bearer Token Authentication",()=>{
        cy.request({
            method: 'GET',
            url: "https://api.github.com/user/repos",
            headers:{
              //  Authorization: 'Bearer '+ token  // for bearer token we need to pass it in Headers section with Authorization
            },
            failOnStatusCode : false // fail due to dummy bearer token - so request failed - still pass 
        }).then((response)=>{
            expect(response.status).to.eq(401);
        })
    })

    it("API Key Authentication",()=>{
        cy.request({
            method:'GET',
            url : "http://openweathermap.org/appid#", 
            qs:{
                appid: 'appID' // API Key Generate against Application.
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })


})