// タブ関連（Class策定）
// class TabContent {
//     constructor(el01, el02){
//         this.el01 = document.querySelector(el01);
//         this.el02 = document.querySelector(el02);
//         this._GetTab();
//     }
//     _GetTab(){
//         const NoViewTabContent = document.querySelectorAll('.TabContent div');
//         this.el01.addEventListener('click',() => { // 意図するタブをクリック
//             NoViewTabContent.forEach(NoTab => { // （JSは先述優先なので）初めに、意図しないコンテンツ部分の TabBoxViewOn クラスを削除
//                 if( NoTab.classList.contains('TabBoxViewOn') ){
//                     NoTab.classList.remove('TabBoxViewOn');
//                 }
//             });
//             this.el02.classList.add('TabBoxViewOn'); // 次に、意図する要素（コンテンツ）に TabBoxViewOn クラスを付与
//         });
//     }
// }

document.addEventListener("DOMContentLoaded",()=>{
    // タブ関連（Class：newを使用するパターン）
    // new TabContent('#tabItem001','.TabContent div:first-of-type');
    // new TabContent('#tabItem002','.TabContent div:nth-of-type(2)');
    // new TabContent('#tabItem003','.TabContent div:nth-of-type(3)');
    // new TabContent('#tabItem004','.TabContent div:nth-of-type(4)');
    // new TabContent('#tabItem005','.TabContent div:nth-of-type(5)');
    // new TabContent('#tabItem006','.TabContent div:nth-of-type(6)');

    
    // Classを使用しない簡素パターン
    const btns = document.querySelectorAll('.TabBtnBox button');
    const tabs = document.querySelectorAll('.TabContent div');
    btns.forEach((btn, bi) => {
        btn.addEventListener('click',() => {
        tabs.forEach((tab, ti) => {
            tab.classList.remove('TabBoxViewOn');
            if(bi === ti){
            tab.classList.add('TabBoxViewOn');
            }
        });
        });
    });
});