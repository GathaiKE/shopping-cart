async function getProductData(productId) {
    const response = await fetch(`http://localhost:3000/cart/${productId}`);
    const productData = await response.json();
    return productData;
}
// Add to the cart
async function addToCart(productId) {
    const productData = await getProductData(productId);
    const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        body: JSON.stringify({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            quantity: 1
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    });
    const cartData = await response.json();
    return cartData;
}
// Listen for click events on the add to cart button
const addToCartBtn=document.querySelector('.add-to-cart')
addToCartBtn.addEventListener('click', async (event) => {
    if (event.target.matches('.add-to-cart')) {
        const productId = event.target.dataset.productId;
        const cartData = await addToCart(productId);
        updateCartUI(cartData);
    }
});

// Fetch users cart data from the server
async function getCartData() {
    const response = await fetch('/api/cart');
    const cartData = await response.json();
    return cartData;
}

// Update to the cart when the page loads
window.onload = async () => {
    const cartData = await getCartData();
    updateCartUI(cartData);
};
// remove item from the cart
const removeItemBtn=document.querySelector('#remove')
removeItemBtn.addEventListener('click', async (event) => {
    if (event.target.matches('.remove-item')) {
        const productId = event.target.dataset.productId;
        const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE'
        });
        const cartData = await response.json();
        updateCartUI(cartData);
    }
    });

// Listen for quantity input change on the cart
const addItemBtn=document.querySelector('#add')
addItemBtn.addEventListener('change',async(event)=>{
    if (event.target.matches('.item-quantity')) {
        const productId = event.target.dataset.productId;
        const quantity = event.target.value
    }
});
