//define bases
const cronograma = base.getTable("Cronograma");
const monitoria = base.getTable("Monitoria Turmas");

//define views
let cronoCorp = cronograma.getView("Academias Corp Ativas");
let moniCorp = monitoria.getView("[Corp] Coleta de Dados por turma");

//seleciona registros da tabela Monitoria de Turma
let queryCorp = await moniCorp.selectRecordsAsync({
    fields: ["Crono RecID","Link de gravação da aula","Link enviado?"],
    sorts: [
    {field: "Crono RecID", direction: "desc"}]
});

//seleciona registros da tabela Cronograma
let queryCrono = await cronoCorp.selectRecordsAsync({
    fields: ["Record ID","Link da gravação"],
    sorts: [
    {field: "Record ID", direction: "desc"}]
});

//pra cada form, se checkbox está desmarcado, pega link enviado
for (let range of queryCorp.records) {
    let check = range.getCellValue("Link enviado?");
    let recIdMoni = range.getCellValueAsString("Crono RecID");
    let link = range.getCellValueAsString("Link de gravação da aula");
    if(check == null){
        output.set("Link de gravação da aula", link);
}
//pra cada aula, identifica record id e campo que será enviado link
    for (let record of queryCrono.records) {
    let recIdCrono = record.getCellValue("Record ID");
    let selectedField = {field:"Link da gravação"};

//se record ID é igual nas duas tabelas, atualiza campo Link da gravação com link enviado no form
    if(recIdMoni == recIdCrono){
        await cronograma.updateRecordAsync(record, {[selectedField.field]: link})
        }
    };       
}