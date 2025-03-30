describe("API Chaining",()=>{

    it("API Chaining",()=>{
        cy.request({
            method: 'GET',
            url : 'https://jsonplaceholder.typicode.com/posts/',
        }).then((response)=>{
            expect(response.status).to.eq(200);
            const postID= response.body[0].userId;
            return postID;
        })
        .then((postID)=>{
            cy.request({
                method: 'GET',
                url : `https://jsonplaceholder.typicode.com/comments?postId=${postID}`
            }).then((response)=>{
                expect(response.status).to.eq(200);
                console.log("Total Post",response.body.length);
            })
        })
    })

})