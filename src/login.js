window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");
    var txtEmail = document.getElementById("txtEmail");
    txtEmail.focus();
    var txtSenha = document.getElementById("txtSenha");

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;
        var senha = txtSenha.value;

        if (email == "") {
            mensagemErro("Campo E-mail obrigatório.");
        }

        else if (senha == "") {
            mensagemErro("Campo Senha obrigatório.");
        }

        else {
            realizarLogin(email, senha);
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

    function realizarLogin(email, senha) {

        var login = {
            "email": email,
            "senha": senha
        };

        var data = JSON.stringify(login);

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
                    exibirMensagemErro(loginResult.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44326/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
            
    }
}