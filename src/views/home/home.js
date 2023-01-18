//글자 타이핑 효과 //
const content = "Découvrir 발견을 꿈꾸다.";
const text = document.querySelector(".text");
let i = 0;

function typing() {
  if (i < content.length) {
    let txt = content.charAt(i);
    text.innerHTML += txt;
    i++;
  }
}
setInterval(typing, 200);
