export const productServices = {
    getAllProductsFromApi,
    deleteProduct,
    updateProduct,
    addProduct
  }
  
  async function getAllProductsFromApi() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const { products } = await response.json();
      return products;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
  
  async function deleteProduct(productId) {
    try {
      fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
  
  async function updateProduct(productId, updatedProductData) {
    try {
       await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProductData)
      });
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
  
  async function addProduct(newProductData) {
    try {
      await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });
  
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }