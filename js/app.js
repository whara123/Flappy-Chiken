// document.onmousedown = disableClick;
// document.onkeydown = disableKey;

// function disableClick(event) {
//   if (event.button == 2) {
//     alert("우클릭이 금지되어 있습니다.");
//     return false;
//   }
// }

// function disableKey(event) {
//   if (event.keyCode == 123 || event.keyCode == 74) {
//     event.preventDefault();
//     event.returnValue = false;
//   }
// }

Kakao.init("8f5378ea6c807a98e7ddaa9ed0960f87");

document.addEventListener("DOMContentLoaded", () => {
  const chiken = document.querySelector(".chiken");

  const topWalls = document.querySelectorAll(".top-wall");
  const downWalls = document.querySelectorAll(".down-wall");
  const scoreBoard = document.querySelector(".score");
  const start = document.querySelector(".start");
  const restartBtn = document.querySelector(".btn-restart");

  const sharedBtn = document.querySelectorAll(".btn-share");
  const sendUrl = "https://whara123.github.io/Flappy-Chiken/";

  sharedBtn.forEach((snsBtn) => {
    snsBtn.addEventListener("click", () => {
      if (snsBtn.classList == "btn-share facebook") {
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
      }
      if (snsBtn.classList == "btn-share twitter") {
        window.open(
          "https://twitter.com/intent/tweet?text=" +
            "도전! 몇 점까지 가능?" +
            "&url=" +
            sendUrl
        );
      }
      if (snsBtn.classList == "btn-share kakao") {
        Kakao.Link.createDefaultButton({
          container: "#btnKakao",
          objectType: "feed",
          content: {
            title: "플러피치켄",
            description: `난 ${bestScore}점인데 너는 몇 점까지 가능해?`,
            imageUrl: sendUrl,
            link: {
              mobileWebUrl: sendUrl,
              webUrl: sendUrl,
            },
          },
          buttons: [
            {
              title: "게임하러 가기",
              link: {
                mobileWebUrl: sendUrl,
                webUrl: sendUrl,
              },
            },
          ],
        });
      }
    });
  });

  let chikenLeft = 100;
  let chikenBottom = 250;
  let gravity = 0.3;
  let jumpPower = 3;
  let Score = 0;
  let game = false;
  let bestScore = 0;

  function gameInit() {
    chikenLeft = 100;
    chikenBottom = 250;
    gravity = 0.3;
    jumpPower = 3;
    Score = 0;
    game = false;

    scoreBoard.innerText = `Score : ${Score}`;

    chiken.style.left = `${chikenLeft}px`;
    chiken.style.bottom = `${chikenBottom}px`;

    topWalls.forEach((topwall) => {
      topwall.classList.add("check");
      topwall.classList.remove("anim");
      topwall.style.animationPlayState = "paused";
    });
    downWalls.forEach((downwall) => {
      downwall.classList.remove("anim");
      downwall.style.animationPlayState = "paused";
    });
  }
  gameInit();

  function gameStart() {
    if (game) {
      chikenBottom += jumpPower;
      jumpPower -= gravity;
      chiken.style.left = `${chikenLeft}px`;
      chiken.style.bottom = `${chikenBottom}px`;

      topWalls.forEach((topwall) => {
        if (
          chiken.offsetLeft + 25 <= topwall.offsetLeft + topwall.offsetWidth &&
          chiken.offsetLeft + chiken.offsetWidth >= topwall.offsetLeft &&
          chiken.offsetTop + 10 <= topwall.offsetTop + topwall.offsetHeight &&
          chiken.offsetTop + chiken.offsetHeight >= topwall.offsetTop
        ) {
          gameOver();
        }
      });

      downWalls.forEach((downwall) => {
        if (
          chiken.offsetLeft + 25 <=
            downwall.offsetLeft + downwall.offsetWidth &&
          chiken.offsetLeft + chiken.offsetWidth >= downwall.offsetLeft &&
          chiken.offsetTop + 10 <= downwall.offsetTop + downwall.offsetHeight &&
          chiken.offsetTop + chiken.offsetHeight >= downwall.offsetTop
        ) {
          gameOver();
        }
      });

      topWalls.forEach((topWall) => {
        if (
          chiken.offsetLeft + chiken.offsetWidth >
          topWall.offsetLeft + topWall.offsetWidth
        ) {
          if (topWall.classList.contains("check")) {
            Score++;
            scoreBoard.innerText = `Score : ${Score}`;
            topWall.classList.remove("check");
          }
        }
      });
    }

    if (chiken.offsetTop + chiken.offsetHeight > 600 || chiken.offsetTop < 0) {
      gameOver();
    }
  }
  let timer = setInterval(gameStart, 15);

  topWalls.forEach((topWall, idx) => {
    topWall.addEventListener("animationiteration", () => {
      randomPos = Math.floor(Math.random() * 160 - 40) + 40;

      topWall.style.top = `-${randomPos}px`;
      downWalls[idx].style.top = `${-randomPos + 530}px`;
      if (topWall.classList.value === "top-wall anim") {
        topWall.classList.add("check");
      }
    });
  });

  function jump() {
    jumpPower = 6.5;
  }

  document.addEventListener("click", () => {
    if (game) {
      jump();
    }
  });

  function gameOver() {
    game = false;
    if (bestScore < Score) {
      bestScore = Score;
    }
    topWalls.forEach((topwall) => {
      topwall.style.animationPlayState = "paused";
    });
    downWalls.forEach((downwall) => {
      downwall.style.animationPlayState = "paused";
    });
    document.querySelector(".dimd").classList.add("on");
    document.querySelector(".text-score").innerText = `SCORE : ${Score}`;
    document.querySelector(".best-score").innerText = `BEST : ${bestScore}`;
  }

  start.addEventListener("click", () => {
    start.classList.add("on");
    chiken.classList.add("border-size");
    topWalls.forEach((topwall) => {
      topwall.classList.add("anim");
      topwall.style.animationPlayState = "running";
    });
    downWalls.forEach((downwall) => {
      downwall.classList.add("anim");
      downwall.style.animationPlayState = "running";
    });
    game = true;
  });

  restartBtn.addEventListener("click", () => {
    gameInit();
    start.classList.remove("on");
    chiken.classList.remove("border-size");
    document.querySelector(".dimd").classList.remove("on");
  });
});
