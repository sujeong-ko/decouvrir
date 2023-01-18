// import { logout } from "/useful-functions";

const logoutButton = document.querySelector("#logout");
console.log("i am js");
console.log(logoutButton);

logoutButton.onclick = function logout() {
  const token = sessionStorage.getItem("token");
  if (token) {
    console.log("click!");
    sessionStorage.removeItem("token");
    alert("로그아웃 성공!");
    window.location.replace("/");
  } else {
    alert("로그인 먼저 해주세요!");
    window.location.replace("/login");
  }
};
