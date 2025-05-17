
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../services/apiService';
import _, { update } from 'lodash'
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPaswword("")
        setImage("")
        setRole("USER")
        setUsername("")
        setPreviewImage("")
        props.resetUpdateData();
    };

    const [email, setEmail] = useState("");
    const [password, setPaswword] = useState("");
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setEmail(dataUpdate.email)
            setImage("")
            setRole(dataUpdate.role)
            setUsername(dataUpdate.username)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.targe.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.targe.files[0])
        } else {
            // setPreviewImage(" ")
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCreateUser = async () => {
        //validate
        const isValiEmail = validateEmail(email);
        if (!isValiEmail) {
            toast.error('Invalid Email')
            return;
        }


        //submit 
        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUser()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal size='xl' show={show} onHide={handleClose} backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update a users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input disabled type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input disabled type="password" className="form-control" value={password}
                                onChange={(event) => setPaswword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} value={role}>
                                <option value="USER">USER...</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label lable-upload" htmlFor='labelUpload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input type='file' hidden id='labelUpload'
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;