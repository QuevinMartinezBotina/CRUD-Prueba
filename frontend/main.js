let cantanteshtml = document.getElementById("cantantes");
let input = document.getElementById("idSinger");

let btn = document.getElementById("find");
let btnsave = document.getElementById("btnCreate");
let btnDelet = document.getElementById("btnDelete");
let btnUpdate = document.getElementById("btnUpdate");

/*
 *Para listar los Singer de la DB
 */
function getAll() {
  fetch("http://localhost/CRUD-Prueba/public/singer")
    .then((res) => res.json())
    .then((data) => {
      let singers = data.data;

      document.getElementById("cantantes").innerHTML = "";

      singers.forEach((element) => {
        let li = document.createElement("td");
        // console.log(element)
        cantanteshtml.innerHTML += `
                            <tr> 
                            <td id='id'>${element.singer_id}</td>
                            <td id='name'>${element.name}</td>
                            <td id='age'>${element.age}</td>
                            <td id='musical_genre'>${element.musical_genre}</td>
                            <td id='nationality'>${element.nationality}</td>
                            <td>
                            <button onclick='updateSinger(${element.singer_id})' class='btn btn-primary btn-edit'>Edit</button>
                            <button  type="button" onclick='deleteSinger(${element.singer_id})' class='btn btn-danger btnDelete'>Delete</button>
                            </td>
                            </tr>
                            `;
        //scantanteshtml.appendChild(li);
      });
    });
}

/*
 *Para la busqueda por id
 */
btn.addEventListener("click", function () {
  let id = input.value;

  fetch("http://localhost/importantes/CRUD-Prueba/public/singer/get/" + id)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.message);
        return;
      }
      document.getElementById("singerInfo").innerHTML = "";

      let cantante = document.createElement("ul");
      let singer = data.data;
      cantante.innerHTML = `<li>Nombre: ${singer.name}</li>
                                        <li>Edad: ${singer.age}</li>
                                        <li>Género musical: ${singer.musical_genre}</li>
                                        <li>Nacionalidad: ${singer.nationality}</li>`;

      document.getElementById("singerInfo").appendChild(cantante);
    });
});

/*
 *Store
 */
btnsave.addEventListener("click", function () {
  let nameValue = document.getElementById("name").value;
  let ageValue = document.getElementById("age").value;
  let musical_genreValue = document.getElementById("musical_genre").value;
  let nationalityValue = document.getElementById("nationality").value;

  !nameValue || !ageValue || !musical_genreValue || !nationalityValue
    ? alert("Revise los campos!")
    : fetch("http://localhost/CRUD-Prueba/public/singer/store", {
        method: "POST",
        body: JSON.stringify({
          name: nameValue,
          age: ageValue,
          musical_genre: musical_genreValue,
          nationality: nationalityValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("cantantes").innerHTML = "";
          alert("Create success!");
          getAll();
        });
});

/*
 *Buscar datos Singer por ID para pintar para update
 */
function findSinger(id) {
  return fetch("http://localhost/CRUD-Prueba/public/singer/get/" + id)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.message);
        return;
      }

      return data.data; //{error: false, message:"", data: []}
    });
}

/*
 * Pintar Datos para update
 */
async function updateSinger(id) {
  let singerData = await findSinger(id);

  //*llenar los campos del modal con la data de singerData
  document.getElementById("id").value = singerData.singer_id;
  document.getElementById("name").value = singerData.name;
  document.getElementById("age").value = singerData.age;
  document.getElementById("musical_genre").value = singerData.musical_genre;
  document.getElementById("nationality").value = singerData.nationality;
}

/*
 *Para Update
 */
btnUpdate.addEventListener("click", function () {
  let idValue = document.getElementById("id").value;
  let nameValue = document.getElementById("name").value;
  let ageValue = document.getElementById("age").value;
  let musical_genreValue = document.getElementById("musical_genre").value;
  let nationalityValue = document.getElementById("nationality").value;

  !idValue ||
  !nameValue ||
  !ageValue ||
  !musical_genreValue ||
  !nationalityValue
    ? alert("Revise los campos!")
    : fetch("http://localhost/CRUD-Prueba/public/singer/update/" + idValue, {
        method: "PATCH",
        body: JSON.stringify({
          name: nameValue,
          age: ageValue,
          musical_genre: musical_genreValue,
          nationality: nationalityValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("cantantes").innerHTML = "";
          alert("Update success!");
          getAll();
        });
});

/*
 *Para eliminar
 */
function deleteSinger(id) {
  user_confirm = confirm("¿Está seguro que desea eliminar el registro?");
  if (user_confirm) {
    fetch("http://localhost/CRUD-Prueba/public/singer/destroy/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("cantantes").innerHTML = "";
        getAll();
      });
  }
}

getAll();
