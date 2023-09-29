import React from 'react';
import {
  MDBCol,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function SignIn() {
  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle style={{ backgroundColor: '#0a4275'}}>Login</MDBDropdownToggle>
        <MDBDropdownMenu style={{ width: '320px' }}>
          <form className='px-4 py-3'>
            <MDBInput label='Email address' type='email' className='mb-4' required />
            <MDBInput label='Password' type='password' className='mb-4' required/>
            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox label='Remember me' />
              </MDBCol>
              <MDBCol>
                <a href='#!'>Forgot password?</a>
              </MDBCol>
            </MDBRow>
            <MDBBtn color='primary' className='btn-block'>
              Sign in
            </MDBBtn>
          </form>
          <div className='dropdown-divider'></div>
          <MDBDropdownItem link>New around here? Sign up</MDBDropdownItem>
          <MDBDropdownItem link>Forgot password?</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
}
