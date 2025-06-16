import { NavDropdown } from "react-bootstrap";

const Languge = () => {
    return (
        <>
            <NavDropdown title="Việt Nam" id='basic-nav-dropdow2' className='languges'>
                <NavDropdown.Item>English</NavDropdown.Item>
                <NavDropdown.Item>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languge;