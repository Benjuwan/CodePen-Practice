document.addEventListener('DOMContentLoaded', ()=>{
	
	// アナウンステキスト
	const nextModifyInfo = 'this is limitTimer sys.<br>you can choose function that <br> addClass specific element or <br> view specific sentence like this.';
  // 処理させたい内容（関数）
  function targetFunction_Ver001(){
    const targetEl = document.body;
    if(nextModifyInfo === ''){ // アナウンステキストに記入なしの場合
      targetEl.classList.toggle('NoTxt_toggleClass');
    } else {
      targetEl.classList.toggle('NoTxt_toggleClass');
      targetEl.insertAdjacentHTML('beforeend', `<div class="closed"><p>${nextModifyInfo}</p></div>`);
    }
  }
	
  // （左から）年,月,日,時,分,アナウンステキスト,関数を指定
  new kirishimaClass_PresentCloseSys(2022, 11, 25, 10, 00, targetFunction_Ver001);
  
});



/* ---------------------- 以下はclass（具体的な機能指示）の指定 ---------------------- */

class kirishimaClass_PresentCloseSys {
  constructor(targetYear, targetMonth, targetDate, targetHours, targetMinutes, targetFunction){
		this.targetYear = targetYear;
		this.targetMonth = targetMonth;
    this.targetDate = targetDate;
    this.targetHours = targetHours;
    this.targetMinutes = targetMinutes;
    this.targetFunction = targetFunction;

    const timer = setInterval(()=>{
      let now = new Date();
			let getYear = now.getFullYear();
      let getMonth = now.getMonth()+1;
      let getDays = now.getDate();
      let getHours = now.getHours();
      let getMinutes = now.getMinutes();

      /**
       * デフォルトでは「00が省略（=表示されない）されてしまう」ので（年以外の）桁数を揃える指定を行う
       * String(対象の要素).padStart(2,'0') // 対象の要素を文字列に変換して「必ず2桁数になるよう0で揃える・埋める(=00)」
       */
      let NowDateStr = `${getYear}${String(getMonth).padStart(2,'0')}${String(getDays).padStart(2,'0')}${String(getHours).padStart(2,'0')}${String(getMinutes).padStart(2,'0')}`;
      let targetTimeStr = `${this.targetYear}${String(this.targetMonth).padStart(2,'0')}${String(this.targetDate).padStart(2,'0')}${String(this.targetHours).padStart(2,'0')}${String(this.targetMinutes).padStart(2,'0')}`;

        //（数値の大小で条件分岐させるために）型をstrからintに変換
        let NowDate = Number(NowDateStr);
        this.targetTime = Number(targetTimeStr);
			
        if(NowDate >= this.targetTime){
          clearInterval(timer);
          // 指定時間の到達後に処理させたい内容（関数）の指定
          this.targetFunction();
        }
      
        console.log(this.targetTime);
        console.log(NowDate);
    }, 1000);
  }
}