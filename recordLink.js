//define bases
let cronograma = base.getTable("Cronograma");
let monitoria = base.getTable("Monitoria Turmas");

//define views
let cronoCorp = cronograma.getView("Academias Corp Ativas");
let moniCorp = monitoria.getView("[Corp] Coleta de Dados");

//define campos em que a ação vai acontecer
let queryCorp = await moniCorp.selectRecordsAsync({
  fields: ["Aula", "Link de gravação da aula"],
});

//pra cada form, retorna link enviado
for (let record of queryCorp.records) {
  let link = record.getCellValueAsString("Link de gravação da aula");
  output.set("link", link);
}

//define campos em que a ação vai acontecer 
let queryCrono = await cronoCorp.selectRecordsAsync({
  fields: ["Record ID", "Tipo de conteúdo", "Link da gravação"],
  sorts: [{ field: "Data", direction: "desc" }],
});

//pra cada aula, retorna ID
for (let record of queryCrono.records) {
  let recID = record.id;
  output.set("recID", recID);
}

