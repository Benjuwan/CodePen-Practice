document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('section h2');
    elements.forEach(element => { // 各セクションごとの<h2>
        const eleSpan = element.querySelector('span');

        function myObserver(entries) { // IntersectionObserver 
            entries.forEach(entry => {
                if (entry.isIntersecting) { // 公差範囲内での処理 
                    if (element.textContent == 'menu') { // 各セクションごとの<h2>の中身を判定して処理
                        eleSpan.classList.add('zIndex');
                    } else if (element.textContent == 'about') {
                        eleSpan.classList.add('zIndex');
                    } else if (element.textContent == 'location') {
                        eleSpan.classList.add('zIndex');
                    }
                } else { // 交差範囲対象外ではクラスリムーブ 
                    eleSpan.classList.remove('zIndex');
                }
            });
        }

        const myOption = {
            root: null,
            rootMargin: '0px'
        }

        const myObservers = new IntersectionObserver(myObserver, myOption);
        myObservers.observe(element);
    });
});