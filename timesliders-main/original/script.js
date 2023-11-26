document.addEventListener("DOMContentLoaded",()=>{
  const sliderAnimaTime = 3000; // setTimeoutの遷移時間
  const sliderParent = document.querySelector('.wrapper ul'); // スライダー要素
  // 各スライドへ付与するリンク
  const ankers = ['https://www.yahoo.co.jp/','https://www.bing.com/?cc=jp','https://www.ocn.ne.jp/','https://www.baidu.com/','https://www.google.com/'];
  // 各スライドへ付与するalt（及びplaceholderにセットするテキスト）
  const imgAltTxt = ['Lorem','ipsum','dolor','sit','amet'];
  
  // 画像の加工処理：placeholderを使用するパターン
  const imgPlaceholders = imgAltTxt.map(imgItem => {
    return `https://via.placeholder.com/640x360/333/fff?text=${imgItem}`;
  });

  // 画像の加工処理：フォルダに任意の画像を用意するパターン
  const locationUrl = location.origin;
  const specificImges = ['image-1', 'image-2', 'image-3', 'image-p1', 'image-p2', 'image-p3', 'image-p4', 'image-travel', 'villa-1', 'villa-2', 'villa-3', 'villa-4', 'villa-5', 'villa-6'];
  const setImages = specificImges.map(img => {
    // パスの指定（実装サイトに合わせて随時変更）
    return `${locationUrl}/src/images/${img}.jpg`;
  });

  // スライダー用画像に関する定数（三項演算子による条件分岐で任意の画像が無ければ placeholder を使用）
  const imgItems = specificImges.length > 0? setImages : imgPlaceholders;
  
  // スライダー要素の下準備とカルーセルの生成
  sliderParent.insertAdjacentHTML('beforeend','<li><a target="_blank"><img></a></li><li id="btnWrap"></li>');
  imgItems.forEach(imgCursur => {
    sliderParent.querySelector('#btnWrap').insertAdjacentHTML('beforeend','<button class="btns"></button>');
  });
  
  // 枚数表示用のpタグを準備
  sliderParent.querySelector('li').insertAdjacentHTML('afterbegin',`<p></p>`);
  
  // スライダーの中身を生成・加工
  function CreatSliderElements(targetAnker, targetImg, val){
    targetAnker.setAttribute('href', ankers[val]);
    targetImg.setAttribute('src', imgItems[val]);
    targetImg.setAttribute('alt', imgAltTxt[val]);
  }
  
  let counts = 0; // カウンター（counts）の準備
  function SlideCounter(){ // スライダーの表示に関する処理
    sliderParent.querySelector('p').textContent = `${counts+1}/${imgItems.length}`;
    CreatSliderElements(sliderParent.querySelector('li a'), sliderParent.querySelector('li a img'), counts);
    counts++; // インクリメント
    if(counts === imgItems.length){ // 枚数分に達したらカウントをリセット
       counts = 0;
    }
    
    // ボタンクリックで、そのインデックス番号をカウンター（counts）へセットしてスライド調整
    sliderParent.querySelectorAll('.btns').forEach((btn, i) => {
       btn.addEventListener('click',()=>{
           counts = i;
           sliderParent.querySelector('p').textContent = `${counts+1}/${imgItems.length}`;
           CreatSliderElements(sliderParent.querySelector('li a'), sliderParent.querySelector('li a img'), counts);
       });
    });
    
    countLoop(); // setTimeoutでループ処理させる
  }
  
  // ループ処理
  function countLoop(){
    setTimeout(()=>{
       SlideCounter();
    }, sliderAnimaTime);
  }
  
  // 初回実行（起動用：スライダーの表示に関する処理）
  SlideCounter();
  
});