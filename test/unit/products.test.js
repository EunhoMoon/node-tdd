const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');

const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = '644e5c40cc992ac42aef3d1d';
const updatedProduct = {name: 'updated name', description: 'updated description'};

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

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
    it('성공시 응답에 json body가 포함되어있다. ', async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
    it('에러 처리', async () => {
        // mocking
        const errorMessage = {message: 'description 항복은 필수값입니다.'};
        const rejectedPromise = Promise.reject(errorMessage);

        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Get', () => {
    it('productController.getProducts 호출시 그 type은 함수여야 한다.', () => {
        expect(typeof productController.getProducts).toBe('function');
    });
    it('ProductModel.find({}) 호출 성공', async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });
    it('성공시 상태코드 200을 리턴', async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('json 객체를 응답', async () => {
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    });
    it('에러 처리', async () => {
        const errorMessage = {message: '상품 데이터를 찾을 수 없습니다.'};
        const rejectedPromise = Promise.reject(errorMessage);

        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller GetById', () => {
    it('productController.getProductById 호출시 그 type은 함수여야 한다.', () => {
        expect(typeof productController.getProductById).toBe('function');
    });
    it('productController.getProductById 호출시 productId 필요', async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);
    });
    it('성공시 json 객체와 함께 상태코드 200을 리턴', async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('id에 맞는 데이터가 없을 경우 404 에러 발생', async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('에러 처리', async () => {
        const errorMessage = {message: 'error'}
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});
describe('Product Controller Update', () => {
    it('should have an updateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    });
    it('should call productModel.findByIdAndUpdate', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;

        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, updatedProduct, {new: true}
        );
    });
    it('성공시 json 객체와 함께 상태코드 200을 리턴', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);

        await productController.updateProduct(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    });
    it('id에 맞는 데이터가 없을 경우 404 에러 발생', async () => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('에러 처리', async () => {
        const errorMessage = {message: 'error'};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('Product Controller Delete', () => {
    it('should have a deleteProduct function', () => {
        expect(typeof productController.deleteProduct).toBe('function');
    });
    it('should call ProductModel.findByIdAndDelete', async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next);
        expect(productModel.findByIdAndDelete).toBeCalledWith(productId);
    });
    it('should return 200 response', async () => {
        const deletedProduct = {name: 'deleted product', description: 'it is deleted'}
        productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(deletedProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('id에 맞는 데이터가 없을 경우 404 에러 발생', async () => {
        productModel.findByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('에러 처리', async () => {
        const errorMessage = {message: 'error'};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await productController.deleteProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});