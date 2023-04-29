const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    });

    it('Product 객체 생성은 함수여야 한다.', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('productModel.create()가 호출되어야 한다.', async () => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });
    it('성공시 상태 코드 201을 반환한다.', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it('성공시 응답에 json body가 포함되어있다. ',  async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
});