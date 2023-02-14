// zipcod2013 테이블에서 서울에 있는 모든 구를 조회해서 출력하세요.

const oracledb = require('oracledb')

async function main () {

    // placeholder를 이용해서 동적으로 sql질의문을 작성할 수 있음
    // :인덱스 => 배열로 정의
    // :키 => 객체로 정의
    // :1은 placeholder라고 한다. 그럼 params배열의 1번값이 들어간다. 이 절차는 .execute에서 실행된다. 다른 dbms는 ?를 쓰기도 한다.
    const sql = 'select distinct GUGUN from ZIPCODE2013 where SIDO = :sido order by gugun';
    //let params = ['인천'];
    let params = {sido : '인천'};
    let options = {
        resultSet: true,
        outFormat:oracledb.OUT_FORMAT_OBJECT
    }
    let conn;

    try {
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_21_9'})

        conn = await oracledb.getConnection(
            {
                user : 'bigdata',
                password: 'bigdata',
                connectionString: '54.180.140.184:1521/XE'
            }
        );
        console.log('오라클 데이터베이스 접속 성공')

        let result = await conn.execute(sql, params, options)

        let rs = result.resultSet;

        while((row = await rs.getRow())) {
            console.log(row.GUGUN);
        }

        rs.close;

    } catch(e) {console.log(e)}
    finally {
        if(conn) {
            try {
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            } catch (ex) {
                console.log(ex)
            }
        }
    }
}
main()
