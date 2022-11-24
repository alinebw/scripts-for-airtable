//define bases
const cronograma = base.getTable("Cronograma");
const monitoria = base.getTable("Monitoria Turmas");

//define views
let cronoCorp = cronograma.getView("Academias Corp Ativas");
let moniCorp = monitoria.getView("[Corp] Coleta de Dados");

//define queries
let queryCorp = await moniCorp.selectRecordsAsync({
    fields: ["Crono RecID","Link de gravação da aula"],
    sorts: [
    {field: "Crono RecID", direction: "desc"}]
});
let queryCrono = await cronoCorp.selectRecordsAsync({
    fields: ["Record ID","Link da gravação","Tipo de conteúdo"],
    sorts: [
    {field: "Record ID", direction: "desc"}]
});

//pra cada form, pega link enviado
for (let range of queryCorp.records) {
    let recIdMoni = range.getCellValueAsString("Crono RecID");
    let link = range.getCellValueAsString("Link de gravação da aula");
    output.set("Link de gravação da aula", link)

//pra cada aula, pega record ID
    for (let record of queryCrono.records) {
    let recIdCrono = record.getCellValue("Record ID");
    let selectedField = {field:"Link da gravação"};

//se record ID é igual nas duas tabelas, atualiza campo Link da gravação com link enviado no form
    if(recIdMoni == recIdCrono){
        await cronograma.updateRecordAsync(record, {[selectedField.field]: link})
        }
    }
}

