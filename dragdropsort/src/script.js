/**
 *  ---------------------------- ドラッグ&ドロップでソート
*/
const theDragDropSortSec = document.querySelector('.theDragDropSort');
const dropzone = theDragDropSortSec.querySelector('.dropzone');

const lists = dropzone.querySelectorAll('li');
// ドラッグ&ドロップを機能させるための必須属性（draggable）を付与
lists.forEach(li => li.setAttribute('draggable', 'true'));

/* 新規リストの生成関連 */
const entryForm = theDragDropSortSec.querySelector('#entryForm');
const entry = entryForm.querySelector('#entry');
entryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (entry.value.length > 0) _createEntry();
});

const entryBtn = entryForm.querySelector('#entryBtn');
entryBtn.addEventListener('click', () => {
    if (entry.value.length > 0) _createEntry();
});

/* 新規リストの生成用のメソッド */
const _createEntry = () => {
    const newListElm = document.createElement('li');
    newListElm.setAttribute('draggable', 'true');
    newListElm.textContent = `${entry.value}`;
    entry.value = ''; // 入力内容の初期化
    dropzone.appendChild(newListElm);
}

// 以前の _actDragDropSort メソッドの役割を代替
const _commonAction_Dragover_Drop = (e, targetElm, isDropAct) => {
    // targetElm が li かどうかをチェック
    if (targetElm.tagName === 'LI') {
        const rect = targetElm.getBoundingClientRect(); // targetElm を長方形にした想定でビューポート内の位置（width, height, top, left, bottom, right, x, y, etc...）を把握する

        /* middle：要素の垂直方向の中心点（childMiddle）を計算（=要素のviewportHeight（y）からの数値（top）と、要素自体の高さを半分にした数値の合算。この中心点を基準にすることで要素の上半分にドラッグした場合は「その要素の前に」配置、下半分にドラッグした場合は「その要素の後に」配置するという処理を実現） */
        const middle = rect.top + rect.height / 2; // 要素の垂直方向の中心点
        const posY = e.clientY; // イベントハンドラー要素のビューポートにおけるY軸の数値

        if (posY < middle) {
            // マウスポインターの位置（posY）が要素の中心線（middle）より「上（半分）」にある場合、ドラッグ要素はターゲット要素（draggedElm）の前に配置
            if (isDropAct) {
                dropzone.insertBefore(draggedElm, targetElm);
            } else {
                targetElm.classList.add('draggingUpper'); // 視覚的フィードバックのスタイル
            }
        } else {
            // マウスポインターの位置（posY）が要素の中心線（middle）より「下（半分）」にある場合、ターゲット要素（draggedElm）の後ろ（nextSibling）に配置する。nextSibling：DOMツリーにおける次の兄弟要素を参照する
            if (isDropAct) {
                dropzone.insertBefore(draggedElm, targetElm.nextSibling);
            } else {
                targetElm.classList.add('draggingLower'); // 視覚的フィードバックのスタイル
            }
        }

        if (isDropAct) {
            // スタイルの初期化（dropzone 以外の class{draggingUpper/draggingLower}の排除）
            targetElm.classList = Array.from(targetElm.classList).filter(classname => classname === 'dropzone');
        }
    }
}

// ドラッグ操作全体を通じて現在ドラッグされている要素を追跡するためのグローバル変数
let draggedElm = null;

// dragstart: ドラッグ操作の開始時に1回だけ発火
dropzone.addEventListener('dragstart', (e) => {
    draggedElm = e.target;
    draggedElm.classList.add('dragging');
    dropzone.classList.add('onDrag');
});

// dragend: ドラッグ操作が完了（成功/キャンセル問わず）した時に発火
dropzone.addEventListener('dragend', () => {
    draggedElm.classList.remove('dragging');
    draggedElm = null; // グローバル変数をリセット
    if (dropzone.classList.contains('onDrag')) dropzone.classList.remove('onDrag');
});

// drop: ドラッグ要素を離した時に1回だけ発火
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingList = e.target;
    _commonAction_Dragover_Drop(e, draggingList, true);
});

// dragover: ドラッグ中、要素の上にカーソルがある間、継続的に発火
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault(); // デフォルトのドラッグ動作を防止（これがないとdropが発火しない）
    const draggingList = e.target;
    _commonAction_Dragover_Drop(e, draggingList, false);
});

// dragleave: ドラッグ中の要素が別の要素の領域から出た時に発火
dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    // スタイルの初期化（dropzone 以外の class{draggingUpper/draggingLower}の排除）
    e.target.classList = Array.from(e.target.classList).filter(classname => classname === 'dropzone');
});