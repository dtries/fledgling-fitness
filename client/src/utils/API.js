import axios from "axios";

export default {
    // Obtain Data From Google Books API
//     search: function(query) {
//         console.log(`The query is ${query}`);
//         return axios.get("https://www.googleapis.com/books/v1/volumes", { params: {q: query} });
//     },
//       // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete(`/api/books/${id}`);
//   },
  // Saves a baseline info to the database
  saveBaseline: function(baselineData) {
    return axios.post("/api/baseline/", baselineData);
  }

};