import { Button, Form, InputGroup, Card, CardDeck, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ApplicationSubmissionView = ({ job, competenceType, experienceYearsList, yearOfExperience, fromDate, setFromDate, toDate, setToDate, competenceTypesList, competenceApplication, competenceSubmited, isCompetenceAlreadySubmited, SubmitApplicationText, SubmitApplicationNav, signedIn }) => (
  <div>
    <Container>
      <CardDeck className="p-2 d-flex flex-wrap justify-content-center m-3" >


        <Card className="p-2 radiusDimensions borderlessTD">

          <Row className="justify-content-md-center mt-3">
            <h1 className="textCenter"> Job: {job}</h1>
          </Row>
          <InputGroup className="groupInputDisplayFix">

            <InputGroup.Append className="groupInputDisplayFix p-3">
              <Row className="justify-content-md-center p-3">
                <Col xs={4} className="p-3" >

                  <div className="p-2 btnSize">
                    <Form.Label>Your competence: </Form.Label>
                    <Form.Control className="btnSize" size="md" as="select" onChange={(e) => competenceType(e.target.value)} required>
                      <option value="Competence" hidden> choose your competence type </option>
                      {competenceTypesList.map((type, i) => (
                        <option key={i} value={i} >{type}</option>
                      ))}
                    </Form.Control>
                  </div>
                </Col>
                <Col xs={4} className="p-3">
                  <div className="p-2 btnSize">
                    <Form.Label>Years of Experience: </Form.Label>
                    <Form.Control size="md" as="select" onChange={(e) => yearOfExperience(e.target.value)} required>
                      <option value="yearOfExperience" hidden>Ex. 1</option>
                      {experienceYearsList.map((years, i) => (
                        <option key={i} value={i} >{years}</option>
                      ))}
                    </Form.Control>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <h2 className="textCenter">Period you are available</h2>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs={4} className="p-3">
                  <div className="p-2 btnSize">
                    <Form.Group controlId="formBasicFromDate">
                      <Form.Label>From:</Form.Label>
                      <DatePicker className=" p-2" selected={fromDate} onChange={(date) => setFromDate(date)}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={new Date()}
                        required
                      />

                    </Form.Group>

                  </div>
                </Col>

                <Col xs={4} className="p-3">
                  <div className="p-2 btnSize">
                    <Form.Group controlId="formBasicToDate">
                      <Form.Label>To: </Form.Label>
                      <DatePicker className=" p-2"
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={fromDate}
                        required
                      />
                    </Form.Group>

                  </div>
                </Col>
              </Row>
            </InputGroup.Append>
            <Button size="lg" className="mr-2 my-2" variant="outline-dark" onClick={(e) => { competenceSubmited(competenceApplication); SubmitApplicationNav(); }}
              disabled={isCompetenceAlreadySubmited || !signedIn}>
              {SubmitApplicationText}
            </Button>
          </InputGroup>
        </Card>
      </CardDeck>
    </Container>
  </div >
);

export default ApplicationSubmissionView;
