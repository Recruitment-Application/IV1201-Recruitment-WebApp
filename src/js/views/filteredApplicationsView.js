import { Table, Button } from "react-bootstrap";


const FilteredApplicationsView = ({ applicationsList, showApplicationDetails, navToApplicationDetails }) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Application details</th>
        </tr>
      </thead>
      <tbody>

        {
          applicationsList.map(ApplicationDetails =>
            <tr key={ApplicationDetails.applicationID}>
              <td>
                {ApplicationDetails.firstName}
              </td>
              <td>
                {ApplicationDetails.lastName}
              </td>
              <td><Button onClick={(e) => {
                e.preventDefault();
                showApplicationDetails(ApplicationDetails.applicationID);
                navToApplicationDetails();
              }} variant="outline-dark" >Show</Button>
              </td>
            </tr>
          )
        }
        


      </tbody>
    </Table>
);
export default FilteredApplicationsView;
