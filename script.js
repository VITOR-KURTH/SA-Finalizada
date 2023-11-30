// Obtendo os elementos do formulário de login
const campoLogin = document.getElementById("login");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("novoLogin");
const campoNovaSenha = document.getElementById("novaSenha");
const campoRepSenha = document.getElementById("repSenha");

// Função para realizar o login
function login() {
    // Obtendo os valores dos campos de login e senha
    let login = campoLogin.value;
    let senha = campoSenha.value;
    let mensagem = "Usuário ou senha incorreta!";
    // Obtendo o banco de dados do armazenamento local
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));

    // Verificando se não há usuários cadastrados ainda
    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento";
    } else {
        let usuarioEncontrado = false;

        // Iterando sobre o banco de dados para verificar o login e senha
        for (let usuario of bancoDeDados) {
            if (usuario.login == login && usuario.senha == senha) {
                mensagem = "Parabéns, você logou!";
                // Armazenando o usuário logado no armazenamento local
                localStorage.setItem("logado", JSON.stringify(usuario));
                // Redirecionando para a página inicial após o login bem-sucedido
                window.location.href = "HomePage.html";
                usuarioEncontrado = true; 
                break;
            }
        }

        // Caso o usuário não seja encontrado no banco de dados
        if (!usuarioEncontrado) {
            mensagem = "Usuário não encontrado. Faça o cadastro primeiro.";
        }
    }
    // Exibindo mensagem de alerta com o resultado do login
    alert(mensagem);
}

// Função para cadastro de novos usuários
function cadastro() {
    // Obtendo os valores dos campos de novo login, nova senha e repetir senha
    let novoLogin = campoNovoLogin.value;
    let novaSenha = campoNovaSenha.value;
    let repetirSenha = campoRepSenha.value;
    let mensagem = "";

    // Verificando se os campos estão preenchidos corretamente
    if (novoLogin.trim() === '' || novaSenha.trim() === '' || repetirSenha.trim() === '') {
        mensagem = "Por favor, preencha todos os campos.";
    } else if (novaSenha !== repetirSenha) {
        mensagem = "As senhas são diferentes!";
    } else {
        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
        if (bancoDeDados === null) {
            bancoDeDados = [];
        }
        // Verificando se o novo login já existe no banco de dados
        if (verificaSeExiste(novoLogin, bancoDeDados)) {
            mensagem = "Esse usuário já está cadastrado.";
        } else {
            // Criando um novo objeto de usuário e armazenando no banco de dados
            const usuario = {
                login: novoLogin,
                senha: novaSenha
            };
            bancoDeDados.push(usuario);
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
            mensagem = "Usuário cadastrado com sucesso!";
            // Redirecionando para a página de login após o cadastro
            window.location.href = "login.html";
        }
    }

    // Exibindo mensagem de alerta com o resultado do cadastro
    if (mensagem !== '') {
        alert(mensagem);
    }
}

// Função para verificar se um usuário já existe no banco de dados
function verificaSeExiste(login, banco) {
    for (let usuario of banco) {
        if (login === usuario.login) {
            return true;
        }
    }
    return false;
}

// Funções para redirecionar para diferentes páginas
function voltar(){
    window.location.href="index.html"
}

function IrCadastro(){
    window.location.href="cadastro.html"
}

function texto(){
    window.location.href="texto.html"
}

function logar(){
    window.location.href="HomePage.html"
}

function Voltar(){
    history.back()
}

// Arrays para armazenar descrições e textos
const descricaos = [];
const textos = [];
       
// Função para adicionar elementos à lista
function add(){
    // Obtendo os valores dos campos de descrição e texto
    const descricao = document.getElementById("name").value.toUpperCase();
    const texto = document.getElementById("job").value.toUpperCase();

    const index = descricaos.indexOf(descricao);
    const elementos = {
        text: texto,
        datae: descricao
    };
    let bancoDeElementos = JSON.parse(localStorage.getItem("bancoDeElementos"));
    if (bancoDeElementos == null) {
        bancoDeElementos = [];
    }
    bancoDeElementos.push(elementos);
    localStorage.setItem("bancoDeElementos", JSON.stringify(bancoDeElementos));
    alert("Elemento cadastrado com sucesso!")
        
    // Verificando se a descrição já existe na lista
    if(index == -1){
        textos.push(texto);
        descricaos.push(descricao);
        atualizarLista();  
    }else {
        alert(`${descricao} já existe na lista.`); 
    }
}
    
// Função para atualizar a lista de descrições e textos
function atualizarLista() {
    const listaText = document.getElementById("listaPessoas");
    listaText.innerHTML = "";
           
    for (let i = 0; i < descricaos.length; i++) {
        const item = document.createElement("li");
        item.textContent = `${descricaos[i]} - ${textos[i]}`;
        listaText.appendChild(item);
    }
}

// Obtendo informações do usuário logado para exibição
let usuario = JSON.parse(localStorage.getItem("logado"));
document.getElementById("titulo").innerHTML = "Bem vindo, "+usuario.login+"!"

// Função para voltar à página de login
function Volta(){
    window.location.href="login.html"
}