const {Pool} = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "admin_db",
  password: "root",
  port: 5432, // default PostgreSQL port
});

function db(){
pool.connect(function (err) {
    if (err) throw err;
    setTimeout(() => {
      console.log(`  Database connected to Host: ${pool.options.host}, DB: ${pool.options.database}
  |=============================================================>>`);
    }, 500);
  });
}
 module.exports = {pool, db};



