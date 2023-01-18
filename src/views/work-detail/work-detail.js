import * as Api from "../../api.js";

const urlParams = new URL(location.href).searchParams;
const productId = urlParams.get("id");

// 작품 data 가져오기
async function getProductDetail() {
  const products = await Api.get("/api/products");
  console.log(productId);
  products.forEach((productData) => {
    if (productData._id === productId) {
      console.log(productData);
      document.querySelector("#product-id").name = productData._id;
      document.querySelector("#work-img").src = productData.image;
      document.querySelector("#work-type").innerHTML = productData.category;
      document.querySelector(
        "#work-name"
      ).innerHTML = `${productData.productName} | ${productData.painterName}`;
      document.querySelector(
        ".work-price"
      ).innerHTML = `${productData.price}원`;
      document.querySelector(".work-explain").innerHTML = productData.content;
      document.querySelector(
        "#painter-link"
      ).href = `/painter/?name=${productData.painterName}`;
    }
  });
}
getProductDetail();

// 장바구니 추가하기
const addCartBtn = document.querySelector(".addCart");

function addCart() {
  let cartList = JSON.parse(localStorage.getItem("cart"));
  if (cartList === null) {
    cartList = [];
  }
  let price = Number(
    document.querySelector(".work-price").textContent.replace("원", "")
  );
  let [productName, painterName] = document
    .querySelector("#work-name")
    .textContent.split(" | ");

  const wantToCart = {
    productName: productName,
    painterName: painterName,
    price: price,
    image: document.querySelector("#work-img").src,
    productId: document.querySelector("#product-id").name,
  };

  // 예외처리) 기존 장바구니 리스트에 현재 작품이 있는 경우
  let check = true;
  for (let elem of cartList) {
    if (elem["productId"] === document.querySelector("#product-id").name) {
      check = false;
      alert("동일한 상품이 이미 장바구니에 담겨있습니다.");
      break; // return;해도 되나...?
    }
  }

  if (check) {
    cartList.push(wantToCart);
  }

  localStorage.setItem("cart", JSON.stringify(cartList));
  alert("장바구니 넣기 성공!");
}

addCartBtn.addEventListener("click", addCart);

// 구매하기 +
const buyBtn = document.querySelector(".BuyNow");

function buyNow() {
  let price = Number(
    document.querySelector(".work-price").textContent.replace("원", "")
  );
  let [productName, painterName] = document
    .querySelector("#work-name")
    .textContent.split(" | ");
  const buyList = [
    {
      productName: productName,
      painterName: painterName,
      price: price,
      image: document.querySelector("#work-img").src,
      productId: document.querySelector("#product-id").name,
    },
  ];
  localStorage.setItem("buy-direct", JSON.stringify(buyList));
  // alert("장바구니 넣기 성공!");
  // 로그인을 하지 않은 경우
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    window.location.replace("/login");
  }

  window.location.replace("/order");
}

buyBtn.addEventListener("click", buyNow);
