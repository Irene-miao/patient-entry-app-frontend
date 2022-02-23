import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl, apiBaseUrlTwo } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";

import PatientListPage from "./PatientListPage";
import PatientDetails from "./components/PatientDetails";
import { Patient, Diagnosis } from "./types";


const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}`
        );
        dispatch(setPatientList(patientListFromApi));

        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrlTwo}`
        );
        
        dispatch(setDiagnosisList(diagnosisList));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
   

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />}>
            </Route>
            <Route path="/:id" element={<PatientDetails />}>
            </Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;


