import { Button, Form, Modal } from 'react-bootstrap'

const UserModal = ({show, onClose, user, onSave, onInputChange, formData}) => {
	return <Modal
		show={show}
		onHide={onClose}
		backdrop="static"
		keyboard={false}
	>
		<Modal.Header closeButton>
				<Modal.Title>User</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form>
				<Form.Group className="mb-3" controlId="fullname">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullname" defaultValue={user?.fullname} onChange={onInputChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" defaultValue={user?.username} onChange={onInputChange}/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="text" name="password" defaultValue={user?.password} onChange={onInputChange}/>
				</Form.Group>

			</Form>
		</Modal.Body>
		<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
						Close
				</Button>
				<Button variant="primary" onClick={onSave}>Save</Button>
		</Modal.Footer>
	</Modal>
}

export default UserModal;