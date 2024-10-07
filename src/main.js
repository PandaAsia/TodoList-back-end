const $listTask = document.querySelector(".listTaks");
const $form = document.querySelector("#id-Form");
const $Input = document.querySelector("#id_taks");
const $btnSubmit = document.querySelector("#id_submit");

const url = "http://localhost:3000/task";
let checking = false;
let indextask = null;

const obtenerData = async () => {
  const data = await fetch(url);
  const json = await data.json();

  const task = json
    .map((el) => {
      console.log(el);
      return `<li>${el.taskname} 
      <button onclick="EditarData(${JSON.stringify(el)
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")})">Editar</button>
      <button onclick="EliminarData(${el.id})">Eliminar</button></li>`;
    })
    .join("");
  $listTask.innerHTML = task;
};

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!$Input.value) {
    alert("Los Datos estan Vacios");
  } else {
    if (!checking) {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ title: `${$Input.value}`, completed: false }),
      });
    } else {
      const data = await fetch(`${url}/${indextask}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ title: `${$Input.value}`, completed: false }),
      });
      checking = false;
      indextask = null;
      $Input.value = "";
      $btnSubmit.value = "Enviar";
    }

    obtenerData();
  }
});

const EditarData = (data) => {
  checking = true;
  indextask = data.id;
  $Input.value = data.taskname;
  $btnSubmit.value = "Editar";
};

const EliminarData = async (id) => {
  if (id) {
    const data = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });
    obtenerData();
  }
};
obtenerData();
