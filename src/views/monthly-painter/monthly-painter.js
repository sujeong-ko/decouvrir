async function getPainters() {
  let url = `/api/monthlyPainter`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMonthlyPainters() {
  let painters = await getPainters();
  console.log(painters);
  let html = "";
  for (let i = 0; i < 3; i++) {
    let htmlSegment = `   
      <div class="painter-card">
          <div class="painter-name">${painters[i]["painterName"]}</div>
          <div class="painter-introduce">${painters[i]["introduce"]}</div>
        <div class="card-footer">
          <a href="/painter/?name=${painters[i].painterName}" >작가 페이지</a>
        </div>
      </div>`;

    html += htmlSegment;
  }
  let container = document.querySelector(".monthly-painters");
  container.innerHTML = html;
}

renderMonthlyPainters();
