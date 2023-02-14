// zipcod2013 테이블에서 서울, 강남구에 있는 모든 동을 조회해서 출력하세요.
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');  // db연결정보 파일
// console.log(dbconfig)
async function main() {

    let sql1 = 'create table sungjuk (name varchar(100), kor number(3), eng number(3), mat number(3))';
    let sql2 = 'insert into sungjuk values(:1,:2,:3,:4)';
    let sql3 = 'update sungjuk set kor = :1, eng = :2, mat = :3 where name = :4'
    let sql4 = 'delete from sungjuk where name = :1'
    let sql5 = 'select * from sungjuk'
    let params = [];
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    let conn = null;

    try {
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_21_9'});

        // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        conn = await oracledb.getConnection(dbconfig);

        //conn.execute(sql1);
        let params = ['혜교', 99,98,99];
        let result = await conn.execute(sql2, params);
        await conn.commit(); // oracle은 기본적으로 auto commit이 아니라서 그렇다.

        // let params = [11,22,33,'혜교']
        // let result =await conn.execute(sql3, params);

        // let params= ['혜교'];
        // let result = await conn.execute(sql4, params);
        // await conn.commit();

        result = await conn.execute(sql5);
        console.log(result);

    } catch(ex) {
        console.log(ex)
    } finally {
        if (conn) {
            try {
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            }catch(ex) {
                console.error(ex);
            }
        }
    }
}
main();
