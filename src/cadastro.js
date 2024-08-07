window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");
    var txtNome = document.getElementById("txtNome");
    txtNome.focus();
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtTelefone = document.getElementById("txtTelefone");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtSenha = document.getElementById("txtSenha");
    var txtGenero = document.getElementById("slcGenero");

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var telefone = txtTelefone.value;
        var email = txtEmail.value;
        var senha = txtSenha.value;
        var genero = txtGenero.value;

        if (nome == "") {
            mensagemErro("É necessário preencher todos os campos acima.");
        }
        else if (sobrenome == "") {
            mensagemErro("É necessário preencher todos os campos acima.");
        }
        else if (telefone == "") {
            mensagemErro("É necessário preencher todos os campos acima.");
        }
        else if (email == "") {
            mensagemErro("É necessário preencher todos os campos acima.");
        }

        else if (senha == "") {
            mensagemErro("É necessário preencher todos os campos acima.");
        }

        else {
            realizarCadastro(nome, sobrenome, telefone, email, senha, genero);
        }
    };

    function mensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }

    function realizarCadastro(nome, sobrenome, telefone, email, senha, genero) {
       
        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "senha": senha,
            "genero": genero
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) {

                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = "home.html";
                }
                else {
                    mensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44326/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }
}