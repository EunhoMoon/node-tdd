const productController = require('../../controller/products');

describe('Product Controller Create', () => {
    it('Product 객체 생성은 함수여야 한다.', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
});