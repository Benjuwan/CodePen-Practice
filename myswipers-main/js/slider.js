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


    
    /* スライダー（swiper）関連 */
    // 連動用（サムネイルスライダー）画像群を加工して生成：画像群の中身（pタグたち）を必須要素の .swiper-wrapperでラップ
    const imgBox = document.querySelector('.imgBoxes');
    imgBox.innerHTML = `<div class="swiper-wrapper">${imgBox.innerHTML}</div>`;

    // サムネイル（スライダー）の子要素
    const imgBoxes = document.querySelectorAll('.imgBoxes .swiper-wrapper p');
    // メイン（スライダー）の必須要素
    const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
    // メインの機能全体をラップするグローバル要素
    const forBase = document.querySelector('.forBase');

    // .imgBoxesに格納しているpタグの数だけ要素（.swiper-slide）を生成
    let conuter = 0;
    while(conuter < imgBoxes.length){
        swiperWrappers.forEach(mySwiper => {
            /**
             * class属性には「swiper-slide」必須。
             * conuterは0カウントスタートなのでページャーには+1する。
             * 各画像（スライダー）は.imgBoxesの中身から取得（conuter：インデックス番号に準拠）
             */
            mySwiper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><div class="swiperImges"><span style="color:#fff;">${conuter+1}/${imgBoxes.length}</span><p>${imgBoxes[conuter].innerHTML}</p></div></div>`);
        });
        conuter++;
    }

    // メイン（スライダー）の仕様を指定
    const mainSlider = new Swiper('.swiper', {
        loop: false, // true;にすると、最初[0]と最後[13]の境目もスライドできるようになる
        grabCursor: true,
    });
       
    // サムネイル（スライダー）の仕様を指定
    const Thumbnail = new Swiper('.imgBoxes', {
        slideToClickedSlide: true,
    });

    // サムネイルの子要素として不用意なdivタグ生成されるので削除
    imgBox.querySelectorAll('.swiper-wrapper div').forEach(needless => {
        needless.remove();
    });

    /* サムネイルとメインのスライダーを連動・連携 */
    // スライダーをスライドした時にサムネイルを移動させる
    Thumbnail.on('slideChange', ()=>{
        // realIndex は現在 activeなスライドの index番号
        mainSlider.slideToLoop(Thumbnail.realIndex);
    });

    // サムネイルクリックでフローコンテンツを表示
    imgBoxes.forEach(imgBox => {
        // 必須要素：swiper-slideクラスを付与
        imgBox.classList.add('swiper-slide');
        imgBox.addEventListener('click',()=>{
            // 表示時のチラつき（スワイプが移動する挙動）を隠すため.15s遅延させる
            setTimeout(()=>{
                forBase.classList.add('goView');
            }, 150);
        });
    });

    // 閉じるボタンのクリック処理（フローコンテンツを非表示）
    const resetBtn = document.querySelector('.forBase button');
    resetBtn.addEventListener('click', ()=>{
        forBase.classList.remove('goView');
    });
});