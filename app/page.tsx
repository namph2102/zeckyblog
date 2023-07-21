import Link from "next/link";
import { Footer, Header } from "./component";
import ShareSocial from "./component/ShareSocial";
import { DOMAIN_HOST } from "./sevices/untils";

import cateController from "./sevices/controller/cateController";
export default async function Home() {
  const { listCate } = await cateController.getAllcate();

  return (
    <div className="container mx-auto">
      <Header listMenu={listCate} />
      <main className="min-h-[60vh]">
        <h1 className="text-center text-color-head">
          Giới thiệu đôi nét về chúng tôi
        </h1>
        <ShareSocial link={DOMAIN_HOST || "https://blog.zecky.online/"} />
        <p className="indent-8">
          <a target="_blank" href="https://zecky.online/" className="font-bold">
            Zecky
          </a>{" "}
          là trang website nhắn tin, có tích hợp hỗ trợ về giải đáp thắc mắc của
          người dùng dựa trên ChatGPT-Plus bản mới nhất hoàn toàn miễn phí,
          không giới hạn, dễ dàng sử dụng và hỗ trợ hầu hết trên mọi thiết bị.
        </p>

        <p className="indent-8">
          Bạn đang cần nguồn tài liệu để học tập, ôn luyên thi Quốc gia, cần gia
          sư online để hướng dẫn giải đáp mọi thắc mắc trên mọi lĩnh vực. Chính
          là tôi đây! hãy đến với website
          <a target="_blank" href="https://zecky.online/" className="font-bold">
            {" "}
            zecky.online
          </a>{" "}
          để được hồi đáp 24/24. Lượng kiến thức từ hàng tỷ tỷ kho tài liệu uy
          tính trên thế giới được chúng tôi tổng hợp, gói gọn lại nên hãy yên
          tâm sử dụng nhé.
        </p>
        <p className="indent-8">
          Nếu bạn có niềm đam mê với việc sáng tác văn chương, truyện ngắn, tiểu
          thuyết, hoặc đọc sách hay có kiến thức về điều gì đó muốn chia sẻ cho
          mọi người biết. Hãy liên hệ
          <a
            target="_blank"
            href="https://www.facebook.com/namhoai2102"
            className="font-bold"
          >
            {" "}
            Admin
          </a>{" "}
          để được cấp tài khoản quản trị viên để tham gia sáng tạo các nội dung
          trong sạch lành mạnh góp phần tạo giá trị vật chất lẫn tinh thần cho
          xã hội ngày càng tốt đẹp hơn...
        </p>
        <p>
          <br />
        </p>
        <h2 className="text-color-head !text-2xl mt-4 haveunline">
          Một số tín năng hiện đại
        </h2>
        <p>
          <br />
        </p>
        <ul className="list-disc pl-12">
          <li>Giải đáp mọi thắc mắc với ChatGPT4-Plus</li>
          <li>Nhắn tin cho bạn bè, nhóm</li>
          <li>Gửi mọi tài liệu, âm thanh, đường dẫn</li>
          <li>Nghe nhạc </li>
          <li>Xem dự báo thời tiết </li>
          <li>Đọc tệp âm thanh thành nhiều ngôn ngữ khác nhau </li>
          <li>Xem tọa độ, tìm kiếm vị trí bản đồ </li>
        </ul>
        <p>
          <br />
        </p>
        <h2 className="text-color-head !text-2xl mt-4 haveunline">
          Chính sách bảo mật
        </h2>
        <p>
          <br />
        </p>
        <p className="indent-8">
          <a target="_blank" href="https://zecky.online/" className="font-bold">
            {" "}
            Zecky
          </a>{" "}
          được bảo mật nhờ chứng chỉ SSL (Secure Sockets Layer) là một loại
          chứng chỉ số được sử dụng để bảo mật thông tin truyền tải qua
          Internet. Nó đảm bảo rằng thông tin được truyền từ máy tính của người
          dùng đến máy chủ web mà không bị người thứ ba xem trộm hoặc thay đổi.
          Chứng chỉ SSL cung cấp cho người dùng và máy chủ một phương tiện để
          xác minh danh tính của nhau và thiết lập một kênh truyền an toàn để
          truyền thông tin.
        </p>
        <p className="indent-8">
          Hãy yên tâm khi sử dụng
          <a target="_blank" href="https://zecky.online/" className="font-bold">
            {" "}
            Zecky
          </a>
          , chúng tôi luôn đặt sự an toàn thông tin khách hàng lên hàng đầu khi
          họ đã tin tưởng đăng ký bằng thông tin cá nhân tại trang
          <a
            target="_blank"
            href="https://zecky.online/dang-ky"
            className="font-bold"
          >
            {" "}
            đăng ký{" "}
          </a>
          của chúng tôi.
        </p>
        <p>
          <br />
        </p>
        <h2 className="text-color-head !text-2xl mt-4 haveunline">
          Một số bài viết
        </h2>
        <p>
          <br />
        </p>
        <p className="indent-8">
          Nhiều tin tức nóng nổi được tuyển chọn từ các kênh truyền thông, báo
          nổi tiếng nhất trên thế giới để thỏa mãn nhu cầu bạn đọc. Hãy ghé thăm
          nhé!
        </p>
        <div className="text-center mt-8 hover:text-hover">
          <Link href="/tin-tuc">Xem tất cả bài viết 👈👈</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
