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

  // Actualiza la vista de las tareas
  function actualizarVista(tareas) {
    // Limpia las listas actuales
    document
      .querySelectorAll(".task-list")
      .forEach((list) => (list.innerHTML = ""));

    // Agrega las tareas a las listas correspondientes
    tareas.forEach((tarea, index) => {
      const estado = tarea.estado;
      const li = document.createElement("li");
      li.textContent = `${tarea.descripcion} (Asignado a: ${tarea.asignadoA}, Fecha: ${tarea.fecha})`;

      const lista = document.querySelector(`#${estado}`);
      lista.appendChild(li);

      // Agrega un boton de eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      li.appendChild(btnEliminar);

      // Agrega eventos para cambiar el estado de la tarea
      li.addEventListener("click", () => {
        const estados = ["pendiente", "en-progreso", "hecho"];
        const indice = estados.indexOf(estado);
        const nuevoEstado = estados[(indice + 1) % estados.length];
        tarea.estado = nuevoEstado;
        guardarTareasEnLocalStorage(tareas);
        actualizarVista(tareas);
      });

      // Agrega evento para eliminar la tarea
      btnEliminar.addEventListener("click", () => {
        tareas.splice(index, 1);
        guardarTareasEnLocalStorage(tareas);
        actualizarVista(tareas);
      });
    });
  }

  // Agrega una tarea a la lista
  function agregarTarea() {
    const descripcion = descripcionInput.value;
    const asignadoA = asignadoAInput.value;
    const fecha = fechaInput.value;

    if (descripcion && asignadoA && fecha) {
      const tarea = {
        descripcion: descripcion,
        asignadoA: asignadoA,
        fecha: fecha,
        estado: "pendiente",
      };

      const tareas = cargarTareasDesdeLocalStorage();
      tareas.push(tarea);

      guardarTareasEnLocalStorage(tareas);
      actualizarVista(tareas);

      // Limpiar los campos de entrada
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
