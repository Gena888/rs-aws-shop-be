import pg from "pg";
const { Client } = pg;

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const invoke = async () => {
  console.log("kek");
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const ddlResult1 = await client.query(`
      create table if not exists products (
        id uuid primary key default uuid_generate_v4(),
        title text, 
        description text,
        price integer
        )`);
        //? image text
    const ddlResult2 = await client.query(`
      create table if not exists stocks (
          product_id uuid,
          count integer,
          foreign key ("product_id") references "products" ("id")
      )`);

    const dmlResult = await client.query(`
        insert into products ( title, description, price) values
            ('So strange', 'Strange nose', '3'),
            ('Ah you are so pretty', 'Pretty nose', '27'),
            ('Say hi ;)', 'Tricky nose', '3'),
            ('Best of the best.', 'Amazing nose', '11'),
            ('Not so big as small', 'Big nose', '4'),
            ('Dirty-dirty nose', 'Dirty nose', '6'),
            ('Fancy, just fancy.', 'Fancy nose', '11'),
            ('Small nose.', 'Nano nose', '2')
            returning id
    `);
    const currId = dmlResult.rows;
    console.log(currId);

    const dmlResult2 = await client.query(`
        insert into stocks (product_id, count) values
        ('${currId[0].id}', '23'),
        ('${currId[1].id}', '33'),
        ('${currId[2].id}', '11'),
        ('${currId[3].id}', '55'),
        ('${currId[4].id}', '77'),
        ('${currId[5].id}', '991'),
        ('${currId[6].id}', '4'),
        ('${currId[7].id}', '9')
    `);

    const { rows: products } = await client.query(`select * from products`);

    console.log(products);
  } catch (err) {
    console.error("Error during database request executing", err);
  } finally {
    client.end();
  }
};

// const dmlResult = await client.query(`
//         insert into todo_list (list_name, list_description) values
//             ('Sobaka', 'Milyj Pes'),
//             ('NosSobaki', 'Milyj Nos')
//     `);
// const dmlResult2 = await client.query(`
//         insert into todo_item (list_id, item_name, item_description) values
//             ('1', 'Learn Nosik', 'Learn how to work with Nosik'),
//             ('1', 'Learn Pesik', 'Learn how to work with Pesik'),
//             ('2', 'Learn Nososik', 'Learn how to work with Nososik')
//     `);

// products.forEach((item) => {
//     const dmlResult2 = await client.query(`
//     insert into stocks (product_id, count) values
//         ('${item.id}', '200'),
//         ('${item.id}', '100')
// `);
// })