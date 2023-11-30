// Declarando variáveis globais
let clientes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    // Configurando eventos do modal novo cliente
    

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(evento) {
    for (let cliente of clientes) {
        if (cliente.evento === evento.id) {
            return cliente;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let cliente = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let eventoModal = modal.querySelector("#eventoModal");
    let dataModal = modal.querySelector("#dataModal");
    let statusModal = modal.querySelector("#statusModal");
    
    let btnExcluirCliente = modal.querySelector("#btnExcluirCliente");

    if (!eventoModal || !dataModal || !statusModal || !btnExcluirCliente) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    eventoModal.innerHTML = cliente.evento;
    dataModal.innerHTML = cliente.data;
    statusModal.innerHTML = cliente.status;


    // Configurando o botão de excluir
    btnExcluirCliente.onclick = function () {
        excluirCliente(cliente.evento);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cliente
function excluirCliente(evento) {
    clientes = clientes.filter(cliente => cliente.evento !== evento);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("eventos");
    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    tabela.innerHTML = "";

    for (let cliente of clientes) {
        let botaoid = `<td><button id='${cliente.evento}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${cliente.evento}</td>
            <td>${cliente.data}</td>
            <td>${cliente.status}</td>           
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarCliente() {
    let evento = document.getElementById("evento").value;
    let data = document.getElementById("data").value;
    let status = document.getElementById("status").value;

    // Verifica se a placa já está cadastrada
    if (clienteExistente(evento)) {
        alert("Evento já cadastrado. Insira um evento único.");
        return;
    }

    let novoCliente = {
        evento: evento,
        data: data,
        status: status,
    };

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(novoCliente);

    // Salva no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

}

// Função para verificar se o cliente já existe
function clienteExistente(evento) {
    return clientes.some(cliente => cliente.evento === evento);
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let cliente = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let eventoModal = modal.querySelector("#eventoModal");
    let dataModal = modal.querySelector("#dataModal");
    let statusModal = modal.querySelector("#statusModal");
    let btnExcluirCliente = modal.querySelector("#btnExcluirCliente");
    let btnEditarCliente = modal.querySelector("#btnEditarCliente"); // Adicionando botão de editar

    if (!eventoModal || !dataModal || !statusModal || !btnExcluirCliente || !btnEditarCliente) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    eventoModal.innerHTML = cliente.evento;
    dataModal.innerHTML = cliente.data;
    statusModal.innerHTML = cliente.status;

    // Configurando o botão de excluir
    btnExcluirCliente.onclick = function () {
        excluirCliente(cliente.evento);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";

    // Adicionando evento ao botão de editar
    btnEditarCliente.onclick = function () {
        // Abrir o modal de edição
        abrirModalEdicao(cliente);
    };
}

// Função para abrir o modal de edição
function abrirModalEdicao(cliente) {
    let editModal = document.getElementById("editModal");

    if (!editModal) {
        console.error("Elemento 'editModal' não encontrado no DOM");
        return;
    }

    editModal.style.display = "block";

    let editEvento = editModal.querySelector("#editEvento");
    let editData = editModal.querySelector("#editData");
    let btnSalvarEdicao = editModal.querySelector("#btnSalvarEdicao");

    if (!editEvento || !editData || !btnSalvarEdicao) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preencher campos do modal de edição com os valores atuais do cliente
    editEvento.value = cliente.evento;
    editData.value = cliente.data;

    btnSalvarEdicao.onclick = function () {
        // Salvar as alterações
        salvarEdicao(cliente.evento, editEvento.value, editData.value);
        editModal.style.display = "none";
    };
}

// Função para salvar as alterações
function salvarEdicao(eventoAtual, novoEvento, novaData) {
    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    for (let cliente of clientes) {
        if (cliente.evento === eventoAtual) {
            cliente.evento = novoEvento;
            cliente.data = novaData;
            localStorage.setItem("clientes", JSON.stringify(clientes));
            carrega();
            return;
            
        }
    }
}