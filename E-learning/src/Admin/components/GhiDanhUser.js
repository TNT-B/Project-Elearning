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

function GhiDanhUser(props) {
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
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          {/* <Button type="primary" size="small">Xác thực</Button> */}
          <Button type="default" danger size="small" onClick={() => handleHuyGhiDanh(record.maKhoaHoc, record.tenKhoahoc, record.biDanh)}>Hủy</Button>
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

  const { items_courses_notreg, items_courses_reg, items_courses_holdreg } = useSelector(state => state.courses);
  const [Modals, setModals] = useState(stateModal);
  const [courseReg, setCourseReg] = useState(courseState);
  const { ModalText, visible, confirmLoading } = Modals;
  const [selected, setSelected] = useState();


  let selectValue = false;
  const dispatch = useDispatch();

  const searchState_Reg = {
    filteredInfo: null,
    sortedInfo: null,
    data1: items_courses_reg,
    filtered: false,
    searchText1: ""
  };
  const [searchStateReg, setSearchStateReg] = useState(searchState_Reg);
  const { searchText1, data1 } = searchStateReg;

  const stateNotReg = {
    data: items_courses_notreg,
  }

  const [searchStateNotReg, setStateNotReg] = useState(stateNotReg);
  const { data } = searchStateNotReg;

  const searchState_HoldReg = {
    filteredInfo: null,
    sortedInfo: null,
    data2: items_courses_holdreg,
    filtered: false,
    searchText2: ""
  };
  const [searchStateHoldReg, setSearchStateHoldReg] = useState(searchState_HoldReg);
  const { searchText2, data2 } = searchStateHoldReg;

  useEffect(() => {
    setSearchStateReg({
      data1: items_courses_reg,
    });

  }, [items_courses_reg]);

  useEffect(() => {
    setStateNotReg({
      data: items_courses_notreg,
    });
  }, [items_courses_notreg]);

  useEffect(() => {
    dispatch(courseActions.getAllCourseNotReg(apiConstants.COURSE_USER_NOTREG + `?taiKhoan=${props.taiKhoanUser}`, "POST"));
    dispatch(courseActions.getAllCourseReg(props.taiKhoanUser, apiConstants.COURSE_USER_INREG, "POST"));
    dispatch(courseActions.getAllCourseHoldReg(props.taiKhoanUser, apiConstants.COURSE_USER_HOLD_REG, "POST"));
  }, [visible]);

  const showModal = () => {
    setModals({
      visible: true,
    });
    setSearchStateReg({
      filteredInfo: null,
      sortedInfo: null,
      data1: items_courses_reg,
      filtered: false,
      searchText1: ""
    });
    setSearchStateHoldReg({
      filteredInfo: null,
      sortedInfo: null,
      data2: items_courses_holdreg,
      filtered: false,
      searchText2: ""
    });
    setStateNotReg({
      data: items_courses_notreg,
    });
  };
  const handleCancel = () => {
    setModals({
      visible: false,
    });

  };
  const handleChangeReg = (pagination, filters, sorter) => {
    setSearchStateReg({
      filteredInfo: filters,
      sortedInfo: sorter,
      data1: items_courses_reg,
      searchText1: searchText1,
    });
  }
  const handleChangeHoldReg = (pagination, filters, sorter) => {
    setSearchStateHoldReg({
      filteredInfo: filters,
      sortedInfo: sorter,
      data2: items_courses_holdreg,
      searchText2: searchText2,
    });
  }
  const handleChangeOption = (value, optionLabelProp) => {
    // maKhoaHoc = value;
    setSelected(value);
    setCourseReg({
      ...courseReg,
      maKhoaHoc: value,
      tenKhoaHoc: optionLabelProp.children
    });
  }
  // Ghi danh=============================>
  const handleGhiDanh = (value) => {
    if (courseReg.maKhoaHoc !== '') {
      dispatch(courseActions.regiterCourse(courseReg.maKhoaHoc, props.taiKhoanUser, apiConstants.COURSE_USER_REG, "POST", courseReg, items_courses_reg, items_courses_notreg))
      setSelected(null);
    }
    else message.error("Bạn chưa chọn khóa học");
  }
  const handleHuyGhiDanh = (maKHOAHOC, tenKHOAHOC,biDANH) => {
    setCourseReg({
      ...courseReg,
      maKhoaHoc: maKHOAHOC,
      tenKhoaHoc: tenKHOAHOC,
      biDanh: biDANH
    });
    dispatch(courseActions.unregiterCourse(maKHOAHOC, props.taiKhoanUser, apiConstants.COURSE_USER_CANEL_REG, "POST", courseReg, items_courses_reg, items_courses_notreg));
    setSelected(null);
    setSearchStateReg({
      data1: items_courses_reg,
    });
    setStateNotReg({
      data: items_courses_notreg,
    });

  }

  const onSearchReg = e => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(items_courses_reg, record => {
      const nameMatch = get(record, "maKhoaHoc").match(reg);
      const addressMatch = get(record, "tenKhoaHoc").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter(record => !!record);
    // console.log("data", filteredData);    
    setSearchStateReg({
      filtered: !!e.target.value,
      data1: e.target.value ? filteredData : items_courses_reg,
      searchText1: e.target.value,
    });
  };

  const onSearchHoldReg = e => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(items_courses_holdreg, record => {
      const nameMatch = get(record, "maKhoaHoc").match(reg);
      const addressMatch = get(record, "tenKhoaHoc").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter(record => !!record);
    // console.log("data", filteredData);    
    setSearchStateHoldReg({
      filtered: !!e.target.value,
      data2: e.target.value ? filteredData : items_courses_holdreg,
      searchText2: e.target.value,
    });
  };
  const clearAllReg = () => {
    setSearchStateReg({
      filteredInfo: null,
      sortedInfo: null,
      data1: items_courses_reg,
      searchText1: "",
      filtered: null
    });
  };
  const clearAllHoldReg = () => {
    setSearchStateHoldReg({
      filteredInfo: null,
      sortedInfo: null,
      data2: items_courses_holdreg,
      searchText2: "",
      filtered: null
    });
  };

  const renderTable1 = (data) => {
    return <Table
      size="small"
      style={{ width: "100%" }}
      pagination={{ pageSize: 3 }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      // rowKey={record => record.key}
      onChange={handleChangeReg}
    />
  }
  const renderTable2 = (data) => {
    return <Table
      size="small"
      style={{ width: "100%" }}
      pagination={{ pageSize: 3 }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      // rowKey={record => record.key}
      onChange={handleChangeHoldReg}
    />
  }

  const renderSelectData = (dt) => {
    return dt?.map((courses) => {
      return <Option value={courses?.maKhoaHoc}>{courses?.tenKhoaHoc}</Option>
    })

  }

  return (
    <>
      <Button type="primary" onClick={showModal} size="small">Ghi Danh</Button>
      <Modal title="Quản lý ghi danh học viên"
        visible={visible}
        // onOk={}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
        destroyOnClose
        footer={
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>}
      >
        <Row justify="between">
          <Col flex={1}>
            <Select
              showSearch
              onChange={handleChangeOption}
              style={{ width: "100%" }}
              placeholder="Tìm kiếm khóa học"
              optionFilterProp="children"
              value={selected}
              // defaultValue={'Tìm kiếm khóa học'}
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
        <Divider orientation="left">Khóa học chờ xác thực</Divider>
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
        <Divider orientation="left">Khóa học đã tham gia</Divider>
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

export default GhiDanhUser;
