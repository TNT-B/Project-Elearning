import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, userActions } from '../../redux/_actions';
import { apiConstants } from "../../redux/_constants";


function XoaCourse(props) {
  const { course_deleted } = useSelector(state => state.courses);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
    setModalText(`bạn có chắc muốn xóa khóa học ${props.maKhoaHocCourse} ?`)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    setModalText("đang thực hiện việc xóa khóa học...");
    setConfirmLoading(true);
    dispatch(courseActions.delete(props.maKhoaHocCourse, apiConstants.COURSE_DELETE));
    if (course_deleted) {
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
      <Modal title={`Xóa khóa học`}
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

export default XoaCourse;
