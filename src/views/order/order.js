import * as Api from "/api.js";
const ordererEmail = document.getElementById("emailInput");
const ordererName = document.getElementById("fullNameInput");
const ordererTel = document.getElementById("phoneNumberInput");

// 주문자 정보 입력

let userData;
async function inputOrdererInfo() {
  userData = await Api.get("/api/user");
  ordererEmail.value = userData.email || null;
  ordererName.value = userData.fullName || null;
  ordererTel.value = userData.phoneNumber || null;
}

inputOrdererInfo();

const deliveryName = document.querySelector("#recipientNameInput");
const deliveryTel = document.querySelector("#recipientPhoneNumberInput");
const deliveryAddress = document.querySelector("#recipientAddressInput");
const deliveryMsg = document.querySelector("#delieveryMessageInput");
const payButton = document.querySelector("#payButton");
const sameButton = document.querySelector(".same-shipping-btn");
// const sameAsUserBtn = document.querySelectorAll(".same-shipping-btn");
// sameAsUserBtn[0]은

// 배송 정보 입력
// async function inputDeliveryInfo() {}

// 결제진행
// const orderBtn = document.querySelector(".order-btn");
const buyList =
  JSON.parse(localStorage.getItem("buy-direct")) ||
  JSON.parse(localStorage.getItem("buy-cart"));
console.log("buyList: ", buyList);

async function order(e) {
  e.preventDefault();
  if (!ordererTel.value) {
    return alert("주문자 전화번호를 입력해주세요.");
  }

  if (!deliveryName.value || !deliveryTel.value || !deliveryAddress.value) {
    return alert("배송지 정보를 입력해주세요.");
  }

  // 주문 정보 및 유저 post 요청
  try {
    const data = {
      products: buyList,
      recipientName: deliveryName.value,
      recipientPhoneNumber: deliveryTel.value,
      recipientAddress: deliveryAddress.value,
    };

    const orderResult = await Api.post("/api/order", data);

    // const userUpdateData = {
    //   phoneNumber: ordererTel.value,
    // };

    // await Api.patch("/api/users", userData._id, userUpdateData);

    alert("주문이 완료되었습니다.");

    // buylist 지우기
    if (buyList == JSON.parse(localStorage.getItem("buy-direct"))) {
      localStorage.removeItem("buy-direct");
    } else {
      localStorage.removeItem("buy-cart");
      localStorage.removeItem("cart");
    }

    window.location.href = "/order-finished/";
  } catch (err) {
    console.error(err);
    // alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 배송 정보 입력
function inputUserDeliverInfo() {
  console.log(userData);
  deliveryName.value = userData.fullName;

  if (userData.phoneNumber) {
    deliveryTel.value = userData.phoneNumber;
  }

  if (userData.address) {
    deliveryAddress.value = userData.address;
  }
}

sameButton.addEventListener("click", inputUserDeliverInfo);
payButton.addEventListener("click", order);
