const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

it('POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProduct);

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
    expect(response.body.price).toBe(newProduct.price);
});

it('POST /api/products 요청시 에러는 500에러 발생', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({name: "description 누락"});

    expect(response.statusCode).toBe(500);
    console.log('response.body', response.body);
    expect(response.body).toStrictEqual({})
});