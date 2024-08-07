window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "1-login-personalizado.html";

    }
    else {
        obterUsuario(usuarioGuid);
    }
  

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");
        window.location.href = "1-login-personalizado.html";
    }

    var icon = document.querySelector(".icon");
    icon.onclick = function (e) {
        var menu = document.querySelector(".topnav");
        if (menu.className == "topnav") {
            menu.className += " open";
        }
        else {
            menu.className = "topnav";
        }
    }

    function obterUsuario(usuarioGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    //sucesso
                    var spnMensagem = document.getElementById("spnMensagem");
                    spnMensagem.innerText = "Bem-vindo ao sistema " + result.nome;
                }
                else {
                    window.location.href = "1-login-personalizado.html";
                }
            }
        });

        xhr.open("GET", "https://localhost:44326/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();
    }
}