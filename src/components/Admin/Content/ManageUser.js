import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {

    const [showModal, setShowMoal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const [listUser, setListUSer] = useState();

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUSer(res.DT)
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    return (
        <div classNameName="manage-user-container">
            <div classNameName="title">
                ManageUser
            </div>
            <div classNameName="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowMoal(true)}><FcPlus />Add new users</button>
                </div>
                <div className="table-user-container">
                    <TableUser
                        listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowMoal}
                    fetchListUser={fetchListUser}
                />

                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}

export default ManageUser;
// phut 14