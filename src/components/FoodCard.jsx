function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {image_small_url ? (
        <img src={image_small_url} alt={product_name || "Food image"} />
      ) : (
        <p>No image available</p>
      )}

      <h2>{product_name || "Unknown Product"}</h2>
      <p><strong>Brand:</strong> {brands || "Unknown Brand"}</p>
      <p><strong>Calories:</strong> {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal</p>
      <p><strong>Protein:</strong> {nutriments?.proteins_100g ?? "N/A"} g</p>
      <p><strong>Carbs:</strong> {nutriments?.carbohydrates_100g ?? "N/A"} g</p>
      <p><strong>Fat:</strong> {nutriments?.fat_100g ?? "N/A"} g</p>
    </div>
  )
}

export default FoodCard