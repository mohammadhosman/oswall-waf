import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styling/register/RegisterForm.css";

function RegisterForm() {
    return (
        <Form id='register-form' className='mt-3'>
      <Row className="mb-3">

        {/* This is for the user's email */}
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" className='w-75' />
        </Form.Group>

        {/* This is for the user's password */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" className='w-75'/>
        </Form.Group>
      </Row>

        {/* This is for the user's address */}
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" className='w-50'/>
      </Form.Group>

        {/* This is for the user's 2nd address */}
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" className='w-50' />
      </Form.Group>

        {/* This is for the user's city */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        {/* This is for the user's country */}
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control />
        </Form.Group>

        {/*}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
        */}
      </Row>

        {/* 
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      */}

      <Button variant="primary" type="submit">
        Sign me up
      </Button>
    </Form>
    )
}

export default RegisterForm;