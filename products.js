document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const productData = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        description: document.getElementById('productDescription').value,
        images: Array.from(document.getElementById('productImages').files).map(file => URL.createObjectURL(file)),
        mainImage: document.getElementById('productImage').value
    };

    // Create URL-friendly name
    const productUrl = productData.name.toLowerCase().replace(/\s+/g, '-');

    // Generate product page HTML
    const productPageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productData.name}</title>
    <link rel="stylesheet" href="../styles/product-template.css">
</head>
<body>
    <div class="product-container">
        <div class="image-gallery">
            <img src="${productData.mainImage}" alt="${productData.name}" class="gallery-main">
            <button class="gallery-nav prev">←</button>
            <button class="gallery-nav next">→</button>
            <div class="thumbnail-container">
                ${productData.images.map(img => `
                    <img src="${img}" alt="" class="thumbnail">
                `).join('')}
            </div>
        </div>

        <div class="product-info">
            <h1 class="product-title">${productData.name}</h1>
            <div class="product-price">$${productData.price}</div>
            <div class="product-description">${productData.description}</div>
            <div class="button-container">
                <button class="btn btn-cart">Add to Cart</button>
                <button class="btn btn-buy">Buy Now</button>
            </div>
        </div>
    </div>
    <script src="../scripts/product-template.js"></script>
</body>
</html>`;

    // Save product data and create new page
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));

    // Create product page file (you'll need server-side code for this)
    // For demonstration, we'll show how to download it
    const blob = new Blob([productPageHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${productUrl}.html`;
    link.click();
});
