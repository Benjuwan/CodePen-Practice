document.addEventListener("DOMContentLoaded", () => {
    // イベント発生対象の指定（.targetArea内の各文章）
    const selectableTextArea = document.querySelectorAll(".targetArea p");

    // シェア可能を示唆する要素（ボタン）
    const snsShareBtn = document.querySelector(".snsShareBtn");

    // ビューポート幅が768px以下の端末を検出
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // ホバー機能がなく、タッチスクリーンのような粗い入力精度の端末を検出
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    // スマホ・タブレット判定用のフラグ
    const isMobileDevice = isTouch && isMobile;

    selectableTextArea.forEach((elem) => {
        // 各文章（イベント発生対象要素内のpタグ）のマウスアップ時に「座標取得」
        elem.addEventListener("mouseup", selectableTextAreaMouseUp);
        // タッチイベント
        elem.addEventListener("touchend", selectableTextAreaMouseUp);
    });

    // ドキュメント要素（DOM全体を対象に）のマウスダウン時に「シェアボタンを非表示化」
    document.addEventListener("mousedown", documentMouseDown);
    document.addEventListener("touchstart", documentMouseDown);

    // param の文字数をチェックして条件に応じた整形を行う
    function checkParamLenght(baseText) {
        // location.search： 現在のページのURLからクエリ文字列（? 以降の部分）を取得する
        // 例： https://example.com/page?foo=bar&baz=qux → "?foo=bar&baz=qux"
        const param = location.search;
        const separator = param.length > 0 ? "&" : "?";
        return `${baseText}${separator}utm_source=x.com&utm_medium=social&utm_campaign=quoteLink`;
    }

    // シェア文章生成及びシェア実行準備
    function createShareSentence_prepareShareAction() {
        // ドラッグ箇所（文章・単語）
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 0) {
            const xShareUrl = "https://x.com/intent/tweet";
            // ドラッグ箇所（文章・単語）のトリミング整形無しver
            let text = window.getSelection().toString();

            if (text.length > 126) {
                text = text.slice(0, 125);
                const baseText = `"${text}…"\n${location.href}`;
                text = checkParamLenght(baseText)
            } else {
                const baseText = `"${text}…"\n${location.href}`;
                text = checkParamLenght(baseText)
            }

            // 最終整形を href に渡す
            const snsShare = snsShareBtn.querySelector('a');
            snsShare.href = `${xShareUrl}?text=${text}`;
        }
    }

    // 座標取得
    function selectableTextAreaMouseUp(event) {
        // 擬似的な遅延処理で高速ダブルクリックに対応
        setTimeout(() => {
            // window.getSelection()： 各文章（イベント発生対象要素内のpタグ）内の選択（ドラッグした）部分（文章・単語）
            // ドラッグ箇所（文章・単語）を文字列化（※数字や特殊な記号などを考慮した型変換作業）して改行やスペースなどをトリミング（排除）した文字列に整形
            const selectedText = window.getSelection().toString().trim();

            if (selectedText.length > 0) {
                // 各文章（イベント発生対象要素内のpタグ）内のドラッグ位置に対する x座標
                const xPos = !isMobileDevice ? event.clientX : event.changedTouches[0].clientX;
                // 各文章（イベント発生対象要素内のpタグ）内のドラッグ位置に対する y座標
                const yPos = !isMobileDevice ? event.clientY : event.changedTouches[0].clientY;

                // アクティブな要素（ドラッグ対象）がシェアボタンではない場合
                if (document.activeElement !== snsShareBtn) {
                    snsShareBtn.classList.add('snsShareBtn_view');
                    snsShareBtn.style.transform = `translate(${xPos}px, ${yPos}px)`;
                    // シェア文章生成及びシェア実行準備
                    createShareSentence_prepareShareAction();
                }
            }
        }, 200); // .2sが適当
    }

    // シェアボタンを非表示化
    function documentMouseDown() {
        //  シェアボタンが表示中の場合、表示用クラスの解除とドラッグ箇所（文章・単語）を空（初期化・リセット）に
        if (snsShareBtn.classList.contains('snsShareBtn_view')) {
            window.getSelection().empty();
            // シェア実行を実現するために非表示化を擬似的に遅延させている
            if (!isMobileDevice) {
                setTimeout(() => snsShareBtn.classList.remove('snsShareBtn_view'), 250);
            } else {
                // スマホ・タブレット操作時は更に遅延
                setTimeout(() => snsShareBtn.classList.remove('snsShareBtn_view'), 500);
            }
        }
    }
});
