document.addEventListener("DOMContentLoaded", () => {
  
  let count = 5;
  const rootEl = document.querySelector('section');
  
  function countFunc(){ // countを引数に渡さない（渡してしまうと「ずっと指定当初」の数値を渡し続ける）
    if(count >= 0){
      rootEl.querySelector('p').textContent = count;
      if(count === 0){
        rootEl.querySelector('p').innerHTML = `<span style="color:red">count is over.</span>`;
      }
      count--; // カウントダウンは「最後（他の必要実行処理を終えた後）に実行」
    }
  }
  
  let counter = setInterval(()=>{ // let変数にして再宣言（上書き）可能に
    countFunc();
  }, 1000);
  
  rootEl.addEventListener('click', (e)=>{
    e.target.classList.toggle('countFunc');
    if(count >= 0){
      if(e.target.classList.contains('countFunc')){
        clearInterval(counter);
      } else {
        counter = setInterval(()=>{
          countFunc();
        }, 1000);
      }
    }
  });
});