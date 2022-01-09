document.addEventListener('DOMContentLoaded',()=>{
  const chiken = document.querySelector(".chiken");
  const topWalls = document.querySelectorAll(".top-wall");
  const downWalls = document.querySelectorAll(".down-wall");


  let chikenLeft = 100;
  let chikenBottom = 250;

  let gravity = 0.3;
  let jumpPower = 3;
  
  function gameStart(){
    chikenBottom += jumpPower;
    jumpPower -= gravity;
    chiken.style.left = `${chikenLeft}px`;
    chiken.style.bottom = `${chikenBottom}px`;
    
    topWalls.forEach((topwall)=>{
      if(chiken.offsetLeft<=(topwall.offsetLeft+topwall.offsetWidth) &&
      (chiken.offsetLeft+chiken.offsetWidth)>=(topwall.offsetLeft+topwall.offsetWidth) &&
      chiken.offsetTop<=(topwall.offsetTop+topwall.offsetHeight) &&
      (chiken.offsetTop+chiken.offsetHeight)>=topwall.offsetTop){
        console.log("게임 오버");
      }
    });

    downWalls.forEach((downwall)=>{
      if(chiken.offsetLeft<=(downwall.offsetLeft+downwall.offsetWidth) &&
      (chiken.offsetLeft+chiken.offsetWidth)>=(downwall.offsetLeft+downwall.offsetWidth) &&
      chiken.offsetTop<=(downwall.offsetTop+downwall.offsetHeight) &&
      (chiken.offsetTop+chiken.offsetHeight)>=downwall.offsetTop){
        console.log("게임 오버");
      }
    });

    
    
  }
  let timer = setInterval(gameStart,15);
  




  function jump(){
    jumpPower = 7;
  }

  document.addEventListener('click',()=>{
    jump();
  });

})