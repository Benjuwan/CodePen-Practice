const inputEl = document.querySelector('input[type="text"]');
const outputEl = document.querySelector('output');

const escapeSanitize = (elStr) => {
  const newReg = new RegExp(`${""}[&|"|<|>]${""}`, "g");
  if(elStr.match(newReg)){
    /* "(ダブルクォート)は他と同じように "" で囲えないので正規表現で記述 */
    return elStr.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll(/"/g, "&quot;").replaceAll("'", "&apos;");
  } else {
    return elStr;
  }
}

/* エスケープ文字を表示する場合はコメントアウトを外す */
// outputEl.insertAdjacentHTML('afterbegin', '<span style="color: hotpink;"></span>');

inputEl.addEventListener('input', ()=>{
  if(inputEl.value.length <= 0){
    /* エスケープ文字を表示する場合はコメントアウトを外す */
    // outputEl.querySelector('span').innerHTML = '';
    
    /* innerHTML を使用する場合（innerText　|| textContent を使用しない場合） */
    outputEl.innerHTML = '';
  } else {
    const escapeSanitizeElStr = escapeSanitize(inputEl.value);
    console.log(`escapeSanitizeElStr：${escapeSanitizeElStr}`);
    
    /* エスケープ文字を表示する場合はコメントアウトを外す */
    /* innerText または textContent を使って代入するとエスケープすべき記号は自動的にエスケープされる = inputEl.value を「そのまま」記述しても無害. */
    // outputEl.querySelector('span').innerText = escapeSanitizeElStr;
    // outputEl.querySelector('span').textContent = escapeSanitizeElStr;
    
    /* innerHTML を使用する場合（innerText　|| textContent を使用しない場合） */
    /* inputEl.value を「そのまま」で指定するとアラートが表示される */
    // outputEl.innerHTML = `<span style="color: red;">${inputEl.value}</span>`;
    outputEl.innerHTML = `<span style="color: red;">${escapeSanitizeElStr}</span>`;
  }
});

/*
HTML5 では innerHTML で挿入された <script> タグは実行するべきではないと定義している。が、下記はNG。
  <img src='x' onerror='alert(1)'>
次のように <script> を使わずに JavaScript を実行する方法もあるので、制御することができない文字列を設定するために innerHTML を使用するたびに、セキュリティリスクは残ります。
*/