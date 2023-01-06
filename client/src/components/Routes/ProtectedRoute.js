import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientData, getDoctorData } from "../../api/Api";
import { updatePatient } from "../../redux/features/patientSlice";
import { updateDoctor } from "../../redux/features/doctorSlice";

const ProtectedRoute = ({ children }) => {
  const patient = useSelector(state => state.patient);
  const doctor = useSelector(state => state.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('patients') && patient === null) {
      const userData = async () => {
        const patientInfo = await getPatientData();
        patientInfo.appointments = patientInfo.appointments || [];
        if (patientInfo.expiredAt === undefined) {
          dispatch(updatePatient(patientInfo));
          return;
        }

        navigate('/patients/login');
      };
      userData();
    }
    if (pathname.includes('doctors') && doctor === null) {
      const userData = async () => {
        const doctorInfo = await getDoctorData();
        if (doctorInfo.expiredAt === undefined) {
          dispatch(updateDoctor(doctorInfo));
          return;
        }

        navigate('/doctors/login');
      };
      userData();
    }
  }, [dispatch, navigate, patient, pathname, doctor]);

  if (localStorage.getItem('patientToken') || localStorage.getItem('doctorToken')) {
    return children;
  }
  else {
    return <Navigate to='/patients/login' />
  }
}

export default ProtectedRoute;