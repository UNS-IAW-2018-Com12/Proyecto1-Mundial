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

function incrementPJ(celdasEquipo) {
    var pj = parseInt(celdasEquipo.eq(3).text());
    pj++;
    celdasEquipo.eq(3).text(pj);
};

function updateGoals(celdasEquipo, golesAFavor, golesEnContra) {
    var gf = parseInt(celdasEquipo.eq(7).text());
    var gc = parseInt(celdasEquipo.eq(8).text());
    var dif = parseInt(celdasEquipo.eq(9).text());
    gf += golesAFavor;
    gc += golesEnContra;
    dif = gf - gc;
    celdasEquipo.eq(7).text(gf);
    celdasEquipo.eq(8).text(gc);
    celdasEquipo.eq(9).text(dif);
};

function updatePointsAndMatches(celdasEquipo, golesAFavor, golesEnContra) {
    var puntos = parseInt(celdasEquipo.eq(2).text());
    if (golesAFavor < golesEnContra) {
        var pp = parseInt(celdasEquipo.eq(6).text());
        pp++;
        celdasEquipo.eq(6).text(pp);
    } else {
        if (golesAFavor > golesEnContra) {
            puntos += 3;
            var pg = parseInt(celdasEquipo.eq(4).text());
            pg++;
            celdasEquipo.eq(4).text(pg);
        } else {
            puntos++;
            var pe = parseInt(celdasEquipo.eq(5).text());
            pe++;
            celdasEquipo.eq(5).text(pe);
        }
    }
    celdasEquipo.eq(2).text(puntos);
};

function updatePositions(tablaID) {
    var filasTabla = $("#" + tablaID).find('tr').slice(1);
    $.each(filasTabla, function(index, fila) {
        $(fila).find("td").eq(0).text(index+1);
    });
};

function updateTable(tablaID, eq1, golesEq1, eq2, golesEq2) {
    var filas = $("#" + tablaID).find('tr').slice(1);
    var celdasEq1 = filas.filter("tr:contains('" + eq1 + "')").find('td');
    var celdasEq2 = filas.filter("tr:contains('" + eq2 + "')").find('td');
    
    incrementPJ(celdasEq1);
    incrementPJ(celdasEq2);
    updatePointsAndMatches(celdasEq1, golesEq1, golesEq2);
    updatePointsAndMatches(celdasEq2, golesEq2, golesEq1);
    updateGoals(celdasEq1, golesEq1, golesEq2);
    updateGoals(celdasEq2, golesEq2, golesEq1);
    ordenarTabla(tablaID);
    updatePositions(tablaID);
}
;

function agregarPronostico(button) {
    var inputs = $(button).closest('form').find('select');
    var golesEquipo1 = parseInt(inputs.eq(0).val());
    var golesEquipo2 = parseInt(inputs.eq(1).val());
    var li = $(button).closest('li').find('span');
    var equipo1 = li.eq(0).text();
    var equipo2 = li.eq(3).text();
    li.eq(1).text(golesEquipo1);
    li.eq(2).text(golesEquipo2);
    var tablaID = $(button).closest('.tab-pane').find('table').attr('id');
    updateTable(tablaID, equipo1, golesEquipo1, equipo2, golesEquipo2);
    $(button).closest('.collapse').collapse('hide');
    $(button).closest('li').css("background-color", "#eee");
    $(button).closest('li').find('button').eq(0).removeClass('btn-primary').addClass('btn-danger').removeAttr('data-toggle').removeAttr('data-target').attr("onclick", "borrarPronostico(this)").text("Borrar pronóstico");
}
;

function decrementPJ(celdasEquipo) {
    var pj = parseInt(celdasEquipo.eq(3).text());
    pj--;
    celdasEquipo.eq(3).text(pj);
};

function deleteGoals(celdasEquipo, golesAFavor, golesEnContra) {
    var gf = parseInt(celdasEquipo.eq(7).text());
    var gc = parseInt(celdasEquipo.eq(8).text());
    var dif = parseInt(celdasEquipo.eq(9).text());
    gf -= golesAFavor;
    gc -= golesEnContra;
    dif = gf - gc;
    celdasEquipo.eq(7).text(gf);
    celdasEquipo.eq(8).text(gc);
    celdasEquipo.eq(9).text(dif);
};

function deletePointsAndMatch(celdasEquipo, golesAFavor, golesEnContra) {
    var puntos = parseInt(celdasEquipo.eq(2).text());
    if (golesAFavor < golesEnContra) {
        var pp = parseInt(celdasEquipo.eq(6).text());
        pp--;
        celdasEquipo.eq(6).text(pp);
    } else {
        if (golesAFavor > golesEnContra) {
            puntos -= 3;
            var pg = parseInt(celdasEquipo.eq(4).text());
            pg--;
            celdasEquipo.eq(4).text(pg);
        } else {
            puntos--;
            var pe = parseInt(celdasEquipo.eq(5).text());
            pe--;
            celdasEquipo.eq(5).text(pe);
        }
    }
    celdasEquipo.eq(2).text(puntos);
};

function reverseTableChanges(tablaID, eq1, golesEq1, eq2, golesEq2) {
    var filas = $("#" + tablaID).find('tr').slice(1);
    var celdasEq1 = filas.filter("tr:contains('" + eq1 + "')").find('td');
    var celdasEq2 = filas.filter("tr:contains('" + eq2 + "')").find('td');
    
    decrementPJ(celdasEq1);
    decrementPJ(celdasEq2);
    deletePointsAndMatch(celdasEq1, golesEq1, golesEq2);
    deletePointsAndMatch(celdasEq2, golesEq2, golesEq1);
    deleteGoals(celdasEq1, golesEq1, golesEq2);
    deleteGoals(celdasEq2, golesEq2, golesEq1);
    ordenarTabla(tablaID);
    updatePositions(tablaID);
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
    $(button).removeClass('btn-danger').addClass("btn-primary").attr('data-toggle', 'collapse').attr('data-target', '#' + idCollapse).text("Agregar pronóstico").removeAttr('onclick');
    $(button).closest('li').css("background-color", "white");
}