/*
Step 1 : Create QAuth Server using Github
get client_id, client_secret

Step 2 : Get Auth Token code using
https://github.com/login/oauth/authorize?client_id= provide clint id

Step 3 : now to get QAuth2 Access Token
POST : https://github.com/login/oauth/access_token

qs: {
    client_id : '',
    client_secret : '',
    code : ''
}
    get access_token

Step 4 : Send GET request using access_token
GET : https://api.github.com/user/repos
headers : {
    Authorization : 'Bearer '+ access_token
}

*/

describe("OAuth2 Authentication",()=>{
    let access_token=""
    before("Get Access Token",()=>{
        cy.request({
            method: 'POST',
            url : "https://github.com/login/oauth/access_token",
            qs: {
                client_id : 'client_id',
                client_secret : 'client_secret',
                code : 'auth_token'
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            let token_response=response.body.split('&');
            //let split=token_response.split('&');
            access_token=token_response[0].split("=")[1];
            cy.log(access_token);
            //access_token=token[1];
            cy.wrap(access_token).as("authToken"); // store access token globally using alias
        });
    })

    it("Get Resource using Access Token",()=>{
        cy.get("@authToken").then((token) =>{

        cy.request({
            method: 'GET',
            url : "https://api.github.com/user/repos",
            headers : { Authorization : `Bearer ${token}`}
        }).then((response)=>{
            expect(response.status).to.eq(200);

        })
    })
    })
})

