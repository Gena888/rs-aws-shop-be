import { getProductsList } from "../getProductsList"

const mockedProducts = [
  {
    id: '1',
    productName: 'product 1 name',
    productPrice: 1.33,
    productCurrency: '$',
    productCount: 1,
  },
  {
    id: '2',
    productName: 'product 2 name',
    productPrice: 2.33,
    productCurrency: '$',
    productCount: 2,
  },
  {
    id: '3',
    productName: 'product 3 name',
    productPrice: 3.33,
    productCurrency: '$',
    productCount: 3,
  },
]

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/javascript;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify(mockedProducts),
}

describe('getProductsList function tests', () => {
  it('getProductsList\'s callback called', async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn)
    expect(fn).toBeCalledTimes(1);
  });

  it('getProductsList\'s callback called with correct params', async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn)
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });

});