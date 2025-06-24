import { NavDropdown } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import i18n from "../../utils/i18n";

const Languge = () => {

    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Việt Nam' : 'English'} id='basic-nav-dropdow2' className='languges'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languge;