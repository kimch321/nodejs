// hanb.co.kr 사이트에서 새로나온 책에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// 수집된 데이터들은 newbooks라는 테이블에 저장해둠
// create table newbooks (
//     bookno number(6),
//     title varchar(250) not null,
//     writer varchar(100) not null,
//     price number not null,
//     regdate date default sysdate,
//     primary key (bookno)
// );
//
// create sequence bkno;    // 순번 생성기

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');
const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main () {

    // 지정한 사이트로부터 도서제목, 저자, 가격을 추출해서 JSON 객체로 저장
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html?page='+`1`+'&brand=&cate1=&cate2=&searchKey=&keyWord=';
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    // 수집한 개별정보를 저장하기 위해 배열 선언 - 전개spread syntax
    let [titles, writers, prices, books]=[[],[],[],[]];

    const html = await axios.get(URL, {
        headers: headers
    });

    const dom = cheerio.load(html.data);

    let elements = dom('.book_tit')

    elements.each(function () {
        titles.push(dom(this).text());
    })

    elements = dom('.book_writer')
    elements.each(function () {
        writers.push(dom(this).text());
    })

    elements = dom('.price')
    elements.each(function () {
        prices.push(dom(this).text());
    })

    for (let i = 0; i < titles.length; i++) {
        let book = {};
        book.title = titles[i];
        book.writer = writers[i].replace(/ /g, '');
        book.price = prices[i].replace(/[,|원]/g, '');
        books.push(book);
    }

    // 저장한 JSON 객체로부터 도서제목, 저자, 가격을 추출해서 마리아DB 테이블에 저장

    let conn;
    let sql = 'insert into newbooks(title,writer,price) values(?,?,?)';
    let params = [];

    try {
        conn = await mariadb.createConnection(dbconfig);
        console.log('마리아 데이터베이스 접속 성공');

        for (let bk of books) {
            params = [bk.title, bk.writer, bk.price];
            let result = await conn.execute(sql, params);
            await conn.commit();
            console.log(result);
        }

    } catch(ex) {
        console.log(ex)
    } finally {
        if (conn) {
            try {
                await conn.close();
                console.log('마리아 데이터베이스 접속 해제 성공')
            }catch(ex) {
                console.error(ex);
            }
        }
    }
}
main();