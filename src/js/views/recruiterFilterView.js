import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecruiterFilterView = ({ setName, competenceTypesList, setCompetenceType, fromDate, setFromDate, toDate, setToDate, handleAppliedFilter, signedIn }) => (
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
                <Form.Control size="md" as="select" onChange={(e) => setCompetenceType(e.target.value)}>
                  {competenceTypesList.map((type, i) => (
                    <option key={i} value={i} >{type}</option>
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
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="p-4">
                <Button className="mr-2 my-1" variant="outline-dark" type="button" size="lg"
                  // onClick={() => { handleAppliedFilter(); }} disabled={!signedIn}
                  
                  >
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
