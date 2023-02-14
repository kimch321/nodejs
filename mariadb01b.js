const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main() {
    const sql = 'select distinct gugun from ZIPCODE2013 where sido = :sido';
    let conn;
    // let params = ['서울']
    let params = {sido : '서울'}  // 이 경우 execute의 매개변수에 옵션을 지정해야 한다.

    try{
        conn = await mariadb.createConnection(dbconfig);
        console.log('마리아 데이터베이스 접속 성공');

        // let result = await conn.execute(sql, params);

        let result = await conn.execute({namedPlaceholders:true, sql: sql}, params);

        for(let row of result) {
            console.log(row.gugun)
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