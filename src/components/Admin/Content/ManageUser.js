import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from "react";
import { getAllUser, getUsersPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {

    const [showModal, setShowMoal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalDeleteUser, setShowMoalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({})
    const [pageCount, setPageCount] = useState(0);
    const LIMIT_USER = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const [listUser, setListUSer] = useState();

    useEffect(() => {
        // 
        fetchListUserWithPageGinate(1)
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUSer(res.DT)
        }
    }

    const fetchListUserWithPageGinate = async (page) => {
        let res = await getUsersPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUSer(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const handleCickDelete = (user) => {
        setShowMoalDeleteUser(true)
        setDataDelete(user)
    }

    return (
        <div classNameName="manage-user-container">
            <div classNameName="title">
                <h1 className="text-center border-bottom pb-2 w-50 mx-auto">Danh sách người dùng</h1>
            </div>
            <div classNameName="users-content">
                <div className="btn-add-new mt-3">
                    <button className="btn btn-primary" onClick={() => setShowMoal(true)}><FcPlus />Add new users</button>
                </div>
                <div className="table-user-container mt-4">
                    {/* <TableUser
                        listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleCickDelete={handleCickDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleCickDelete={handleCickDelete}
                        fetchListUserWithPageGinate={fetchListUserWithPageGinate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowMoal}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPageGinate={fetchListUserWithPageGinate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    fetchListUserWithPageGinate={fetchListUserWithPageGinate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowMoalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPageGinate={fetchListUserWithPageGinate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;
// phut 14