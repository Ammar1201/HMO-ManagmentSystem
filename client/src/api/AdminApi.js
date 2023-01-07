import axios from 'axios';

// let myUrl = `http://localhost:5000/${process.env.ADMIN_ROUTE}`;
let myUrl = `http://localhost:5000/api/hmo/health/management/admin`;

if (process.env.NODE_ENV === 'production') {
  // myUrl = `${process.env.ADMIN_ROUTE}`;
  myUrl = `/api/hmo/health/management/admin`;
}

const AdminApi = axios.create({
  baseURL: myUrl,
});

export const adminLogin = async (credentials) => {
  try {
    const res = await AdminApi.post('/login', credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

//* Patients
export const addPatientReq = async (patientInfo) => {
  try {
    const res = await AdminApi.post('/addPatient', patientInfo, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const removePatientReq = async (patientID) => {
  try {
    const res = await AdminApi.post('/removePatient', { patientID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getAllPatientsReq = async () => {
  try {
    const res = await AdminApi.post('/allPatients', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

//* Doctors
export const addDoctorReq = async (doctorInfo) => {
  try {
    const res = await AdminApi.post('/addDoctor', doctorInfo, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const removeDoctorReq = async (doctorID) => {
  try {
    const res = await AdminApi.post('/removeDoctor', { doctorID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getAllDoctorsReq = async () => {
  try {
    const res = await AdminApi.post('/allDoctors', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};