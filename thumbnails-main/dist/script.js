// HTMLで<li>タグを複製して使用する場合【ここから】-----
const ItemsNum = 25; 
const rootEl = document.querySelector('.ThumbnailWrapper');

const words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const wordAry = words.split(' ');

const thumbnailsBox = [];
for( let i = 0; i < ItemsNum; i++ ){
  thumbnailsBox.push(`https://via.placeholder.com/640x360/0bd/fff?text=${wordAry[i]}`);
  rootEl.querySelector('ul').insertAdjacentHTML('beforeend',`<li class="thumbnailItem"><p><img src=${thumbnailsBox[i]}></p><div class="contents"><p><img src=${thumbnailsBox[i]}></p></div></li>`);
}
// -----【ここまで】削除する。または「com(mac)/ctrl(windows) + /」で機能停止状態にする。

const thumbnails = document.querySelectorAll('.thumbnailItem');
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click',()=>{
    if(!(thumbnail.querySelector('.contents').classList.contains('InView'))){
          thumbnail.querySelector('.contents').classList.add('InView');
      } else {
          thumbnail.querySelector('.contents').classList.remove('InView');
      }
  });
});