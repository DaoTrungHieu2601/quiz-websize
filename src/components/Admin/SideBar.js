import 'react-pro-sidebar/dist/css/styles.css';
import "./SideBar.scss"
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { DiReact } from "react-icons/di";

import { FaTachometerAlt, FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";



const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bff"} />
                        <span onClick={() => navigate("/")}>
                            Dao Trung Hieu
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            {t('sidebar.menu1')}
                            <Link to="/admin" />
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            // icon={<FaRegLaughWink />}
                            icon={<FaGem />}
                            title={t('sidebar.menu2')}
                        >
                            <MenuItem>
                                Quản lý người dùng
                                <Link to="/admin/manage-users" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý câu đố
                                <Link to="/admin/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                <Link to="/admin/manage-questions" />
                                Quản lý câu hỏi
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/daotrunghieu2601"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Hieu Toki
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}


export default SideBar;