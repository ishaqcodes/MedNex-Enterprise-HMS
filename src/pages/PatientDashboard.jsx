import AdmissionForm from '../components/AdmissionForm';

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Medical Records</h1>
      <AdmissionForm />
    </div>
  );
};
export default PatientDashboard;