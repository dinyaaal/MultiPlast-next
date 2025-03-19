// import React from "react";
// import Header from "./components/Header";

// const fetchCategories = async () => {
//   const res = await fetch(`https://multiplast.web-hub.online/api/categories`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMjQyMTEzNjcyYjQ0MGU4ZmU5NDA4ZTIxNGMwMmNiZmRiM2FhMDRlM2E1MmQ5MmZhNTBlNTBmMDdhYzZiODNlMGIwMzVkMzI4N2I3NWFlZDYiLCJpYXQiOjE3MzM1Nzk1OTguNTE4NDcxLCJuYmYiOjE3MzM1Nzk1OTguNTE4NDc0LCJleHAiOjE3MzYxNzE1OTguNTEzMjUzLCJzdWIiOiIxMSIsInNjb3BlcyI6W119.jNCZ2kjTkbq0Iw1TV8hlGM_kECN2EujyF8Z1Y4p2Ft3qtAbq7Yqw5zDx4ra4CG1SOKQBFC57lT4C-7AAruEmjTCYV4Ki058AB8Jx0cW0zOcRJFB35BNJ5by2UbnW_nLMSloBqah02y4TtncCgMfbdoAlZnWIFyaixhpgZI20g9JTCY7LAHVL31Ye14x8oUP39b0WWPUOAwMIJpffE0PhK7mydMYFAn6ycQr-jUf3Vv5q4YD8VU9S1WaCNU3hZV_TaMPpr9utWAFbWunQHP7nr37bLef6W7GHf68GFup2XTWKiMfLj18l2Ci7Pa1aDVrmNeGSy1Za-MnQttD5oVz2giMH5Y4Wrv-T5kzoW6C1Fg9B4ohjtGr_AUPTZwUBMV5GBHr0BQUNbIUwsaeKbJPK1QWYmzKYe1qsSo59904Go2Is0fBraAb3ZpvoEnpsyo3vYcmN4IRCRFg7Pgt7HzCQJkVxsAnPmaiGjJ4uxZLWOmT0FLcpCqi4jHOHmw9WvNX3ZLn4xyJ42klHGOhCAoypauYDM2kETM41nWMp9LWjmZ5C7ziVXkHxWz9FvEUoGe9k-EeStD6wvBYnyaapXgR7yPMioZXqNQ20IYNpjpnWkejTxL87t0N--9dmZSPTTaJaTfBAWi5VfhRucZBrXeUBqBBKo8QabXi1ybln9GQDjtA`,
//     },
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   return res.json();
// };

// export default async function HeaderWrapper() {
//   const categories = await fetchCategories();
//   return (
//     <>
//       <Header categories={categories} />
//     </>
//   );
// }
