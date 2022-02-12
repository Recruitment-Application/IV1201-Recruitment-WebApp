import { Nav, Form, Modal, Button } from 'react-bootstrap'

const NavigationSigninView = ({ setUsername, setPassword, handleSignin, show, handleShow, handleClose }) => {

    return (
        <div>
            <Nav.Link className="navButton pr-3 pl-3" onClick={() => handleShow()}>Signin</Nav.Link>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Signin to HealthWatcher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                        </Form.Group>
                        <Button variant="success" onClick={(e) => { e.preventDefault(); handleClose(); handleSignin(); }}>
                            Signin
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>)

}




export default NavigationSigninView;
