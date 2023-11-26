const theYear = new Date().getFullYear();
let ReiwaNum = theYear - 2018;
const categoriesPerYear = [];

for (let i = 1; i <= ReiwaNum; i++) {
  if (i === 1) {
    console.log(`令和${i}年(元年)は、${theYear - (ReiwaNum - i)}年です。`);
  } else {
    console.log(`令和${i}年は、${theYear - (ReiwaNum - i)}年です。`);
  }

  categoriesPerYear.push(`${theYear - (ReiwaNum - i)}`);
}

const locationPathName = location.pathname.split('/');
const locationpathNameTarget = locationPathName[locationPathName.length - 1];

categoriesPerYear.forEach(perYear => {
  if (locationpathNameTarget.match(perYear)) {
    document.querySelector('h1').insertAdjacentHTML('afterend', `ここは${perYear}年(令和${perYear - 2018}年)のページです。`);
  }
});