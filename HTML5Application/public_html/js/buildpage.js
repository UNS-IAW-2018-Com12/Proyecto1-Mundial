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
}
;

function buildTableRow(groupNumber, teamNumber, team) {
    var id_tabla = "#tabla-grupo-" + (groupNumber + 1);
    var tableBody = $(id_tabla + " tbody");
    var row = $("<tr></tr>");
    row.append($('<td></td').addClass("align-middle").append(teamNumber + 1));
    var flagImage = $("<img>").attr("src", "img/flags/" + team.image).addClass("img-fluid img-flag");
    var globalTeamNumber = (groupNumber * 4) + (teamNumber + 1);
    var link_modal = $("<a></a>").attr("href", "#").attr("data-toggle", "modal").attr("data-target", "#modal-equipo" + globalTeamNumber);
    var team_name = $("<span></span>").addClass("team-name align-middle").append(team.name);
    row.append($("<td></td").append((link_modal).append(flagImage).append(team_name)));
    for (i = 0; i < 8; i++) {
        row.append($("<td></td").addClass("align-middle").append("0"));
    }
    $(id_tabla + " > tbody").append(row);
}
;

function buildGroupTable(groupNumber, group) {
    buildTableHeader(groupNumber);
    $.each(group.teams, function (team_index, team) {
        buildTableRow(groupNumber, team_index, team);
    });
}
;

function buildMatchListItem(teams, groupNumber, matchNumber, match) {
    var id_lista = "#partidos-grupo-" + (groupNumber + 1);
    var li = $('<li class="list-group-item partido"></li>');
    var container = $('<div class="container"></div>');
    var row_1 = $('<div class="row"></div>');
    var col_r1_1 = $('<div class="col-lg-3 order-lg-1 offset-lg-1 col-6 order-1"><div>');
    var col_r1_2 = $('<div class="col-lg-1 order-lg-2 col-4 order-3 text-center"></div>');
    var col_r1_3 = $('<div class="col-lg-2 order-lg-3 col-4 order-4 text-center"></div>');
    var col_r1_4 = $('<div class="col-lg-1 order-lg-4 col-4 order-5 text-center"></div>');
    var col_r1_5 = $('<div class="col-lg-3 order-md-5 col-6 order-2 text-right"></div>');

    var imageEq1 = "";
    var imageEq2 = "";
    $.each(teams, function (index, team) {
        if (team.name === match.equipo1)
            imageEq1 = team.image;
        if (team.name === match.equipo2)
            imageEq2 = team.image;
    });
    var flagImage1 = $("<img>").attr("src", "img/flags/" + imageEq1).addClass("img-flag");
    var flagImage2 = $("<img>").attr("src", "img/flags/" + imageEq2).addClass("img-flag");

    var team1 = $('<span class="equipo pl-lg-2"></span>').append(match.equipo1);
    var team2 = $('<span class="equipo pr-lg-2"></span>').append(match.equipo2);

    col_r1_1.append(flagImage1).append(team1);
    col_r1_2.append($('<span>(-)</span>'));
    col_r1_3.append(match.fecha);
    col_r1_4.append($('<span>(-)</span>'));
    col_r1_5.append(team2).append(flagImage2);

    row_1.append(col_r1_1);
    row_1.append(col_r1_2);
    row_1.append(col_r1_3);
    row_1.append(col_r1_4);
    row_1.append(col_r1_5);

    var row_2 = $('<div class="row"></div>');
    var col_r2_1 = $('<div class="col text-center"></div>');
    col_r2_1.append($('<button type="button" class="btn btn-primary my-3" data-toggle="collapse">Agregar pronóstico</button>').attr("data-target", "#collapse" + (groupNumber + 1) + "-" + (matchNumber + 1)));
    row_2.append(col_r2_1);

    container.append(row_1);
    container.append(row_2);

    li.append(container);
    $(id_lista).append(li);

    var collapse = $('<div class="collapse" data-parent="#accordion'+(groupNumber+1)+'"></div>').attr("id", "collapse" + (groupNumber + 1) + "-" + (matchNumber + 1));
    var card = $('<div class="card card-body">');
    var form = $('<form></form>');
    var row_form_1 = $('<div class="row"></div>');

    var form_col_r1_1 = $('<div class="col-3 offset-3 text-center"></div>');
    var form_col_r1_2 = $('<div class="col-3 text-center"></div>');

    var formGroup1 = $('<div class="form-group"></div>');
    var label1 = $('<label>Goles</label>');
    var select1 = $('<select class="form-control"></select>');
    var formGroup2 = $('<div class="form-group"></div>');
    var label2 = $('<label>Goles</label>');
    var select2 = $('<select class="form-control"></select>');

    for (i = 0; i <= 10; i++) {
        select1.append($('<option>' + i + '</option>'));
        select2.append($('<option>' + i + '</option>'));
    }

    formGroup1.append(label1).append(select1);
    formGroup2.append(label2).append(select2);
    form_col_r1_1.append(formGroup1);
    form_col_r1_2.append(formGroup2);

    row_form_1.append(form_col_r1_1);
    row_form_1.append(form_col_r1_2);

    var row_form_2 = $('<div class="row"></div>');
    var form_col_r2 = $('<div class="col text-center"></div>');
    var sendButton = $('<button type="button" class="btn btn-primary">Enviar</button>').attr("onclick", "agregarPronostico(this)");

    form_col_r2.append(sendButton);
    row_form_2.append(form_col_r2);

    form.append(row_form_1);
    form.append(row_form_2);

    card.append(form);
    collapse.append(card);

    li.append(collapse);
}
;

function buildMatchesList(groupNumber, group) {
    $.each(group.matches, function (match_index, match) {
        buildMatchListItem(group.teams, groupNumber, match_index, match);
    });

}
;

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