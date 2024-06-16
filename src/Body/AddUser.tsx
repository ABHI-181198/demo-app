import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFormik } from "formik";

interface Iuser{
    firstName:string,
    lastName:string,
    age:number,
    mobileNumber:string,
    email:string,
    gender:string,
}
// const validate = values => {
//     const errors = {};
  
//     if (!values.firstName) {
//       errors.firstName = 'Required';
//     } else if (values.firstName.length > 15) {
//       errors.firstName = 'Must be 15 characters or less';
//     }
  
//     if (!values.lastName) {
//       errors.lastName = 'Required';
//     } else if (values.lastName.length > 20) {
//       errors.lastName = 'Must be 20 characters or less';
//     }
  
//     if (!values.email) {
//       errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }
  
//     return errors;
//   };

const AddUser=()=>{
    const handleChange=(e:any)=>{
        console.log("Handle Change",e,e.target.value);
        // formik.setFieldValue()
    }
    const formik=useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            age:0,
            mobileNumber:'',
            email:'',
            gender:'',
        },
        validate:(values)=>{
            const errors:any = {};
  
            if (!values.firstName) {
              errors.firstName = 'Required';
            } else if (values.firstName.length > 15) {
              errors.firstName = 'Must be 15 characters or less';
            }
          
            if (!values.lastName) {
              errors.lastName = 'Required';
            } else if (values.lastName.length > 20) {
              errors.lastName = 'Must be 20 characters or less';
            }
          
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
          
            return errors;

        },
        onSubmit:Values=>{
            console.log("Formik Values",Values); 
        },
    })
    
    return(
<>
<form onSubmit={formik.handleSubmit}>
   <div className="container ">
     <Card  bg="light"
          key="Light"
          text="dark"
          className="mb-2 cardsize" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        <Card.Text>
        <div className=" row flex col-12  sm:col-6 mt-2">
        <div className="col-6 ">
        <Form.Label htmlFor="firstname" className="flex-start">First Name</Form.Label>
        <InputGroup className="mb-3">
        <Form.Control
          value={formik.values.firstName}
          placeholder="Enter First Name"
          aria-label="firstname"
          aria-describedby="basic-addon1"
          onChange={(e)=>formik.setFieldValue("firstName",e.target.value)}
        />
        </InputGroup>

        </div>
      <div className="col-6">
      <Form.Label htmlFor="lastname" className="flex-start">Last Name</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          aria-label="lastname"
          aria-describedby="basic-addon1"
          onChange={(e)=>formik.setFieldValue("lastName",e.target.value)}
        />
      </InputGroup>
      </div>
      <div className="col-12">
      <Form.Label htmlFor="email" className="flex-start">Email</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          aria-label="email"
          aria-describedby="basic-addon1"
          onChange={(e)=>formik.setFieldValue("email",e.target.value)}
        />
      </InputGroup>
      </div>
      <div className="col-6 ">
      <Form.Label htmlFor="age" className="flex-start">Age</Form.Label>
        <InputGroup className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Age"
          aria-label="age"
          aria-describedby="basic-addon1"
          onChange={(e)=>formik.setFieldValue("age",e.target.value)}
        />
        </InputGroup>
        </div>
        <div className="col-6 ">
        <Form.Label htmlFor="mobilenumber" className="flex-start">Mobile Number</Form.Label>
        <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Mobile Number"
          aria-label="mobilenumber"
          aria-describedby="basic-addon1"
          onChange={(e)=>formik.setFieldValue("mobileNumber",e.target.value)}
        />
        </InputGroup>
        </div>
    </div>
        </Card.Text>
        <Button type="submit" variant="primary">Submit</Button>
      </Card.Body>
     </Card>
    </div>
    </form>
</>
    )
}
export default AddUser;