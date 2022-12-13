
import { base_api } from "../../env.config";
const BASE_URL = base_api.URL;
export const apiConstants = {
  
  //quản lý người dùng
  // LOGIN: "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
  LOGIN: BASE_URL+"/user",
  USER_REG: "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
  USER_UPDATE:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
  USER_ADD:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
  USER_DELETE:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=",
  USER_INFO:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
  USER_SEARCH:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01",
  //Quản lý khóa học
  COURSE_LIST:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
  COURSE_LIST_SEARCH:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?",
  COURSE_DETAIL:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=",
  COURSE_CHECK_HV:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=",
  COURSE_GROUP:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
  COURSE_GROUPBY:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?",
  COURSE_REG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc",
  COURSE_CANCEL_REG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh",
  COURSE_ADD:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc",
  COURSE_DELETE:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=",
  COURSE_UPDATE:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc",
  COURSE_IMG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
  //quản lý nâng cao
  COURSE_USER_LIST:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
  COURSE_USER_NOTIN:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
  COURSE_USER_IN:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
  COURSE_USER_INCHECK:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
  COURSE_USER_REG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
  COURSE_USER_CANEL_REG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh",
  COURSE_USER_NOTREG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh",
  COURSE_USER_INREG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
  COURSE_USER_HOLD_REG:
    "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
};
