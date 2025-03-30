// for Schema Validation we required ajv library
// npm install ajv 
import Ajv from "ajv"
//const Ajv=require('ajv')
const ajv=new Ajv()

describe("Schema Validation",()=>{

    it("Schema Validation",()=>{
        cy.request({
            method : 'GET',
            url:"https://jsonplaceholder.typicode.com/posts/11"
        }).then((response)=>{
            expect(response.status).to.eq(200);
           
        })
    })
})