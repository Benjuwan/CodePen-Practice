document.addEventListener("DOMContentLoaded", ()=>{
    // ハンバーガーメニュー
    const Btn = document.querySelector('header button');
    const tContent = document.querySelector('.toggleContent');
    Btn.addEventListener('click', ()=>{
        Btn.classList.toggle('btnOn');
        tContent.classList.toggle('toggleContentOnview');
    });
});