import Signup from "./pages/Signup";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import { FreelancerProvider, useFreelancer } from "./context/FreelancerContext";

function AppContent() {
  const { isAuthenticated } = useFreelancer();
  return isAuthenticated ? <FreelancerDashboard /> : <Signup />;
}

function App() {
  return (
    <FreelancerProvider>
      <AppContent />
    </FreelancerProvider>
  );
}

export default App;