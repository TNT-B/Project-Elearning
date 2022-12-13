import { message, Button, Select, Modal, Form, Input, InputNumber, Space, Row, Col, Table, Divider } from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { map, includes, sortBy, uniqBy, each, result, get } from 'lodash';
import { userActions } from '../../redux/_actions';
import { courseActions } from '../../redux/_actions';
import { apiConstants } from '../../redux/_constants';
var _ = require('lodash');

const Search = Input.Search;
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

function GhiDanhCourse(props) {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => (
        index + 1
      ),
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
    },
    {
      title: 'họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button type="default" danger size="small" onClick={() => handleHuyGhiDanh(record.taiKhoan, record.hoTen, record.biDanh)}>Hủy</Button>
        </Space>
      ),
    },
  ];
  const stateUser = {
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDT: '',
    maLoaiNguoiDung: '',
    maNhom: 'GP01'
  }
  const userState = {
    taiKhoan: '',
    hoTen: '',
    biDanh: '',
  }
  const courseState = {
    maKhoaHoc: '',
    tenKhoaHoc: '',
    biDanh: ''
  }
  const stateModal = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  const { users_notreg, users_reg, users_holdreg } = useSelector(state => state.users);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [Modals, setModals] = useState(stateModal);
  const [userReg, setUserReg] = useState(userState);
  // const { ModalText, visible, confirmLoading } = Modals;
  const [selected, setSelected] = useState();


  let selectValue = false;
  const dispatch = useDispatch();

  const searchState_Reg = {
    filteredInfo: null,
    sortedInfo: null,
    data1: users_reg,
    filtered: false,
    searchText1: ""
  };

  const stateNotReg = {
    data: users_notreg,
  }

  const [searchStateNotReg, setStateNotReg] = useState(stateNotReg);
  const [searchStateReg, setSearchStateReg] = useState(searchState_Reg);
  const { data } = searchStateNotReg;
  const { searchText1, data1 } = searchStateReg;

  const searchState_HoldReg = {
    filteredInfo: null,
    sortedInfo: null,
    data2: users_holdreg,
    filtered: false,
    searchText2: ""
  };
  const [searchStateHoldReg, setSearchStateHoldReg] = useState(searchState_HoldReg);
  const { searchText2, data2 } = searchStateHoldReg;

  useEffect(() => {
    setSearchStateReg({
      data1: users_reg,
    });

  }, [users_reg]);
  useEffect(() => {
    setStateNotReg({
      data: users_notreg,
    });
  }, [users_notreg]);
  useEffect(() => {
    setSearchStateReg({
      data2: users_holdreg,
    });        
  }, [users_holdreg]);


  useEffect(() => {
    dispatch(userActions.getAllListNotreg(apiConstants.COURSE_USER_NOTIN, props.makhoaHocCourse, "POST"));
    dispatch(userActions.getAllListReg(props.makhoaHocCourse, apiConstants.COURSE_USER_IN, "POST"));
    dispatch(userActions.getAllListHoldReg(props.makhoaHocCourse, apiConstants.COURSE_USER_INCHECK, "POST"));
  }, [visible]);

  const showModal = () => {
    setVisible(true);
    setSearchStateReg({
      filteredInfo: null,
      sortedInfo: null,
      data1: users_reg,
      filtered: false,
      searchText1: ""
    });
    setSearchStateHoldReg({
      filteredInfo: null,
      sortedInfo: null,
      data2: users_holdreg,
      filtered: false,
      searchText2: ""
    });
    setStateNotReg({
      data: users_notreg,
    });
  };
  const handleCancel = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleChangeReg = (pagination, filters, sorter) => {
    setSearchStateReg({
      filteredInfo: filters,
      sortedInfo: sorter,
      data1: users_reg,
      searchText1: searchText1,
    });
  }
  const handleChangeHoldReg = (pagination, filters, sorter) => {
    setSearchStateHoldReg({
      filteredInfo: filters,
      sortedInfo: sorter,
      data2: users_holdreg,
      searchText2: searchText2,
    });
  }
  const handleChangeOption = (value, optionLabelProp) => {
    setSelected(value);
    setUserReg({
      ...userReg,
      taiKhoan: value,
      hoTen: optionLabelProp.children
    });
  }
  // Ghi danh=============================>
  const handleGhiDanh = () => {
    if (userReg.maKhoaHoc !== '') {
      dispatch(userActions.regiterCourseUser(userReg.taiKhoan, props.makhoaHocCourse, apiConstants.COURSE_USER_REG, "POST", userReg, users_reg, users_notreg))
      setSelected(null);
    }
    else message.error("Bạn chưa chọn học viên");
  }
  const handleHuyGhiDanh = (taiKhoanUser, hoTenUser, biDanhUser) => {
    setUserReg({
      ...userReg,
      taiKhoan: taiKhoanUser,
      hoTen: hoTenUser,
      biDanh: biDanhUser
    });
    dispatch(userActions.unregiterCourseUser(taiKhoanUser, props.makhoaHocCourse, apiConstants.COURSE_USER_CANEL_REG, "POST", userReg, users_reg, users_notreg))
    setSelected(null);
    setSearchStateReg({
      data1: users_reg,
    });
    setStateNotReg({
      data: users_notreg,
    });
  }

  const onSearchReg = e => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(users_reg, record => {
      const nameMatch = get(record, "taiKhoan").match(reg);
      const addressMatch = get(record, "hoTen").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter(record => !!record);

    setSearchStateReg({
      filtered: !!e.target.value,
      data1: e.target.value ? filteredData : users_reg,
      searchText1: e.target.value,
    });
  };

  const onSearchHoldReg = e => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(users_holdreg, record => {
      const nameMatch = get(record, "taiKhoan").match(reg);
      const addressMatch = get(record, "hoTen").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter(record => !!record);

    setSearchStateHoldReg({
      filtered: !!e.target.value,
      data2: e.target.value ? filteredData : users_holdreg,
      searchText2: e.target.value,
    });
  };
  const clearAllReg = () => {
    setSearchStateReg({
      filteredInfo: null,
      sortedInfo: null,
      data1: users_reg,
      searchText1: "",
      filtered: null
    });
  };
  const clearAllHoldReg = () => {
    setSearchStateHoldReg({
      filteredInfo: null,
      sortedInfo: null,
      data2: users_holdreg,
      searchText2: "",
      filtered: null
    });
  };

  const renderTable1 = (dt) => {
    return <Table
      size="small"
      style={{ width: "100%" }}
      pagination={{ pageSize: 3 }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={dt}
      // rowKey={record => record.key}
      onChange={handleChangeReg}
    />
  }
  const renderTable2 = (dt) => {
    return <Table
      size="small"
      style={{ width: "100%" }}
      pagination={{ pageSize: 3 }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={dt}
      // rowKey={record => record.key}
      onChange={handleChangeHoldReg}
    />
  }

  const renderSelectData = (dt) => {
    return dt?.map((users) => {
      return <Option value={users?.taiKhoan}>{users?.hoTen}</Option>
    })
  }
  return (
    <>
      <Button type="primary" onClick={showModal} size="small">Ghi Danh</Button>
      <Modal title="Quản lý ghi danh khóa học"
        visible={visible}
        onOk={handleCancel}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
        destroyOnClose
        // okText='Đóng'        
        footer={
          <Button key="back" onClick={handleCancel} type="primary" >
            Đóng
          </Button>}
      >
        <Row justify="between">
          <Col flex={1}>
            <Select
              showSearch
              onChange={handleChangeOption}
              style={{ width: "100%" }}
              placeholder="Tìm kiếm học viên"
              optionFilterProp="children"
              value={selected}
              // defaultValue={'Tìm kiếm người dùng'}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >

              {renderSelectData(data)}
            </Select>
          </Col>
          <Col>
            <Button type="primary" onClick={handleGhiDanh}>Ghi danh</Button>
          </Col>
        </Row>
        <Divider orientation="left">Học viên chờ xác thực</Divider>
        <Search
          size="small"
          onChange={onSearchHoldReg}
          placeholder="Tìm kiếm dữ liệu"
          value={searchText2}
          onPressEnter={onSearchHoldReg}
          style={{ width: 200 }}
        />
        <Button size="small" onClick={clearAllHoldReg}>Làm mới</Button>
        <Row>
          {renderTable1(data2)}
        </Row>
        <Divider orientation="left">Học viên đã tham gia</Divider>
        <Search
          size="small"
          onChange={onSearchReg}
          placeholder="Tìm kiếm dữ liệu"
          value={searchText1}
          onPressEnter={onSearchReg}
          style={{ width: 200 }}
        />
        <Button size="small" onClick={clearAllReg}>Làm mới</Button>
        <Row>
          {renderTable2(data1)}
        </Row>
      </Modal>
    </>
  );
}

export default GhiDanhCourse;
