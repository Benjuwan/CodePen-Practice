document.addEventListener("DOMContentLoaded", () => {
  /* data-current が付いているリストから属性を取り除いて、そのリスト要素の class名を返す */
  const hasAttrElmRemoveAttr_backToElmClassName = (
    targetEls, 
    targetAttr
  ) => {
    return Array.from(targetEls).map(targetElm => {
      if(targetElm.hasAttribute(targetAttr)){
        targetElm.removeAttribute(targetAttr);
        return targetElm.className;
      }
    }).filter(targetElm => targetElm !== undefined);
  }
  
  /* 別のリストのクリック直前までに選択されていた（data-current === true）リストのインデックス番号を取得する */
  const getTargetElmIndexNum = (
    targetEls, 
    prevCurrentElm
  ) => {
    return Array.from(targetEls).map((targetElm, i) => {
      if(targetElm.className === prevCurrentElm){
        // console.log(targetElm, i);
        return i;
      }
    }).filter(targetElm => targetElm !== undefined);
  }
  
  /* リストアニメーションに関する class 名の付与・解除 */
  const resetAlreadyClassName_addTargetClassName = (
    targetEls,
    targetElm,
    targetClassName
  ) => {
    targetEls.forEach(targetEl => {
      if(
        targetEl.classList.contains('prev') ||
        targetEl.classList.contains('next')
      ) {
        targetEl.classList.remove('prev');
        targetEl.classList.remove('next');
      }
    });
    targetElm.classList.add(targetClassName);
  }
  
  const lists = document.querySelectorAll('.menu li');
  lists.forEach((list, i) => {
    if(i === 0) list.setAttribute('data-current', 'true'); // テスト用
    
    /* 実際に使用するような場面では（表示中の）ページURLの変更に準じて data-current を付与する？？ */
    // const PathName = location.pathname;
    // if(PathName === list.className) list.setAttribute('data-current', 'true'); 
    // else list.removeAttribute('data-current');
    
    list.addEventListener('click', (elm)=>{
      /* data-current が付いているリストから属性を取り除いて、そのリスト要素の class名を返す */
      const prevCurrentElm = hasAttrElmRemoveAttr_backToElmClassName(lists, 'data-current');
      
      /* 別のリストのクリック直前までに選択されていた（data-current === true）リストのインデックス番号を取得する */
      const prevCurrentElmIndex = getTargetElmIndexNum(lists, prevCurrentElm[0]);
      
      elm.target.setAttribute('data-current', 'true'); // クリックしたリスト要素に data-current を付与
      // console.log(prevCurrentElm[0], prevCurrentElmIndex[0], i);
      
      /* インデックス番号の前後に応じて付与する class を区別 */
      if(i < prevCurrentElmIndex[0]){
        resetAlreadyClassName_addTargetClassName(lists, elm.target, 'prev');
      } else {
        resetAlreadyClassName_addTargetClassName(lists, elm.target, 'next');
      }
    });  
  });
});