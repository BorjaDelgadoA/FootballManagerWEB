var contenedor = document.getElementById("lista-partidos");
    fetch("../json/FM_partits_fem.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {

            var lista = datos;

            for (var i = 0; i < lista.length; i++) {

                var partido = lista[i];

        
                var divPartido = document.createElement("div");
                divPartido.classList.add("partido");

                var divLocal = document.createElement("div");
                divLocal.classList.add("equip");

                var imgLocal = document.createElement("img");
                imgLocal.src = partido.equip_local.escut;

                var nombreLocal = document.createElement("span");
                nombreLocal.textContent = partido.equip_local.nom;

                divLocal.appendChild(imgLocal);
                divLocal.appendChild(nombreLocal);

                var divCentro = document.createElement("div");

                var resultado = document.createElement("div");
                resultado.classList.add("resultado");
                resultado.textContent = partido.resultat;

                
                var fecha = document.createElement("div");
                fecha.classList.add("data");
                fecha.textContent = partido.data;

                divCentro.appendChild(resultado);
                divCentro.appendChild(fecha);

    
                var divVisitante = document.createElement("div");
                divVisitante.classList.add("equip");

                var nombreVisitante = document.createElement("span");
                nombreVisitante.textContent = partido.equip_visitant.nom;

                var imgVisitante = document.createElement("img");
                imgVisitante.src = partido.equip_visitant.escut;

                divVisitante.appendChild(nombreVisitante);
                divVisitante.appendChild(imgVisitante);

                divPartido.appendChild(divLocal);
                divPartido.appendChild(divCentro);
                divPartido.appendChild(divVisitante);

                contenedor.appendChild(divPartido);
            }
        });
