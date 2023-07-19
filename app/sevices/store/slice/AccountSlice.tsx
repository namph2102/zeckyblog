import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_SEVER, customeAxios } from "../../untils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppDispatch } from "..";

const AccountSlice = createSlice({
  name: "account",
  initialState: {
    user: {
      fullname: "",
      username: "",
      _id: "",
      avatar: "",
      permission: "member",
    },
  },
  reducers: {
    updateFullAccount(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(firstloginWebsite.fulfilled, (state, action) => {
      if (action.payload?.accessToken) {
        state.user = action.payload;
      }
    });
  },
});

export const LoginAccount = (payload: {
  username: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    return axios
      .post(DOMAIN_SEVER + "/user/login", { data: payload })
      .then((res) => res.data)
      .then((data) => {
        if (data?.account) {
          const account = data?.account;
          if (account.permission == "member") {
            toast.error("Tài khoản không đủ quyền!");
            return false;
          }
          dispatch(AccountSlice.actions.updateFullAccount(account));

          toast.success("Đăng nhập thành công!");
          return account;
        }
      })
      .catch(() => {
        toast.error("Tài khoản hoặc mật khẩu chưa đúng");
        return false;
      });
  };
};
export const firstloginWebsite = createAsyncThunk(
  "/user/firstlogin",
  async (accessToken: string) => {
    try {
      if (!accessToken) {
        throw new Error("Tài khoản chưa đăng nhập lần nào");
      }

      return axios
        .get(DOMAIN_SEVER + "/user/firstlogin", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((res) => {
          if (res.data.account) {
            if (res.data.account.accessToken) {
              customeAxios.defaults.headers.common["Authorization"] =
                "Bearer " + res.data.account.accessToken;
            }

            return res.data.account;
          }
        })
        .catch(() => {
          throw new Error("Tài khoản chưa đăng ký lần nào");
        });
    } catch (err: { message: string } | any) {
      toast.error(err.message);
      return false;
    }
  }
);

export default AccountSlice.reducer;
