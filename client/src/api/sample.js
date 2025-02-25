export const fetchSample = async (successCallback, errorCalback) => {
  //dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    successCallback(data);
  } catch (error) {
    errorCalback(error);
  }
};