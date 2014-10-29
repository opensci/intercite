
function doi2pmid(doi) {

  var url = "http://www.corsproxy.com/www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids="+doi+"&format=json";

  var foo = $.getJSON( url, function( data ) {
    for (i=0;i<data.records.length;i++) {
      root_pmid = data.records[i].pmid;
      return root_pmid;
    }
  })
    .fail(function(error) {
      console.log("Failed!", error);
    });

  
}

doi = "10.1371/journal.ppat.1003211";

foo = doi2pmid(doi);

console.log(foo);
 

  /*
reflist_url = "http://www.corsproxy.com/www.ebi.ac.uk/europepmc/webservices/rest/MED/"+root_pmid+"/references/1/json";
  
  var baz = $.getJSON( url_2, function( data ) {
  for (i=0;i<data.referenceList.reference.length;i++) {
    console.log(data.referenceList.reference[i].id);
  }
})
  .fail(function() {
    console.log( "error" );
  });

 */

  
