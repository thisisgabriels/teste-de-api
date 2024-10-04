/// <reference types="cypress"/>
describe('Testar a API de Autenticação da Getnet', () => {
    const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb'
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4'
    const url = 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token'

    it('Deve autenticar e retornar um token válido', () => {
        cy.request({
            method: 'POST',
            url: url,
            headers: {
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,// Adicionando a string de autenticação codificada em base64 no cabeçalho
                'Content-Type': 'application/x-www-form-urlencoded'// Definindo o tipo de conteúdo do corpo da requisição
            },
            body: 'grant_type=client_credentials&scope=oob', // Corpo da requisição contendo os parâmetros de autenticação
            form: true// Informa ao Cypress que os dados devem ser enviados como formulário
        }).then((response) => {
            // Validando se os campos obrigatórios estão presentes
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('access_token')
            expect(response.body).to.have.property('expires_in')
            expect(response.body).to.have.property('token_type').that.equals('Bearer')
        })
    })
})
