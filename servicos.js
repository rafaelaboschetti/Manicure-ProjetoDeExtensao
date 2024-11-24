//----------------------MODAIS ADICIONAR/EDITAR----------------------//

let modalEditar;
let clienteIdEditando = null;
document.addEventListener("DOMContentLoaded", () => {
  //Modal Adcionar
  const adicionarButton = document.querySelector(".btn-adicionar");
  const modal = document.getElementById("adicionar-modal");
  const closeButton = document.querySelector(".close[data-modal='adicionar-modal']");
  const adicionarForm = document.getElementById("adicionar-form");
  
   //Modal editar (verificando se o modal existe)
   modalEditar = document.getElementById("editar-modal");
   if (!modalEditar) {
     console.error("Modal de edição não encontrado no DOM.");
   }
   const closeButtonEditar = document.querySelector(".close[data-modal='editar-modal']");
   const editarForm = document.getElementById("editar-form");

  // Abrir modal ao clicar no botão
  adicionarButton.addEventListener("click", () => {
      modal.style.display = "block";
  });

  // Fechar modal ao clicar no botão de fechar
  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Fechar modal ao clicar fora do conteúdo do modal
  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  //----------------------ADICIONAR CLIENTE----------------------//

  // Enviar dados do formulário via POST para a API
  adicionarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobreNome = document.getElementById("sobreNome").value;
    const telefone = document.getElementById("telefone").value;

    const clienteData = {
      nome: nome,
      sobreNome: sobreNome,
      telefone: parseInt(telefone)
    };

    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes',{
      // const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteData)
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar cliente");
      }

      const data = await response.json();

      // Fechar o modal após adicionar o cliente
      modal.style.display = "none";

      // Atualizar a tabela com o novo cliente
      await fetchClientes();

    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  });
  
  //----------------------EDITAR CLIENTE----------------------//

  // Fechar modal de edição
  closeButtonEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
  });

   // Enviar dados de edição via PUT para a API
  editarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nomeEditado").value;
    const sobreNome = document.getElementById("sobreNomeEditado").value;
    const telefone = document.getElementById("telefoneEditado").value;

    const clienteData = {
      nome: nome,
      sobreNome: sobreNome,
      telefone: parseInt(telefone)
    };

    console.log("Dados a serem enviados para edição:", clienteData);
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/clientes/${clienteIdEditando}`, {
      // const response = await fetch(`http://localhost:8080/clientes/${clienteIdEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteData)
      });

      if (!response.ok) {
        throw new Error("Erro ao editar cliente");
      }

      const data = await response.json();
      modalEditar.style.display = "none";
      await fetchClientes();

    } catch (error) {
      console.error("Erro ao editar cliente:", error);
    }
  });
});

// Função para editar um cliente
function editarCliente(cliente) {
  clienteIdEditando = cliente.telefone;
  document.getElementById("nomeEditado").value = cliente.nome;
  document.getElementById("sobreNomeEditado").value = cliente.sobreNome;
  document.getElementById("telefoneEditado").value = cliente.telefone;

  if (modalEditar) {
    modalEditar.style.display = "block";
  } else {
    console.error("Modal de edição não encontrado.");
  }
}

//----------------------BUSCAR DADOS----------------------//

//Método Get para buscar os Clientes
  async function fetchClientes() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes');
      // const response = await fetch('http://localhost:8080/clientes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

//----------------------EXCLUSÃO----------------------//

  //Fetch com método Delete para apagar um cliente especifico
  async function deleteCliente(clienteId, row) {
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/clientes/${clienteId}`, {
      // const response = await fetch(`http://localhost:8080/clientes/${clienteId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }
      row.remove();
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  }
  //Modal de exclusão
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const row = event.target.closest("tr");
      const clienteId = event.target.getAttribute("data-id");
  
      // Exibe o modal
      const modalExcluir = document.getElementById("apagar-modal");
      modalExcluir.style.display = "block";

      // botão "Excluir" no modal
      const excluirButton = modalExcluir.querySelector("button:last-of-type");
      excluirButton.onclick = async () => {
        await deleteCliente(clienteId, row);
        modalExcluir.style.display = "none";
      };

      // botão "Cancelar" no modal
      const cancelarButton = modalExcluir.querySelector("button:first-of-type");
      cancelarButton.onclick = () => {
        modalExcluir.style.display = "none"; 
      };
    }
  });

  //----------------------OUTRAS FUNÇÕES----------------------//

  // Função para converter telefone
  function formatarTelefone(telefone) {
    const telefoneStr = String(telefone);
    const cleaned = telefoneStr.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]}-${match[3]}`;
    }
    return telefoneStr;
  }

  // Função para renderizar os clientes na tabela
  function populateTable(services) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
  
    services.forEach(service => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${service.nome} ${service.sobreNome}</td>
        <td>${formatarTelefone(service.telefone)}</td>
        <td>${service?.email ? service.email : "--"}
          <span class="actions">
              <button class="edit-btn" data-id="${service.telefone}">✏️</button>
              <button class="delete-btn" data-id='${service.telefone}'>🗑️</button>
          </span>
        </td>
      `;
      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", () => editarCliente(service));
      tableBody.appendChild(row);
    });
  }
  window.onload = async () => {
    await fetchClientes();
};