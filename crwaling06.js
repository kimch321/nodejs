// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// 순위, 영화제목, 예약율, 평점

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');       // 파일시스템 활성화
const path = require('path');   // 파일경로 관련 라이브러리
const {Builder, Browser, By, key, until} = require('selenium-webdriver');

async function main () {    // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://www.naver.com/';

    let titles = [], grades = [], rsrates = []
    let movie = [];

    // 크롬 자동화 브라우저 객체 생성
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();

    try {
        // 지정한 url로 접속
        await chrome.get(URL);

        // 특정 요소가 화면에 위치할 때 까지 최대 5초간 기다려 줌
        // await chrome.wait(until.elementLocated(By.css('.tit_item')), 5000);

        // 접속한 사이트의 html 소스를 가져옴
        const html = await chrome.getPageSource();
        // console.log(html);

        // 5초 정도 잠시 대기
        // await chrome.sleep(5000);

        // 페이지소스를 dom객체로 변환
        const dom = cheerio.load(html);

        // 메일들 추출
        let mails = dom('.MY_MAIL_COUNT');
        console.log(mails)

        // 추출된 메일 출력
         mails.each((idx, movie) => {
             console.log(dom(movie).text().trim())
         });
        // console.log(titles);

        // 평점 추출
        // movies = dom('.feature_home .txt_num:first-child');
        // //console.log(movies);
        //
        // // 평점 배열에 담기
        // movies.each((idx, movie) => {
        //     grades.push(dom(movie).text().trim())
        // });
        // // console.log(grades.length)
        //
        // // 예매율 추출
        // movies = dom('.feature_home .txt_num:last-child');
        //
        // // 예매율 배열에 담기
        // movies.each((idx, movie) => {
        //     rsrates.push(dom(movie).text().trim())
        // });
        // // console.log(rsrates.length)
        //
        // for (let i = 0; i <titles.length; i++) {
        //     console.log(`${titles[i]}, 평점: ${grades[i]}, 예매율: ${rsrates[i]}`)
        // }
        //
        //
        // // let movie = {}
        // // movie.title = titles[0];
        // // movie.grade = grades[0];
        // // let movie1 = {}
        // // movie1.title = titles[1];
        // // movie1.grade = grades[1];
        // // console.log(movie, movie1);

    } catch(ex) {
        console.log(ex);
    } finally {
        await chrome.quit(); // 크롬 브라우저 닫기
    }

}
main();