import {Container, Row, Col, Card} from "react-bootstrap";


const HomepageView = ()=>
  <Container className="mt-fix">
    <Card className="shadow p-3 mb-5 bg-white roundedBoxBorder">
      <Row>
    
            <div className="textAlignJustify p-5">
                <h1 data-testid="titleTextElement" className="pt-4 color-text-blue darken-4 font-weight-bolder ">Recruitement Application</h1>
                <h5 data-testid="welcomeTextElement" className="pt-2 pb-3">Welcome to the Recruitement WebApp</h5>
                
                <h6 className="mt-4 color-text-red font-weight-bold">What is Recruitement WebApp?</h6>
                <p className="mr-5">
                    Recruitement WebApp is a website were applicants can apply for a job in the Amusement Park.
                    The applicant will have the ability to list their expertise and the period which they can work under.
                </p>

                <h6 className="mt-4 color-text-red font-weight-bold">How to use ?</h6>
                <p className="mr-5 mb-4">
                First create an account or signin to your existing account. 
                Once you are signed in, you will be able to submit your job application.
                Your application will be processed later by our staff.
                </p>
            </div>
   
      </Row>
    </Card>
  </Container>
;

export default HomepageView;