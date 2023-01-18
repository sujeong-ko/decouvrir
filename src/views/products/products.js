import * as Api from "../api.js";

// 카테고리에 해당하는 상품 추가
async function renderProducts(categoryName, categoryWorkWrapper) {
  let products = await Api.get("/api/products");
  let productsContent = "";
  let arr = [];
  products.forEach((data) => {
    if (data.category == categoryName) {
      arr.push(data);
    }
  });
  console.log(arr);
  for (let i = 0; i < 4; i++) {
    productsContent += `
      <li class="work">
          <div class="product-image">
            <a href="/products/detail?id=${arr[i]._id}" class="img-a">
              <img src="${arr[i].image}" alt="상품사진">
            </a>
          </div>
          <span class="work-info">
              <span>${arr[i].painterName} | ${arr[i].productName}</span>
          </span>
          <span class="price">${arr[i].price} 원</span>
      </li>`;
  }
  let container = document.querySelector(categoryWorkWrapper);
  container.innerHTML = productsContent;
}

renderProducts("abstract", "#abstract-work-wrapper");
renderProducts("asian", "#asian-work-wrapper");
renderProducts("landscape", "#landscape-work-wrapper");
renderProducts("illustration", "#illustration-work-wrapper");

//스크롤
const scrollButton = document.querySelector(".scroll-button");
scrollButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
