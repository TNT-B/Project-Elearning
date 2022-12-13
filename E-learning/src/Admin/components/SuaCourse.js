import { Button, Select, Modal, Form, Input, InputNumber, Upload, Image, message } from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, userActions } from '../../redux/_actions';
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
  soDt: '',
  maLoaiNguoiDung: '',
  maNhom: 'GP01'
}
const stateModal = {
  ModalText: 'Content of the modal',
  visible: false,
  confirmLoading: false,
};
const stateCourse = {
  maKhoaHoc: '',
  biDanh: '',
  tenKhoaHoc: '',
  moTa: '',
  luotXem: 0,
  hinhAnh: '',
  maNhom: 'GP01',
  ngayTao: '',
  maDanhMucKhoaHoc: '',
  taiKhoanNguoiTao: ''
}
const stateFiles = {
  fileList: [],
  uploading: false,
};
function SuaCourse(props) {
  const { items, items_group } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.authentication);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(stateFiles);
  const [inputs, setInputs] = useState(stateCourse);
  const [Modals, setModals] = useState(stateModal);

  const { maKhoaHoc, biDanh, tenKhoaHoc, moTa, hinhAnh, maNhom, luotXem, maDanhMucKhoaHoc, taiKhoanNguoiTao, ngayTao } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;
  const { uploading, fileList } = files;
  const [form] = Form.useForm();


  useEffect(() => {
    setInputs({
      maKhoaHoc: items?.maKhoaHoc,
      biDanh: items?.biDanh,
      tenKhoaHoc: items?.tenKhoaHoc,
      moTa: items?.moTa,
      luotXem: items?.luotXem,
      hinhAnh: items?.hinhAnh,
      maNhom: items?.maNhom,
      ngayTao: items?.ngayTao,
      maDanhMucKhoaHoc: items?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: items?.nguoiTao.taiKhoan
    });
  }, [items]);
  const showModal = () => {
    dispatch(courseActions.getCourseById(apiConstants.COURSE_DETAIL, props.makhoaHocCourse));
    // setInputs({      
    //   maKhoaHoc: items?.maKhoaHoc,
    //   biDanh: items?.biDanh,
    //   tenKhoaHoc: items?.tenKhoaHoc,
    //   moTa: items?.moTa,
    //   luotXem: items?.luotXem,
    //   danhGia: items?.danhGia,
    //   hinhAnh: items?.hinhAnh,
    //   maNhom: items?.maNhom,
    //   ngayTao: items?.ngayTao,
    //   maDanhMucKhoaHoc: items?.danhMucKhoaHoc.maDanhMucKhoahoc,
    //   taiKhoanNguoiTao: items?.nguoiTao.taiKhoan
    // });
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
    setInputs({ ...inputs, [name]: value });    
  }
  const handleChangeOption = (value) => {
    setInputs({ ...inputs, maDanhMucKhoaHoc: value });
  }
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
    // setInputs(inputs => ({ ...inputs, hinhAnh: `https://elearning0706.cybersoft.edu.vn/hinhanh/${fileList[0].name}` }));
    return formData;
  };
  const handleSubmit = () => {
    console.log(inputs);
    if(fileList.length > 0)
    {
      dispatch(courseActions.updateCourse(inputs, handleUpload(),true));
    }
    else
    {
      dispatch(courseActions.updateCourse(inputs, handleUpload(),false));
    }
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

  }
  const children = [];
  for (let i = 0; i < items_group?.length; i++) {
    children.push(<Option value={items_group[i].maDanhMuc} key={items_group[i].maDanhMuc}>{items_group[i].tenDanhMuc}</Option>);
  }
  const propsUpload = {
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
  return (
    <>
      <Button type="default" onClick={showModal} size="small">Sửa</Button>
      <Modal title="Cập nhật khóa học"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form {...layout} form={form} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
          <Form.Item label="Mã khóa học" rules={[{ required: true }]}>
            <Input name="maKhoaHoc" value={maKhoaHoc} initialValue={maKhoaHoc} onChange={handleChange} />
          </Form.Item>
          <Form.Item initialValue={tenKhoaHoc} label="Tên khóa học" rules={[{ required: true }]}>
            <Input name="tenKhoaHoc" value={tenKhoaHoc} onChange={handleChange} />
          </Form.Item>
          <Form.Item initialValue={biDanh} label="Bí danh" rules={[{ required: true }]}>
            <Input name="biDanh" value={biDanh} onChange={handleChange} />
          </Form.Item>
          <Form.Item initialValue={moTa} label="Mô tả">
            <Input name="moTa" value={moTa} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            value={hinhAnh}
            initialValue={hinhAnh}
            label="Hình ảnh"
          // rules={[{ required: true }]}
          >
            <Image
              name="hinhAnh"
              width={200}
              src={hinhAnh}
            />
            <Upload {...propsUpload} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {/* {renderButton()} */}
          </Form.Item>
          {/* <Form.Item name="maNhom" initialValue="GP01" >
            <Input />
          </Form.Item> */}
          <Form.Item label="Danh mục khóa học" rules={[{ required: true }]} >
            <Select name="maDanhMucKhoaHoc" style={{ width: 200 }} onChange={handleChangeOption} defaultValue={maDanhMucKhoaHoc}>
              {children}
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={taiKhoanNguoiTao}
            label="Tài khoản người tạo"
          >
            <Input name="taiKhoanNguoiTao" value={taiKhoanNguoiTao} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SuaCourse;
