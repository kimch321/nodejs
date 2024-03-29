const oracledb=require('oracledb');

async function main() {
    const sql = 'select distinct sido from zipcode2013';
    let params = {};  // insert, update, delete, where
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
                //connectionString: 'ip주소:포트번호/SID'
                connectionString: '54.180.140.184:1521/XE'
            }
        );
        console.log('오라클 데이터베이스 접속 성공')

        // sql문을 실행하고 결과를 받아옴
        let result = await conn.execute(sql, params, options);
        // console.log(result);


        // 실행결과를 결과집합 변환
        let rs = result.resultSet;
        // console.log(rs);

        // 결과집합 객체의 각 요소를 순회하면서 내용 출력
        while((row = await rs.getRow())) {  // outFormat 설정 필요!
            console.log(row.SIDO);
        }

        // 작업이 끝나면 결과집합 객체를 닫음
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
} // oracle db를 위한 옵션 정의
main();
