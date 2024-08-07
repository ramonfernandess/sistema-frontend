window.onload = function (e) {
    var bntRecuperarEmail = document.getElementById("bntRecuperarEmail");
    var txtEmail = document.getElementById("txtEmail");
    txtEmail.focus();

    bntRecuperarEmail.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            var mensagem = "Campo E-mail obrigatório.";
            mensagemErro(mensagem);
        }

        else {
            esqueciSenha(email);
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

    function esqueciSenha(email) {
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);
                if (result.sucesso) {
                    alert("Foi enviado um link para a recuperação da senha do e-mail " + email);
                }
                else {
                    mensagemErro(result.mensagem);
                }
            }
        });
    
        xhr.open("POST", "https://localhost:44326/api/usuario/esqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}