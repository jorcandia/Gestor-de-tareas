document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos los elementos del DOM
  const descripcionInput = document.getElementById("descripcion");
  const asignadoAInput = document.getElementById("asignado");
  const fechaInput = document.getElementById("fecha");
  const agregarTareaButton = document.getElementById("agregar-tarea");

  // Guardamos las tareas en el localStorage
  function guardarTareasEnLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  // Cargamos las tareas desde el localStorage
  function cargarTareasDesdeLocalStorage() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    return tareas;
  }

  function actualizarVista(tareas) {
    document
      .querySelectorAll(".task-list")
      .forEach((list) => (list.innerHTML = ""));

    tareas.forEach((tarea, index) => {
      const estado = tarea.estado;
      const li = document.createElement("li");

      // Aplica estilos según la etiqueta
      switch (tarea.etiqueta) {
        case "todo":
          // Resaltado (highlight) para TODO
          li.innerHTML = `<span style="background-color: #ffff72;">TODO:</span> ${tarea.descripcion} (Descripcion: ${tarea.asignadoA}, Fecha: ${tarea.fecha})`;
          break;
        case "fixme":
          // Resaltado (highlight) para FIXME
          li.innerHTML = `<span style="background-color: #ff9999;">FIXME:</span> ${tarea.descripcion} (Descripcion: ${tarea.asignadoA}, Fecha: ${tarea.fecha})`;
          break;
        case "review":
          // Resaltado (highlight) para REVIEW
          li.innerHTML = `<span style="background-color: #fffae5;">REVIEW:</span> ${tarea.descripcion} (Descripcion: ${tarea.asignadoA}, Fecha: ${tarea.fecha})`;
          break;
        default:
          // Si no hay etiqueta, se usa el estilo predeterminado
          li.textContent = `${tarea.descripcion} (Descripcion: ${tarea.asignadoA}, Fecha: ${tarea.fecha})`;
      }

      const lista = document.querySelector(`#${estado}`);
      lista.appendChild(li);

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      li.appendChild(btnEliminar);

      li.addEventListener("click", () => {
        const estados = ["pendiente", "en-progreso", "hecho"];
        const indice = estados.indexOf(estado);
        const nuevoEstado = estados[(indice + 1) % estados.length];
        tarea.estado = nuevoEstado;
        guardarTareasEnLocalStorage(tareas);
        actualizarVista(tareas);
      });

      btnEliminar.addEventListener("click", () => {
        tareas.splice(index, 1);
        guardarTareasEnLocalStorage(tareas);
        actualizarVista(tareas);
      });
    });
  }

  function agregarTarea() {
    const descripcion = descripcionInput.value;
    const asignadoA = asignadoAInput.value;
    const fecha = fechaInput.value;
    // Obtiene el valor del campo de selección de etiqueta
    const etiqueta = document.getElementById("etiqueta").value;

    if (descripcion && asignadoA && fecha) {
      const tarea = {
        descripcion: descripcion,
        asignadoA: asignadoA,
        fecha: fecha,
        estado: "pendiente",
        // Agrega la etiqueta a la tarea
        etiqueta: etiqueta,
      };

      const tareas = cargarTareasDesdeLocalStorage();
      tareas.push(tarea);

      guardarTareasEnLocalStorage(tareas);
      actualizarVista(tareas);

      descripcionInput.value = "";
      asignadoAInput.value = "";
      fechaInput.value = "";
    }
  }

  // Cargamos las tareas desde el localStorage
  const tareasGuardadas = cargarTareasDesdeLocalStorage();
  actualizarVista(tareasGuardadas);

  // Evento para agregar una tarea
  agregarTareaButton.addEventListener("click", agregarTarea);
});
