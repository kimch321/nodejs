// 셀레니엄을 이용해서 k-apt.go.kr에서
// 2023년, 1월, 서울특별시, 강남구, 삼성동, 아이파크삼성 apt의
// 지상/지하 주차장 수 추출

const {Builder, Browser, By, Key, until, Select} = require('selenium-webdriver');

async function main () {
    const URL = 'http://k-apt.go.kr/';
    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        // 사이트 접속
        await chrome.get(URL);
        await sleep(1000);

        // 단지정보 버튼이 표시 될때 까지 기다림
        await chrome.wait(until.elementLocated(By.xpath('//a[@title="단지정보"]')),3000);

        // 단지정보 버튼으로 마우스 움직임
        // let dangiinfo = await chrome.findElement(By.css('#nav ul li:first-child'));
        let dangiinfo = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));
        await chrome.actions().move({origin:dangiinfo}).click().perform();
        await sleep(1000);

        // 우리단지 기본정보 버튼이 표시될때 까지 기다림
        await chrome.wait(until.elementLocated(By.xpath('//a[@title="우리단지 기본정보"]')),2000);
        // 우리단지 기본정보 버튼으로 이동 후 클릭
        let gibon = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin:gibon}).click().perform();

        // -----------------------------------
        // 검색할 아파트를 변수로 선언
        let syear = "2023년";
        let smonth = "01월";
        let sido ="서울특별시";
        let gugun ="강남구";
        let dong = "삼성동";
        let apt = "아이파크삼성동";

        await chrome.wait(until.elementLocated(By.name('searchYYYY')),3000);

       // <example>
        // <select id=“selectbox”>
        // <option value=“1”>Option 1</option>
        // <option value=“2”>Option 2</option>
        // <option value=“3”>Option 3</option>
        // </select>
        // const selectBox = await driver.findElement(By.id(“selectbox”));
        // await selectObject.selectByVisibleText(“Option 2”);
        // </example>
        // 검색년도 값 설정
        let select = await chrome.findElement(By.name('searchYYYY'));
        await new Select(select).selectByVisibleText(syear);
        await sleep(500);

        // 검색월 값 설정
        select = await chrome.findElement(By.name('searchMM'));
        await new Select(select).selectByVisibleText(smonth);
        await sleep(500);

        // 검색시도 값 설정
        select = await chrome.findElement(By.name('combo_SIDO'));
        await new Select(select).selectByVisibleText(sido);
        await sleep(500);

        // 검색구군 값 설정
        select = await chrome.findElement(By.name('combo_SGG'));
        await new Select(select).selectByVisibleText(gugun);
        await sleep(500);

        // 검색동 값 설정
        select = await chrome.findElement(By.name('combo_EMD'));
        await new Select(select).selectByVisibleText(dong);
        await sleep(500);

        // 검색결과 출력 - 아파트명, 주소
        let aptName = await chrome.findElements(By.css('.aptS_rLName'));
        for(let name of aptName) {
            console.log(await name.getAttribute('textContent'));
        }

        let aptJuso = await chrome.findElements(By.css('.aptS_rLAdd'));
        for(let juso of aptJuso) {
            console.log(await juso.getAttribute('textContent'));
        }

        // 아이파크 삼성동 항목을 찾아 인덱스값 추출
        let idx = 0;
        for (let val of aptName) {
            console.log(`${idx++},${await val.getAttribute(`textContent`)}`)
            if (await val.getText == apt) break;
        }

        // 추출한 인덱스 값을 이용해서 항목 직접 클릭
        // await chrome.executeScript('arguments[0].click();',aptName[--idx]);     // executeScript 문법을 모르겠다.
        menu = await chrome.findElement(By.css(`.mCSB_container ul li:nth-child(${idx}) a`));
        await chrome.actions().move({origin:menu}).click().perform();

        await chrome.sleep(1500);

        // -------------------------
        // 관리시설 정보 클릭
        await chrome.wait(until.elementLocated(By.css('.lnbNav li:nth-child(3) a')),5000);
        menu = await chrome.findElement(By.css('.lnbNav li:nth-child(3) a'))
        await chrome.actions().move({origin:menu}).click().perform();
        await chrome.sleep(2000);

        // 지상/지하 주차장 대수 추출
        let pcnt = await chrome.findElement(By.css('#kaptd_pcnt')).getText()
        let pcntu = await chrome.findElement(By.css('#kaptd_pcntu')).getText()
        let tpcnt = await  chrome.findElement(By.css('#kaptd_total_pcnt')).getText()

        console.log(pcnt,pcntu,tpcnt);


    }catch(ex){
        console.log(ex);
    }finally {
        await chrome.sleep(3000);
        await chrome.quit();
    }

}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

main();