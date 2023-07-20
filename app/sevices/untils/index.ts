import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
export const DOMAIN_SEVER = process.env.DOMAIN_sever;
export const DOMAIN_HOST = process.env.DOMAIN_URL;
export const instantAxiosSever = axios.create({
  baseURL: DOMAIN_SEVER,
  headers: {
    "Content-Type": "application/json",
  },
});
export const customeAxios = axios.create({
  baseURL: DOMAIN_SEVER,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAllBlogFromSever = async () => {
  const res = await axios.get(DOMAIN_SEVER + "/blog/allblog");
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

export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
export function capitalizeText(str: string) {
  return str.replace(/(^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}
export const handleOpenNewWindown = (slug: string) => {
  if (!slug) return;
  const url = DOMAIN_HOST + "/" + slug;
  const windowName = "Xem trang Demo";
  const windowFeatures = "width=800,height=600";
  window.open(url, windowName, windowFeatures);
};
export function Debounced(callback: any, delay: number = 200) {
  delay = delay || 0;
  let timeId: number | undefined | any;
  console.log(timeId);
  return (...args: any) => {
    console.log(args);
    if (timeId) {
      clearTimeout(timeId);
      timeId = undefined;
    }
    timeId = setTimeout(() => {
      callback(args);

      clearTimeout(timeId);
    }, delay);
  };
}
export function isImageLink(url: string) {
  var pattern = /\.(jpeg|jpg|png|svg)$/i;
  return pattern.test(url);
}
export function checkImageUrl(url: string) {
  var pattern = /^(http|https):\/\//;
  return pattern.test(url);
}
export async function uploadFileSever(file: File) {
  if (!file.type.includes("image")) {
    toast.error("Đây không phải ảnh");
    return;
  } else {
    toast.success("Đang xử lý...");
  }
  const formdata = new FormData();
  formdata.append("file", file);
  return fetch(DOMAIN_SEVER + "/upload", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 201) {
        if (data?.fileInform?.fileName) {
          toast.success("Tải ảnh thành công");
          return data.fileInform;
        }
      }
    })
    .catch(() => {
      toast.error("Tải ảnh thất bại");
    });
}
export async function deleteFileUpload(path: string) {
  customeAxios
    .post("/upload/delete", {
      data: path,
    })
    .then((res) => res.data)
    .then((data) => {
      toast.success(data);
    });
}
