import { useEffect, useState } from "react";
import { GET, DELETE, PUT, POST } from "../../api";
import getURL from "../../api/config";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import UserModal from "./UserModal";
import Swal from "sweetalert2";

const User = () => {
	const [users, setUsers] = useState([])
	// const [user, setUser] = useState(null)
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState("add")
  const [formData, setFormData] = useState({})
	const handleClose = () => setShow(false);
	const handleShow = (user) => {
		// setUser(user)
		setFormData(user)
		setShow(true);
	}

	useEffect(() => {
		const fetchUsers = async () => {
			try {
		    const response = await GET(getURL("GET_USERS"))

				setUsers(response.data);
			} catch (error) {
				console.log(error)
			}
		}

		fetchUsers();
	}, []);

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	const handleAddUser = async () => {
		const response = await POST(getURL("ADD_USER"), formData)

		if(response.status === 201) {
			setShow(false)
		}
	}

	const handleUpdateUser = async () => {
		const response = await PUT(getURL("UPDATE_USER")(formData.user_id), formData)

		if(response.status === 200) {
			setShow(false)
		}
	}

	const onSave = () => {
		if(mode === "add") {
			handleAddUser();
		} else {
			handleUpdateUser();
		}
	}

	const handleDelete = async (id) => {

		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'

		});

		if (result.isConfirmed) {
			try {
				const url = getURL("DELETE_USER")(id);
				await DELETE(url);
				const newUsers = users.filter(user => user.user_id !== id);
				setUsers(newUsers);
				Swal.fire(
					'Deleted!',
					'Your user has been deleted.',
					'success'
				);

			} catch (error) {
				console.log(error);
				Swal.fire(
					'Error!',
					'There was an error deleting the user.',
					'error'
				);
			}
		}
	}

  return(
		<Container>
			<Row className="my-2">
				<Col xs={12}>
					<Button 
						variant="success" 
						onClick={() => {
							setMode('add');
							handleShow();
						}}>
					Add New User
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>User id</th>
								<th>Full Name</th>
								<th>Username</th>
								<th>Action</th>
		
							</tr>
						</thead>
						<tbody>
							{
								users.map((user, index) => {
									return <tr key={index}>
										<td>{index + 1}</td>
										<td>{user.fullname}</td>
										<td>{user.username}</td>
										<td>
											<Button
												variant="primary"
												onClick={() => {
													setMode('edit')
													handleShow(user);
												}}
												>
												View
											</Button>
											<Button 
												variant="danger"
												onClick={() => handleDelete(user.user_id)}
												>
													Delete
											</Button>
										</td>
									</tr>
								}) 
							}
						</tbody>
					</Table>
				</Col>
			</Row>
			<UserModal show={show} user={formData} onClose={handleClose} onSave={onSave} onInputChange={onInputChange} /> 
		</Container>
	)
}

export default User;

