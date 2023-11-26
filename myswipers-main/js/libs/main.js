document.addEventListener("DOMContentLoaded",() => {
    function GoAnimationBlock(els,isIntersecting){
        if(isIntersecting){
            new AnimationBlock(els);
        }
    }
    new Inview('.SwiperWrapper .swiper-slide div', GoAnimationBlock); // 第二引数は、コールバック関数(this.cb)としてメソッドを渡すので()不要。というか付けるとエラーになる。
});


class AnimationBlock {
    constructor(el){
        if(el instanceof HTMLElement){ // HTML要素がどうか判定：これがないと、_SplitBlockが、_SplitBlockで生成されるHTML要素にも適用され続けるため無限状態になってしまう（＝エラーを吐く）
            this.el = el;
        } else {
            this.el = document.querySelector(el);
        }
        this.block = this.el.innerHTML.trim().split(' ');
        this.el.innerHTML = this._SplitBlock();
    }
    _SplitBlock(){
        return this.block.reduce((accu,curr) => {
            return `${accu}<p><span class="animation_block">${curr}</span></p>`;
        }, "");
    }
}


class Inview {
    constructor(els,cb,options){
        this.els = document.querySelectorAll(els);
        this.cb = cb;
        const DefaultOptions = {
            root: null,
            rootMargin: '0px',
            once: true
        }
        this.options = Object.assign(DefaultOptions,options);
        this.once = this.options.once;
        this._AddInview();
    }
    _AddInview(){
        function callback(entries,observer){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    this.cb(entry.target, true);
                    if(this.once){
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        }
        this.Observer = new IntersectionObserver(callback.bind(this),this.options);
        this.els.forEach(entry => this.Observer.observe(entry));
    }
}