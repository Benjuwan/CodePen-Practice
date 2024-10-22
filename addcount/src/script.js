/**
 * ---------------------------- 直近1時間と1分間のクリックイベント回数を把握する（※書籍『リーダブルコード』のバイト数計算の簡易版）
*/

let timeCounter = 0;
const theMinute = 60; // 60：1分
const theHour = 3600; // 3600：1時間

let eventCounter = 0;
const events = [];
const eventCounterAry = [];

const _init = (targetTimeInterval) => {
    if (eventCounterAry.length > 0) {
        // 配列の初期化処理：eventCounterAry.splice(0) でもok
        eventCounterAry.length = 0;
    }
    clearInterval(targetTimeInterval);
    timeCounter = 0;
}

const _checkTheLatestEvents = () => {
    const date = new Date();
    const eventOccur = date.toLocaleTimeString();
    const now = parseInt(eventOccur.replaceAll(':', ''));
    events.push(eventOccur);

    const filters = events.filter(e => {
        const thePast = parseInt(e.replaceAll(':', ''));
        if (now - thePast < theMinute) {
            // 直近60秒以内のものだけを抽出
            return e;
        }
    });

    if (filters.length > 0) {
        // 直近60秒以内に発生したクリックイベント回数を把握
        eventCounter = filters.length;
        console.log(filters);
    }
}

const addCount = (theTimeCounter) => {
    const addCountSec = document.querySelector('.addCount');
    const result = addCountSec.querySelector('#result');

    const timeInterval = setInterval(() => {
        timeCounter++;

        const isTaskFinish = timeCounter >= theTimeCounter;

        if (theTimeCounter > theMinute) {
            // 1分以上（theHour）の場合
            if (timeCounter % theMinute === 0) {
                // 60秒ごとに eventCounterAry へ直近1分のイベント数を格納
                eventCounterAry.push(eventCounter);
                console.log(eventCounterAry);
            } else if (isTaskFinish) {
                // 1時間立つと結果発表（eventCounterAryの中身を合算）
                const sum = eventCounterAry.reduce((a, b) => a + b);
                console.log(sum, eventCounterAry);
                result.textContent = `直近${theTimeCounter / 60}分でのイベント発生回数は{${sum}}でした。`;
                _init(timeInterval);
            }
        } else {
            // 1分（theMinute）の場合
            if (isTaskFinish) {
                result.textContent = `直近${theTimeCounter / 60}分でのイベント発生回数は{${eventCounter}}でした。`;
                _init(timeInterval);
            }
        }

        console.log(timeCounter);
    }, 1000);

    // クリックイベントの発生
    const eRunBtn = addCountSec.querySelector('#eRunBtn');
    eRunBtn.addEventListener('click', () => _checkTheLatestEvents());
}

/* 実行時は以下のコメントアウトを解除 */
// addCount(theHour);