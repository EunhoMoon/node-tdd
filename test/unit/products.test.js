const productController = require('../../controller/products');
const productModel = require('../../models/Product');

productModel.create = jest.fn();

describe('Product Controller Create', () => {
    it('Product 객체 생성은 함수여야 한다.', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('productModel.create()가 호출되어야 한다.', () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    });
});