import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from '../pages/Home';
import Estudiante from '../pages/Estudiante';
import Seguimiento from '../pages/Seguimiento';
import Actividad from '../pages/Actividad';
import Docente from '../pages/Docente';
import VerNotas from '../pages/VerNotas';
import Administrador from '../pages/Administrador';
import UserReg from '../pages/UserRegistration';
import StudentReg from '../pages/StudentRegistration';
import RegistroMaterias from '../pages/RegistroMaterias';
import RegistroGrupo from '../pages/RegistroGrupo';
import ReporteFinal from '../pages/ReporteFinal';
import EditarNotas from '../pages/EditarNotas';
import AsignarGrupoEstudiantes from '../pages/AsignarGruposEstudiantes';
import ReportStudentGrade from '../pages/ReporteEstudiantesAsignatura';
import AsignarGrupoMaterias from '../pages/AsignarGruposMaterias';
import StudentGrades from '../pages/StudentGrades';
import ReporteEstudiante from '../pages/ReporteEstudiante';
import ReportePromedioGrado from '../pages/ReportePromedioGrado';
import ReportePromedioGrupo from '../pages/ReportePromedioGrupo';
import ReportePromedioMateria from '../pages/ReportePromedioMateria';
import ReporteProfesGrado from '../pages/ReporteProfesGrado';
import VerReporteProfe from '../pages/VerReporteProfe';
import TablaPromedioPorGrupo from '../pages/TablaPromedioPorGrupo'
import ResPromPorGrado from '../pages/ResPromPorGrado';
import ResPromPorMateria from '../pages/ResPromPorMateria';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/estudiante" component={Estudiante} />
        <Route path="/seguimiento" component={Seguimiento} />
        <Route path="/actividades" component={Actividad} />
        <Route path="/docente" component={Docente} />
        <Route path="/ver-notas" component={VerNotas} /> 
        <Route path="/admin" component={Administrador} />        
        <Route path="/user-registration" component={UserReg} />
        <Route path="/student-registration" component={StudentReg} />
        <Route path="/registro-materias" component={RegistroMaterias} />
        <Route path="/registro-grupo" component={RegistroGrupo} />
        <Route path="/reporte-final" component={ReporteFinal} />
        <Route path="/editar-notas" component={EditarNotas} />
        <Route path="/grupo-estudiantes" component={AsignarGrupoEstudiantes} />
        <Route path="/reporte-estudiantes-asignatura" component={ReportStudentGrade} />
        <Route path="/grupo-materias" component={AsignarGrupoMaterias} />
        <Route path="/estudiantes-asignatura" component={StudentGrades} />
        <Route path="/reporte-estudiante" component={ReporteEstudiante} />
        <Route path="/reporte-prom-materia" component={ReportePromedioMateria} />
        <Route path="/reporte-prom-grupo" component={ReportePromedioGrupo} />
        <Route path="/reporte-prom-grado" component={ReportePromedioGrado} />
        <Route path="/reporte-profes-grado" component={ReporteProfesGrado} />
        <Route path="/profes-grado" component={VerReporteProfe} />
        <Route path="/promedio-grupo" component={TablaPromedioPorGrupo} />
        <Route path="/pdf-prom-grado" component={ResPromPorGrado} />
        <Route path="/pdf-prom-materia" component={ResPromPorMateria} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
