function buildTeamModal(groupNumber, teamNumber, team) {
    var img_bandera_modal = $("<img>").attr("src", "img/flags/" + team.image).addClass("img-fluid img-flag");
    var globalTeamNumber = (groupNumber * 4) + (teamNumber + 1);
    var id_modal = "#modal-equipo" + globalTeamNumber;
    $(id_modal + " .modal-title").append(img_bandera_modal).append(team.name);
    $(id_modal + " .modal-body").append($("<p></p>").addClass("lead").append(team.description));
}

function buildTableHeader(groupNumber) {
    var id_tabla = "#tabla-grupo-" + (groupNumber + 1);
    var tableHeader = $(id_tabla + " thead");
    var row = $("<tr></tr>");
    var headerFields = [String.fromCharCode(65 + groupNumber), "Equipo", "Pts", "PJ", "PG", "PE", "PP", "GF", "GC", "+/-"];
    $.each(headerFields, function (index, field) {
        row.append($('<th scope="col"></th>').append(field));
    });
    tableHeader.append(row);
};

function buildTableRow(groupNumber, teamNumber, team) {
    var id_tabla = "#tabla-grupo-" + (groupNumber + 1);
    var tableBody = $(id_tabla + " tbody");
    var row = $("<tr></tr>");
    row.append($('<th scope="row"></th').addClass("align-middle").append(teamNumber + 1));
    var flagImage = $("<img>").attr("src", "img/flags/" + team.image).addClass("img-fluid img-flag");
    var globalTeamNumber = (groupNumber * 4) + (teamNumber + 1);
    var link_modal = $("<a></a>").attr("href", "#").attr("data-toggle", "modal").attr("data-target", "#modal-equipo" + globalTeamNumber);
    var team_name = $("<span></span>").addClass("team-name align-middle").append(team.name);
    row.append($("<td></td").append((link_modal).append(flagImage).append(team_name)));
    for (i = 0; i < 8; i++) {
        row.append($("<td></td").addClass("align-middle").append("0"));
    } 
    $(id_tabla + " > tbody").append(row);
};

function buildGroupTable(groupNumber, group) {
    buildTableHeader(groupNumber);
    $.each(group.teams, function (team_index, team) {
        buildTableRow(groupNumber, team_index, team);
        buildTeamModal(groupNumber, team_index, team);
    });
};

function buildMatchesList(groupNumber, group) {
    
};

function buildPage(data) {
    $.each(data, function (group_index, group) {
        buildGroupTable(group_index, group);
        buildMatchesList(group_index, group);
    });
}
;

$(document).ready(function () {
    $.getJSON("data/torneo.json", function (data) {
        buildPage(data);
    });
});

function ordenarTabla(tablaID) {
    $("#" + tablaID).tablesorter({
        sortList: [[2, 1], [9, 1]],
        headers: {
            0: {
                sorter: false
            },
            1: {
                sorter: false
            },
            2: {
                sorter: false
            },
            3: {
                sorter: false
            },
            4: {
                sorter: false
            },
            5: {
                sorter: false
            },
            6: {
                sorter: false
            },
            7: {
                sorter: false
            },
            8: {
                sorter: false
            },
            9: {
                sorter: false
            }         
        }
    }); 
    $("#" + tablaID).trigger("destroy");
}

function updateTable(tablaID, eq1, golesEq1, eq2, golesEq2) {
    var filas = $("#" + tablaID).find('tr').slice(1);
    var celdasEq1 = filas.filter("tr:contains('" + eq1 + "')").find('td');
    var celdasEq2 = filas.filter("tr:contains('" + eq2 + "')").find('td');

    // puntos y pg pe pp
    var puntos1 = parseInt(celdasEq1.eq(2).text());
    var puntos2 = parseInt(celdasEq2.eq(2).text());

    if (golesEq1 < golesEq2) {
        puntos2 += 3;
        var pp1 = parseInt(celdasEq1.eq(6).text());
        pp1++;
        celdasEq1.eq(6).text(pp1);
        var pg2 = parseInt(celdasEq2.eq(4).text());
        pg2++;
        celdasEq2.eq(4).text(pg2);
    } else {
        if (golesEq1 > golesEq2) {
            puntos1 += 3;
            var pg1 = parseInt(celdasEq1.eq(4).text());
            pg1++;
            celdasEq1.eq(4).text(pg1);
            var pp2 = parseInt(celdasEq2.eq(6).text());
            pp2++;
            celdasEq2.eq(6).text(pp2);
        } else {
            puntos1++;
            puntos2++;
            var pe1 = parseInt(celdasEq1.eq(5).text());
            pe1++;
            celdasEq1.eq(5).text(pe1);
            var pe2 = parseInt(celdasEq2.eq(5).text());
            pe2++;
            celdasEq2.eq(5).text(pe2);
        }
    }

    celdasEq1.eq(2).text(puntos1);
    celdasEq2.eq(2).text(puntos2);

    // pj
    var pj1 = parseInt(celdasEq1.eq(3).text());
    var pj2 = parseInt(celdasEq2.eq(3).text());
    pj1++;
    pj2++;
    celdasEq1.eq(3).text(pj1);
    celdasEq2.eq(3).text(pj2);

    // goles 

    var gf1 = parseInt(celdasEq1.eq(7).text());
    var gf2 = parseInt(celdasEq2.eq(7).text());
    var gc1 = parseInt(celdasEq1.eq(8).text());
    var gc2 = parseInt(celdasEq2.eq(8).text());
    var d1 = parseInt(celdasEq1.eq(9).text());
    var d2 = parseInt(celdasEq2.eq(9).text());
    gf1 += golesEq1;
    gf2 += golesEq2;
    gc1 += golesEq2;
    gc2 += golesEq1;

    d1 = gf1 - gc1;
    d2 = gf2 - gc2;

    celdasEq1.eq(7).text(gf1);
    celdasEq1.eq(8).text(gc1);
    celdasEq1.eq(9).text(d1);
    celdasEq2.eq(7).text(gf2);
    celdasEq2.eq(8).text(gc2);
    celdasEq2.eq(9).text(d2);
    
    
    ordenarTabla(tablaID);
}
;

