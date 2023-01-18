//import * as Api from "/api.js";

async function getProducts() {
  let url = `/api/products`;
  // const res = await Api.get(url);
  // console.log(res);
  // return res.json();
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderProducts() {
  let products = await getProducts();
  console.log(products);
  let html = "";
  products.forEach((data) => {
    if (data["category"] === "abstract") {
      let htmlSegment = `   <li class="work">
      <button class="delete-button" onClick="deleteProduct(${data["seq"]})" >삭제하기</button>
      
      <button class="open-toggle-button" onClick="showToggle()">수정하기</button> 
      <button class="open-toggle-button" onClick="addCart(${data["seq"]})">장바구니</button> 
      <button class="open-toggle-button" onClick="buyNow(${data["seq"]})">구매하기</button> 
      <form class="toggle-page">
        <button class="closeBtn" onClick="closeToggle()">X</button>
        <input class="is-medium search-input name" type="text" placeholder="상품명을 입력하세요.">
        <input class="is-medium search-input image" type="file">
        <input class="is-medium search-input category" type="text" placeholder="상품 카테고리.">

        <input class="is-medium search-input content" type="text" placeholder="상품 소개.">
        <input class="is-medium search-input price" type="text" placeholder="상품 희망 가격.">

        <button class="is-medium search-button post-button" type="submit" onclick='updateProduct(${data["seq"]})'>
            <span class="material-icons">
                상품 수정
            </span>
        </button>
    </form>

      <div class="product-image">
          </div>
          <span class="work-info">
              <span class="painter">
              </span>
              <span> | </span>
              <span class="product-name">${data.productName}
              </span>
          </span>
          <span class="price">${data.price}
          </span>
      </li>`;

      html += htmlSegment;
    }
  });

  let container = document.querySelector(".work-wrapper");
  container.innerHTML = html;
}

renderProducts();

function deleteProduct(seq) {
  console.log(seq);

  // Api.del(`/api`, seq);
  fetch(`/api/${seq}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    // .then((res) => res.json())
    .then((data) => {
      console.log("delete 성공!");
      //   return data;
    })
    .catch((err) => {
      console.log(err);
    });

  window.location.reload();
}

/////////////////  updateProduct  /////////////////

function newPage(seq) {
  location.href = "/update.html";
}

function showToggle() {
  console.log("hi");
  const togglePage = document.querySelector(".toggle-page");
  // const closeBtn = document.querySelector(".closeBtn");
  togglePage.style.display = "block";
}

function closeToggle() {
  const togglePage = document.querySelector(".toggle-page");
  togglePage.style.display = "none";
}

// openToggleButton.addEventListener("click", showToggle);

// // closeBtn.addEventListener("click", closeAddPage);

// const openToggleButton = document.querySelector(".open-toggle-button");
// const togglePage = document.querySelector(".toggle-page");
// const closeBtn = document.querySelector(".closeBtn");

// function showToggle() {
//   console.log("click 함수");
//   // if (togglePage.style.display == "none") {
//   togglePage.style.display = "block";
//   // } else {
//   //   togglePage.style.display = "none";
//   // }
// }

// function closeToggle() {
//   togglePage.style.display = "none";
// }

function updateProduct(seq) {
  let productName = document.querySelector(".name").value;
  let content = document.querySelector(".content").value;
  let price = document.querySelector(".price").value;
  let image = document.querySelector(".image").value;
  let category = document.querySelector(".category").value;

  let productData = {
    method: "PATCH",
    body: JSON.stringify({
      productName,
      price,
      content,
      category,
      image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`/api/${seq}`, productData)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log("patch 성공!");
    })
    .catch((err) => console.log(err));

  // closeAddPage();
}

// togglePage.addEventListener("submit", updateProduct(seq));

////////   장바구니
// function addCart(seq){
//   console.log("click")
//   let cartList = JSON.parse(localStorage.getItem("cart"));
//   if(cartList === null){
//       cartList = [];
//   }
//   //const price = data["price"];
//   // const [artistName, productName] = document.querySelector(data["price"]).textContent.split(" | ");

//   // 작품이름, 가격, 이미지 + 작가이름 + 프로덕트 아이디
//   const wantToCart = {
//       // name: data["productName"],
//       // price: data["price"],
//       // image: data["image"],
//       // artistName: data["painterEmail"],
//       productId: seq,
//   }
//   // 기존 장바구니 리스트에 현재 작품이 있다면 error?

//   // 기존 장바구니 리스트에 현재 작품까지 넣음.
//   cartList.push(wantToCart);

//   // 로컬스토리지에 추가
//   localStorage.setItem("cart", JSON.stringify(cartList));
// }

function addCart(seq) {
  console.log("click");
  let cartList = JSON.parse(localStorage.getItem("cart"));
  if (cartList === null) {
    cartList = [];
  }

  const wantToCart = {
    productId: seq,
  };
  // 기존 장바구니 리스트에 현재 작품이 있는 경우
  let check = true;
  for(let elem of cartList){
    if(elem["productId"] === seq){
      check = false;
      alert("동일한 상품이 이미 장바구니에 담겨있습니다.");
      break;
    }
  }
  
  if(check) {
    cartList.push(wantToCart);
  }
  localStorage.setItem("cart", JSON.stringify(cartList));
}

// addCartBtn.addEventListener("click", addCart);

// 구매하기 +
// const buyBtn = document.querySelector(".BuyNow");

function buyNow(seq){
    const buyList = [{
        productId: seq,
    }];
    localStorage.setItem("buy-direct", JSON.stringify(buyList));
    // 로그인을 하지 않은 경우 
    const token = sessionStorage.getItem("token");
    if (!token) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace("/login?order");
    }
    window.location.replace("/order");
}

// buyBtn.addEventListener("click", buyNow);
