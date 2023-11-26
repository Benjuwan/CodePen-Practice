document.addEventListener("DOMContentLoaded",function(){

    function GoAnimationBlock(els,isIntersecting){
        if(isIntersecting){
            new AnimationBlock(els);
        }
    }

    new Inview('.swiper-slide div',GoAnimationBlock); // 第二引数は、コールバック関数(this.cb)としてメソッドを渡すので()不要。というか付けるとエラーになる。

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
        return this.block.reduce(function(accu,curr){
            return `${accu}<p><span class="animation_block">${curr}</span></p>`;
        },"");
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
            entries.forEach(node => {
                if(node.isIntersecting){
                    this.cb(node.target, true);
                    if(this.once){
                        observer.unobserve(node.target);
                    }
                } else {
                    this.cb(node.target, false);
                }
            });
        }
        this.io = new IntersectionObserver(callback.bind(this),this.options);
        this.els.forEach(node => this.io.observe(node));
    }
}


// オブジェクトのおさらい
const obj = {
    namae: 'benjuwan',
    namae02: 'jijao',
    hobby:{
        sport: ['football','baseball','basketball'],
        music: 'rock',
        movie: 'action'
    },
    MyFunction: function () {
        console.log('hello obj');
        console.log(this.namae02);
        console.log(this); // objの内容が出力される 

        setTimeout(function(){
            console.log(this); // setTimeoutなので、bindで縛らない場合はwindow
        }.bind({namae:'change'})); //.bind(this または obj)でオブジェクトそのものだけでなく、中身までを変更することも可能（その場合{}を忘れないように）
    }
}
obj.MyFunction(); //オブジェクトのメソッドを実行

console.log(obj.hobby.movie);
console.log(obj.hobby.sport[2]);



const MyArray = ['one ','two ','three ','four ','five '];
    console.log(MyArray[0] + MyArray[3]);

    const MyObject = {
        sports: {
            baseball: ['first ','second ','center']
        }
    }
    console.log(MyObject.sports.baseball[1] + MyObject.sports.baseball[2]);

    
    class MyObj {
        constructor(){
            this.namae = 'benjuwan'; //プロパティ(key):値(value)の関係
            this.namae02 = 'jijao';  //プロパティ(key):値(value)の関係
        }
        MyFunction02() { //__proto__：classで設定した関数はブラウザによって自動で生成される「アンダースコアアンダースコアprotoアンダースコアアンダースコア」に格納されている（ログ画面で確認できる、使用時は記述を省略するのが一般的）
            console.log('classに基づいてオブジェクト（new）を生成');
            console.log(this.namae02);
        }
        
    }
    const my02 = new MyObj();
    my02.MyFunction02();