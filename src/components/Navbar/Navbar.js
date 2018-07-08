import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
class Navbar extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        return (
            <div>

                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256 }}
                >
                    <SubMenu key="sub1" title={<span><Icon type="profile" /><span>Bài viết</span></span>}>
                        <Menu.Item key="1">
                            <Link to="/articles">
                                Tất cả bài viết
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/articles/add">
                                Thêm bài viết
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="switcher" /><span>Thể loại</span></span>}>
                        <Menu.Item key="3">
                            <Link to="/categories">
                                Tất cả thể loại
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/categories/add">
                                Thêm thể loại
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>Loại tin</span></span>}>
                        <Menu.Item key="5">
                            <Link to="/typenews">
                                Tất cả loại tin
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/typenews/add">
                                Thêm loại tin
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="exception" /><span>Trắc nghiệm</span></span>}>
                        <Menu.Item key="7">
                            <Link to="/question">
                                Tất cả câu hỏi
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/group">
                                Tất cả loại nhóm
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default Navbar;