document.addEventListener("DOMContentLoaded",()=>{
    // swiperのメイン機能部をラップする要素を定数に
    const forBase = document.querySelector('.forBase');


    // 親元の.swiper-wrapperを定数にして、画像切り替え用のページャー要素を生成
    const swiParent = document.querySelector('.swiper-wrapper');
    swiParent.insertAdjacentHTML('afterbegin', `<div class="leftAction action"></div>`);
    swiParent.insertAdjacentHTML('beforeend', `<div class="rightAction action"></div>`);
    const swiperWrapperLeft = document.querySelector('.swiper .leftAction');
    const swiperWrapperRight = document.querySelector('.swiper .rightAction');
    
    // *a：処理の度に複数生成されてしまう余計な要素（.swiper-slideや.presents）をquerySelectorAllで取得してlength（配列数）が1以上（＝1つでも生成されていた場合）の時「一番初めの要素以外を削除」する関数を用意
    function needOnlySingle(elements){
        if(document.querySelectorAll(elements).length > 1){
            document.querySelectorAll(elements).forEach((element, elementIndex) => {
                if(elementIndex !== 0){
                    element.remove();
                }
            });
        }
    }


    // 画像の配列数（インデックス番号）と画像のページャー生成に必要な変数を用意（※カウンターは大外に配置、配列なので0スタート）
    let getIndex = 0;


    // 画像群を指定した配列（要素）を定数に
    const imgBoxes = document.querySelectorAll('.imgBoxes p');
    imgBoxes.forEach((imgBox, index) => {
        // 画像群を加工して.swiper-wrapper（の開始タグ直下）へ格納。※swiperで指定されている.swiper-slideは変更せずに加工
        const forSwiper = `<div class="swiper-slide">${imgBox.innerHTML}</div>`;
        swiParent.insertAdjacentHTML('beforeend', forSwiper);

        // *a
        needOnlySingle('.swiper-slide');


        // pタグ（サムネ画像）をクリックした際の処理
        imgBox.addEventListener('click',()=>{
            // サムネ画像クリックで該当インデックス番号を取得して変数に代入・格納
            getIndex = index;

            forBase.classList.add('goView');

            // 変数 getIndex は配列。つまり要素が0カウントスタートなので、+1しないとページャーの表示が意図したものにならない。
            let presents = `${getIndex+1}/${imgBoxes.length}`;
            // （画像の切り替え/ページャー生成の）関数に、画像切り替え用のインデックス番号とページャー生成用の値を渡す
            change(getIndex, presents);
        });
    });


    // 画像の切り替え/ページャー生成の関数を用意。第一引数には配列数、第二引数には表示された画像のページャー数を指定
    function change(getIndex, presents){
        // （画像群の）配列（インデックス番号）を指定した画像のsrcとaltを取得して「変数（関数の処理で中身が変わっていくため変数に）」に格納。
        let getSrc = imgBoxes[getIndex].querySelector('img').getAttribute('src');
        let getAlt = imgBoxes[getIndex].querySelector('img').getAttribute('alt');
        
        // swiperのメイン機能部（.swiper-slide）の画像群（※上述の加工して生成した画像たち）を取得して定数に
        const swiImges = swiParent.querySelectorAll('.swiper-slide img');
        swiImges.forEach(swiImg => {
            // 前述した処理で取得している「配列（インデックス番号）に準拠したsrcとalt」を所定の画像にセット
            swiImg.setAttribute('src', getSrc);
            swiImg.setAttribute('alt', getAlt);

            // ページャー表示用の要素を生成
            swiImg.insertAdjacentHTML('beforebegin', `<small class="presents"></small>`);
            const presentsTxt = document.querySelector('.presents');

            // *a
            needOnlySingle('.presents');

            // ページャーの中身がある場合のみ表示させる※この条件分岐がないと画面にundefinedが表示される
            if(!(presents == null)){
                presentsTxt.style.color="#fff";
                presentsTxt.style.paddingLeft="1em";
                presentsTxt.textContent = `${presents}`;
            }
        });
    }

    // 左側（＝前ページ）を表示させる処理
    swiperWrapperLeft.addEventListener('click',()=>{
        // 現在表示画像（のインデックス番号）が0でない場合（＝スタート画像でない場合）のみ以下の処理を行う
        if(!(getIndex == 0)){
            getIndex -= 1;

            // 変数 getIndex は配列。つまり要素が0カウントスタートなので、+1しないとページャーの表示が意図したものにならない。
            presents = `${getIndex+1}/${imgBoxes.length}`;
            // 関数に、画像切り替え用のインデックス番号とページャー生成用の値を渡す
            change(getIndex, presents);
        }
    });

    // 右側（＝次ページ）を表示させる処理
    swiperWrapperRight.addEventListener('click',()=>{
        // 現在表示画像（のインデックス番号）が最後の画像でない場合（※配列で0カウントスタートなので、-1にしないと数値が合致しない）
        if(!(getIndex == (imgBoxes.length - 1))){
            getIndex += 1;

            // 上記の、変数 getIndex は～以下同上
            presents = `${getIndex+1}/${imgBoxes.length}`;
            change(getIndex, presents);
        }
    });

    // ボタンクリックでスライドを非表示に
    const forBaseBtn = document.querySelector('.forBase button');
    forBaseBtn.addEventListener('click',()=>{
        forBase.classList.remove('goView');
    });
});