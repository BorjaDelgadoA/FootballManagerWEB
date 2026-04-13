async function cargarClasificacion() {

    const res = await fetch("../JSON/FM_partits_fem.json");
    const partidos = await res.json();

    const equipos = {};

    function crearEquipo(e) {
        if (!equipos[e.nom]) {
            equipos[e.nom] = {
                nombre: e.nom,
                escudo: e.escut,
                pj: 0, pg: 0, pe: 0, pp: 0,
                gf: 0, gc: 0, pts: 0
            };
        }
    }

    partidos.forEach(p => {
        crearEquipo(p.equip_local);
        crearEquipo(p.equip_visitant);

        const local = equipos[p.equip_local.nom];
        const visitante = equipos[p.equip_visitant.nom];

        const [gL, gV] = p.resultat.split("-").map(Number);

        local.pj++;
        visitante.pj++;

        local.gf += gL;
        local.gc += gV;

        visitante.gf += gV;
        visitante.gc += gL;

        if (gL > gV) {
            local.pg++;
            local.pts += 3;
            visitante.pp++;
        } else if (gV > gL) {
            visitante.pg++;
            visitante.pts += 3;
            local.pp++;
        } else {
            local.pe++;
            visitante.pe++;
            local.pts++;
            visitante.pts++;
        }
    });

    const clasificacion = Object.values(equipos)
        .sort((a, b) =>
            b.pts - a.pts ||
            (b.gf - b.gc) - (a.gf - a.gc) ||
            b.gf - a.gf
        );

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    clasificacion.forEach((e, i) => {
        tabla.innerHTML += `
        <tr>
            <td class="pos">${i + 1}</td>
            <td class="equipo">
                <img src="${e.escudo}" alt="${e.nombre}" class="escudo-clasificacion">
                ${e.nombre}
            </td>
            <td>${e.pj}</td>
            <td>${e.pg}</td>
            <td>${e.pe}</td>
            <td>${e.pp}</td>
            <td>${e.gf}</td>
            <td>${e.gc}</td>
            <td><strong>${e.pts}</strong></td>
        </tr>
        `;
    });
}

async function cargarGolejadores() {

    const escudoMap = {
        "FC Barcelona": "../Imagenes/logoF/logo_fcb.png",
        "Real Madrid CF": "../Imagenes/logoF/logo_madrid.png",
        "Atlético de Madrid": "../Imagenes/logoF/logo_atmadrid.png",
        "Sevilla FC": "../Imagenes/logoF/logo_sevilla.png",
        "Real Sociedad": "../Imagenes/logoF/logo_sociedad.png",
        "Real Betis": "../Imagenes/logoF/logo_betis.png",
        "Athletic Club": "../Imagenes/logoF/logo_athleticclub.png",
        "Valencia CF": "../Imagenes/logoF/logo_valencia.png",
        "RCD Espanyol": "../Imagenes/logoF/logo_espanyol.png",
        "Deportivo Abanca": "../Imagenes/logoF/logo_deportivo.png",
        "SD Eibar": "../Imagenes/logoF/logo_eibar.png",
        "Granada CF": "../Imagenes/logoF/logo_granada.png",
        "Levante UD": "../Imagenes/logoF/logo_levante.png"
    };

    const res = await fetch("../JSON/jugadores.json");
    const equipo = await res.json();

    let jugadores = [];

    equipo.forEach(equip => {
        equip.jugadors.forEach(j => {
            if (j.posicio === "Davanter") {
                jugadores.push({
                    nom: j.nomPersona,
                    foto: j.foto,
                    equip: equip.equip,
                    escudo: escudoMap[equip.equip] || ""
                });
            }
        });
    });

    const cont = document.getElementById("mejorejg");
    const mejores = ["MVP"];
    cont.innerHTML = "";

    jugadores.slice(0, 6).forEach((j, i) => {
        cont.innerHTML += `
        <div class="jugadora">
            <div class="mejores">${mejores[i] || "MVP"}</div>
            <img class="foto-jugadora" src="${j.foto}" alt="${j.nom}">
            <h3>${j.nom}</h3>
            <p>
                <img class="escudo" src="${j.escudo}" alt="${j.equip}">
                ${j.equip}
            </p>
        </div>
        `;
    });
}

cargarClasificacion();
cargarGolejadores();