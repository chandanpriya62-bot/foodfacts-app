import { useState } from "react"
import SearchBar from "./components/SearchBar"
import FoodList from "./components/FoodList"

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setHasSearched(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()

      console.log("Full API response:", data)
      console.log("Products array:", data.products)

      const validProducts = (data.products || []).filter(
        (p) => p.product_name || p.brands || p.image_small_url
      )

      setResults(validProducts)
    } catch (error) {
      console.error("Something went wrong:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />

      {!hasSearched && !loading && (
        <p>Search for a food item to see nutrition details.</p>
      )}

      {loading && <p>Loading...</p>}

      {hasSearched && !loading && results.length > 0 && (
        <FoodList products={results} />
      )}

      {hasSearched && !loading && results.length === 0 && (
        <p>No results found. Try a different search.</p>
      )}
    </div>
  )
}

export default App