import { Button, CardDeck, Card, InputGroup, Form, Row, Col } from "react-bootstrap";


const ChosenApplicationDetailsView = ({ firstName, lastName, competence, availableFrom, availableTo, yearsOfExperience, decisionList, takenDecision, applicationId, makeDescision }) => (
  <div className="applicationDetailsDiv">
    <CardDeck className="p-2 d-flex flex-wrap justify-content-center m-3" >


      <Card className="p-2 radiusDimensions borderlessTD">

        <h1 className="textCenter p-2"> Job application</h1>

        <Row className="p-2 d-flex align-items-center">
          <Col>
            <strong>First Name: </strong>
            {firstName}
          </Col>
          <Col >
            <strong>Last Name: </strong>
            {lastName}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Competence: </strong>
            {competence}
          </Col>
          <Col>
            <strong>Years of Experience: </strong>
            {yearsOfExperience}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Available from: </strong>
            {availableFrom}
          </Col>
          <Col>
            <strong>Available To: </strong>
            {availableTo}
          </Col>
        </Row>
        <Row>
          <div className="justify-content-center p-2">
            <Col>
              <InputGroup.Append className=" btnSize ">
                <Form.Label className="p-2"><strong>Decision: </strong></Form.Label>
                <Form.Control className="" size="md" as="select" onChange={(e) => takenDecision(e.target.value)} required>
                  <option value="Competence" hidden> choose your decision </option>
                  {decisionList.map((decision, i) => (
                    <option key={i} value={i} >{decision}</option>
                  ))}
                </Form.Control>
              </InputGroup.Append>
            </Col>

          </div>
          <Col>
            <Button id="makeDecisionButton" className="mr-2 btnSize p-2 " variant="outline-dark" >Make Decision</Button>
          </Col>
        </Row>


      </Card>
    </CardDeck>




  </div >
);
export default ChosenApplicationDetailsView;
