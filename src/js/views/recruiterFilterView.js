import { Button, Card, Form, InputGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecruiterFilterView = ({ setName, setCompetenceType,  fromDate, setFromDate, toDate, setToDate, handleAppliedFilter, signedIn}) => (
  <Card className = "p-2 ">
    <Form className="filter d-flex justify-content-center">
      <InputGroup className="d-flex justify-content-center">
            <InputGroup.Append className="">

            <Form.Group controlId="formBasicName" className="p-2">
              <Form.Label>First/Last name</Form.Label>
              <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="name" />
            </Form.Group>

            <Form.Group controlId="formBasicCompetence"  className=" p-2">
              <Form.Label>Competence</Form.Label>
                <Form.Control size="sm" as="select" onChange={(e) => setCompetenceType(e.target.value)}>
                  <option value="Competence" hidden>Competence</option>
                  <option key={"(1) ticket sales"} value="1" >(1) ticket sales</option>
                  <option key={"(2) lotteries"} value="2" >(2) lotteries</option>
                  <option key={"(3) roller coaster operation"} value="3" >(3) roller coaster operation</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicFromDate">
              <Form.Label>From:</Form.Label>
              <DatePicker className=" p-2" selected={fromDate} onChange={(date) => setFromDate(date)} 
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={new Date()}
              />
      
            </Form.Group>
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
            <Form.Group  className="p-1">
              <Button size="sm" className="mr-2 my-1" variant="outline-dark" type="button" 
                      onClick={() => { handleAppliedFilter(); }} disabled={!signedIn}>
              Filter Applications
              </Button>
            </Form.Group>
          </InputGroup.Append>
      </InputGroup>

    </Form>
  </Card>
);

export default RecruiterFilterView;
