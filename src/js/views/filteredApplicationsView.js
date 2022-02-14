import {Table, Button} from "react-bootstrap";


const FilteredApplicationsView = ({firstName, lastName, applicationList, showApplicationDetails })=> (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Application details</th>
    </tr>
  </thead>
  <tbody>

    {/**
     * This will be replaced with the map below to list all the returned applications
     * 
     */}
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td><Button className="mr-2" variant="outline-dark" >Show</Button></td>
    </tr>

    {/* {applicationList.sort(sortingFunction).map(ApplicationEntry =>
                    <tr key={ApplicationEntry.id}>
                        <td>
                            {ApplicationEntry.fName}
                        </td>
                        <td>
                            {ApplicationEntry.lName}
                        </td>
                        <td><Button onClick={(e) => { e.preventDefault(); showApplicationDetails(ApplicationEntry.id); }}>Show</Button></td>
                    </tr>)} 
                    */}
  </tbody>
</Table>
);
export default FilteredApplicationsView;
