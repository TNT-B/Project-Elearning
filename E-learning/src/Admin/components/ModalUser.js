import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Option, OptGroup } = Select;
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
const onFinish = (values) => {
  console.log(values);
};

function ModalUser() {
  const stateUser = {
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  };
  const stateModal = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };
  const location = useLocation();
  const { registerError } = useSelector(state => state.registration);  
  const [regErr, setRegerr] = useState(registerError);
  const [inputs, setInputs] = useState(stateUser);
  const [Modals, setModals] = useState(stateModal);
  const { taiKhoan, matKhau, email, hoTen, soDT, maLoaiNguoiDung, maNhom } =
    inputs;
  const { ModalText, visible, confirmLoading } = Modals;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setModals({
      visible: true,
    });
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    form.resetFields();
    setModals({
      visible: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    // console.log(inputs);
  };
  const handleChangeOption = (value) => {
    // console.log(value);
    setInputs((inputs) => ({ ...inputs, maLoaiNguoiDung: value }));
  };
  const handleSubmit = (value) => {
    // dispatch(userActions.register(value, location.pathname));
    // if (registerError === '') {
    setModals({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 3000);
    // }
    // form.resetFields();
    // else {
    //   setModals({
    //     visible: true,
    //     confirmLoading: false,
    //   });
    // }
    console.log("tin debug: ", value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} size="small">
        Thêm người dùng
      </Button>
      <Modal
        title="Thêm người dùng"
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
            name="taiKhoan"
            value={taiKhoan}
            initialValue=""
            label="Tài Khoản"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="matKhau"
            value={matKhau}
            initialValue=""
            label="Mật khẩu"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            value={email}
            initialValue=""
            label="Email"
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soDT"
            value={soDT}
            initialValue=""
            label="Số điện thoại"
            rules={[{ type: "number", min: 0, max: 999999999, required: true }]}
          >
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            name="hoTen"
            value={hoTen}
            initialValue=""
            label="Họ và tên"
          >
            <Input />
          </Form.Item>
          <Form.Item name="maNhom" initialValue="GP01" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="maLoaiNguoiDung" label="Loại người dùng">
            <Select style={{ width: 200 }}>
              <Option value="GV">Giáo vụ</Option>
              <Option value="HV">Học viên</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}

export default ModalUser;
