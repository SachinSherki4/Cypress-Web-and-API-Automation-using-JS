describe("Parsing JSON Response",()=>{
    let id=[]
    it("Parsing Array in JSON Response",()=>{
        cy.request({
            method:'GET',
            url:"https://jsonplaceholder.typicode.com/posts",
            qs:{
                userId : 1,
                _limit : 5
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            // to parse each Array element use forEach 
            response.body.forEach(element => {
                //console.log(element.id);
                id.push(element.id);
            });
            console.log(id);
        })
    })

})