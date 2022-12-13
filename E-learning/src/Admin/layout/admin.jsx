import React, { useEffect, Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Popover, Row, Col } from 'antd';
import { userActions } from '../../redux/_actions';
import USER from '../../Home/assets/images/profile/pic1.jpg';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import logo from '../../Home/assets/images/logo.png';
import logoa from '../../Home/assets/images/logo-a.png';
import ManageUser from '../pages/manageUsers';
import ManageCourse from '../pages/manageCourses';

const { Header, Sider, Content } = Layout;

export default function Admin() {
    const { user } = useSelector(state => state.authentication);
    const [collapsed, setCollapsed] = useState({ collapsed: true });
    const [selectedMenuItem, setSelectedMenuItem] = useState('item1');
    const dispatch = useDispatch();

    const toggle = () => {
        setCollapsed(collapsed => !collapsed)
    };
    const componentsSwitch = (key) => {
        switch (key) {
            case 'item1':
                return (<ManageUser />);
            case 'item2':
                return (<ManageCourse />);
            default:
                break;
        }
    };
    const content = (
        <Menu>
            <Menu.Item ><Link to="/profile">Hồ sơ</Link></Menu.Item>
            <Menu.Item ><Link to="/" onClick={() => {
                dispatch(userActions.logout())
            }}>Đăng xuất</Link></Menu.Item>
        </Menu>
    );
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <Link to="/admin"><img src={collapsed ? logoa : logo} alt="" /></Link>
                </div>
                <Menu selectedKeys={selectedMenuItem} theme="dark" mode="inline" onClick={(e) =>
                    setSelectedMenuItem(e.key)}>
                    <Menu.Item key="item1" icon={<UserOutlined />}>
                        <span>Quản lý người dùng</span>
                    </Menu.Item>
                    <Menu.Item key="item2" icon={<VideoCameraOutlined />}>
                        <span>Quản lý khóa học</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row>
                        <Col flex={1}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                            })}
                        </Col>                   
                        <Col>
                            <Popover content={content}>
                                <a href="#" className="dropdown-toggle nav-link">
                                    <span className="user-img">
                                        <img className="rounded-circle" src={USER} width={31} alt={user.hoTen} /> {user.hoTen}
                                    </span>
                                </a>
                            </Popover>
                        </Col>
                    </Row>                
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100vh',
                    }}
                >
                    {componentsSwitch(selectedMenuItem)}
                </Content>
            </Layout>
        </Layout>
    );

}