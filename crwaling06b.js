// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// 순위, 영화제목, 예약율, 평점

// 사용할 패키지 가져오기 : require(패키지명)
// const axios = require('axios');
// const cheerio = require('cheerio');
// const fs = require('fs');       // 파일시스템 활성화
// const path = require('path');   // 파일경로 관련 라이브러리
const {Builder, Browser, By, key, until} = require('selenium-webdriver');

async function main () {    // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://movie.daum.net/main';

    let titles = [], grades = [], rsrates = []

    // 크롬 자동화 브라우저 객체 생성
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();

    try {
        // 지정한 url로 접속
        await chrome.get(URL);

        // 특정 요소가 화면에 위치할 때 까지 최대 5초간 기다려 줌
        await chrome.wait(until.elementLocated(By.css('.tit_item')), 5000);

        // 제목들 추출
        let movies = await chrome.findElements(By.css('.feature_home .tit_item'));
        //console.log(mails)

        // 추출된 제목 출력
        for (let movie of movies) {
        //    console.log(await movie.getText()); 눈에 보이는 요소의 텍스트만 출력
            let title  = (await movie.getAttribute('textContent')).trim()
            titles.push(title);
        }
       // console.log(titles);

        // 평점 추출
        movies = await chrome.findElements(By.css('.feature_home .txt_num:first-child'));
        //console.log(movies);

        // 평점 배열에 담기
        for (let movie of movies) {
            let grade  = (await movie.getAttribute('textContent')).trim()
            grades.push(grade);
        }

        // 예매율 추출
         movies = await chrome.findElements(By.css('.feature_home .txt_num:last-child'));

        // 예매율 배열에 담기
        for (let movie of movies) {
            let rsrate  = (await movie.getAttribute('textContent')).trim()
            rsrates.push(rsrate);
        }

        for (let i = 0; i <titles.length; i++) {
            console.log(`${titles[i]}, 평점: ${grades[i]}, 예매율: ${rsrates[i]}`)
        }

    } catch(ex) {
        console.log(ex);
    } finally {
        await chrome.quit(); // 크롬 브라우저 닫기
    }

}
main();