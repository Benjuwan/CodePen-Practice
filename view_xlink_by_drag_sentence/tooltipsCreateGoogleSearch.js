document.addEventListener("DOMContentLoaded", () => {
    /**
     * イベント発生対象の指定（article内の各文章 div）
     * @type {NodeListOf<HTMLElement>}
     */
    const selectableTextArea = document.querySelectorAll("article div");

    /**
     * ツールチップ（ボタン）
     * @type {HTMLButtonElement}
     */
    const tooltipBtn = document.querySelector(".tooltipBtn");

    /**
     * スマホ・タブレットかどうかを判定するフラグ
     * @param {Event} event 
     * @returns {event is TouchEvent}
     */
    const isTouchDevice = (event) => {
        return event instanceof TouchEvent;
    }

    /**
     * Google検索機能実行準備
     * @param {string} selectedText 
     */
    function createGoogleSearchPathStr(selectedText) {
        const snsShare = tooltipBtn.querySelector('a');
        if (selectedText.length > 0) {
            const googleSearchPath = `https://www.google.com/search?q=${selectedText}`;
            snsShare.href = googleSearchPath;
            snsShare.textContent = `${selectedText.length > 16 ? `${selectedText.slice(0, 8)}...` : selectedText} で検索`;
        }
    }

    /**
     * 座標取得
     * @param {Event} event 
     */
    function selectableTextAreaMouseUp(event) {
        // 擬似的な遅延処理で高速ダブルクリックに対応
        setTimeout(() => {
            // window.getSelection()： 各文章（イベント発生対象要素内のpタグ）内の選択（ドラッグした）部分（文章・単語）
            // ドラッグ箇所（文章・単語）を文字列化（※数字や特殊な記号などを考慮した型変換作業）して改行やスペースなどをトリミング（排除）した文字列に整形
            const selectedText = window.getSelection().toString().trim();

            if (selectedText.length > 0) {


                // 各文章（イベント発生対象要素内のpタグ）内のドラッグ位置に対する x座標
                const xPos = !isTouchDevice(event) ? event.clientX : event.changedTouches[0].clientX;
                // 各文章（イベント発生対象要素内のpタグ）内のドラッグ位置に対する y座標
                const yPos = !isTouchDevice(event) ? event.clientY : event.changedTouches[0].clientY;

                // アクティブな要素（ドラッグ対象）がツールチップではない場合
                if (document.activeElement !== tooltipBtn) {
                    tooltipBtn.classList.add('tooltipBtn_view');
                    tooltipBtn.style.transform = `translate(${xPos}px, ${yPos}px)`;
                    // Google検索機能実行準備
                    createGoogleSearchPathStr(selectedText);
                }
            }
        }, 500);
    }

    /**
     * ツールチップを非表示化
     * @param {Event} event 
     */
    function documentMouseDown(event) {
        //  ツールチップが表示中の場合、表示用クラスの解除とドラッグ箇所（文章・単語）を空（初期化・リセット）に
        if (tooltipBtn.classList.contains('tooltipBtn_view')) {
            window.getSelection().empty();
            // 処理実行を実現するために非表示化を擬似的に遅延させている
            if (!isTouchDevice(event)) {
                setTimeout(() => tooltipBtn.classList.remove('tooltipBtn_view'), 250);
            } else {
                // スマホ・タブレット操作時は更に遅延
                setTimeout(() => tooltipBtn.classList.remove('tooltipBtn_view'), 500);
            }
        }
    }

    selectableTextArea.forEach((elem) => {
        // 各文章（イベント発生対象要素内のpタグ）のマウスアップ時に「座標取得」
        elem.addEventListener("mouseup", selectableTextAreaMouseUp);
        // タッチイベント
        elem.addEventListener("touchend", selectableTextAreaMouseUp);
    });

    // ドキュメント要素（DOM全体を対象に）のマウスダウン時に「ツールチップを非表示化」
    document.addEventListener("mousedown", documentMouseDown);
    document.addEventListener("touchstart", documentMouseDown);
});
