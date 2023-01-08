import axios from 'axios';

let myUrl = `http://localhost:5000${process.env.REACT_APP_ADMIN_API_ROUTE}`;

if (process.env.NODE_ENV === 'production') {
  myUrl = `${process.env.REACT_APP_ADMIN_API_ROUTE}`;
}

const AdminApi = axios.create({
  baseURL: myUrl,
});

export const adminLogin = async (credentials) => {
  try {
    const res = await AdminApi.post('/login', credentials);
    console.log(res);
    return res.data;
  }
  catch (error) {
    console.log(error);
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

export const getSpecificPatientReq = async (patientID) => {
  try {
    const res = await AdminApi.post('/specificPatient', { patientID }, {
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

export const updateSpecificPatientReq = async (patientID, newPatientInfo) => {
  try {
    const res = await AdminApi.post('/updateSpecificPatient', { patientID, newPatientInfo }, {
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

export const getSpecificDoctorReq = async (doctorID) => {
  try {
    const res = await AdminApi.post('/specificDoctor', { doctorID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const updateSpecificDoctorReq = async (doctorID, newDoctorInfo) => {
  try {
    const res = await AdminApi.post('/updateSpecificDoctor', { doctorID, newDoctorInfo }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminLoginToken')
      }
    });
    return res.data;
  }
  catch (error) {
    console.log(error);
    return error.response.data;
  }
};