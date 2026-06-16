<template>
  <div class="page">
    <div class="certificate">
      <h1>CONSTANCIA DE MATRÍCULA DE LABORATORIO</h1>
      <h2>Escuela Profesional de Ingeniería de Sistemas EPIS</h2>
      <p class="date">Emitido el: {{ fecha }}</p>

      <hr />

      <section>
        <h3>DATOS DEL ALUMNO</h3>

        <div class="student-data">
          <p><strong>C.U.I.:</strong></p>
          <p>{{ alumno.cui }}</p>

          <p><strong>Nombre completo:</strong></p>
          <p>{{ alumno.full_name }}</p>

          <p><strong>Email:</strong></p>
          <p>{{ alumno.email }}</p>
        </div>
      </section>

      <section>
        <h3>ASIGNATURAS MATRICULADAS</h3>

        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Código</th>
              <th>Curso</th>
              <th>Año</th>
              <th>Grupo</th>
              <th>Laboratorio</th>
              <th>Docente</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in cursos" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.workload.course.code }}</td>
              <td>
                <strong>
                  {{ item.workload.course.name }}
                  <br />
                  ({{ item.workload.course.acronym }})
                </strong>
              </td>
              <td>{{ item.workload.course.year_display }}</td>
              <td>{{ item.workload.group }}</td>
              <td>{{ item.workload.laboratory }}</td>
              <td>{{ item.workload.teacher.full_name }}</td>
            </tr>
          </tbody>
        </table>

        <p class="total">
          <strong>Total de cursos matriculados:</strong> {{ cursos.length }}
        </p>
      </section>

      <p class="footer">
        Documento generado digitalmente por Osmeyer Meza en el laboratorio de la EPIS en el curso de DAW.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConstanciaView',

  data() {
    return {
      alumno: {
        cui: '',
        full_name: '',
        email: ''
      },
      cursos: [],
      fecha: ''
    }
  },

  async mounted() {
    const cui = this.$route.params.cui

    const response = await axios.get(
        `/api/constancia?cui=${cui}`
    )

    this.cursos = response.data.results

    if (this.cursos.length > 0) {
      this.alumno = this.cursos[0].student
    }

    this.fecha = new Date().toLocaleDateString('es-PE')
  }
}
</script>

<style scoped>
.page {
  background: white;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
}

.certificate {
  max-width: 1180px;
  margin: auto;
  padding: 18px;
  border: 2px solid #0b3d6d;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  background: white;
}

.certificate::before {
  content: "";
  display: block;
  height: 6px;
  background: #0b3d6d;
  border-radius: 10px 10px 0 0;
  margin: -18px -18px 18px -18px;
}

h1 {
  text-align: center;
  color: #0b3d6d;
  font-size: 28px;
  margin: 0;
}

h2 {
  text-align: center;
  font-size: 22px;
  margin: 8px 0;
}

.date {
  text-align: center;
  color: #666;
  margin-bottom: 28px;
}

hr {
  border: none;
  border-top: 2px solid #aaa;
  margin-bottom: 28px;
}

section {
  margin-bottom: 30px;
}

h3 {
  background: #f0f0f0;
  border-left: 5px solid #0b4f86;
  padding: 10px 14px;
  font-size: 20px;
  color: #222;
}

.student-data {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 14px 20px;
  font-size: 18px;
  margin: 25px 10px;
}

.student-data p {
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 17px;
}

th,
td {
  border: 1px solid #d0d0d0;
  padding: 12px 14px;
  text-align: left;
}

th {
  background: #f8f8f8;
}

.total {
  margin-top: 35px;
  font-size: 19px;
}

.footer {
  text-align: center;
  font-style: italic;
  color: #999;
  margin-top: 25px;
}
</style>