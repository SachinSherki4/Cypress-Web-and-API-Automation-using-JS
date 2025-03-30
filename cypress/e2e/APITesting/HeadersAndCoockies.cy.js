describe("Headers and Coockies in API Testing...",()=>{

    // create before() which will execute before other test cases
    let accessToken=null
    let orderId=null

    before("Creating Access Token",()=>{

        cy.request({
            method: 'POST',
            url:"https://simple-books-api.glitch.me/api-clients/",
            headers: {
                'Content-Type': "application/json"
            },
            body:{
                "clientName" : "John",
                "clientEmail" : "john"+Math.random().toString(5).substring(2)+"@gmail.com"
            }
        }).then((response)=>{
            expect(response.status).to.eq(201);
            accessToken=response.body.accessToken;
            console.log(accessToken);
        })

    })

    it("Submitting New Order",()=>{
        cy.request({
            method:'POST',
            url:'https://simple-books-api.glitch.me/orders',
            headers:{
                'Content-Type': "application/json",
                'Authorization': 'Bearer '+accessToken
            },
            body:{
                "bookId" : 1,
                "customerName" : "John"
            }
        }).then((response)=>{
            expect(response.status).to.eq(201);
            expect(response.body).have.property('created',true);
            orderId = response.body.orderId;
        })
    })

    it("Get All Orders",()=>{
        cy.request({
            method:'GET',
            url:"https://simple-books-api.glitch.me/orders/",
            headers:{
                'Content-Type': "application/json",
                'Authorization': 'Bearer '+accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            console.log(response.body.length);
        })
    })

    it("Get Only Created Order",()=>{
        cy.request({
            method:'GET',
            url:"https://simple-books-api.glitch.me/orders/"+orderId,
            headers:{
                'Content-Type': "application/json",
                'Authorization': 'Bearer '+accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            console.log(response.body);
        })
    })
})