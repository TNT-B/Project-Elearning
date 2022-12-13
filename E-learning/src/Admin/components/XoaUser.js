import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/_actions';
import { apiConstants } from "../../redux/_constants";
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
const onFinish = (values) => {
  console.log(values);
};


function XoaUser(props) {
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
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };

  const { user_deleted } = useSelector(state => state.users);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
    setModalText(`bạn có chắc muốn xóa người dùng ${props.taiKhoanUser} ?`)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    setModalText("đang thực hiện việc xóa người dùng...");
    setConfirmLoading(true);
    dispatch(userActions.delete(props.taiKhoanUser, apiConstants.USER_DELETE));
    if (user_deleted) {
      setModalText("thành công !");
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };
    setModalText("Không thành công");
    setConfirmLoading(false);
  }

  return (
    <>
      <Button type="default" onClick={showModal} danger size="small">Xóa</Button>
      <Modal title={`Xóa người dùng`}
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText='Lưu'
        cancelText='Hủy'
      >
        {modalText}
      </Modal>
    </>
  );
}

export default XoaUser;
