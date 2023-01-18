let accountName = document.getElementById('account-name');

function changeName(){
    // 회원의 이름 데이터 가져와서 innerHTML
    accountName.innerHTML = "";
}

window.onload = function(){
    changeName();
}