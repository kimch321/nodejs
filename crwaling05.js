// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=CCjWE3KHmoW3oJhjbFufhSELDDm%2F9OSuQlW%2Bql%2Fu8LA%2BIBXh3pG9PuG5%2B14ElD581dEaVkxVhbV0%2FIAK9fsfpQ%3D%3D&pageNo=1&numOfRows=500&apiType=xml&std_day=2021-12-15&gubun=%EA%B2%BD%EA%B8%B0
// ?serviceKey=CCjWE3KHmoW3oJhjbFufhSELDDm%2F9OSuQlW%2Bql%2Fu8LA%2BIBXh3pG9PuG5%2B14ElD581dEaVkxVhbV0%2FIAK9fsfpQ%3D%3D&pageNo=1&numOfRows=500&apiType=xml&std_day=2021-12-15&gubun=%EA%B2%BD%EA%B8%B0

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');

async function main () {        // 비동기 I/O 지원 함수 정의

// 접속할 url 지정, 쿼리스트링, user-agent 헤더 지정
    const URL = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
    const params = {
        'serviceKey':'CCjWE3KHmoW3oJhjbFufhSELDDm/9OSuQlW+ql/u8LA+IBXh3pG9PuG5+14ElD581dEaVkxVhbV0/IAK9fsfpQ==',
        'apiType':'JSON',
        'gubun':'서울',
        'numOfRows':1000
    };
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}

    // axios로 접속해서 대기오염정보를 받아옴
    const json = await axios.get(URL, {
        params : params,
        headers: headers
    }); // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 확인
     console.log(json.data);

    // JSON으로 불러오기
    let items = json.data['items']
     console.log(items)

    // 미세먼지 정보 출력
    // pm25Value는 출력 안됨!!
    // for(let item of items) {
    //     console.log(item.sidoName,item.stationName,item.pm10Value,item.pm25Grade,item.dataTime);
    // }
}
main();