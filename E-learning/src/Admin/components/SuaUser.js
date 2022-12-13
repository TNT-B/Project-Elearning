import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/_actions';
import { apiConstants } from '../../redux/_constants';
const { Option, OptGroup } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} không được để trống!',
  types: {
    email: '${label} không đúng định dạng email!',
    number: '${label} không đúng định dạng số!',
  },
  number: {
    range: '${label} phải bao gồm 10 số',
  },
};
const stateUser = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  email: '',
  soDT: '',
  maLoaiNguoiDung: '',
  maNhom: 'GP01'
}
const stateModal = {
  ModalText: 'Content of the modal',
  visible: false,
  confirmLoading: false,
};

function SuaUser(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(props.loading);
  const [inputs, setInputs] = useState(stateUser);
  const [Modals, setModals] = useState(stateModal);

  const { taiKhoan, matKhau, email, hoTen, soDT, maLoaiNguoiDung } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;

  const [form] = Form.useForm();

  // useEffect(() => {
  //   setInputs({
  //     ...inputs,
  //     taiKhoan: props.taiKhoanUser,
  //     matKhau: props.matKhauUser,
  //     hoTen: props.hoTenUser,
  //     email: props.emailUser,
  //     soDt: props.soDTUser,
  //     maLoaiNguoiDung: props.maLoaiNguoiDungUser,
  //   });
  // console.log(inputs);
  // }, []);

  useEffect(() => {
    setInputs({
      ...inputs,
      taiKhoan: props.taiKhoanUser,
      matKhau: props.matKhauUser,
      hoTen: props.hoTenUser,
      email: props.emailUser,
      soDT: props.soDTUser,
      maNhom: "GP01",
      maLoaiNguoiDung: props.maLoaiNguoiDungUser,
    });
    // console.log(inputs);
  }, [visible]);
  const showModal = () => {
    // dispatch(userActions.getId(props.taiKhoanUser));
    setModals({
      visible: true,
    });
  };
  const handleOk = () => {
    setModals({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  const handleCancel = () => {
    setModals({
      visible: false,
    });
    // form.resetFields();
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    console.log(inputs);
  }
  const handleChangeOption = (value) => {
    // const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, maLoaiNguoiDung: value }));
    // console.log(inputs);
  }
  const handleSubmit = () => {
    // console.log(inputs);
    dispatch(userActions.updateuser(inputs));
    setLoading(true);
    setModals({
      // ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 3000);


    // form.resetFields();
    // else {
    //   setModals({
    //     visible: true,
    //     confirmLoading: false,
    //   });
    // }
  }

  return (
    <>
      <Button type="default" onClick={showModal} size="small">Sửa</Button>
      <Modal title="Thêm người dùng"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      // onExit={props.reload}
      >
        <Form {...layout} form={form} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
          <Form.Item label="Tài Khoản" rules={[{ required: true }]}>
            <Input name="taiKhoan" value={taiKhoan} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password name="matKhau" value={matKhau} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email" rules={[{ type: 'email' }, { required: true }]}>
            <Input name="email" value={email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Số điện thoại" rules={[{ type: 'number', min: 0, max: 999999999, required: true }]}>
            <Input style={{ width: 200 }} name="soDT" value={soDT} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Họ và tên" >
            <Input name="hoTen" value={hoTen} onChange={handleChange} />
          </Form.Item>
          <Form.Item name="maNhom" initialValue="GP01" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Loại người dùng" >
            <Select name="maLoaiNguoiDung" style={{ width: 200 }} defaultValue={maLoaiNguoiDung} onChange={handleChangeOption}>
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

export default SuaUser;
