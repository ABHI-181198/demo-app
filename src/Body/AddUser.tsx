import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch } from "../store/hooks";
import { AddUserThunk } from "../Slices/add-user/slice";
import axios from "axios";

interface Iuser {
  firstName: string;
  lastName: string;
  age: number;
  mobileNumber: string;
  email: string;
  gender: string;
}

const AddUser = () => {
  const dispatch=useAppDispatch();
  const [file, setFile] = useState<any>();
  const[data,setData]=useState<any>();
  const formData = new FormData();
  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Upload Image", e.target.files, file);
    // formik.setFieldValue("profileImage", file);
    // setFile(URL.createObjectURL(e.target.files[0]));
  };

    const url = "https://localhost:7004/api/EmployeeMasters/Post";
    async function getData() {
      const url = "https://localhost:7004/api/EmployeeMasters/Post";
      try {
        axios.get(url)
        .then(response => setData(response.data));
        // const response = await fetch(url);
        // if (!response.ok) {
        //   throw new Error(`Response status: ${response.status}`);
        // }
    
        const json = data;
        console.log("Get Call Here--->!",data);
      } catch (error:any) {
        console.error(error.message);
      }
    }

  




  const initialValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    panNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    dateoFJoining: "",
    profileImage: undefined,
  };
  const validate = (values: any) => {
    const errors: any = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.panNumber) {
      errors.panNumber = "Required";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Required";
    }
    if (!values.passportNumber) {
      errors.passportNumber = "Required";
    }

    return errors;
  };
  const onSubmit = (values: any) => {
    getData();
    console.log("Formik before reset", formik);
    formData.append("FirstName", formik.values.firstName);
    formData.append("LastName", formik.values.lastName);
    formData.append("MobileNumber", formik.values.mobileNumber);
    formData.append("EmailAddress", formik.values.email);
    formData.append("Gender", formik.values.gender);
    formData.append("PanNumber", formik.values.panNumber);
    formData.append("PassportNumber", formik.values.passportNumber);
    formData.append("DateOfBirth", formik.values.dateOfBirth);
    formData.append("DateOfJoinee", formik.values.dateoFJoining);
    formData.append("CreatedDate",new Date().toString());
    formData.append("IsDeleted",false.toString());
    formData.append("IsActive",true.toString());
    formData.append("ProfileImage","eeee");

    // formData.append("passport","BN121212");
    // formData.append("profileImage", file);
    const formDataEntries = Array.from(formData.entries());
    formDataEntries.forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    // dispatch(AddUserThunk(formData));
    const postData = async (url:any, data:any) => {
  try {
    console.log("Console Before Post",url,data);
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("There was an error making the POST request:", error);
    throw error;
  }
  };
  postData(url,data);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  // useEffect(()=>{
  //   payload={
  //     firstName: formik.values.firstName,
  //     lastName:formik.values.lastName,
  //     mobileNumber:formik.values.mobileNumber,
  //     email: formik.values.email,
  //     gender: formik.values.gender,
  //     panNumber: formik.values.panNumber,
  //     passportNumber: formik.values.passportNumber,
  //     dateOfBirth: formik.values.dateOfBirth,
  //     dateoFJoining: formik.values.dateoFJoining,
  //     profileImage: formik.val,
  //   }
  // },[])

  // const forkmikError=formik.errors;
  // const formikTouched=formik.

  // const getErrorName=(name:string)=>{
  //   return
  // }
  console.log("File", file);
  console.log("FormData-Outside", formData);

  const handleChange = (e: any) => {
    console.log("Handle Change", e, e.target.value);
    // formik.setFieldValue()
  };
  console.log("Formik Values", formik.values);
  console.log("Formik Errors", formik.errors);
  console.log("Formik Touched", formik.touched);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="container ">
          <Card
            bg="light"
            key="Light"
            text="dark"
            className="mb-2 cardsize"
            style={{ width: "18rem" }}
          >
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>
              <Card.Text>
                <div className=" row flex col-12  sm:col-6 mt-2">
                  <div className="col-4 ">
                    <Form.Label htmlFor="firstname" className="flex-start">
                      First Name
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.firstName}
                        placeholder="Enter First Name"
                        aria-label="firstname"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("firstName", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.firstName && formik.touched.firstName ? (
                      <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                  </div>
                  <div className="col-4 ">
                    <Form.Label htmlFor="lastname" className="flex-start">
                      Last Name
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.lastName}
                        type="text"
                        placeholder="Enter Last Name"
                        aria-label="lastname"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("lastName", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.lastName && formik.touched.lastName ? (
                      <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                  </div>
                  <div className="col-4 ">
                    <Form.Label htmlFor="pan" className="flex-start">
                      Pan Number
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.panNumber}
                        type="text"
                        placeholder="Enter Pan Number"
                        aria-label="pan"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("panNumber", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.panNumber && formik.touched.panNumber ? (
                      <div className="error">{formik.errors.panNumber}</div>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="email" className="flex-start">
                      Email
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <Form.Control
                        value={formik.values.email}
                        type="email"
                        placeholder="Enter Email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("email", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.email && formik.touched.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="col-6 ">
                    <Form.Label htmlFor="mobilenumber" className="flex-start">
                      Mobile Number
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.mobileNumber}
                        type="text"
                        placeholder="Enter Mobile Number"
                        aria-label="mobilenumber"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("mobileNumber", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.mobileNumber &&
                    formik.touched.mobileNumber ? (
                      <div className="error">{formik.errors.mobileNumber}</div>
                    ) : null}
                  </div>
                  <div className="col-6 ">
                    <Form.Label htmlFor="passport" className="flex-start">
                      PassPort Number
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.passportNumber}
                        type="text"
                        placeholder="Enter PassPort Number"
                        aria-label="passport"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("passportNumber", e.target.value)
                        }
                      />
                    </InputGroup>
                    {formik.errors.passportNumber &&
                    formik.touched.passportNumber ? (
                      <div className="error">
                        {formik.errors.passportNumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6 ">
                    <Form.Label htmlFor="dob" className="flex-start">
                      Date Of Birth
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.dateOfBirth}
                        type="date"
                        placeholder="Enter "
                        aria-label="dob"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("dateOfBirth", e.target.value)
                        }
                      />
                    </InputGroup>
                    {/* {formik.errors.dateOfBirth &&
                    formik.touched.dateOfBirth ? (
                      <div className="error">
                        {formik.errors.dateOfBirth}
                      </div>
                    ) : null} */}
                  </div>
                  <div className="col-6 ">
                    <Form.Label htmlFor="dob" className="flex-start">
                      Date Of Joining
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.dateoFJoining}
                        type="date"
                        placeholder="Enter "
                        aria-label="dob"
                        aria-describedby="basic-addon1"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                          formik.setFieldValue("dateoFJoining", e.target.value)
                        }
                      />
                    </InputGroup>
                    {/* {formik.errors.dateOfBirth &&
                    formik.touched.dateOfBirth ? (
                      <div className="error">
                        {formik.errors.dateOfBirth}
                      </div>
                    ) : null} */}
                  </div>
                  <div className="col-6 mt-4">
                    <Form.Label
                      htmlFor="dob"
                      className="flex-start"
                    ></Form.Label>
                    <Dropdown className="dropdown-width ">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Gender
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => formik.setFieldValue("gender", 1)}
                        >
                          Male
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => formik.setFieldValue("gender", 0)}
                        >
                          Female
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-6 ">
                    <Form.Label htmlFor="image" className="flex-start">
                      Upload File
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formik.values.profileImage}
                        type="file"
                        placeholder="Enter "
                        aria-label="image"
                        aria-describedby="basic-addon1"
                        onChange={uploadImage}
                        // onBlur={formik.handleBlur}
                        // onChange={(e) =>
                        //   formik.setFieldValue("dateoFJoining", e.target.value)
                        // }
                      />
                    </InputGroup>
                    {/* {formik.errors.dateOfBirth &&
                    formik.touched.dateOfBirth ? (
                      <div className="error">
                        {formik.errors.dateOfBirth}
                      </div>
                    ) : null} */}
                  </div>
                  {/* <input type="file">Upload Image</input> */}
                </div>
              </Card.Text>
              <Button onClick={getData}>GetData</Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </div>
      </form>
    </>
  );
};
export default AddUser;
