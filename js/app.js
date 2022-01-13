document.addEventListener('DOMContentLoaded',()=>{

  const chiken = document.querySelector(".chiken");
  const topWalls = document.querySelectorAll(".top-wall");
  const downWalls = document.querySelectorAll(".down-wall");
  const scoreBoard = document.querySelector(".score");

  let chikenLeft = 100;
  let chikenBottom = 250;

  let gravity = 0.3;
  let jumpPower = 3;
  
  let Score=0;
  let game = true;
  scoreBoard.innerText = `Score : ${Score}`

  
  let bestScore=0;

  function gameStart(){
    chikenBottom += jumpPower;
    jumpPower -= gravity;
    chiken.style.left = `${chikenLeft}px`;
    chiken.style.bottom = `${chikenBottom}px`;
    
    topWalls.forEach((topwall)=>{
      if(chiken.offsetLeft<=(topwall.offsetLeft+topwall.offsetWidth) &&
      (chiken.offsetLeft+chiken.offsetWidth)>=topwall.offsetLeft &&
      chiken.offsetTop<=(topwall.offsetTop+topwall.offsetHeight) &&
      (chiken.offsetTop+chiken.offsetHeight)>=topwall.offsetTop){
        gameOver();
      }
    });

    downWalls.forEach((downwall)=>{
      if(chiken.offsetLeft<=(downwall.offsetLeft+downwall.offsetWidth) &&
      (chiken.offsetLeft+chiken.offsetWidth)>=downwall.offsetLeft &&
      chiken.offsetTop<=(downwall.offsetTop+downwall.offsetHeight) &&
      (chiken.offsetTop+chiken.offsetHeight)>=downwall.offsetTop){
        gameOver();
      }
    });

    topWalls.forEach((topWall)=>{
      if((chiken.offsetLeft+chiken.offsetWidth)>(topWall.offsetLeft+topWall.offsetWidth)){
        if(topWall.classList.value === "top-wall check"){
          Score++;
          scoreBoard.innerText = `Score : ${Score}`
          topWall.classList.remove("check");
        }
      }
    });


  }
  let timer = setInterval(gameStart,15);
  
  topWalls.forEach((topWall,idx)=>{
    topWall.addEventListener("animationiteration",()=>{
      randomPos = Math.floor(Math.random()*160-40)+40;
      
      topWall.style.top=`-${randomPos}px`;
      downWalls[idx].style.top = `${(-randomPos)+530}px`;
      if(topWall.classList.value === "top-wall"){
        topWall.classList.add("check");
      }
    })
  })

  function jump(){
    jumpPower = 6.5;
  }

  document.addEventListener('click',()=>{
    if(game){
      jump();
    }
  });

  function gameOver(){
    
    game=false;

    topWalls.forEach((topwall)=>{
      topwall.style.animationPlayState = 'paused';
    })
    downWalls.forEach((downwall)=>{
      downwall.style.animationPlayState = 'paused';
    })
    document.querySelector(".dimd").classList.add("on");
    
  }

})