import axios from 'axios';

let myUrl = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
  myUrl = 'api';
}

const Api = axios.create({
  baseURL: myUrl,
});

//* ------------------------------GET Requests-------------------------------------------
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

export const getDoctorAppointmentsReq = async () => {
  try {
    const res = await Api.post('/appointments/getDoctorAppointments', {}, {
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

//* ------------------------------POST Requests-------------------------------------------
export const loginRequest = async (credentials, path) => {
  try {
    const res = await Api.post(path, credentials);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};

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

//* ------------------------------PATCH Requests-------------------------------------------
export const updatePatientInfoReq = async (patient) => {
  console.log(patient);
  try {
    const res = await Api.patch('/patients/update', { patient }, {
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

export const updateDoctorInfoReq = async (doctor) => {
  try {
    const res = await Api.patch('/doctors/update', { doctor }, {
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

//* ------------------------------DELETE Requests-------------------------------------------
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