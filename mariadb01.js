const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main() {
    let conn;
    const sql = 'select distinct sido from ZIPCODE2013';

    try{
        conn = await mariadb.createConnection(dbconfig);
        console.log('마리아 데이터베이스 접속 성공');

        let result = await conn.execute(sql);

        for(let row of result) {
            console.log(row.sido)
        }

    } catch(e) {
        console.error(e);
    } finally {
        if (conn) {
            try {
                await conn.close();
                console.log('마리아 데이터베이스 접속 해제 성공')
            } catch (ex) {
                console.error(ex)
            }
        }
    }
}
main();