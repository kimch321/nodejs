// zipcod2013 테이블에서 서울, 강남구에 있는 모든 동을 조회해서 출력하세요.

const oracledb = require('oracledb');
async function main() {

    const sql = 'select distinct DONG from ZIPCODE2013 where SIDO = :sido and gugun = :gugun order by DONG';
    // let params = ['서울','강남구'];
    let params = {sido : '서울', gugun : '강남구'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };
    let conn = null;

    try {
        oracledb.initOracleClient(
            {libDir: 'C:/Java/instantclient_21_9'});

        // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        conn = await oracledb.getConnection(
            {
                user : 'bigdata',
                password: 'bigdata',
                connectionString: '54.180.140.184:1521/XE'
            }
        );
        console.log('오라클 데이터베이스 접속 성공')

        let result = await conn.execute(sql, params, options);
        // console.log(result instanceof Promise);

        let rs = result.resultSet;

        while((row = await rs.getRow())) {
            console.log(row.DONG);
        }

        rs.close();

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
