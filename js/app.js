document.addEventListener('DOMContentLoaded',()=>{
  const chiken = document.querySelector(".chiken");

  let chikenLeft = 220;
  let chikenBottom = 100;
  let gravity = 2;
  let jumpPower = 500;

  function gameStart(){
    chikenBottom += gravity;
    chiken.style.transform = `translate(${chikenLeft}px,${chikenBottom}px)`;
    console.log(chiken.style.transform);
  }
  let timer = setInterval(gameStart);

  function jump(){
    // chikenBottom -= gravity*250;
    let nowPos = chikenBottom;
    chikenBottom -= jumpPower;
    console.log(nowPos-=jumpPower);
    // chiken.style.transform = `translate(${chikenLeft}px,${chikenBottom}px)`;
  }

  document.addEventListener('click',()=>{
    jump();
  });

})