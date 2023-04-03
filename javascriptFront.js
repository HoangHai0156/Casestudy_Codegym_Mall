function addProductButton() {
    document.querySelector(".add-product-button").src = "photos/adding.png";
}
function addProductButtonDefault() {
    document.querySelector(".add-product-button").src = "photos/addNotYet.png";
}
function showInputForm() {
    var recentStyle = document.querySelector(".input-table");
    if (recentStyle.style.display == "block") {
        recentStyle.style.display = "none";
    } else {
        recentStyle.style.display = "block";
    }
    document.querySelector(".edit-table").style.display = "none";
}
function closeEditTable() {
    document.querySelector(".edit-table").style.display = "none";
    document.querySelector(".input-table").style.display = "none";
    document.querySelector("#checkoutMethods").style.display = "none";
}
function checkOut() {
    document.querySelector("#checkoutMethods").style.display = "block";
}
function moveRandom() {
    let cashStyle = document.querySelector("#cashMethod");
    cashStyle.style.left = Math.ceil((Math.random() * (-700)) + (Math.random() * (700))) + "px";
    cashStyle.style.top = Math.ceil((Math.random() * (-300)) + (Math.random() * (300))) + "px";
}
