// --- 対象文章内に「検索対象文字が何文字ある」か_ver01
const countTargetStr = (targetWord, searchTargetStr) => {
  const searchTargetStr_targetWord = targetWord.replaceAll(searchTargetStr, '');

  const findTargetStrCounts = (targetWord.length - searchTargetStr_targetWord.length) / searchTargetStr.length;

  return findTargetStrCounts;
}
const countTargetStr_result = countTargetStr('internationalization', 'tion');
console.log(countTargetStr_result);

// --- 対象文章内に「検索対象文字が何文字ある」か_ver02
const splitCheck_countTargetStr = (targetWord, searchTargetStr) => {
  const targetWordAry = targetWord.split(searchTargetStr);
  return targetWordAry.length - 1;
}
const splitCheck_countTargetStr_result = splitCheck_countTargetStr('internationalization', 'i');
console.log(splitCheck_countTargetStr_result);

// --- 対象文章内の「何文字目に検索対象文字がある」か
const getStrCounts = [];
const findTargetStrIndex_fromTargetWords = (targetWord, searchTargetStr) => {
  // exceptTargetStr：検索対象文字が1文字の場合
  if (searchTargetStr.length === 1) {
    let count = 0;

    const targetWordAry = targetWord.split('');
    targetWordAry.forEach((targetWord, i) => {
      if (targetWord === searchTargetStr) {
        count = i + 1;
        getStrCounts.push(count);
      }
    });

    return;
  }

  // exceptTargetStr：検索対象文字が1文字以上の場合
  /* 自作コード */
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

  /* claude 提案の可読性・保守性の高い改善コード */
  // let position = 0;
  // let lastIndex = 0;

  // while (true) {
  //   // 検索文字列の位置を探す
  //   const foundIndex = targetWord.indexOf(searchTargetStr, lastIndex);

  //   // 見つからなければ終了
  //   if (foundIndex === -1) {
  //     break;
  //   }

  //   // 見つかった位置を記録
  //   position = foundIndex + 1;
  //   getStrCounts.push(position);

  //   // 次の検索開始位置を設定
  //   lastIndex = position;
  // }
}
findTargetStrIndex_fromTargetWords('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 're');
console.log(getStrCounts);

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const adjustLorem = lorem.replaceAll('re', ' |墾田永年私財法| ');
console.log(adjustLorem);