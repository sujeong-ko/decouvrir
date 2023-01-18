import * as Api from "/api.js";
// import { goToAddProductPage } from "/useful-functions.js";

const postBtn = document.querySelector("#postButton");
const productNameInput = document.querySelector("#name");
const contentInput = document.querySelector("#content");
const priceInput = document.querySelector("#price");
const categoryInput = document.querySelector("#category");

const photoFile = document.querySelector("#image");
let image = "";
//console.log(formData);

let painterEmail = "";
let painterName = "";
let categoryId = "";
let role = "";
let userData;

async function insertUserData() {
  userData = await Api.get("/api/user");
  painterEmail = userData.email;
  painterName = userData.painterName;
  role = userData.role;
  console.log(userData);
  // goToAddProductPage(role);
}

insertUserData();
//
///////
async function addProduct(e) {
  e.preventDefault();
  const productName = productNameInput.value;
  const content = contentInput.value;
  const price = priceInput.value;
  const category = categoryInput.value;

  const formData = new FormData();
  formData.append("image", photoFile.files[0]); // 파일 첨부

  fetch(`/api/images/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      image = data.imagePath;
      const newProductData = {
        painterEmail,
        painterName,
        productName,
        price,
        content,
        category,
        categoryId,
        image,
      };

      Api.post(`/api/product`, newProductData);
      alert("상품 등록이 완료되었습니다!");
    });

  if (category === "abstract") {
    categoryId = "636e362dffde000765aac0ce";
  } else if (category === "landscape") {
    categoryId = "636e3647ffde000765aac0da";
  } else if (category === "illustration") {
    categoryId = "636e3634ffde000765aac0d2";
  } else if (category === "asian") {
    categoryId = "636e3640ffde000765aac0d6";
  }

  //   console.error(err.stack);
  //   alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  // }
}

postBtn.addEventListener("click", addProduct);
