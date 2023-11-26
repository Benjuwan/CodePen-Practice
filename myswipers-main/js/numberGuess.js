document.addEventListener("DOMContentLoaded", () => {
    const parentEl = document.querySelector('.numberGuess');
    const correctStyle = [
        'text-align: center',
        'color: #fff',
        'background-color: #333',
        'font-size: 3em'
    ]

    const inputEl = parentEl.querySelector('input');
    const btnEl = parentEl.querySelector('button');
    btnEl.setAttribute('disabled', true);

    const aryResultEl = parentEl.querySelector('p.ary');

    const paragraphEl = parentEl.querySelector('p.txt');
    let paragraphElTxt = paragraphEl.textContent;

    const resultNumber = Math.floor(Math.random() * 100);
    console.log(resultNumber);

    inputEl.addEventListener('input', (e) => {
        // parseInt(e.target.value) で value が（可能な限り）数値に変換できるか否かを判断
        if (e.target.value > 0 && parseInt(e.target.value)) {
            btnEl.removeAttribute('disabled');
        } else {
            btnEl.setAttribute('disabled', true);
        }
    });

    const inputResultAry = [];
    // input イベントリスナーの中に入れるとinputResultAry の値が重複する = input イベント回数分、値が追加されてしまうので、input イベントリスナー外でクリックイベントを行う
    btnEl.addEventListener('click', () => {
        inputResultAry.push(inputEl.value);
        // console.log(inputResultAry);

        if (inputResultAry.length > 0) {
            paragraphElTxt = inputResultAry.at(-1);
            aryResultEl.textContent = inputResultAry.join(' ');

            // 正解と同じ数値（正解）の場合 
            if (Number(paragraphElTxt) === resultNumber) {
                parentEl.innerHTML = '';
                parentEl.innerHTML = `<p style="${correctStyle.join(';')}">正解です</p>`;
            }

            // 正解より数値が小さい場合
            else if (Number(paragraphElTxt) < resultNumber) {
                // targetNumber：正解との差分（＝ paragraphElTxt が resultNumber 以下なので不足分）
                const targetNumber = resultNumber - Number(paragraphElTxt);
                // console.log(`不足分：${targetNumber}`);

                // 条件は昇順：降順だと大きい数値が以下の数値の条件も吞み込んでしまうため処理が停まる（ 50 以下に 25 も 5 も含まれる）
                if (targetNumber <= 5) {
                    paragraphEl.textContent = '少し小さいです';
                } else if (targetNumber <= 25) {
                    paragraphEl.textContent = '小さいです';
                } else if (targetNumber <= 50) {
                    paragraphEl.textContent = '小さすぎです';
                } else {
                    paragraphEl.textContent = '正解からかなり遠いです';
                }
            }

            // 正解より数値が大きい場合
            else if (Number(paragraphElTxt) > resultNumber) {
                // targetNumber：正解との差分（＝ paragraphElTxt が resultNumber 以上なので余剰分）
                const targetNumber = Number(paragraphElTxt) - resultNumber;
                // console.log(`余剰分：${targetNumber}`);

                // 条件は降順で範囲を指定：昇順だと小さい数値が以上の数値の条件も吞み込んでしまうため処理が停まる（ 5 以上に 25 も 50 も含まれる）し、上振れの条件なので〇〇～△△までという範囲を指定してやる
                if ((targetNumber <= 50) && (targetNumber > 25)) {
                    paragraphEl.textContent = '大きすぎです';
                } else if ((targetNumber <= 25) && (targetNumber > 5)) {
                    paragraphEl.textContent = '大きいです';
                } else if ((targetNumber <= 5) && targetNumber >= 1) {
                    paragraphEl.textContent = '少し大きいです';
                } else {
                    paragraphEl.textContent = '正解からかなり遠いです';
                }
            }
        }

        // input の中身をリセット
        inputEl.value = '';
    });
});