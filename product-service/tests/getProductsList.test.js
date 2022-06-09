import { getProductsList } from "../getProductsList"

const mockedProducts = [
  {
    count: 5,
    description: "So strange",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 3,
    title: "Strange nose",
    image: 'https://www.pethealthnetwork.com/sites/default/files/styles/large/public/cryptococcosis-in-cats-187961300.png?itok=8dmMOu6R',
  },
  {
    count: 3,
    description: "Ah you are so pretty",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    price: 27.4,
    title: "Pretty nose",
    image: 'https://papers.co/wallpaper/papers.co-nd71-cat-nose-cute-white-pink-animal-40-wallpaper.jpg?download=true',
  },
  {
    count: 6,
    description: "Say hi ;)",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    price: 3.7,
    title: "Tricky nose",
    image: 'https://www.offidocs.com/images/xcatsnosecat.jpg.pagespeed.ic.6zeyCEQCae.jpg',
  },
  {
    count: 7,
    description: "Best of the best.",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 11,
    title: "Amazing nose",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCrFNnAi9L8G2bVsbMagurkdvffcFkHyC92KXXCFrj4rM7VB-IZg39MrVAnaSD8_wZUu4&usqp=CAU',
  },
  {
    count: 3,
    description: "Not so big as small",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 4,
    title: "Big nose",
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Cat_nose_close-up.jpg',
  },
  {
    count: 4,
    description: "Dirty-dirty nose",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 6.9,
    title: "Dirty nose",
    image: 'http://frontpagemeews.com/wp-content/uploads/2018/10/iStock-916358708-750x500.png',
  },
  {
    count: 2,
    description: "Fancy, just fancy.",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 11.9,
    title: "Fancy nose",
    image: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/05/fb_image_5afedcb870f37__700.jpg',
  },
  {
    count: 1,
    description: "Small nose",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a3",
    price: 2,
    title: "Nano nose",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThNaINisTQ-f9whucE4UdfZF7ueB8d11pNwr2uX-D2pYN5rko0-km7LXMxAgjrm7Ufd4g&usqp=CAU',
  },
]

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
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