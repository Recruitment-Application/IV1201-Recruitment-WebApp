import { Button, Form, InputGroup, Card, CardDeck, CardColumns} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApplicantApplicationSubmissionView = ({ competenceType, yearOfExperience, fromDate, setFromDate, toDate, setToDate, competenceApplication, competenceSubmited, isCompetenceAlreadySubmited, SubmitApplicationText, SubmitApplicationNav, cancelBackToMainNav, signedIn }) => (
  <div>
    <h1 className="textCenter"> Job: Amusemenet Park</h1>
    <CardDeck className="p-2 d-flex flex-wrap justify-content-center">

      <Card className="p-2 radiusDimensions ">
        <InputGroup className="d-flex justify-content-center p-2">
          <InputGroup.Append className="mr-2 my-2">
          <div className="p-2">
            <Form.Label>Your competence: </Form.Label>
            <Form.Control size="sm" as="select" onChange={(e) => competenceType(e.target.value)}>
               <option value="Competence" hidden> choose your competence type </option> 
              <option key={"(1) ticket sales"} value="1" >(1) ticket sales</option>
              <option key={"(2) lotteries"} value="2" >(2) lotteries</option>
              <option key={"(3) roller coaster operation"} value="3" >(3) roller coaster operation</option>
            </Form.Control>
            {/* options will be map using API */}
            </div>
            <div className="p-2">
            <Form.Label>Years of Experience: </Form.Label>
            <Form.Control size="sm" as="select"onChange={(e) => yearOfExperience(e.target.value)}>
              <option value="yearOfExperience" hidden>select the years of experience</option>
              <option key={"1"} value="1" >1</option>
              <option key={"2"} value="2" >2</option>
              <option key={"3"} value="3" >3</option>
              <option key={"5"} value="5" >5</option>
              <option key={"10"} value="10" >10</option>
              <option key={"10plus"} value="11" >10+</option>
            </Form.Control>
          </div>
          <div className="p-2">
            <h2 className="textCenter">Period you are available</h2>
          </div>
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

          </InputGroup.Append>
          <Button size="sm" className="mr-2 my-2" variant="outline-dark" onClick={(e) => { competenceSubmited(competenceApplication); SubmitApplicationNav(); }} 
                  disabled={isCompetenceAlreadySubmited || !signedIn}>
            {SubmitApplicationText}
          </Button>
        </InputGroup>

      </Card>
    </CardDeck>
  </div >
);

export default ApplicantApplicationSubmissionView;
