let orderParams = new URLSearchParams(document.location.search);

const displayOrderNumber = () => {
    orderId.textContent = orderParams.get("id");
    localStorage.clear();
    setTimeout(() => {
        document.location.href = "http://127.0.0.1/front/html/index.html";
    }, 5000);
};
displayOrderNumber();