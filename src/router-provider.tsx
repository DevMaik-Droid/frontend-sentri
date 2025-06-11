"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { TeacherDashboardLayout } from "./components/templates/teacher-dashboard"
import { StudentDashboardLayout } from "./components/templates/student-dashboard"
import { StudentListView } from "./components/templates/student-list-view"
import { StudentAttendanceView } from "./components/templates/student-attendance-view"
import { StudentGradesView } from "./components/templates/student-grades-view"
import { StudentRecordsView } from "./components/templates/student-records-view"
import { DashboardLayout } from "./components/templates/dashboard-layout"

export function RouterProvider() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Dashboard Administrador */}
        <Route path="/" element={<DashboardLayout />} />

        {/* Dashboard por roles */}
        <Route path="/admin" element={<DashboardLayout />} />
        <Route path="/teacher" element={<TeacherDashboardLayout />} />
        <Route path="/student" element={<StudentDashboardLayout />} />

        {/* Rutas de Estudiantes - Administrador */}
        <Route path="/estudiantes">
          <Route index element={<Navigate to="/estudiantes/lista" replace />} />
          <Route path="lista" element={<StudentListView />} />
          <Route path="asistencia" element={<StudentAttendanceView />} />
          <Route path="calificaciones" element={<StudentGradesView />} />
          <Route path="expedientes" element={<StudentRecordsView />} />
        </Route>

        {/* Rutas de Docentes - Administrador */}
        <Route path="/docentes">
          <Route index element={<Navigate to="/docentes/lista" replace />} />
          <Route path="lista" element={<div>Lista de Docentes</div>} />
          <Route path="asignacion" element={<div>Asignación de Cursos</div>} />
          <Route path="evaluacion" element={<div>Evaluación Docente</div>} />
        </Route>

        {/* Rutas de Materias - Administrador */}
        <Route path="/materias">
          <Route index element={<Navigate to="/materias/catalogo" replace />} />
          <Route path="catalogo" element={<div>Catálogo de Materias</div>} />
          <Route path="plan" element={<div>Plan de Estudios</div>} />
          <Route path="contenidos" element={<div>Contenidos</div>} />
        </Route>

        {/* Rutas de Semestres */}
        <Route path="/semestres">
          <Route index element={<Navigate to="/semestres/calendario" replace />} />
          <Route path="calendario" element={<div>Calendario Académico</div>} />
          <Route path="activos" element={<div>Periodos Activos</div>} />
          <Route path="planificacion" element={<div>Planificación</div>} />
        </Route>

        {/* Rutas de Reportes */}
        <Route path="/reportes">
          <Route index element={<Navigate to="/reportes/rendimiento" replace />} />
          <Route path="rendimiento" element={<div>Rendimiento Académico</div>} />
          <Route path="asistencia" element={<div>Reportes de Asistencia</div>} />
          <Route path="financieros" element={<div>Reportes Financieros</div>} />
          <Route path="exportar" element={<div>Exportar Datos</div>} />
        </Route>

        {/* Rutas de Configuración */}
        <Route path="/configuracion">
          <Route index element={<Navigate to="/configuracion/institucion" replace />} />
          <Route path="institucion" element={<div>Configuración de Institución</div>} />
          <Route path="usuarios" element={<div>Gestión de Usuarios</div>} />
          <Route path="permisos" element={<div>Permisos</div>} />
          <Route path="notificaciones" element={<div>Notificaciones</div>} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
