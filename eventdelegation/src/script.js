let listsNum = 0;

const container = document.querySelector('#container');
  console.log(container.firstElementChild, container.children[0]);
  console.log(container.lastElementChild, container.children[container.children.length-1]);
  console.log(container.children[1]);

listsNum = Number(container.querySelector('li:last-of-type').textContent.split('00')[1].split('削除')[0]);

container.addEventListener('click', (elm)=>{
  // console.log(elm.currentTarget) // 親要素（#container）
  // console.log(elm.target) // 各子要素（#container 内の li要素）
  if(elm.target.tagName === 'BUTTON'){
    // console.log(elm.target.tagName);
    deleteList(elm.target, 'li');
  } else {
    console.log(elm.target.tagName);
  }
});

const createNewList = (createBaseElm) => {
  listsNum += 1;
  createBaseElm.insertAdjacentHTML('beforeend',`<li class="list-group-item">ボタン00${listsNum}<button type="button" class="btn btn-delete">削除</button></li>`);
}

const addListBtn = document.querySelector('#addListBtn');
addListBtn.style.setProperty('margin-bottom', '3em');
addListBtn.addEventListener('click', ()=>{
  createNewList(container);
});


/* ------ 共通 ------ */
const deleteList = (eventTarget, DOMstr) => {
  const targetElm = eventTarget.closest(DOMstr);
  targetElm.remove();
}
/* ------ 共通 ------ */


const wrapper = document.querySelector('section:nth-of-type(2)');
const runBtn = document.querySelector('#run');

runBtn.addEventListener('click', ()=>{
  createEntry();
});

const createEntry = () => {
  const nameInput = document.querySelector('#name');
  const mailInput = document.querySelector('#mail');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.classList = ['btns deleteBtn'];
  deleteBtn.textContent = '削除';
  /* 関数内にイベントハンドラーを仕込む */
  deleteBtn.addEventListener('click',(e)=>{
    deleteList(e.target, 'div');
  });
  
  const wrapperDivStyle = ['display:flex','gap:1em','background-color:#dadada','margin-bottom:1em'];
  
  wrapper.insertAdjacentHTML('beforeend',`<div style="${wrapperDivStyle.join(';')}"><p>name：${nameInput.value}</p><p>mail：${mailInput.value}</p></div>`);
  
  const insertedDiv = wrapper.lastElementChild; // wrapper の最後の子要素を取得
  insertedDiv.appendChild(deleteBtn); // 上で取得した要素（wrapper の最後の子要素）に対して処理（deleteBtn を最後に追加）
}