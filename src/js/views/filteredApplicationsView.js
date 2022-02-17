import { Table, Button } from "react-bootstrap";


const FilteredApplicationsView = ({ applicationsList, showApplicationDetails }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Application details</th>
      </tr>
    </thead>
    <tbody>

      {applicationsList.map(ApplicationDetails =>
                    <tr key={ApplicationDetails.id}>
                        <td>
                            {ApplicationDetails.fName}
                        </td>
                        <td>
                            {ApplicationDetails.lName}
                        </td>
                        <td><Button onClick={(e) => { e.preventDefault(); showApplicationDetails(ApplicationDetails.id); }}  variant="outline-dark" >Show</Button></td>
                    </tr>)} 
                   
    </tbody>
  </Table>
);
export default FilteredApplicationsView;
