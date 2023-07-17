import mongoose from "mongoose";
let isCoonect = false;
const my_db = process.env.MONGODB_URL;
const connectMoongodb = async () => {
  if (isCoonect) return;
  mongoose.set("strictQuery");
  return mongoose
    .connect(my_db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "webchatting",
    })
    .then(() => {
      console.log("kết nối thành công");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isCoonect = true;
    });
};
export default connectMoongodb;
