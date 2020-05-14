export async function post(url: string, query: object) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const res = await response.json()

    console.log(res);

    return res;


  } catch (error) {

    throw error;

  }
}

export default {
    post
}
