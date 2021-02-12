
//obtener el cliente
const Pool= require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password:'Flore$0225',
    host:'localhost',
    port:5432,
    database: 'postgres'
});

const connection_postgres = module.exports={pool: pool}
