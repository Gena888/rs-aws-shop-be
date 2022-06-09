import { getProductsById } from "../getProductsById";

const mockedEventWithExistingId = {
  pathParameters: {
    productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
  }
}

const mockedEventWithoutExistingId = {
  pathParameters: {
    productId: '0000'
  }
}

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify(  {
    count: 5,
    description: "So strange",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 3,
    title: "Strange nose",
    image: 'https://www.pethealthnetwork.com/sites/default/files/styles/large/public/cryptococcosis-in-cats-187961300.png?itok=8dmMOu6R',
  },),
}

const mockedFailureResponse = {
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({ message: 'Product not found' }),
}


describe('getProductsById function tests', () => {
  it('getProductsById\'s callback called', async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithExistingId, null, fn)
    expect(fn).toBeCalledTimes(1);
  });

  it('getProductsById\'s callback called with correct params', async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithExistingId, null, fn)
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });

  it('getProductsById\'s callback called with unexciting params', async () => {
    const fn = jest.fn();
    await getProductsById(mockedEventWithoutExistingId, null, fn)
    expect(fn).toBeCalledWith(null, mockedFailureResponse);
  });
});