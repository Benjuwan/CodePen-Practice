document.addEventListener("DOMContentLoaded",()=>{
  const rootEl = document.querySelector('.globalChildren');
  const getItemsNumber = 32;
  
  const txtElement = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const txtSplit = txtElement.split(' ');
  
  for(let i = 0; i < getItemsNumber; i++){
    rootEl.insertAdjacentHTML('beforeend',`<div class="viewContent"><p><img src="https://via.placeholder.com/640x360/333/fff?text=${txtSplit[i]}"></p></div>`);
  }
  
  // IntersectionObserver
  function ActObserver(entries){
    entries.forEach(entry => {
      if(entry.isIntersecting){
        console.log('isIntersecting');
        entry.target.classList.add('onView');
      } else {
        console.log('not isIntersecting');
        entry.target.classList.remove('onView');
      }
    });
  }
  
  const defaultOptions = {
    root: null,
    rootMargin: '-300px 0px'
  }
  
  const observer = new IntersectionObserver(ActObserver, defaultOptions);
  const viewContents = document.querySelectorAll('.viewContent');
  viewContents.forEach(viewContent => {
    observer.observe(viewContent);
  });
  // IntersectionObserver
});