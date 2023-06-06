window.onload = inicio;

function inicio() {
    cargarDatosContactos();
}

// ----------------------------------------------------------------------------------
function cargarDatosContactos() {
    axios({
        method: 'GET',
        url: 'http://localhost:3000/contactos'
    }).then(res => {
        // console.log(res.data)
        const list = document.getElementById('listarContactos');
        const fragment = document.createDocumentFragment();
        for (const userInfo of res.data) {
            list.innerHTML = "";
            const listItem = document.createElement('TR');
            listItem.innerHTML =
                `<td>${userInfo.nombre}</td> 
                <td>${userInfo.telefono}</td> 
                <td>${userInfo.direccion}</td>
                <td>${userInfo.email}</td>
                <td> <a href="#contactos"  <button   onclick="editar (${userInfo.id}, '${userInfo.nombre}', '${userInfo.telefono}', 
                '${userInfo.direccion}', '${userInfo.email}' )" class="btn btn-success mt-2"  href="#contactos"> Editar </button> </a>
               
                <button  onclick="eliminar(${userInfo.id})" class="btn btn-danger mt-2">Eliminar</button>`
            fragment.appendChild(listItem);
        } //<a href="#contactos" ></a>
        list.appendChild(fragment);
    }).catch(err => console.log(err));
}

// ----------------------------------------------------------------------------------
const buttonRegistrarContacto = document.getElementById('btnRegistrarContacto');
buttonRegistrarContacto.addEventListener('click', async () => {
 
if (document.getElementById('nombreContacto').value==""|| document.getElementById('telefono').value=="") {
    alert("Debes completar todos los campos obligatorios (*)")
  } 
  else {       
    try {
        await axios.post("http://localhost:3000/contactos", { nombre: document.getElementById('nombreContacto').value, 
        telefono: document.getElementById('telefono').value, direccion: document.getElementById('direccion').value,
        email: document.getElementById('email').value });
        alert("Datos registrados correctamente");
        cargarDatosContactos();
    } catch (err) {
        console.log(err);
    }
}})

// ----------------------------------------------------------------------------------
const buttonGuardarEdit = document.getElementById('btnGuardarEdit');
buttonGuardarEdit.addEventListener('click', () => {

    if (document.getElementById('nombreContacto').value==""|| document.getElementById('telefono').value=="") {
        alert("Debes completar todos los campos")
      } 
      else {  

    axios.put("http://localhost:3000/contactos/" + ID_Cliente, { nombre: document.getElementById("nombreContacto").value, 
    telefono: document.getElementById("telefono").value, direccion: document.getElementById("direccion").value,
    email: document.getElementById("email").value })
        .then(alert("Datos modificados correctamente"))
        .catch(err => console.log(err));
      }
})

// ----------------------------------------------------------------------------------
async function eliminar(id) {
    try {
        await axios.delete("http://localhost:3000/contactos/" + id)
        alert("Datos borrados correctamente")
    } catch (err) {
        console.log(err)
    }
}

// ----------------------------------------------------------------------------------
function editar(id, nombre, telefono, direccion, email) {
    
    
    document.getElementById("btnRegistrarContacto").style.display = "none";
    document.getElementById("btnGuardarEdit").style.display = "block";

    document.getElementById("nombreContacto").value = nombre;
    document.getElementById("telefono").value = telefono;
    document.getElementById("direccion").value = direccion;
    document.getElementById("email").value = email;
    ID_Cliente = id;
   
}
