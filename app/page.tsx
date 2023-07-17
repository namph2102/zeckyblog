import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-color-head">
        Giới thiệu đôi nét về Zecky
      </h1>
      <p className="indent-8">
        <a target="_blank" href="https://zecky.online/" className="font-bold">
          Zecky
        </a>{" "}
        là trang website nhắn tin, có tích hợp hỗ trợ về giải đáp thắt mắc của
        người dùng dựa trên ChatGPT-Plus bản mới nhất hoàn toàn miễn phí, không
        giới hạn, dễ dàng sử dụng và hỗ trợ hầu hết trên mọi thiết bị.
      </p>
      <p className="indent-8">
        Bạn đang cần nguồn tài liệu để học tập, ôn luyên thi Quốc gia, cần gia
        sư online để hướng dẫn giải đáp mọi thắc mắc trên mọi lĩnh vực. Chính là
        tôi đây! hãy đến với website
        <a target="_blank" href="https://zecky.online/" className="font-bold">
          {" "}
          zecky.online
        </a>{" "}
        để được hồi đáp 24/24. Lượng kiến thức từ hàng tỷ tỷ kho tài liệu uy
        tính trên thế giới được chúng tôi tổng hợp, gói gọn lại nên hãy yên tâm
        sử dụng nhé.
      </p>
      <h2 className="text-color-head !text-2xl mt-4">
        Một số tín năng hiện đại
      </h2>
      <ul className="list-disc px-4 text-base">
        <li>Giải đáp mọi thắc mắc với ChatGPT4-Plus</li>
        <li>Nhắn tin cho bạn bè, nhóm</li>
        <li>Gửi mọi tài liệu, Âm thanh, Link</li>
        <li>Nghe nhạc </li>
        <li>Xem dự báo thời tiết </li>
        <li>Đọc file âm thanh thành nhiều ngôn ngữ khác nhau </li>
        <li>Xem tọa độ, tìm kiếm vị trí bản đồ </li>
      </ul>
      <h2 className="text-color-head !text-2xl mt-4">Chính sách bảo mật</h2>
      <p className="indent-8">
        <a target="_blank" href="https://zecky.online/" className="font-bold">
          {" "}
          Zecky
        </a>{" "}
        được bảo mật nhờ chứng chỉ SSL (Secure Sockets Layer) là một loại chứng
        chỉ số được sử dụng để bảo mật thông tin truyền tải qua Internet. Nó đảm
        bảo rằng thông tin được truyền từ máy tính của người dùng đến máy chủ
        web mà không bị người thứ ba xem trộm hoặc thay đổi. Chứng chỉ SSL cung
        cấp cho người dùng và máy chủ một phương tiện để xác minh danh tính của
        nhau và thiết lập một kênh truyền an toàn để truyền thông tin.
      </p>
      <p className="indent-8">
        Hãy yên tâm khi sử dụng
        <a target="_blank" href="https://zecky.online/" className="font-bold">
          {" "}
          Zecky
        </a>
        , chúng tôi luôn đặt sự an toàn thông tin khách hàng lên hàng đầu khi họ
        đã tin tưởng đăng ký bằng thông tin cá nhân tại trang
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
      <h2 className="text-color-head !text-2xl mt-4">Một số bài viết</h2>
      <p className="indent-8">
        Nhiều tin tức nóng nổi được tuyển chọn từ các kênh truyền thông, báo nổi
        tiếng nhất trên thế giới để thỏa mãn nhu cầu bạn đọc. Hãy ghé thăm nhé!
      </p>
      <Link href="/blog">xem tất cả bài viết 👈👈</Link>
    </main>
  );
}
