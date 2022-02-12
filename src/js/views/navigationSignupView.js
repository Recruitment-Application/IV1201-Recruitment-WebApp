import { Nav, Form, Modal, Button } from 'react-bootstrap'

const NavigationSignupView = ({ setFirstName, setLastName, setPeronNumber, setEmail, setUsername,  setPassword, handleSignup, show, handleShow, handleClose }) => {

    return (
        <div>
            <Nav.Link className="navButton pr-3 pl-3" onClick={() => handleShow()}>Signup</Nav.Link>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup to Recruitement Webapp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={e => setFirstName(e.target.value)} type="text" placeholder="Max" />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={e => setLastName(e.target.value)} type="text" placeholder="Jackson" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPeronNumber">
                            <Form.Label>Peronal Number</Form.Label>
                            <Form.Control onChange={e => setPeronNumber(e.target.value)} type="text" placeholder="12340101-1234" />
                        </Form.Group>
                       
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="MaxJ123" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
						
                        <Button variant="success" onClick={(e) => { e.preventDefault(); handleClose(); handleSignup(); }}>
                            Signup
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




export default NavigationSignupView;


