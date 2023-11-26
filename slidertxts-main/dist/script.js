document.addEventListener("DOMContentLoaded", ()=>{
    // 処理の親元要素
    const rootEl = document.querySelector('.infoTxtSlider');

    // セレクトボックスの選択で挙動変化
    const chgContent = document.querySelector('#chgContent');
    chgContent.addEventListener('change', (e)=>{
        rootEl.querySelector('ul').innerHTML = ''; // リセット（空にする）

        if(document.querySelector('#DefaultTxt') !== null){ // 初回のみ機能（案内文がある場合の処理）
            document.querySelector('#DefaultTxt').remove();
        }

        const targetClass = rootEl.classList[rootEl.classList.length-1]; //（親元要素の）クラス名の末尾
        if(rootEl.classList.length > 1){
            //（クラス名の末尾を削除して）クラスを切り替えて挙動を変更
            rootEl.classList.remove(targetClass);
        }

        // infoTxtSlider または infoTxtSliderVerYクラスの挙動時は 3秒 に指定
        if(targetClass === 'infoTxtSliderVerX' || targetClass === 'infoTxtSlider'){
            AddElementFunc(e.target.value, 3000); // optionのvalue名と指定時間を渡す
        } else {
            AddElementFunc(e.target.value); // optionのvalue名を渡す
        }
    });

    function AddElementFunc(addClassName, seconds){
        const animationTime = seconds || 10000; // デフォルト値は10秒

        rootEl.classList.add(addClassName);

        // テキスト要素の設置先を生成
        const infiniteUl = rootEl.querySelector('ul');
        infiniteUl.insertAdjacentHTML('beforeend', `<li></li>`);

        // ループの基準元となる要素群
        const listsBoxesChildren = rootEl.querySelectorAll('.listBoxes p');

        // メインの処理（テキストループ）を行う関数の定義
        let counter = 0; // カウンター
        function roopTxt(){
            if(counter < listsBoxesChildren.length){ // カウンターが基準元要素群の配列数（格納数）に達するまでの処理

                // 初めにカウントに準拠した結果の<<中身（文字列）>>（{listsBoxesChildren[counter]<<.textContent>>）を取得して、設置元要素に中身を代入・格納（.textContent）
                rootEl.querySelector('li').innerHTML = `${listsBoxesChildren[counter].innerHTML}`;

                // 次にカウントアップし、
                counter++;

                // 最後にカウントアップさせてcounterを更新した後に、再度上記の処理を行う（＝指定要素の上限値（listsBoxesChildren.length）まで）
                roopMethod();

            } else { // counterが上限値に達せば、0カウントに戻して上記の処理を再度行う（永遠にループさせる）
                counter = 0;
                roopTxt();
            }
        }

        // 時限式関数には、CSSの@keyframesで指定したアニメーション時間と「同じ数値」をセットする
        function roopMethod(){
            const targetTimer = setTimeout(()=>{
                roopTxt();
            }, animationTime);
            chgContent.addEventListener('change', ()=>{
                clearTimeout(targetTimer); // セレクトボックスを切り替える度にリセット 
            });
        }

        roopTxt(); // メインの処理（テキストループ）を行う関数の定義
    }
});