$('.boton-pronostico').on('click', function () {
    var inputs = $(this).closest('form').find('select');
    var golesEquipo1 = parseInt(inputs.eq(0).val());
    var golesEquipo2 = parseInt(inputs.eq(1).val());
    var li = $(this).closest('li').find('span');
    var equipo1 = li.eq(0).text();
    var equipo2 = li.eq(3).text();
    li.eq(1).text(golesEquipo1);
    li.eq(2).text(golesEquipo2);
    var tablaID = $(this).closest('.tab-pane').find('table').attr('id');
    updateTable(tablaID, equipo1, golesEquipo1, equipo2, golesEquipo2);
    $(this).closest('.collapse').collapse('hide');
    $(this).closest('li').css("background-color", "#eee");
    $(this).closest('li').find('button').eq(0).removeClass('btn-primary').addClass('btn-danger').removeAttr('data-toggle').removeAttr('data-target').attr("onclick", "borrarPronostico(this)").text("Borrar pronóstico");
});

function reverseTableChanges(tablaID, eq1, golesEq1, eq2, golesEq2) {
    var filas = $("#" + tablaID).find('tr').slice(1);
    var celdasEq1 = filas.filter("tr:contains('" + eq1 + "')").find('td');
    var celdasEq2 = filas.filter("tr:contains('" + eq2 + "')").find('td');

    // puntos y pg pe pp
    var puntos1 = parseInt(celdasEq1.eq(2).text());
    var puntos2 = parseInt(celdasEq2.eq(2).text());

    if (golesEq1 < golesEq2) {
        puntos2 -= 3;
        var pp1 = parseInt(celdasEq1.eq(6).text());
        pp1--;
        celdasEq1.eq(6).text(pp1);
        var pg2 = parseInt(celdasEq2.eq(4).text());
        pg2--;
        celdasEq2.eq(4).text(pg2);
    } else {
        if (golesEq1 > golesEq2) {
            puntos1 -= 3;
            var pg1 = parseInt(celdasEq1.eq(4).text());
            pg1--;
            celdasEq1.eq(4).text(pg1);
            var pp2 = parseInt(celdasEq2.eq(6).text());
            pp2--;
            celdasEq2.eq(6).text(pp2);
        } else {
            puntos1--;
            puntos2--;
            var pe1 = parseInt(celdasEq1.eq(5).text());
            pe1--;
            celdasEq1.eq(5).text(pe1);
            var pe2 = parseInt(celdasEq2.eq(5).text());
            pe2--;
            celdasEq2.eq(5).text(pe2);
        }
    }

    celdasEq1.eq(2).text(puntos1);
    celdasEq2.eq(2).text(puntos2);

    // pj
    var pj1 = parseInt(celdasEq1.eq(3).text());
    var pj2 = parseInt(celdasEq2.eq(3).text());
    pj1--;
    pj2--;
    celdasEq1.eq(3).text(pj1);
    celdasEq2.eq(3).text(pj2);

    // goles 

    var gf1 = parseInt(celdasEq1.eq(7).text());
    var gf2 = parseInt(celdasEq2.eq(7).text());
    var gc1 = parseInt(celdasEq1.eq(8).text());
    var gc2 = parseInt(celdasEq2.eq(8).text());
    var d1 = parseInt(celdasEq1.eq(9).text());
    var d2 = parseInt(celdasEq2.eq(9).text());
    gf1 -= golesEq1;
    gf2 -= golesEq2;
    gc1 -= golesEq2;
    gc2 -= golesEq1;

    d1 = gf1 - gc1;
    d2 = gf2 - gc2;

    celdasEq1.eq(7).text(gf1);
    celdasEq1.eq(8).text(gc1);
    celdasEq1.eq(9).text(d1);
    celdasEq2.eq(7).text(gf2);
    celdasEq2.eq(8).text(gc2);
    celdasEq2.eq(9).text(d2);
    
    ordenarTabla(tablaID);
}
;

function borrarPronostico(button) {
    var spans = $(button).closest('li').find('span');
    var golesEquipo1 = parseInt(spans.eq(1).text());
    var golesEquipo2 = parseInt(spans.eq(2).text());
    var equipo1 = spans.eq(0).text();
    var equipo2 = spans.eq(3).text();
    var tablaID = $(button).closest('.tab-pane').find('table').attr('id');
    spans.eq(1).text("(-)");
    spans.eq(2).text("(-)");
    reverseTableChanges(tablaID, equipo1, golesEquipo1, equipo2, golesEquipo2);
    var idCollapse = $(button).closest('li').find('.collapse').attr('id');
    $(button).removeClass('btn-danger').addClass("btn-primary").attr('data-toggle', 'collapse').attr('data-target', '#'+idCollapse).text("Agregar pronóstico").removeAttr('onclick');

    $(button).closest('li').css("background-color", "white");
}

