import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecruiterFilterView = ({ setName, competenceTypesList, chosenCompetence, fromDate, setFromDate, toDate, setToDate, handleAppliedFilter }) => (
  <Card className="p-2 ">
    <Form className="filter d-flex justify-content-center">
      <Row>
        <InputGroup className="d-flex justify-content-center">
          <InputGroup.Append className="">
            <Col>
              <Form.Group controlId="formBasicName" className="p-2">
                <Form.Label>First/Last name</Form.Label>
                <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicCompetence" className=" p-2">
                <Form.Label>Competence:</Form.Label>
                <Form.Control size="md" as="select" onChange={(e) => chosenCompetence(e.target.value)}>
                  {Object.keys(competenceTypesList).map((competenceId) => (
                      <option key={competenceId} value={competenceTypesList[competenceId].competenceId}>{competenceTypesList[competenceId].competenceType}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicFromDate">
                <Form.Label>From:</Form.Label>
                <DatePicker className=" p-2"
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={new Date()}
                  dateFormat={'yyyy-MM-dd'}
                />
              </Form.Group>

            </Col>

            <Col>
              <Form.Group controlId="formBasicToDate">
                <Form.Label>To: </Form.Label>
                <DatePicker className=" p-2"
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  dateFormat={'yyyy-MM-dd'}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="p-4">
                
                <Button className="mr-2 my-1" variant="outline-dark" type="button" size="lg" onClick={(e) => { handleAppliedFilter(); e.preventDefault(); }}>
                  Filter Applications
                </Button>
              </Form.Group>
            </Col>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Form>
  </Card>
);

export default RecruiterFilterView;
