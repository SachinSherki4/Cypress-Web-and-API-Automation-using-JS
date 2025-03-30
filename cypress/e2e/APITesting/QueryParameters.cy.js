describe("API Testing Using Query Parameters",()=>{

    const queryParameters={
        userId: 1,
        _limit: 5
    }

    it("Passing Query Parameters in Requests",()=>{
        cy.request({
            method: 'GET',
            url: "https://jsonplaceholder.typicode.com/posts",
            // qs:{
            //     userId: 1,
            //     _limit: 5
            // }
            qs:queryParameters
        }).then((response)=>{
            expect(response.status).to.eq(200);
            console.log(response.body);
            //cy.log(JSON.stringify(response.body),null,4);
            // validate no of records in response
            //expect(response.body[0]).have.property('userId',5);
            console.log(response.body.length);
            console.log(response.body[2]);
            expect(response.body[2]).have.property('title',"ea molestias quasi exercitationem repellat qui ipsa sit aut");
        })
    })
})