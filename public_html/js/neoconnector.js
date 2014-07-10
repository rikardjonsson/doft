/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function searchFragrance() {
  /*$("#result").val('');*/
  var fragrenceName = $("#searchFragInput").val();
  var cypherQuery = "MATCH (p:Perfume)-[:smell]->(n:note)<-[:smell]-(p2:Perfume) WHERE p.title = '"+fragrenceName+"' AND NOT p=p2 RETURN p2.title AS name, p2.brand, count(*) AS similarity ORDER BY similarity DESC limit 999";
  var serverURL = "http://localhost:7474/db/data";
  $.ajax({
    type:"POST",
    url: serverURL + "/cypher",
    accepts: "application/json",
    dataType: "json",
    contentType:"application/json",
    headers: { 
      "X-Stream": "true"    
    },
    data:JSON.stringify({ "query" : cypherQuery }),
    success: function(data, textStatus, jqXHR){
     console.log(data);
   
     //var jsondata = JSON.stringify(data.data);
     $("#result").empty('#result');
    
     $.each( data.data, function(id, name, brand, similarity){
         
        var td1 = [name][0][0];
        var td2 = [name][0][1];
        var td3 = [name][0][2];
          $("#result").append('<TR><TD>'+td1+'</TD><TD>'+td2+'</TD><TD>'+td3+'</TD></TR>');        
     
     });
 
    
    },
    error: function(jqXHR, textStatus, errorThrown){
     alert(errorThrown);
     console.log(textStatus);
    }
  });//end of ajax
  }; //end of getSomething()
  
  
  function listFragrance() {
  /*$("#result").val('');*/
  var fragrenceName = $("#searchFragInput").val();
  var cypherQuery = "MATCH (b:brand)-[:belongs_to]-(p:Perfume) where b.name = '"+fragrenceName+"' return b.name, p.title ";
  var serverURL = "http://localhost:7474/db/data";
  $.ajax({
    type:"POST",
    url: serverURL + "/cypher",
    accepts: "application/json",
    dataType: "json",
    contentType:"application/json",
    headers: { 
      "X-Stream": "true"    
    },
    data:JSON.stringify({ "query" : cypherQuery }),
    success: function(data, textStatus, jqXHR){
     console.log(data);
   
     //var jsondata = JSON.stringify(data.data);
     $("#result").empty('#result');
    
     $.each( data.data, function(id, name, brand, similarity){
         
        var td1 = [name][0][0];
        var td2 = [name][0][1];
        
          $("#result").append('<TR><TD>'+td1+'</TD><TD>'+td2+'</TD></TR>');        
     
     });
 
    
    },
    error: function(jqXHR, textStatus, errorThrown){
     alert(errorThrown);
     console.log(textStatus);
    }
  });//end of ajax
  }; //end of getSomething()