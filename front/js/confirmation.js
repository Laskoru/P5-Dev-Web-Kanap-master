//--- Get OrderId in URL and display it on page ---//

let orderId = window.location.search.split("?orderId=").join("");
document.querySelector("#orderId").innerText = `${orderId}`;
