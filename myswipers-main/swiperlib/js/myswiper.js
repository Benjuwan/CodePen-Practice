document.addEventListener("DOMContentLoaded",function(){

    const swiper = new Swiper('.swiper', {
            loop: false, // trueでループ ＝ falseでないと初期表示から左右にスライドが表示されてしまうのでレイアウトデザインが崩れる
            slidesPerView: 'auto', // CSSでサイズ調整しているのでauto
            spaceBetween: 20, // マージンを指定
            freeMode: false, // trueにすることでスワイプ時の動きが強さでスクロール
            freeModeSticky: true, // スライドに合わせてスクロールがストップ
            touchRatio: .03, // スワイプ後の遅延を調整
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    centeredSlides : false,
                    spaceBetween: 10,
                    speed: 1000,
                    touchRatio: 1, // スワイプ後の遅延を調整(1にしないとドラッグ操作がうまく機能しない) 
                },
            }
    });
});


/**
 * 
 *      scss
             & .swiper {
                    padding: 8% 0;
                    min-height: 400px;

                    & .swiper-wrapper{
                        // padding: 0 20px;
                        
                        & .swiper-slide{
                            height: 240px;
                            // max-width: 320px;
 * 
 * 
 *      loop: false,
        grabCursor: true,
        slidesPerView: 2,
        centeredSlides : true,
        // loopedSlides: 1, //slidesPerView: 'auto'かつloop: trueの場合は必須。最初のスライドの前、最後のスライドの後に複製される非表示のスライド数を設定する。総スライド数の半分以上の値を指定しておけばOK。
        // slideToClickedSlide: true, //slideToClickedSlide オプションはクリックしたスライドをカレントにするオプションです
        spaceBetween: 10,
        speed: 1000,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                centeredSlides : false,
            },
        }
 */