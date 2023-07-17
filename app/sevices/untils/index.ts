import axios from "axios";
export const instantAxiosSever = axios.create({
  baseURL: process.env.DOMAIN_sever,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAllBlog = async () => {
  const res = await axios.get("/api");
  const data = await res.data;
  return data;
};

export const getData = async () => {
  const res = await instantAxiosSever.get("/blog/allblog");
  const data = await res.data;

  return data;
};
export const getDataDetail = async (slug: string) => {
  const res = await instantAxiosSever.post(`/blog/detail`, {
    slug,
    method: "POST",
  });
  const data = await res.data;
  return data;
};
