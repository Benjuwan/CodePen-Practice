document.addEventListener("DOMContentLoaded", ()=> {
    const ParentSlider = document.querySelector('.imgSliders');
    const sliders = ParentSlider.querySelectorAll('ul li');
    sliders.forEach((slider, i) => {
        if(i === 0){ // 初回表示・読み込み時で表示までにタイムラグを生じさせないよう最初の要素には付与しておく 
            slider.classList.add('inView');
        }
    });

    let count = 1; // 初回表示・読み込み時の処理があるので最初(index番号0)は飛ばして1スタート 
    setInterval(()=>{
        if(count < sliders.length){
            sliders.forEach((slider, i) => {
                if(i === count){
                    slider.classList.add('inView');
                } else {
                    slider.classList.remove('inView');
                }
            });
            count++; // index番号(0スタート)とリンクさせるためにカウントアップは最後に行う
        } else {
            count = 0;
        }
    }, 3000);
});