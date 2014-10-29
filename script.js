function ajax(url, data) {
  return new Promise(function (resolve, reject) {
    $.getJSON(url, data)
      .done(resolve)
      .fail(reject);
  });
}


var get_pmid = ajax(
  "http://www.corsproxy.com/www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids=10.1371/journal.ppat.1003211&format=json"
);


get_pmid.then(function (result) {
  var pmid = result.records[0].pmid;
  var get_refs = ajax(
    "http://www.corsproxy.com/www.ebi.ac.uk/europepmc/webservices/rest/MED/"+pmid+"/references/1/json"
  );
  get_refs.then(function (result) {
    for (i=0;i<result.referenceList.reference.length;i++) {
      console.log(result.referenceList.reference[i].id);
    }
  });  
});
