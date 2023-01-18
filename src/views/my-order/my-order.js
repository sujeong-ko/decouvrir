import * as Api from "/api.js";

async function addOrderList(){
    let orders = await Api.get("/api/orders");
    orders.forEach((order) => {
        
    });
}
addOrderList();

