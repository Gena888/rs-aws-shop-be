import products from "./mocks/products.mock";
import pg from "pg";
const { Client } = pg;

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const clientConfig = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
}

export const getProductsList = async (event, context, callback) => {
  const client = new Client(clientConfig)
  await client.connect()

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  }
  let response

  try {
    const { rows: products } = await client.query(`
      select id, title, description, price 
      from products
    `);
    console.log('products', products)
    response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(products),
      isBase64Encoded: false,
    }
    callback(null, response)

  } catch (error) {
    console.log('Error', error);
    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: `Oops, we\'ve got issue, and we are working with it ${error.message}` }),
      isBase64Encoded: false,
    }
    callback(response, null)

  } finally {
    client.end()
  }

};
