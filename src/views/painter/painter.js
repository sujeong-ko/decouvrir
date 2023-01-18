import * as Api from "../api.js";

const urlParams = new URL(location.href).searchParams;
const painterName = urlParams.get("name");

let painterNameVal = document.getElementById("painter-name");
let painterExplainVal = document.getElementById("painter-explain");

async function changeText() {
  const painters = await Api.get("/api/monthlyPainter");
  painters.forEach((painter) => {
    if (painter.painterName === painterName) {
      painterNameVal.innerHTML = painter.painterName;
      painterExplainVal.innerHTML = painter.introduce;
    }
  });
}
changeText();

let works = document.querySelector("#painter-work-wrapper");

async function addPainterWork() {
  const products = await Api.get("/api/products");
  let productsContent = "";
  products.forEach((product) => {
    if (product.painterName === painterName) {
      productsContent += `
                <li class="work">
                    <div class="product-image">
                        <a href="/products/detail?id=${product._id}"><img src="${product.image}" id= "${product._id}" alt="상품사진"></a>
                    </div>
                    <div class="work-info">
                        <span class="product-name">${product.productName}</span>
                    </div>
                </li>`;
      works.innerHTML = productsContent;
    }
  });
}
addPainterWork();
