function formatCurrency(number) {
    
    return parseInt(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
class product {
    constructor(photo, name, soldCount, left, price) {
        this.photo = photo;
        this.name = name;
        this.soldCount = soldCount;
        this.left = left;
        this.price = price
    }
}
let product_key = "Product-Key";
let products = [];
init();
function init() {
    if (localStorage.getItem(product_key) != null) {
        products = JSON.parse(localStorage.getItem(product_key))
    } else {
        products = [
            new product("photos/donito.png", "Doritos Nacho Cheese Flavored Tortilla Chips - 14.5oz", 10, 450, 80000),
            new product("photos/orange.png", "Simply Orange Pulp Free Juice - 52 fl oz", 80, 120, 50000),
            new product("photos/bertolli.png", "Bertolli Frozen Chicken Florentine & Farfalle - 22oz", 92, 560, 120000),
            new product("photos/ree.png", "Reese's Easter Peanut Butter Eggs - 7.2oz/6ct", 89, 100, 90000),
            new product("photos/WhiteChocolateBar.png", "Lindt Classic Recipe White Chocolate Bar 4.4oz", 15, 20, 60000),
            new product("photos/dunkin.png", "Dunkin' Original Blend, Medium Roast Coffee", 71, 54, 100000),
            new product("photos/honmet.png", "Rainbow Vanilla Cake Mix - 18.15oz - Favorite Day™", 41, 85, 120000),
            new product("photos/vanilla.png", "Hormel Gatherings Honey Ham, Turkey, Cheese & Crackers Party Tray - 28oz", 19, 74, 130000),
            new product("photos/strawBerryEnergy.png", "V8 Sparkling +Energy Strawberry Kiwi Juice Drink - 4pk/11.5 fl oz Cans", 21, 170, 50000),
            new product("photos/springMix.png", "Spring Mix Edible Confetti Sprinkles - 2.6oz - Favorite Day™", 8, 85, 20000),
            new product("photos/funFetti.png", "Pillsbury Funfetti Spring Vanilla Flavored Frosting - 15.6oz", 4, 96, 25000),
            new product("photos/energyOrange.png", "V8 V-Fusion +Energy Orange Pineapple Vegetable & Fruit Juice - 6pk/8 fl oz Cans", 90, 150, 220000)
        ];
        localStorage.setItem(product_key, JSON.stringify(products));
    }
}

class CartItem {
    constructor(idProduct, photo, name, price) {
        this.idProduct = idProduct;
        this.photo = photo;
        this.name = name
        this.price = price;
        this.quantity = 1;
        this.total = (this.price * this.quantity);
    }
}
class Cart {
    constructor() {
        this.cartItems = [];
    }
    total = function () {
        let sumTotal = 0;
        for (let cartItem of this.cartItems) {
            sumTotal += cartItem.total;
        }
        return sumTotal;
    }
    findDup = function (id) {
        let isDup = false;
        for (let cartItem of this.cartItems) {
            if (id == cartItem.idProduct) {
                isDup = true;
                break;
            }
        }
        return isDup;
    }
}
drawDefaultCart();
showProducts();
function showProducts() {
    let productsDiv = document.querySelector(".products")
    productsDiv.innerHTML = "";
    for (let product of products) {

        var index = products.indexOf(product);
        productsDiv.innerHTML += `
        <div class="specific-product">
                <div class="product-photo">
                    <img src="${product.photo}"
                        alt="product.photo">
                </div>
                <p class="product-name">${product.name}</p>
                <p class="status">Sold count: ${product.soldCount} | Left: ${product.left}</p>
                <p class="product-price">${formatCurrency(product.price)}</p>
                <div class="add-button">
                    <button class="add-to-cart" onclick="addToCart('${index}')">Add to cart</button>
                </div>
                <div class="edit-button">
                    <button class="edit-product" onclick="editProduct('${index}')">Edit</button>
                </div>
                <div class="delete-button">
                    <button class="delete-product" onclick="deleteProduct('${index}')">Delete</button>
                </div>
        </div>        
        `
    }
}
function submitProduct() {
    inpPhoto = document.querySelector("#inputting-product-photo").value;
    inpName = document.querySelector("#inputting-product-name").value;
    inpSoldCount = document.querySelector("#inputting-product-sold-count").value;
    inpLeft = document.querySelector("#inputting-product-left").value;
    inpPrice = document.querySelector("#inputting-product-price").value;
    let requires = [];
    if (inpPhoto == "")
        requires.push("Ảnh không được để trống!");
    if (inpName == "")
        requires.push("Tên không hợp lệ!");
    if (inpSoldCount < 0)
        requires.push("Số lượng đã bán không hợp lệ!");
    if (inpLeft <= 0)
        requires.push("Nhập thêm số lượng tồn kho!");
    if (inpPrice < 0)
        requires.push("Giá không hợp lệ!");
    if (requires.length > 0) {
        let strRequires = "";
        for (var value of requires) {
            strRequires += `${value} \n`;
        }
        alert(strRequires);
    } else {
        products.push(new product(inpPhoto, inpName, inpSoldCount, inpLeft, inpPrice));
        localStorage.setItem(product_key, JSON.stringify(products));
        showProducts();
        document.querySelector(".input-table").style.display = "none";
    }
}
let cart = new Cart();
function addToCart(index) {
    let p = products[index];
    if (cart.findDup(index)) {
        for (let cartItem of cart.cartItems) {
            if (cartItem.idProduct == index) {
                p.soldCount++;
                p.left--;
                showProducts();
                cartItem.quantity++;
                cartItem.total = cartItem.price * cartItem.quantity;
            }
        }
    } else {
        p.soldCount++;
        p.left--;
        showProducts();
        cart.cartItems.push(new CartItem(index, p.photo, p.name, p.price));
    }

    showCart();
}
function showCart() {
    let cartDiv = document.querySelector(".cart-body");
    let cartFootDiv = document.querySelector(".cart-foot");
    cartDiv.innerHTML = "";
    for (let cartItem of cart.cartItems) {
        cartDiv.innerHTML += `
        <tr>
        <td width="15%">
            <img class="detail"
                src=${cartItem.photo}
                alt="product.photo">
        </td>
        <td>
            ${cartItem.name}
        </td>
        <td>
            ${formatCurrency(cartItem.price)}
        </td>
        <td>
            <input id="quantity" size="1" value="${cartItem.quantity}" type="text" readonly>
        </td>
        <td>
            ${formatCurrency(cartItem.total)}
        </td>
        <td>
            <img onclick="deleteProductInCart(${cartItem.idProduct})" class="delete" src="photos/delete.png" alt="delete">
        </td>
        </tr>
        `
    }
    cartFootDiv.innerHTML = "";
    cartFootDiv.innerHTML += `
    <tr>
    <td colspan="4">Total Price</td>
    <td colspan="2">${formatCurrency(cart.total())}</td>
    </tr>
    <tr>
    <td colspan="6">
    <button onclick="checkOut()">Check Out</button>
    </td>
    </tr>
    `
}
function deleteProduct(index) {
    let Confirm = confirm("Bạn chắc chưa?");
    if (Confirm) {
        products.splice(index, 1);
        localStorage.setItem(product_key, JSON.stringify(products));
        document.querySelector(".products").innerHTML = "";
        showProducts();
    }
}
function editProduct(INDEX) {
    let editP = products[INDEX];
    document.querySelector(".edit-table").style.display = "block";
    document.querySelector(".input-table").style.display = "none";
    document.getElementById("editting-product-name").value = editP.name;
    document.getElementById("editting-product-photo").value = editP.photo;
    document.getElementById("editting-product-sold-count").value = editP.soldCount;
    document.getElementById("editting-product-left").value = editP.left;
    document.getElementById("editting-product-price").value = editP.price;
    document.getElementById("idEdit").value = INDEX;
}
function deleteProductInCart(index) {
    let profuctFromCart = products[index];
    let pCart = [];
    for (let value of cart.cartItems) {
        if (value.idProduct == index) {
            pCart = value;
            break;
        }
    }
    // pCart = cart.cartItems[index];
    if (pCart.quantity > 1) {
        pCart.quantity--;
        pCart.total = pCart.price * pCart.quantity;
        showCart();
        profuctFromCart.soldCount--;
        profuctFromCart.left++;
        showProducts();

    } else {
        let index2 = cart.cartItems.indexOf(pCart);
        cart.cartItems.splice(index2, 1);
        showCart();
        profuctFromCart.soldCount--;
        profuctFromCart.left++;
        showProducts();
    }
}
function submitEdittedProduct() {
    let edittingIndex = +document.getElementById("idEdit").value;
    let edittedName = document.getElementById("editting-product-name").value;
    let edittedPhoto = document.getElementById("editting-product-photo").value;
    let edittedSold = document.getElementById("editting-product-sold-count").value;
    let edittedLeft = document.getElementById("editting-product-left").value;
    let edittedPrice = document.getElementById("editting-product-price").value;
    products[edittingIndex].name = edittedName;
    products[edittingIndex].photo = edittedPhoto;
    products[edittingIndex].soldCount = edittedSold;
    products[edittingIndex].left = edittedLeft;
    products[edittingIndex].price = edittedPrice;
    showProducts();
    document.querySelector(".edit-table").style.display = "none";
}

function finalCheckout() {
    if (document.getElementById("debt").checked == true) {
        alert("Bữa ni ai mua nợ nữa cha!");
        alert("Thanh toán thất bại!");
    }
    if (document.getElementById("cash").checked == true) {
        alert("THƯA NGÀI!!");
        alert("Thanh toán thành công! Bạn nhận được giỏ đồ miễn phí");
        localStorage.setItem(product_key, JSON.stringify(products));
        cart = new Cart;
        drawDefaultCart();
    }
    if (document.getElementById("creditCard").checked == true) {
        var doubleCheck = confirm("Hãy dịch chuyển sao cho khoảng cách giữa hai gót chân bằng khoảng cách giữa hai vai. Phối hợp gập người 90 độ để thanh toán");
        if (doubleCheck) {
            alert("Gói hàng sẽ được giao đến sau 9 tháng 10 ngày nữa ( ͡° ͜ʖ ͡°)");
            alert("Thanh toán thành công!!");
            localStorage.setItem(product_key, JSON.stringify(products));
            cart = new Cart;
            drawDefaultCart();

        } else {
            alert("(☞ ͡° ͜ʖ ͡°)☞ Kém !");
            alert("Thanh toán thất bại!");
        }
    }
    document.querySelector("#checkoutMethods").style.display = "none";
}
function drawDefaultCart() {
    let defultCart = document.querySelector(".sticky-table");
    defultCart.innerHTML = `
    <table>
                    <caption>
                        <h3>Shopping Cart</h3>
                    </caption>
                    <thead>
                        <th colspan="2">Product Name & Details</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th style="background: whitesmoke;"></th>
                    </thead>
                    <tbody class="cart-body">
                        <tr>
                            <td width="15%">
                                <img src="" alt="">
                            </td>
                            <td>

                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <input id="quantity" size="1" value="0" type="text" readonly>
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <img class="delete" src="photos/delete.png" alt="delete">
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="cart-foot">
                        <tr>
                            <td colspan="4">Total Price</td>
                            <td colspan="2">0</td>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <button onclick="checkOut()">Check Out</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
    `
}