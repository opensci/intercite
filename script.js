doi = "10.1371/journal.ppat.1003211";

doi2pmid_url = "http://www.corsproxy.com/www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids="+doi+"&format=json";


var doi2pmid = $.getJSON( doi2pmid_url, function( data ) {
  for (i=0;i<data.records.length;i++) {
    root_pmid = data.records[i].pmid;
  }
})
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  });
  

doi2pmid.done(function() {
  console.log( "root_pmid: "+root_pmid );
  
  reflist_url = "http://www.corsproxy.com/www.ebi.ac.uk/europepmc/webservices/rest/MED/"+root_pmid+"/references/1/json";
  
  var reflist = $.getJSON( reflist_url, function( data ) {
  for (i=0;i<data.referenceList.reference.length;i++) {
    console.log(data.referenceList.reference[i].id);
  }
})
  .fail(function() {
    console.log( "error" );
  });

  
  
})  
  
  
