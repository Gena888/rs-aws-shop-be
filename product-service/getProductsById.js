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

export const getProductsById = async (event, context, callback) => {
  const client = new Client(clientConfig)
  await client.connect()
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  }

  const productId = event.pathParameters.productId

  console.log('productId', productId)

  try {
    await client.query(`
      select id, count, title, description, price
      from stocks, products
      where products.id = stocks.product_id and
      products.id = '${productId}'
    `, )
      .then((res) => {
        console.log('res.rows', res.rows)
        if (res.rows.length > 0) {
          callback(null, {
            statusCode: 200,
            headers: headers,
            isBase64Encoded: false,
            body: JSON.stringify(res.rows)
          })
        } else {
          callback(null, {
            statusCode: 404,
            headers: headers,
            isBase64Encoded: false,
            body: JSON.stringify({ message: 'Product not found' }),
          })
        }
      })
      .catch((error) => {
        console.log('error', error);
        let response
        if (error.code === '22P02') {
          response = {
            statusCode: 404,
            headers: headers,
            isBase64Encoded: false,
            body: JSON.stringify({ message: 'Product not found' }),
          }
          callback(null, response)
        } else {
          response = {
            statusCode: 500,
            headers: headers,
            isBase64Encoded: false,
            body: JSON.stringify({ message: error.message }),
          }
          callback(response, null)
        }
      })

  } catch (error) {
    console.log('error', error)
    response = {
      statusCode: 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({ message: `Ooops, ${error.message}` }),
    }
    callback(response, null)
  } finally {
    client.end()
  }

};
