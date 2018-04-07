$(document).ready(function () {
    $.getJSON("data/torneo.json", function (data) {
        $.each(data, function (index_grupo, grupo) {
            $.each(grupo.participantes, function (index_participante, participante) {
                var row = $("<tr></tr>");
                row.append($("<td></td").addClass("align-middle").append(index_participante + 1));
                var img_bandera = $("<img>").attr("src", "img/banderas/"+participante.imagen).addClass("img-fluid img-flag");
                var nro_equipo = (index_grupo * 4) + (index_participante + 1);
                var link_modal = $("<a></a>").attr("href", "#").attr("data-toggle", "modal").attr("data-target", "#modal-equipo"+nro_equipo);
                var nombre_equipo = $("<span></span>").addClass("team-name align-middle").append(participante.nombre);
                row.append($("<td></td").append((link_modal).append(img_bandera).append(nombre_equipo)));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                row.append($("<td></td").addClass("align-middle").append("0"));
                var id_tabla = "#tabla-grupo-"+(index_grupo+1);
                $(id_tabla+" > tbody").append(row);
                
                
                var img_bandera_modal = $("<img>").attr("src", "img/banderas/"+participante.imagen).addClass("img-fluid img-flag");
                var id_modal = "#modal-equipo"+nro_equipo;
                $(id_modal+" .modal-title").append(img_bandera_modal).append(participante.nombre);
                $(id_modal+" .modal-body").append($("<p></p>").addClass("lead").append(participante.descripción));
            });
        });
    });
});