import React, { useEffect, Fragment, useState } from "react";
import { Select, Input, Table, Button, Space, Card, Image } from "antd";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../redux/_actions";
import { apiConstants } from "../../redux/_constants";
import ModalCoures from "../components/ModalCoures";
import GhiDanhCourse from "../components/GhiDanhCourse";
import SuaCourse from "../components/SuaCourse";
import XoaCourse from "../components/XoaCourse";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward Khoa ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// export default class ManageCourse extends React.Component {
//   state = {
//     selectedRowKeys: [], // Check here to configure the default column
//   };

//   onSelectChange = (selectedRowKeys) => {
//     console.log("selectedRowKeys changed: ", selectedRowKeys);
//     this.setState({ selectedRowKeys });
//   };

//   render() {
//     const { selectedRowKeys } = this.state;
//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange,
//       selections: [
//         Table.SELECTION_ALL,
//         Table.SELECTION_INVERT,
//         Table.SELECTION_NONE,
//         {
//           key: "odd",
//           text: "Select Odd Row",
//           onSelect: (changableRowKeys) => {
//             let newSelectedRowKeys = [];
//             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
//               if (index % 2 !== 0) {
//                 return false;
//               }
//               return true;
//             });
//             this.setState({ selectedRowKeys: newSelectedRowKeys });
//           },
//         },
//         {
//           key: "even",
//           text: "Select Even Row",
//           onSelect: (changableRowKeys) => {
//             let newSelectedRowKeys = [];
//             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
//               if (index % 2 !== 0) {
//                 return true;
//               }
//               return false;
//             });
//             this.setState({ selectedRowKeys: newSelectedRowKeys });
//           },
//         },
//       ],
//     };
//     return (
//       <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
//     );
//   }
// }
const Search = Input.Search;
const initState = {
  selectedRowKeys: [],
};

export default function ManageCourses() {
  const columns = [
    {
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    // {
    //   title: "Mã nhóm",
    //   dataIndex: "maNhom",
    //   key: "maNhom",
    // },
    // {
    //   title: "Mô tả",
    //   dataIndex: "moTa",
    //   key: "moTa",
    // },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record) => (
        <Image
          width={100}
          src={record.hinhAnh}
        />
      ),
    },
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "ngayTao",
    //   key: "ngayTao",
    // },
    {
      title: "Người tạo",
      render: (text, record) => (record.nguoiTao.hoTen),
    },
    // {
    //   title: "Danh mục khóa học",
    //   render: (text, record) => (record.danhMucKhoaHoc.tenDanhMucKhoaHoc),
    // },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <GhiDanhCourse makhoaHocCourse={record.maKhoaHoc} />
          <SuaCourse makhoaHocCourse={record.maKhoaHoc}/>
          <XoaCourse maKhoaHocCourse={record.maKhoaHoc} />
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const [selectedRowKeyss, setselectedRowKeys] = useState(initState);
  const { items_courses } = useSelector(state => state.courses);
  const { selectedRowKeys } = selectedRowKeyss;

  const searchState = {
    filteredInfo: null,
    sortedInfo: null,
    datas: items_courses,
    filtered: false,
    searchText: "",
  };
  const [searchStates, setsearchState] = useState(searchState);
  const { searchText, datas } = searchStates;

  useEffect(() => {
    dispatch(courseActions.getAll(apiConstants.COURSE_GROUP));
    dispatch(courseActions.getAllCourse(apiConstants.COURSE_LIST));
  }, []);
  useEffect(() => {
    setsearchState({ datas: items_courses });
  }, [items_courses]);

  const clearAll = () => {
    setsearchState({
      filteredInfo: null,
      sortedInfo: null,
      datas: items_courses,
      searchText: "",
      filtered: null,
    });
  };
  // const handleSuaCourse = (maKhoaHoc) => {
  //   dispatch(courseActions.getCourseById(apiConstants.COURSE_DETAIL, maKhoaHoc));
  // }

  const onSelectChange = (selectedRowKeyss) => {
    console.log("selectedRowKeys changed: ", selectedRowKeyss);
    setselectedRowKeys({ selectedRowKeyss });
  };

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setsearchState({
      filteredInfo: filters,
      sortedInfo: sorter,
      datas: items_courses,
      searchText: searchText,
    });
  };

  const onSearch = (e) => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(datas, (record) => {
      const nameMatch = get(record, "tenKhoaHoc").match(reg);
      const addressMatch = get(record, "maKhoaHoc").match(reg);
      // const emailMatch = get(record.nguoiTao, "hoTen").match(reg);      
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter((record) => !!record);
    console.log("data", filteredData);
    setsearchState({
      searchText: e.target.value,
      filtered: !!e.target.value,
      datas: e.target.value ? filteredData : items_courses,
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setselectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setselectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
    ],
  };

  const renderTable = () => {
    return (
      <Table
        {...items_courses}
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={datas}
        rowKey={(record) => record.key}
        onChange={handleChange}
      />
    );
  };

  return (
    <Card title="Quản lý khoá học" className="gx-card">
      <div className="table-operations">
        <Space size="small">
          <Search
            size="small"
            // ref={searchText}
            // suffix={suffix}
            onChange={onSearch}
            placeholder="Tìm kiếm dữ liệu"
            value={searchText}
            onPressEnter={onSearch}
            style={{ width: 200 }}
          />
          <Button size="small" onClick={clearAll}>
            Làm mới
          </Button>
          <ModalCoures />
        </Space>
      </div>
      {renderTable()}
    </Card>
  );
}
