import React, { useEffect, Fragment, useState } from 'react';
import { map, includes, sortBy, uniqBy, each, result, get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, Table, Button, Space, Card } from "antd";
import ModalUser from '../components/ModalUser';
import { userActions } from '../../redux/_actions';
import { apiConstants } from '../../redux/_constants';
import GhiDanhUser from '../components/GhiDanhUser';
import SuaUser from '../components/SuaUser';
import XoaUser from '../components/XoaUser';


const Search = Input.Search;
const initState = {
    selectedRowKeys: []
};
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
// ];
// const data = [
//     {
//         key: 0,
//         name: `Edward King Leo`,
//         age: 32,
//         address: `London`,
//     },
//     {
//         key: 1,
//         name: `Anh Khoa`,
//         age: 32,
//         address: `Saigon`,
//     },
//     {
//         key: 2,
//         name: `Van Teo`,
//         age: 32,
//         address: `Hue`,
//     },
//     {
//         key: 3,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 4,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 5,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 6,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 7,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 8,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 9,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     },
//     {
//         key: 10,
//         name: `Thi No`,
//         age: 32,
//         address: `Ha Noi`,
//     }
// ];

export default function ManageUser() {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
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
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'emai',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            key: 'soDt',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <GhiDanhUser taiKhoanUser={record.taiKhoan} />
                    <SuaUser
                        taiKhoanUser={record.taiKhoan}
                        matKhauUser={record.matKhau}
                        soDTUser={record.soDt}
                        emailUser={record.email}
                        hoTenUser={record.hoTen}
                        maLoaiNguoiDungUser={record.maLoaiNguoiDung}
                        tenLoaiNguoiDUngUser={record.tenLaoiNguoiDung}
                        // reload={reload}
                    />
                    <XoaUser taiKhoanUser={record.taiKhoan} />
                </Space>
            ),
        },
    ];
    const dispatch = useDispatch();
    const [selectedRowKeyss, setselectedRowKeys] = useState(initState);
    const { users } = useSelector(state => state.users);
    const { selectedRowKeys } = selectedRowKeyss;

    const searchState = {
        filteredInfo: null,
        sortedInfo: null,
        datas: users,
        filtered: false,
        searchText: ""
    };
    const [searchStates, setsearchState] = useState(searchState);
    const { searchText, datas } = searchStates;
    useEffect(() => {
        // dispatch(userActions.getAllList(apiConstants.COURSE_USER_LIST));
        dispatch(userActions.getAllList(apiConstants.USER_SEARCH));
    }, []);
    useEffect(() => {
        setsearchState({ datas: users });
    }, [users]);

    // useEffect(() => {
    //     renderTable()
    // },[users])
    const onSelectChange = selectedRowKeyss => {
        console.log('selectedRowKeys changed: ', selectedRowKeyss);
        setselectedRowKeys({ selectedRowKeyss });
    };
    const reload=()=>window.location.reload();
    const ondataChange = () => {
        setsearchState({
            filteredInfo: null,
            sortedInfo: null,
            datas: users,
            searchText: "",
            filtered: null
        });
    };

    const handleChange = (pagination, filters, sorter) => {
        // console.log("Various parameters", pagination, filters, sorter);
        setsearchState({
            filteredInfo: filters,
            sortedInfo: sorter,
            datas: users,
            searchText: searchText,
        });

    };
    const clearAll = () => {
        setsearchState({
            filteredInfo: null,
            sortedInfo: null,
            datas: users,
            searchText: "",
            filtered: null
        });
    };

    const onSearch = e => {
        const reg = new RegExp(e.target.value, "gi");
        const filteredData = map(users, record => {
            const nameMatch = get(record, "hoTen").match(reg);
            const addressMatch = get(record, "taiKhoan").match(reg);
            const emailMatch = get(record, "email").match(reg);
            // const sodtMatch = get(record, "soDT").match(reg);
            if (!nameMatch && !addressMatch && !emailMatch) {
                return null;
            }
            return record;
        }).filter(record => !!record);
        console.log("data", filteredData);
        setsearchState({
            searchText: e.target.value,
            filtered: !!e.target.value,
            datas: e.target.value ? filteredData : users
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
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
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
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
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
        return <Table {...users}
            size="small"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={datas}
            rowKey={record => record.key}
            onChange={handleChange}
        />
    }
    return (
        <Card title="Quản lý người dùng" className="gx-card">
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
                    <Button size="small" onClick={clearAll}>Làm mới</Button>
                    <ModalUser />
                </Space>
            </div>
            {renderTable()}
        </Card>
    );
}