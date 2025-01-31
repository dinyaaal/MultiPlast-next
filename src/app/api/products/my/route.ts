import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const url = new URL(request.url);
  //   const token = url.searchParams.get("token");
  //   const status = url.searchParams.get("status");
  try {
    const res = await fetch(`http://13.60.7.255/api/products/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMjQzOTkzZmFjODA3YzgwNjI4MTM1MDJlYmQxYjM1ODAzYTNhMjFhMjA2NmYyMTdjMGM4OGM3MGU5ZWQ2MzM5M2RiZTlkMzllY2JiZWQ2NmYiLCJpYXQiOjE3MzgxNjI5MTUuNDE4NDg2LCJuYmYiOjE3MzgxNjI5MTUuNDE4NDg5LCJleHAiOjE3NDA3NTQ5MTUuNDA4MTI3LCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.Bu3xs2T7RlpoqcQytlyLXFexbfNsEeSvk6xkXYLmwbfRp4Lmic2q3aF9vd9m3GKMaDrYBK2cIfcipvyv0uYO88E3YqYjZz8FAuIa2l2UNJaQdU1k4vfqV1Ed1SlLbVguwiy-PhIyD2ITyWEHEOEgUqlhwAbV34qXEPd-Ia8r9DZkcuLUocViJHx7d-Jf70zI6dWT1MW85HNttBwQXCsf7cU7ukS4FCC8M1gVO2bcVK6PLntXmyvkOGkIXLJZO5VfrSp7NdqAWnindVfYDGK-E2Zr7hWNfNjilSEeVX_sLQNVztWTyGhL6fZki_puIrIuGKv_j2g4VmQmyrqPSpenSYA8wKVw3hd28g2MIW3koaVO6m4JUKCqr2DVbKz7Hjra94ndzb9cSlDyjgIVLGgcyykI7prRSUlwxh9Z6zKRstQyq-pq-lbGFEbWnB7B5oNS5Q4FD8Up3Zo2S_PXrjWUYtXVY61yD7Efk80AYvhPoYJeslM0ziT3fPIXn-jTjOHhggUbBWjo3Yb5z34rFmq91xr3aB013MdDvSgFNRxmxtcv6EMNjNM5dr2AQl5zfPnIhPbBZp7AC6fqcqoXFQKa3KgSOjNhC84VZ4Sa6VcySFKgYW2ZVmBdfhbL6sERNd1qUERAdxz7TqBAbRQB0FcZshMnvqh3pDsPlpoz6f_TKDc`,
      },
      body: JSON.stringify({ status: 1 }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
