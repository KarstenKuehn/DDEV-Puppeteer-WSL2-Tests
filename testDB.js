import dotenv from "dotenv";
import mariadb from "mariadb";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log(conn);
        const rows = await conn.query("SELECT * FROM urls");
        // rows: [ {val: 1}, meta: ... ]
        console.log(rows);
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

asyncFunction().then(() => {
    pool.end();
});
