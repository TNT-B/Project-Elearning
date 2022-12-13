import { Button, Select, Modal, Form, Input, InputNumber, DatePicker, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../redux/_actions";
import { message } from "antd";

const { Option, OptGroup } = Select;
const dateFormat = 'DD/MM/YYYY';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} không được để trống!",
  types: {
    email: "${label} không đúng định dạng email!",
    number: "${label} không đúng định dạng số!",
  },
  number: {
    range: "${label} phải bao gồm 10 số",
  },
};

export default function ModalCoures() {
  const stateCourse = {
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: "",
  };

  const stateFiles = {
    fileList: [],
    uploading: false,
  };
  const dispatch = useDispatch();
  const { items_courses, items_group, Uploading, Added } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.authentication);
  const [inputs, setInputs] = useState(stateCourse);
  const [files, setFiles] = useState(stateFiles);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { uploading, fileList } = files;
  const [form] = Form.useForm();
  const {
    maKhoaHoc,
    tenKhoaHoc,
    moTa,
    luotXem,
    danhGia,
    hinhAnh,
    maNhom,
    ngayTao,
    maDanhMucKhoaHoc,
    taiKhoanNguoiTao,
  } = inputs;

  useEffect(() => {
    renderButton();
  }, [fileList]);

  const renderButton = () => {
    return <Button
      type="primary"
      onClick={handleUpload}
      disabled={fileList?.length === 0}
      loading={uploading}
      style={{ marginTop: 16 }}
    >
      {uploading ? 'Đang tải lên' : 'Bắt đầu tải lên'}
    </Button>
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    form.resetFields();
    setVisible(false);
  };

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return setFiles({
        fileList: newFileList,
      });
    },
    beforeUpload: file => {
      setFiles({
        fileList: [...fileList, file],
      });
      return false;
    },
    fileList,
  };


  const handleUpload = () => {
    const { fileList } = files;
    const formData = new FormData();
    if (inputs.tenKhoaHoc == "") {
      message.error("tên khóa học chưa có");
      return;
    }
    fileList.forEach(file => {
      formData.append('file', file);
      formData.append('tenKhoaHoc', inputs.tenKhoaHoc);
    });

    // setFiles({
    //   uploading: true,
    // });
    // dispatch(courseActions.uploadImg(formData));
    // setFiles({
    //   uploading: Uploading,
    // });
    setInputs(inputs => ({ ...inputs, hinhAnh: `https://elearning0706.cybersoft.edu.vn/hinhanh/${fileList[0].name}` }));
    return formData;
  };



  const handleChange = (e) => {
    // console.log("values", e.target);
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const handleChangeOption = (value) => {
    setInputs(inputs => ({ ...inputs, maDanhMucKhoaHoc: value, maNhom: "GP01", taiKhoanNguoiTao: user.taiKhoan }));
  }

  const handleChangeDate = (dateString) => {
    setInputs(inputs => ({ ...inputs, ngayTao: dateString }));
  }

  const handleSubmit = () => {
    // console.log("inputs", inputs);
    dispatch(courseActions.addCourse(inputs, handleUpload()));
    if (Added == true) {
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 3000);
    }
  };
  const children = [];
  for (let i = 0; i < items_group?.length; i++) {
    children.push(<Option value={items_group[i].maDanhMuc} key={items_group[i].maDanhMuc}>{items_group[i].tenDanhMuc}</Option>);
  }
  return (
    <>
      <Button type="primary" onClick={showModal} size="small">
        Thêm khoá học
      </Button>
      <Modal
        title="Thêm khoá học"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="1" value={maKhoaHoc} onChange={handleChange}
            initialValue=""
            label="Mã khoá học"
            rules={[{ required: true }]}
          >
            <Input name="maKhoaHoc" />
          </Form.Item>
          <Form.Item
            name="2" value={tenKhoaHoc} onChange={handleChange}
            initialValue=""
            label="Tên khoá học"
            rules={[{ required: true }]}
          >
            <Input name="tenKhoaHoc" />
          </Form.Item>
          <Form.Item
            name="3" value={moTa} onChange={handleChange}
            initialValue=""
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <Input name="moTa" />
          </Form.Item>
          <Form.Item
            name="hinhAnh"
            value={hinhAnh}
            initialValue=""
            label="Hình ảnh"
          // rules={[{ required: true }]}
          >
            <Upload {...props} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {/* {renderButton()} */}
          </Form.Item>
          <Form.Item
            name="ngayTao"
            initialValue=""
            label="Ngày tạo"
            // value={ngayTao}
            rules={[{ required: true }]}
          >
            <DatePicker format={dateFormat} placeholder="Chọn ngày tạo" onChange={(date, dateString) => handleChangeDate(dateString)} />
          </Form.Item>
          <Form.Item label="Danh mục khóa học" rules={[{ required: true }]} name="maDanhMucKhoaHoc" >
            <Select style={{ width: 200 }} onChange={handleChangeOption}>
              {children}
            </Select>
          </Form.Item>
          <Form.Item
            name="7" value={taiKhoanNguoiTao}
            initialValue={user.taiKhoan}
            label="Tài khoản người tạo"
            hidden
          >
            <Input name="taiKhoanNguoiTao" />
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
}
