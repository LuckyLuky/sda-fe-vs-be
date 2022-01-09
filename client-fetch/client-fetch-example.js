/**
 * Jake objekty dostaneme v jednotlivych fazich
 */
// fetch("https://jsonplaceholder.typicode.com/posts/")
//   .then((response) => {
//     console.log("response", response);
//     const jsonPromise = response.json();
//     console.log("jsonPromise", jsonPromise);
//     return jsonPromise;
//   })
//   .then((data) => {
//     console.log("data", data);
//   });

fetch("https://jsonplaceholder.typicode.com/posts/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("data", data);
  });

/**
 * Data nemusime cist jen jako JSON, zde napr. cteme jako text
 * (a nasledne pomoci JSON.parse prevadime na JSON)
 */
// fetch("https://jsonplaceholder.typicode.com/posts/")
//   .then((response) => {
//     return response.text();
//   })
//   .then((data) => {
//     console.log("data", JSON.parse(data));
//   });
