export function useHttpClient(baseUrl: string) {
  async function fetchData(path: string, options = {}) {
    try {
      const url = new URL(path, baseUrl)
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      }
      return response.text()
    } catch (error) {
      console.error("Fetch error:", error)
      throw error
    }
  }

  const getItems = async (url: string) => {
    try {
      return await fetchData(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      throw error
    }
  }

  const postItem = async (url: string, item: {}) => {
    try {
      return await fetchData(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
    } catch (error) {
      throw error
    }
  }

  return {
    getItems,
    postItem,
  }
}

export function useCrudApi() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const httpClient = useHttpClient(baseUrl)
  return httpClient
}
