
//obtener el cliente
const Pool= require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password:'Korpodesco2020.',
    host:'34.121.13.242',
    port:5432,
    database: 'korpodesco_db'
});

const connection_postgres = module.exports={pool: pool}
