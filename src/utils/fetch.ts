export async function fetchData(url: string, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return response.text();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export const getItems = async (url:string) => {
  try {
    return await fetchData(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    throw error;
  }
};


export const postItem = async (url:string, item:any) => {
  try {
    return await fetchData(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  } catch (error) {
    throw error;
  }
};

// export const fetchNoUser = async (url, options = {}) => {
//     const response = await window.fetch(url, options)
//     const contentType = response.headers.get("content-type")

//     if (!response.ok) {
//       if (contentType && contentType.includes("application/json")) {
//         const errorData = await response.json()
//         throw new Error(errorData.message)
//       } else {
//         const errorMessage = await response.text()
//         throw new Error(errorMessage)
//       }
//     }

//     if (contentType && contentType.includes("application/json")) {
//       return await response.json()
//     } else {
//       return response.text()
//     }
//   }
