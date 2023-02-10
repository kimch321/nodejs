// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=CCjWE3KHmoW3oJhjbFufhSELDDm%2F9OSuQlW%2Bql%2Fu8LA%2BIBXh3pG9PuG5%2B14ElD581dEaVkxVhbV0%2FIAK9fsfpQ%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0
// ?serviceKey=CCjWE3KHmoW3oJhjbFufhSELDDm%2F9OSuQlW%2Bql%2Fu8LA%2BIBXh3pG9PuG5%2B14ElD581dEaVkxVhbV0%2FIAK9fsfpQ%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=서울&ver=1.0

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');

async function main () {        // 비동기 I/O 지원 함수 정의

// 접속할 url 지정, 쿼리스트링, user-agent 헤더 지정
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params = {
        'serviceKey':'CCjWE3KHmoW3oJhjbFufhSELDDm/9OSuQlW+ql/u8LA+IBXh3pG9PuG5+14ElD581dEaVkxVhbV0/IAK9fsfpQ==',
        'returnType':'json',
        'sidoName':'서울',
        'numOfRows':500,
        'ver':1.3
    };
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}

    // axios로 접속해서 대기오염정보를 받아옴
    const json = await axios.get(URL, {
        params : params,
        headers: headers
    }); // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 확인
    // console.log(json.data);

    // JSON으로 불러오기
    let items = json.data['response']['body']['items']
    // console.log(items)

    // 미세먼지 정보 출력
    // pm25Value 는 ver 1.3부터 출력된다.
    for(let item of items) {
        let pm10g = Number(item.pm10Grade);
        let pm25g = Number(item.pm25Grade);
        switch (pm10g >0) {
            case 1:
                pm10g = '😍'
                break;
            case 2:
                pm10g = '😐'
                break;
            case 3:
                pm10g = '😥';
                break;
            case 4:
                pm10g = '😱';
                break;
        }
        switch (pm25g>0) {
            case 1:
                pm10g = '😍'
                break;
            case 2:
                pm10g = '😐'
                break;
            case 3:
                pm10g = '😥';
                break;
            case 4:
                pm10g = '😱';
                break;
        }
        console.log(item.sidoName,item.stationName,item.pm10Value,pm10g,item.pm25Value,pm25g,item.dataTime);
    }
    // pmGrade(item.pm10Grade)
    // 등급별 이모지
    // 😍😐😥😱
}
main();