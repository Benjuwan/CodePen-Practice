# searchTargetStrFromTargetWords

A Pen created on CodePen.io. Original URL: [https://codepen.io/benjuwan/pen/zYyVZKo](https://codepen.io/benjuwan/pen/zYyVZKo).

## 文章内の「何文字目に検索対象文字がある」か、という処理に関する補足説明
当該処理において「検索対象文字が1文字以上の場合」で、自作コードと`claude`が提案した可読性・保守性の高い改善コードの2種類の書き方を用意

- 自作コード
```js
const shallowCopy = [...targetWord];
  let reduceCount = 0;
  const targetWordAry = targetWord.split(searchTargetStr);
  targetWordAry.forEach((targetWord, i) => {
    if (targetWord.length === 0) {
      return;
    }

  if (targetWordAry[i - 1] !== undefined && i > 0) {
    // console.log(reduceCount, targetWordAry[i-1], targetWordAry[i-1].length, targetWord, targetWord.length);
    reduceCount = reduceCount + targetWord.length + searchTargetStr.length;
    if (reduceCount < shallowCopy.length) {
      getStrCounts.push(reduceCount);
    }
  } else {
    reduceCount = targetWord.length + 1;
    getStrCounts.push(reduceCount);
  }
});
```

- `claude`が提案した可読性・保守性の高い改善コード
```js
let position = 0;
let lastIndex = 0;

while (true) {
  // 検索文字列の位置を探す
  const foundIndex = targetWord.indexOf(searchTargetStr, lastIndex);

  // 見つからなければ終了
  if (foundIndex === -1) {
    break;
  }

  // 見つかった位置を記録
  position = foundIndex + 1;
  getStrCounts.push(position);

  // 次の検索開始位置を設定
  lastIndex = position;
}
```
