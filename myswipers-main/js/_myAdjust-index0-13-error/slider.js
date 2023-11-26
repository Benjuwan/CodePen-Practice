document.addEventListener("DOMContentLoaded",()=>{
    // lightMode darkMode
    const modeChanger = document.querySelector('.modeChange button');
    const getDarkMode = [];

    modeChanger.addEventListener('click',()=>{
        modeChanger.classList.toggle('getDark');
        document.body.classList.toggle('getDark');

        if(document.body.classList.contains('getDark')){
            getDarkMode.push({
                Class: document.body.classList.contains('getDark'),
            });
            localStorage.setItem('getDarkMode',JSON.stringify(getDarkMode));
        } else {
            getDarkMode.splice(0);
            localStorage.removeItem('getDarkMode');
        }
    });

    const getSaveDate = JSON.parse(localStorage.getItem('getDarkMode'));
    if(getSaveDate){
        modeChanger.classList.add('getDark');
        document.body.classList.add('getDark');
    }
    //lightMode darkMode



    const imgBoxes = document.querySelectorAll('.imgBoxes p');
    const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
    const forBase = document.querySelector('.forBase');

    // .imgBoxesに格納しているpタグの数だけ要素（.swiper-slide）を生成
    let conuter = 0;
    while(conuter < imgBoxes.length){
        swiperWrappers.forEach(mySwiper => {
            /**
             * class属性には「swiper-slide」必須。
             * conuterは0カウントスタートなのでページャーには+1する。
             * メインコンテンツは、.imgBoxesの中身から取得（conuter：インデックス番号に準拠）
             */
            mySwiper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><div class="swiperImges"><span style="color:#fff;">${conuter+1}/${imgBoxes.length}</span><p>${imgBoxes[conuter].innerHTML}</p></div></div>`);
        });
        conuter++;
    }

    // サムネイル画像のクリック処理
    imgBoxes.forEach((imgBox, imgIndex) => {
        imgBox.addEventListener('click',()=>{
            //（クリックしてから初めに）imgBoxesのインデックス番号を渡すために、Swiper（インスタンス・クラス）はここに配置
            const swiper = new Swiper(".swiper", {
                grabCursor: true,
                loop: true, //【OS：Windows対策】
                initialSlide: imgIndex // スライドの開始位置を指定（imgBoxesのインデックス番号を渡している）
            });

            /**
              *【OS：Windows対策】
              * MacOS/iOSではクリックしたサムネイル画像のインデックス番号に準拠したスライダー（画像）を表示してくれるが、Windowsでは「loopプロパティをtrue」にしないと意図した挙動になってくれない。
              * Windowsは厳格なので仕様をしっかり明記してやる必要がある。例えば（initialSlideが[0]の場合）=最初[0]のスライダー画像の前スライダーがないことを検知して意図した挙動を行わない（クリックしたサムネイル画像のインデックス番号に準拠したスライダー（画像）を表示しない）

              * スワイプイベント：swiper.on('slideChange', function(){ 期待する挙動を記述 });
            */

            //（imgBoxesのインデックス番号を渡した後にコンテンツ部分を表示させる）ios/os（Mac）は良しなにしてくれるが、Windowsは厳格に記述しないと意図した動きにならない
            forBase.classList.add('goView');
        });
    });

    // 閉じるボタンのクリック処理
    const resetBtn = document.querySelector('.forBase button');
    resetBtn.addEventListener('click', ()=>{
        forBase.classList.remove('goView');

        // .swiper-slideを初期化（= 処理適用のclassを削除）
        document.querySelectorAll('.swiper-slide').forEach(sSlider => {
            sSlider.classList.remove('swiper-slide-next','swiper-slide-active','swiper-slide-prev');
        });

        // 処理の度にspan.swiper-notificationが生成されるので、初めのもの（0）以外は全て削除
        document.querySelectorAll('.swiper-notification').forEach((notification, notificationIndex) => {
            if(!(notificationIndex === 0)){
                notification.remove();
            }
        });
    });
});