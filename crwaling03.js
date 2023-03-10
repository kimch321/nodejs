// hanb.co.kr 사이트에서 새로나온 책에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');       // 파일시스템 활성화
const path = require('path');   //


for (let i = 1; i <= 10; i++) {
async function main () {        // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정

        const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html?page='+`${i}`+'&brand=&cate1=&cate2=&searchKey=&keyWord=';

        // 수집한 개별정보를 저장하기 위해 배열 선언
        let titles = [], writers = [], prices = [];
        let books = [];

        // axios로 접속해서 html을 불러옴
        const html = await axios.get(URL, {           // 비동기 I/O 지원
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}
        }); // 서버 요청시 User-Agent 헤더 사용

        // 불러온 html을 parsing해서 DOM 생성
        const dom = cheerio.load(html.data);

         // CSS 선택자로 도서제목을 담고 있는 요소 지정
        let elements = dom('.book_tit')

        // 찾은 요소를 순회하면서 요소의 텍스트 출력
        elements.each(function () {
            //console.log(dom(this).text())
            titles.push(dom(this).text()); // 배열에 추가
        })

        // CSS 선택자로 저자를 담고 있는 요소 지정
        elements = dom('.book_writer')
        elements.each(function () {
            //console.log(dom(this).text())
            writers.push(dom(this).text());
        })

        // CSS 선택자로 가격을 담고 있는 요소 지정
        elements = dom('.price')
        elements.each(function () {
            prices.push(dom(this).text());
        })

        // 저장된 배열 요소 갯수 확인
        console.log(titles.length);
        console.log(writers.length);
        console.log(prices.length);

        // 수집한 정보들을 JSON 객체로 생성
        for (let i = 0; i < titles.length; i++) {
            let book = {};
            book.title = titles[i];
            book.writer = writers[i].replace(/ /g, '');
            book.price = prices[i].replace(/[,|원]/g, '');
            books.push(book);
        }
        console.log(books);

        // 생성된 도서 객체를 JSON 문자열로 변환하고
        const bookJSON = JSON.stringify(books);

        // data 라는 폴더가 있는지 확인 - 없으면 생성
        !fs.existsSync('data') && fs.mkdirSync('data');

        // 저장위치와 파일명 지정 후 파일에 저장
        const fpath = path.join(__dirname, 'data', `books${i}.json`);
        fs.writeFileSync(fpath, bookJSON);
    }
    main();
}