// import {useEffect, useState} from "react";
// import {GET} from "../api";
// import getURL from "../api/config";
// import {Container, Col, Row, Table} from "react-bootstrap";

// const Departments = () => {
// 	const [departments, setDepartments] = useState([])

// 	useEffect(() => {
// 		const fetchDepartments = async () => {
// 			try {
// 		    const response = await GET(getURL("GET_DEPARMENTS"))

// 				setUsers(response.data);
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}

// 		fetchDepartments();
//     }, []);


//     return(
// 		<Container>
// 			<Row>
// 				<Col>
// 					<Table striped bordered hover>
// 						<thead>
// 							<tr>
// 								<th>Dept_ID</th>
// 								<th>Dept_Name</th>
// 								<th>Dept_Code</th>
// 								<th>Action</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{
// 								departments.map((departments, index) => {
// 									return <tr>
// 										<td>{index + 1}</td>
// 										<td>{department.dept_name}</td>
// 										<td>{department.dept_code}</td>
// 										<td>
// 											<button className="btn btn-success">Edit</button>
// 											<button className="btn btn-danger">Delete</button>
// 										</td>
// 									</tr>
// 								}) 
// 							}
// 						</tbody>
// 					</Table>
// 				</Col>
// 			</Row>
// 		</Container>
// 	)
// }

// export default Departments;