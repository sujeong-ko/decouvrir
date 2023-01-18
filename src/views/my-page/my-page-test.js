import * as Api from "/api.js";

import { checkLogin } from "/useful-functions.js";
checkLogin();

// 요소(element), input 혹은 상수
// const securityTitle = document.querySelector("#securityTitle");
const fullNameInput = document.querySelector("#fullNameInput");
const passwordInput = document.querySelector("#passwordInput");
const addressInput = document.querySelector("#addressInput");
const painterNameInput = document.querySelector("#painterNameInput");
const introduceInput = document.querySelector("#introduceInput");
const painterInputs = document.querySelector("#painterInputs");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const phoneNumberInput = document.querySelector("#phoneNumberInput");
const saveButton = document.querySelector("#saveButton");
const withdrawButton = document.querySelector("#withdrawButton");
const logoutButton = document.querySelector(".logoutButton");

const modal = document.querySelector("#modal");
const saveCompleteButton = document.querySelector("#saveCompleteButton");
const currentPasswordInput = document.querySelector("#currentPasswordInput");
saveButton.addEventListener("click", openModal);
saveCompleteButton.addEventListener("click", updateUserData);
withdrawButton.addEventListener("click", userWithdraw);
logoutButton.addEventListener("click", userLogout);

let userData;
async function insertUserData() {
  console.log("here!");
  userData = await Api.get("/api/user");
  console.log(userData);

  // const userData = userData;

  // const securityTitle = document.querySelector("#securityTitle");
  if (userData.role === "painter-user") {
    painterInputs.style.display = "block";
  } else if (userData.role === "basic-user") {
    painterInputs.style.display = "none";
  }

  // 서버에서 온 비밀번호는 해쉬 문자열인데, 이를 빈 문자열로 바꿈
  // 나중에 사용자가 비밀번호 변경을 위해 입력했는지 확인하기 위함임.
  userData.password = "";

  // securityTitle.innerText = `회원정보 관리 (${userData.email})`;

  fullNameInput.value = userData.fullName;
  passwordInput.value = userData.password;
  addressInput.value = userData.address;
  phoneNumberInput.value = userData.phoneNumber;
  painterNameInput.value = userData.painterName;
  introduceInput.value = userData.introduce;

  // 크롬 자동완성 삭제함.
  passwordInput.value = "";
}

insertUserData();

//// 유저 정보 수정하기 ////
async function updateUserData() {
  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  // const postalCode = postalCodeInput.value;
  const address = addressInput.value;
  // const address2 = address2Input.value;
  const phoneNumber = phoneNumberInput.value;
  const currentPassword = currentPasswordInput.value;
  const painterName = painterNameInput.value;
  const introduce = introduceInput.value;

  const isPasswordLong = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  //const isPostalCodeChanged =
  //   postalCode !== (userData.address?.postalCode || "");
  // const isAddress2Changed = address2 !== (userData.address?.address2 || "");
  // const isAddressChanged = isPostalCodeChanged || isAddress2Changed;

  // 비밀번호를 새로 작성한 경우
  // if (password && !isPasswordLong) {
  //   closeModal();
  //   return alert("비밀번호는 4글자 이상이어야 합니다.");
  // }
  if (password && !isPasswordSame) {
    // closeModal();
    return alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
  }

  const data = { currentPassword };

  // 초기값과 다를 경우 api 요청에 사용할 data 객체에 넣어줌
  console.log(userData.email);

  console.log(userData.fullName);

  if (fullName !== userData.fullName) {
    data.fullName = fullName;
  }
  console.log(fullName);
  console.log(data.fullName);

  if (password !== userData.password) {
    data.password = password;
  }

  if (address !== userData.address) {
    data.address = address;
  }

  if (painterName !== userData.painterName) {
    data.painterName = painterName;
  }

  if (introduce !== userData.Introduce) {
    data.introduce = introduce;
  }

  if (phoneNumber !== userData.phoneNumber) {
    data.phoneNumber = phoneNumber;
  }

  // 만약 업데이트할 것이 없다면 (디폴트인 currentPassword만 있어서 1개라면), 종료함
  const toUpdate = Object.keys(data);
  if (toUpdate.length === 1) {
    // disableForm();
    // closeModal();
    return alert("업데이트된 정보가 없습니다");
  }

  //try {
  const { userNumber } = userData;
  // db에 수정된 정보 저장
  console.log(userNumber);
  await Api.patch("/api/users", userNumber, data);

  alert("회원정보가 안전하게 저장되었습니다.");
  /// disableForm();
  console.log(data);
  //}
  //  catch (err) {
  //   alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${err}`);
  // }
}

function userWithdraw() {
  // const { password } = userData;
  const { userNumber } = userData;
  // console.log(userNumber);
  try {
    Api.del("/api/user", userNumber);
    sessionStorage.removeItem("token");

    // 삭제 성공
    alert("회원 정보가 안전하게 삭제되었습니다.");

    window.location.href = "/";
  } catch (err) {
    alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}

function userLogout() {
  const token = sessionStorage.getItem("token");
  if (token) {
    console.log("click!");
    sessionStorage.removeItem("token");
    alert("로그아웃 성공!");
    window.location.href("/");
  } else {
    alert("로그인 먼저 해주세요!");
    window.location.href("/login");
  }
}

// Modal 창 열기
function openModal(e) {
  e.preventDefault();

  modal.classList.add("is-active");
  currentPasswordInput.focus();
}

// Modal 창 닫기
function closeModal(e) {
  if (e) {
    e.preventDefault();
  }

  modal.classList.remove("is-active");
}
