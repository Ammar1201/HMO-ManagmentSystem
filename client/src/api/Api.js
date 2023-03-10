import axios from 'axios';

let myUrl = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
  myUrl = '/api';
}

const Api = axios.create({
  baseURL: myUrl,
});

//* ------------------------------Authentication-------------------------------------------
export const patientLoginRequest = async (credentials) => {
  try {
    const res = await Api.post('/patients/login', credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const doctorLoginRequest = async (credentials) => {
  try {
    const res = await Api.post('/doctors/login', credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

//* ------------------------------Patients-------------------------------------------
export const getPatientData = async () => {
  try {
    const res = await Api.post('/patients/me', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data.patient;
  }
  catch (error) {
    return error.response.data;
  }
};

export const updatePatientInfoReq = async (patient) => {
  try {
    const res = await Api.patch('/patients/update', { patient }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getPatientAppointmentsReq = async () => {
  try {
    const res = await Api.post('/appointments/patientAppointments', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getAllAvailableAppointmentsReq = async () => {
  try {
    const res = await Api.post('/appointments/allAvailableAppointments', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const bookNewAppointmentReq = async (appointmentID) => {
  try {
    const res = await Api.post('/appointments/bookNewAppointment', { appointmentID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const cancelAppointmentReq = async (appointmentID) => {
  try {
    const res = await Api.patch('/appointments/cancelAppointment', { appointmentID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('patientToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

//* ------------------------------Doctors-------------------------------------------
export const getDoctorData = async () => {
  try {
    const res = await Api.post('/doctors/me', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data.doctor;
  }
  catch (error) {
    return error.response.data;
  }
};

export const updateDoctorInfoReq = async (doctor) => {
  try {
    const res = await Api.patch('/doctors/update', { doctor }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getDoctorAppointmentsReq = async () => {
  try {
    const res = await Api.post('/appointments/doctorAppointments', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const getDoctorAvailability = async () => {
  try {
    const res = await Api.post('/appointments/doctorAvailability', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const addNewAvailableDateReq = async (newDate) => {
  try {
    const res = await Api.post('/appointments/addNewAvailableDate', { date: newDate.date, time: newDate.time }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

export const deleteAvailableDateReq = async (appointmentID) => {
  try {
    const res = await Api.post('/appointments/removeDoctorAvailability', { appointmentID }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken')
      }
    });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};