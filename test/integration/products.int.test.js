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
    expect(response.body).toStrictEqual({
        message: "Product validation failed: description: Path `description` is required."
    });
});

it('GET /api/products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
});

it('GET /api/products/:productId', async () => {
    const productId = '644e5c40cc992ac42aef3d1d';
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jacket');
    expect(response.body.description).toBe('very good');
});

it('GET id dosent exist /api/products/:productId', async () => {
    const response = await request(app).get('/api/products/644e5c40cc992ac42aef3222');
    expect(response.statusCode).toBe(404);
});

it('PUT /api/products', async () => {
    const productId = '644e5c40cc992ac42aef3d1d';
    const response = await request(app).put(`/api/products/${productId}`)
        .send({
            name: 'updated name', description: 'updated description'
        });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('updated name');
    expect(response.body.description).toBe('updated description');
});

it('PUT id dosent exist /api/products/:productId', async () => {
    const response = await request(app).put('/api/products/644e5c40cc992ac42aef3222');
    expect(response.statusCode).toBe(404);
});

it('DELETE /api/products/:productId', async () => {
    const productId = '644e5c40cc992ac42aef3d1d';
    const response = await request(app)
        .delete(`/api/products/${productId}`)
        .send();
    expect(response.statusCode).toBe(200);
});

it('DELETE id dosent exist /api/products/:productId', async () => {
    const response = await request(app).delete('/api/products/644e5c40cc992ac42aef3222');
    expect(response.statusCode).toBe(404);
});
