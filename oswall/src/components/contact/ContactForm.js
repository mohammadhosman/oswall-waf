import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styling/contact/ContactForm.css";

function ContactForm() {
  return (
    <Form id='contact-form' className='mt-3'>

        {/* User will enter name here */}
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name here..." />
        </Form.Group>

        {/* This <Form.Group> tag is for the checkbox input */}
        {/* }
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
            */}


        {/* Each <Form.Group> tag is a separate form field */}
        {/* This <Form.Group> tag is for the email input */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />

        {/*
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        */}

      </Form.Group>

        {/* This <Form.Group> tag is for the password input */} 
        {/*
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
            */}

      {/* }
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
        */}

        {/* This <Form.Group> tag is where the user enters the message
        they want to send */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example text area</Form.Label>
        <Form.Control as="textarea" placeholder='Enter your message here' rows={3} />
      </Form.Group>

      {/* Submit button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactForm;