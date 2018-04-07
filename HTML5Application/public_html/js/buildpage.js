function buildGroupTable(groupNumber, teamNumber, team) {
    var row = $("<tr></tr>");
    row.append($("<td></td").addClass("align-middle").append(teamNumber + 1));
    var img_bandera = $("<img>").attr("src", "img/flags/" + team.image).addClass("img-fluid img-flag");
    var globalTeamNumber = (groupNumber * 4) + (teamNumber + 1);
    var link_modal = $("<a></a>").attr("href", "#").attr("data-toggle", "modal").attr("data-target", "#modal-equipo" + globalTeamNumber);
    var team_name = $("<span></span>").addClass("team-name align-middle").append(team.name);
    row.append($("<td></td").append((link_modal).append(img_bandera).append(team_name)));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    row.append($("<td></td").addClass("align-middle").append("0"));
    var id_tabla = "#tabla-grupo-" + (groupNumber + 1);
    $(id_tabla + " > tbody").append(row);
    console.log(id_tabla);
}

function buildTeamModal(groupNumber, teamNumber, team) {
    var img_bandera_modal = $("<img>").attr("src", "img/flags/" + team.image).addClass("img-fluid img-flag");
    var globalTeamNumber = (groupNumber * 4) + (teamNumber + 1);
    var id_modal = "#modal-equipo" + globalTeamNumber;
    $(id_modal + " .modal-title").append(img_bandera_modal).append(team.name);
    $(id_modal + " .modal-body").append($("<p></p>").addClass("lead").append(team.description));
}

function buildPage(data) {
    $.each(data, function (group_index, group) {
        $.each(group.teams, function (team_index, team) {
            buildGroupTable(group_index, team_index, team);
            buildTeamModal(group_index, team_index, team);
        });
        $.each(group.teams, function (team_index, team) {
        });
    });
};

$(document).ready(function () {
    $.getJSON("data/torneo.json", function (data) {
        buildPage(data);
    });
});