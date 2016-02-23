function readSingleFile(evt)
{
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 
    if (f) 
    {
        var r = new FileReader();
        r.onload = function(e) 
        { 
          var contents = e.target.result;
          var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.java|.php|.js|.cpp)$/;
          var m=(f.name).match(regex);          
          if(m)
          {
           var textArea = document.getElementById("input");
            textArea.value = e.target.result;
          }
          else
          {            
            alertify.alert("Kindly choose a PHP,Java,JavaScript or a C++ file");
            document.getElementById("fileinput").value = "";
          }        
      }
      r.readAsText(f);
    } 
    else 
    { 
      alertify.alert("Failed to load file");
    }
}
//start a function for onclick
function calculateMetric()
{
  var fctns = document.getElementById("output").value;
  /////////////////////////////////////////////////////////////////////////REGEX FOR METHODS//////////////////////////////////////////////////////////////////////////////////////////// 
  //declaration/initialization of metric parameters
  var PM=new Array();
  var PRM=new Array();
  var PA=new Array();
  var PRA=new Array();
  var PO=new Array();
  var PRO=new Array();
  //public invocations
  var PI=new Array();
  var PRI=new Array();

  var totalpublicmethods;
  var totalprivatemethods; 
  var totalpublicvariables;
  var totalprivatevariables;

  //public methods in a class
  var publicmethod=fctns.match(/((function)\s+(\w+)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((\w+)(\:)\s*(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((((\w+)(\.))+)(\w+)(\=)(\()?(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))+/g); //|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
   
  if(publicmethod==null)
  {
    totalpublicmethods=0;
    PM.length=totalpublicmethods;
    console.log("PM= "+PM.length);
  }  
  else if(publicmethod!=null)
  {

      totalpublicmethods=publicmethod;
      PM.length=totalpublicmethods.length;
      console.log("PM= "+PM.length);
  }  
  //gets the private methods in a class
  var privatemethod=fctns.match(/((function)\s+(\w+)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((\w+)(\:)\s*(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((((\w+)(\.))+)(\w+)(\=)(\()?(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))+/g); //|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
  if(privatemethod==null)
  {
    totalprivatemethods=0;
    PRM.length=totalprivatemethods;
    console.log("PRM= "+PRM.length);
  }
  else if(privatemethod!=null)
  {
      totalprivatemethods=0;
      PRM.length=totalprivatemethods;
      console.log("PRM= "+PRM.length);
  }
  
  /////////////////////////////////////////////////////////////////////////REGEX FOR VARIABLE///////////////////////////////////////////////////////////////////////////////////////////////
  //public variables
  //get the public member(packed within the constructor)
  //get the constructors first//also serves as a list of available methods in the class

  var pbvr=new Array();

  var constructors=fctns.match(/((function)\s+(\w+)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((\w+)(\:)\s*(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((((\w+)(\.))+)(\w+)(\=)(\()?(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))+/g); 
  //check the public variables in the class available in the methocds 
  
  if(constructors!=null)
    {
      var pubble=constructors.toString();
      var pp=pubble.match(/(this)(\.)(\w+)+/g);


      if(pp==null)
      {
        totalpublicvariables=0;
        PA.length=totalpublicvariables;
        console.log("PA= "+PA.length);
      }
      else if(pp!=null)
      {
          for (iu= 0; iu<pp.length; ++iu)
            {
              var e6=pp[iu];
              var e7=e6.replace(/(\.)+/,"");
              var er=e7.replace(/(this)+/,"");
              var e8=(er.match(/(\w+)+/g)); 
              for (fy= 0; fy<e8.length; ++fy)
                              {            
                                 pbvr.push(e8[fy]);               
                              } 
            }   
        var pubvariable=pbvr.filter(function (item,pos){
                               return pbvr.indexOf(item)==pos;
                             });
       
          totalpublicvariables=pubvariable;
          PA.length=totalpublicvariables.length;
          console.log("PA= "+PA.length);
      } 

  //get the private variablxes 
  var prvari=new Array();

  var po=pubble.match(/((var)\s*(\w+)(\=)?\s*(\w+)?(\;))|((var)\s*(\w+)(\=)?\s*(\{)(\}))|((\,)(\w+)(\,))|((\,)(\w+)(\;))|((\,)(\w+)(\=))+/g);

  if(po!=null)
  {
    for (ou= 0; ou<po.length; ++ou)
        {
          var y6=po[ou];
          var y7=y6.replace(/(\=)+/,"");
          var yr=y7.replace(/(var)+/,"");
          var y8=(yr.match(/(\w+)+/g)); 
          for (ty= 0; ty<y8.length; ++ty)
                          {            
                             prvari.push(y8[ty]);               
                          } 

        }

    var prvariable=prvari.filter(function (item,pos){
                           return prvari.indexOf(item)==pos;
                         });
   
      totalprivatevariables=prvariable;
      PRA.length=totalprivatevariables.length;
      console.log("PRA= "+PRA.length);
 
  }
  else if(po==null)
  {
    totalprivatevariables=0;
    PRA.length=totalprivatevariables;
    console.log("PRA= "+PRA.length);
  }
}


  /////////////////////////////////////////////////////////////RETRIEVING ENTIRE TEXT FOR EACH METHOD/////////////////////////////////////////
  var pubmthd=new Array(); //create an array to hold all the public methods generated
  var prmthd=new Array(); //create an array to hold all the private methods generated
  var pbv=new Array(); //create an array to hold all the public variables generated
  var prv=new Array(); //create an array to hold all the private variables generated

  var totalpublicoccurrence=new Array();
  var totalprivateoccurrence=new Array();

  //var pubmethodcontent=fctns.match(/(public)\s+(\w+)\s+(\w+)(\()((\w*)(\s+)(\w*)(\,)?)*(\))(\{)(\w*)(.+?)(\})+/g); //best regex method so far
  var pubmethodcontent=fctns.match(/((function)\s+(\w+)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((\w+)(\:)\s*(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))+/g); //|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
  //get the local variables within public mcethods
  var localpub=[];
  var totallocalvariables=[]; //stores all the local variables(from public and private mthods/content)
  var localvariableusage=[];
  var usagelocals=[];

  var gh=new Array();

   if(typeof(pubmethodcontent) === 'undefined' || pubmethodcontent == null)
    {
      var a61=0;     
    }
    else if(typeof(pubmethodcontent) !== 'undefined' || pubmethodcontent != null) 
    {
          //string the public method content
          var stringPublic=pubmethodcontent.toString();

          //create a regex to check for any matching local variable
          localpub=stringPublic.match(/(var)\s+(\w+)(\=)|(\w+)(\=)+/g);
          var locale=localpub.filter(function (item,pos){
                               return localpub.indexOf(item)==pos;
                             });  
          locale.forEach(function(lc){

             var rlocale=lc.replace(/(\s*)(var)|(\=)+/g,""); 
             var localclassusage=fctns.match(new RegExp(rlocale,"g"));
             //push all the local variables class usage
             localvariableusage.push(localclassusage);

             totallocalvariables.push(rlocale);

             
          });

          localvariableusage.forEach(function(lvv){
          
           for(w0=0;w0<lvv.length;w0++)
           {
              usagelocals.push(lvv[w0]);
           }

          });

         

          //loop through the public methods
         
          for(pm=0;pm<pubmethodcontent.length;++pm)
          {
              pubmthd.push(pubmethodcontent[pm]);            
          }          
          if(typeof(pubvariable)=== 'undefined' || pubvariable == null)
          {
              //anything....(;
          }          
          //if public variables exist  
          else if(typeof(pubvariable) !== 'undefined' || pubvariable != null)
           { 
            //console.log(totalpublicvariables);             
             for(pub1= 0; pub1<pubvariable.length; pub1++)
               {
                    var rypub=pubvariable[pub1];                      
                    var npub2=rypub.replace(/(\;)+/,"");
                    var npub4=npub2.replace(/(\=)+/,""); 
                    var npub5=npub4.replace(/[(][)](\w+)+/,""); 
                    var npub6=(npub5.match(/(\w+)+/g));                                 
                                     
                    for (rypub1= 0; rypub1<npub6.length; ++rypub1)
                        {            
                           pbv.push(npub6[rypub1]);               
                        }                    
               }
               //loop through public methods matching public variables occurrence    
            
               for(za1=0;za1<pubmthd.length;++za1)
                {
                   for(wa1=0;wa1<pbv.length;++wa1)
                      {   
                           var kzy=pubmthd[za1].match(new RegExp(pbv[wa1],"g"));                                                      
                           if(kzy!=null)
                           {
                            
                            gh.push(kzy); 

                           }     
                           else if(kzy==null)
                           {
                            
                           }                                                             
                           
                      }           
                }                
                                                  
            }
        }

           
   var prmethodcontent=fctns.match(/((function)\s+(\w+)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))|((\w+)(\:)\s*(function)(\()((\w+)?(\,)?)*(\))(\{)(\w*)(.+?)(\}))+/g); //|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
   var ytt=new Array(); //test array   
       
        if(typeof(prmethodcontent) === 'undefined' || prmethodcontent == null)
        {
          var a221=0; 
        }
        else if(typeof(prmethodcontent) !== 'undefined' || prmethodcontent != null) 
        {

          //loop through the public methods
          for(psm=0;psm<prmethodcontent.length;++psm)
          {
              pubmthd.push(prmethodcontent[psm]);            
          }
          
         if(typeof(prvariable) === 'undefined' || prvariable == null)
            {
              
            }
            else if(typeof(prvariable) !== 'undefined' || prvariable != null)
            { 
                       
              for(pbb1= 0; pbb1<prvariable.length; ++pbb1)
               {  
                    var rb=prvariable[pbb1];
                    var rbx1=rb.replace(/(\var)(\;)+/,"");
                    var rbx2=rbx1.replace(/(\=)+/,""); 
                    var rbx3=rbx2.replace(/[(][)](\w+)+/,""); 
                    var rbx4=(rbx3.match(/(\w+)+/g));
                                                           
                    for (ryab1= 0; ryab1<rbx4.length; ++ryab1)
                        {            
                          prv.push(rbx4[ryab1]);               
                        }  
               }
              //loop through the public methods matching private variables occurrence              
              for(zip=0;zip<pubmthd.length;++zip)
              {
                  for(wii=0;wii<prv.length;++wii)
                    {    
                         var k=String(pubmthd[zip]).match(new RegExp(prv[wii],"g"));
                                                                         
                           if(k!=null)
                           {                            
                            
                            ytt.push(k);

                           }     
                           else if(k==null)
                           {
                            
                           }                                  

                    }                             
              }                          
            }
          }
   //combine private and public variables in the class
  
  //////////////////////////////////////////////////////////////////////REGEX FOR METHOD CALLS////////////////////////////////////////////////////////////////////////////////////////////
   var mthdcall=[];

   var pushmethodname=new Array();
   var yuuu=new Array();

  var mthdcall=fctns.match(/(\w+)(\()(\))(\;)+/g);
  //check for the names of all the methods
  var methodstext=fctns.match(/((function)\s+(\w+))|((\w+)(\:)\s*(function))+/g);
  if(methodstext!=null)
  {

      for(var wv=0;wv<methodstext.length;wv++)
      {
       //console.log(mreplace1);
       var mtched=methodstext[wv].replace(/(function)+/,"");
       var mtched1=mtched.replace(/(\:)+/,"");
       pushmethodname.push(mtched1);

      }  

      mthdcall=pushmethodname;
  }
  
  var wq=0;
  var pl=0; 
  //check availability of method calls
  if(typeof(mthdcall) === 'undefined' || mthdcall == null)
    {
      PI.length=0;
      PRI.length=0;
      console.log(PI.length+PRI.length+" method calls found");
    }
    else if(typeof(mthdcall) !== 'undefined' || mthdcall != null) 
    {                    
    ////////////////////////////////////////////////appearance of a method call within any given method (private|public)////////////////////////////////////////////////////////////////////
            if(typeof(totalpublicmethods) === 'undefined' || totalpublicmethods == null) 
            {
                 PI.length=0;
                 PRI.length=0;
            }
            else if(typeof(totalpublicmethods) !== 'undefined' || totalpublicmethods != null) 
            { 
                    
                   
                    for(t=0;t<pubmthd.length;++t)
                    {
                        for(lq=0;lq<mthdcall.length;++lq)
                          {    
                               
                              var ky=String(pubmthd[t]).match(new RegExp(mthdcall[lq],"g"));                               
                                                                                  
                              if(typeof(ky) === 'undefined' || ky == null) 
                                  {
                                       

                                  }
                               else if(typeof(ky) !== 'undefined' || ky != null)
                                 {
                                      yuuu.push(ky);                                   
                                 }                                                                                                      
                          }                             
                    }
                    var uio=yuuu.length+ytt.length+gh.length;
                    totalpublicoccurrence.length=uio;     
                                        
            } 
          
      }
        //check usage

        console.log("Total public occurrence(PO)= "+totalpublicoccurrence.length);
        console.log("Total private occurrence(PRO)= "+totalprivateoccurrence.length);   
         
       //calculating the values of COH
       var totaloccurences=ytt.length+gh.length;
       var totalmethods=PM.length+PRM.length;
       var totalattributes=PA.length+PRA.length;

       console.log("*******************local variables in the class******************");
                   console.log("Local Variables ="+totallocalvariables.length);

       console.log("*****************************************************************");
       console.log("*******************local variables class usage******************");
                      console.log(usagelocals.length-totallocalvariables.length);

         var LCOM5;
      console.log("**************************************************");
              
      if(totaloccurences==0)
       {
        LCOM5=0;
        console.log("LCOM5 value= "+LCOM5);
       }
       else if(totaloccurences>0)
       {
        LCOM5=((totaloccurences-(totalattributes*totalmethods))/(totalattributes-(totalattributes*totalmethods)));
        console.log("LCOM5 value= "+LCOM5);
       }
       if(LCOM5>0)
       {
        console.log("**************************************************");
       var COH=1-((1-(1/totalattributes))*LCOM5);
       console.log("**************************************************");
       if(COH=1)
       {
        if(totalmethods!=0 && totalattributes!=0)
         {
          var COH1=(totaloccurences)/(totalattributes*totalmethods);
          console.log("COH value= "+COH1);
         }
         else if(totalmethods==0 || totalattributes==0)
         {
          console.log("COH value= "+0);
         }
       }
       else
       {
        console.log("COH value= "+COH);
       }
       

       console.log("**************************************************");

       }  
       else if(LCOM5==0)
       {
         var COH=1;
         console.log("COH value= "+COH);
       }    
      


        ////////////////////////----------------------------/////////////////////////////////
        //calculating the final metric values

        var TPC=(PA.length+PRA.length)*PM.length;
        var TPRC=(PA.length*PRA.length)*PRM.length;
        var PC=0;
        var PRC=0;
        var sccm=0;
        var stndrd=(totaloccurences)/(totalattributes*totalmethods);


        if(typeof(totalpublicoccurrence.length) === 'undefined' || totalpublicoccurrence.length == null) 
        {
          PC+=0;
          PRC+=totalprivateoccurrence.length/TPRC;
          sccm+=PC+PRC;
          if(sccm>1)
          {
            console.log("SCCM value= "+stndrd);
          }
          else if(sccm<1)
          {
            console.log("SCCM value= "+sccm);
          }    
        }
        else if((typeof(totalpublicoccurrence.length) !== 'undefined' || totalpublicoccurrence.length != null) || (typeof(totalprivateoccurrence.length) !== 'undefined' || totalprivateoccurrence.length != null))
        {
          if(totalprivateoccurrence.length==0 && totalpublicoccurrence.length!=0)
          {
            PRC+=0;
            PC+=totalpublicoccurrence.length/TPC;
            sccm+=PC+PRC;
            if(sccm>1)
              {
                console.log("SCCM value= "+stndrd);
              }
              else if(sccm<1)
              {
                console.log("SCCM value= "+sccm);
              }
          }
          else if(totalpublicoccurrence.length==0 && totalprivateoccurrence.length!=0)
          {
            PC+=0;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm+=PC+PRC;
           if(sccm>1)
              {
                console.log("SCCM value= "+stndrd);
              }
              else if(sccm<1)
              {
                console.log("SCCM value= "+sccm);
              }

          }
          else if(totalprivateoccurrence.length==0 && totalpublicoccurrence.length==0)
          {
             PC+=0;
             PRC+=0;
             sccm+=PC+PRC;
           if(sccm>1)
            {
              console.log("SCCM value= "+stndrd);
            }
            else if(sccm<1)
            {
              console.log("SCCM value= "+sccm);
            }
          }
          else
          {
            PC+=totalpublicoccurrence.length/TPC;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm+=PC+PRC;
            if(sccm>1)
              {
                console.log("SCCM value= "+stndrd);
              }
              else if(sccm<1)
              {
                console.log("SCCM value= "+sccm);
              }
          }          
         
        }
        else if(typeof(totalprivateoccurrence.length) === 'undefined' || totalprivateoccurrence.length == null) 
        {
          if(totalprivateoccurrence.length==0 && totalprivateoccurrence.length==0)
          {
            PC+=0;
            PRC+=0;
            sccm+=PC+PRC;
           if(sccm>1)
            {
              console.log("SCCM value= "+stndrd);
            }
            else if(sccm<1)
            {
              console.log("SCCM value= "+sccm);
            }
          }
          else
          {
             PRC+=0;
             PC+=totalpublicoccurrence.length/TPC;
             sccm+=PC+PRC;
             if(sccm>1)
              {
                console.log("SCCM value= "+stndrd);
              }
              else if(sccm<1)
              {
                console.log("SCCM value= "+sccm);
              }
          }
         
        } 

       var meanvalue;
       var lcohesion;
       var ppy=totallocalvariables.length;

       if(ppy==0)
       {
        meanvalue=0;

        console.log("Local Cohesion="+meanvalue);
       }

       else if(ppy>0 &&(usagelocals.length-totallocalvariables.length)!=0)
       {

          meanvalue=ppy/(usagelocals.length-totallocalvariables.length);
          lcohesion=1-meanvalue;
          console.log("Local Cohesion="+lcohesion);
          
        
       }
       else if(ppy>0 &&(usagelocals.length-totallocalvariables.length)==0)
       {
         meanvalue=0;
         console.log("Local Cohesion="+meanvalue);          
        
       }
        
  }                        

