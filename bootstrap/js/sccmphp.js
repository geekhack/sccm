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

//function for comparing two arrays //from stackoverflow implementation
var diffIndexes=[];

function arrayDiff(a, b) {
    return a.filter(function(i) {
        if (b.indexOf(i) < 0) {
            diffIndexes.push(a.indexOf(i));
            return true;
        } else {
            return false;
        }
    });
};

  //start a function for onclick

function calculateMetric()
{
  var alertValue;

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
  var publicmethod=fctns.match(/(public)\s+(\w+)\s+(\w+)(\()+/g);
  //alternate regex for methods
  var pubh=fctns.match(/(public)\s+(\w+)\s+(\w+)(\()((\$)(\w+)((\,)?)*)(\))+/g);
  
  

  if(publicmethod==null &&pubh==null)
  {
    totalpublicmethods=0;
    PM.length=totalpublicmethods;
     alertValue+="\nPM= "+PM>length;
    console.log("PM= "+PM.length);
  }
  if(publicmethod==null && pubh!=null)
  {
     totalpublicmethods=pubh;
     var c=totalpublicmethods.toString();
     var cc=c.replace(/public|function|\(|(\$\w+)|\)+/g,"");
     //split string
     var cd=cc.split(",");
     //remove any repeating method
     var ce=cd.filter(function (item,pos){
                               return cd.indexOf(item)==pos;
                             });     

     
     PM=ce;
     PM.length=ce.length;  
      alertValue+="\nPM= "+PM.length;  
     console.log("PM= "+PM.length); 

  }
  else if(publicmethod!=null && pubh==null)
  {
      totalpublicmethods=publicmethod;
     var a=totalpublicmethods.toString();
     var ac=a.replace(/public|function|\(|(\$\w+)|\)+/g,"");
     //split string
     var ad=ac.split(",");
     //remove any repeating method
     var ae=ad.filter(function (item,pos){
                               return ad.indexOf(item)==pos;
                             });

      
      PM=ae;
      PM.length=ae.length; 
       alertValue+="\nPM= "+PM.length;   
      console.log("PM= "+PM.length);

  }
  else if(publicmethod!=null && pubh!=null)
  {  
     totalpublicmethods=publicmethod.concat(pubh);
     //chop loose ends
     var b=totalpublicmethods.toString();
     var bc=b.replace(/public|function|\(|(\$\w+\,?)+|\)+/g,"");
     //split string
     var bd=bc.split(",");
     //remove any repeating method
     var be=bd.filter(function (item,pos){
                               return bd.indexOf(item)==pos;
                             });

    PM=be;

     PM.length=be.length;
     alertValue="**WELCOME TO SCCM SOFTWARE-PHP SCANNER***";
     alertValue+="\n**Developer: Rafael Wanjiku--@geekhack(Github Account)**";
     alertValue+="**\n";

     console.log("******************WELCOME TO SCCM SOFTWARE*******************"); 
     console.log("******************Developer: Rafael Wanjiku--@geekhack(Github Account)********************");
     //console.log("************Accessed on"+Date()+"*****************");
     console.log("******************************************************************************************");  
     
     alertValue+="PM= "+PM.length;

     console.log("PM= "+PM.length); 

  }   
 
  //gets the private methods in a class
  var privatemethod=fctns.match(/(private|protected)\s+(\w+)\s+(\w+)(\()+/g); 
  var prbh=fctns.match(/(private|protected)\s+(\w+)\s+(\w+)(\()((\$)(\w+)((\,)?)*)(\))+/g);
  
  if(privatemethod==null &&prbh==null)
  {
    totalprivatemethods=0;
    PRM.length=totalprivatemethods;
    console.log("PRM= "+PRM.length);
  }
  if(privatemethod==null && prbh!=null)
  {
    totalprivatemethods=prbh;
    var e=totalprivatemethods.toString();
     var ec=e.replace(/private|protected|function|\(|(\$\w+\,?)+|\)|\s+/g,"");
     //split string
     var ed=ec.split(",");
     //remove any repeating method
     var ee=ed.filter(function (item,pos){
                               return ed.indexOf(item)==pos;
                             });     

    PRM=ee;
    PRM.length=ee.length;
     alertValue+="\nPRM= "+PRM.length;
    console.log("PRM= "+PRM.length); 
  }
  else if(privatemethod!=null && prbh==null)
  {
      totalprivatemethods=privatemethod;
      var f=totalprivatemethods.toString();
      var fc=f.replace(/private|protected|function|\(|(\$\w+\,?)+|\)+/g,"");
     //split string
     var fd=fc.split(",");
     //remove any repeating method
     var fe=fd.filter(function (item,pos){
                               return fd.indexOf(item)==pos;
                             });     

      PRM=fe;
      PRM.length=fe.length;
      alertValue+="\n"+"PRM= "+PRM.length;
      console.log("PRM= "+PRM.length);
  }
  else if(privatemethod!=null &&prbh!=null)
  {  
     totalprivatemethods=privatemethod.concat(prbh);
     var g=totalprivatemethods.toString();
     var gc=g.replace(/private|protected|function|\(|(\$\w+\,?)+|\)+/g,"");
     //split string
     var gd=gc.split(",");
     //remove any repeating method
     var ge=gd.filter(function (item,pos){
                               return gd.indexOf(item)==pos;
                             }); 
     PRM=ge;   
     PRM.length=ge.length;
      alertValue+="\nPRM= "+PRM.length;
     console.log("PRM= "+PRM.length); 
  }   
  /////////////////////////////////////////////////////////////////////////REGEX FOR VARIABLE///////////////////////////////////////////////////////////////////////////////////////////////
  //public variables
  var tpublicvs=[];
  var totalpublicpushed=[];

  var pubvariable=fctns.match(/(public)\s+(\$)(\w*?)(\;)+/g);
  var pubvariable4=fctns.match(/(public)\s+(\$)[_](\w+)+/g);
  var pubvariable2=fctns.match(/(public)\s+(\$)(\w+)*(\=)(\[)?(\w+)?(\])?(\;)+/g); 
  var pubvariable3=fctns.match(/(public)\s+(\$)(\w+)*(\=)(\w+)(\()(\))(\;)+/g);//null;//fctns.match(/(public)\s+((\w+)\s+(\w+))*(\;)+/g);

  tpublicvs.push(pubvariable);
  tpublicvs.push(pubvariable2);
  tpublicvs.push(pubvariable3);
  tpublicvs.push(pubvariable4);


  if(tpublicvs!=null)
  {
   for (var pubvates=0;pubvates<tpublicvs.length;pubvates++)
       {
          var fpx=tpublicvs[pubvates];
           if(fpx!=null)
           {
            //remove all the repeats of the public attributes
             var fpubvates=fpx.filter(function (item,pos){
                         return fpx.indexOf(item)==pos;
                       });

             fpubvates.forEach(function(posp){
                
               totalpublicpushed.push(posp);

             });
           }              

       }
      PA.length=totalpublicpushed.length;
      alertValue+="\n"+"PA= "+PA.length;
      console.log("PA= "+PA.length); 
  }
  else if(tpublicvs==null)
  { 
    totalpublicpushed==null;   
    var fpub=0;
    PA.length=fpub;
     alertValue+="\nPA= "+PA.length;
    console.log("PA= "+PA.length);
  }
  

  //variable to store all the private variables 
  var totalprivatespushed=[];
  var tprivatevs=[];
  
  var prvariable=fctns.match(/(private|protected)\s+(\$)((\w*?)(\;))+/g);
  var prvariable4=fctns.match(/(private|protected)\s+(\$)[_](\w+)+/g);
  //var prvr=fctns.match(/(private|protected)\s+(\$)(\w+)(\=)+/g);
  var prvariable2=fctns.match(/(private|protected)\s+(\$)(\w+)*(\=)(\[)?(\w+)?(\])?(\;)+/g); 
  var prvariable3=fctns.match(/(private|protected)\s+(\$)(\w+)*(\=)(\w+)(\()(\))(\;)+/g);
  var prvariable5=fctns.match(/(private|protected)\s+(\$)(\w+)*(\=)+/g);
  tprivatevs.push(prvariable);
  tprivatevs.push(prvariable2);
  tprivatevs.push(prvariable3);
  tprivatevs.push(prvariable4);
  tprivatevs.push(prvariable5);

  //console.log(tprivatevs);

  if(tprivatevs!=null)
  {
   for (var prvates=0;prvates<tprivatevs.length;prvates++)
       {
          var fx=tprivatevs[prvates];
           if(fx!=null)
           {
            //remove all the repeats of the private attributes

             var fprivates=fx.filter(function (item,pos){
                         return fx.indexOf(item)==pos;
                       });

             fprivates.forEach(function(posp){
                
               totalprivatespushed.push(posp);

             });
           }              

       }
      PRA.length=totalprivatespushed.length;
      alertValue+="\n"+"PRA= "+PRA.length;
      console.log("PRA= "+PRA.length); 
  }
  else if(tprivatevs==null)
  {    
    var fpr=0;
    totalprivatespushed==null;
    PRA.length=fpr;
     alertValue+="\nPRA= "+PRA.length;
    console.log("PRA= "+PRA.length);
  }


  
  /////////////////////////////////////////////////////////////RETRIEVING ENTIRE TEXT FOR EACH METHOD/////////////////////////////////////////
  var pubmthd=new Array(); //create an array to hold all the public methods generated
  var prmthd=new Array(); //create an array to hold all the private methods generated
  var pbv=new Array(); //create an array to hold all the public variables generated
  var pbx=new Array();// stores public variable with $
  var prv=new Array(); //create an array to hold all the private variables generated

  var totalpublicoccurrence=new Array();
  var totalprivateoccurrence=new Array();
  var gh=new Array();
  var ytt=new Array();
  var arraydifference=[];
  var arraydifference2=[];
  var arraydifference3=[];
  var arraydifference4=[];


  //var pubmethodcontent=fctns.match(/(public)\s+(\w+)\s+(\w+)(\()((\w*)(\s+)(\w*)(\,)?)*(\))(\{)(\w*)(.+?)(\})+/g); //best regex method so far
  var pubmethodcontent=fctns.match(/(public)\s+(\w+)\s+(\w+)(\()(((\$*)(\s+)(\w+)?(\,)?)*|((\$)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g); //best regex method so far
  
  var w_1=0;
  var w_2=0;
  var localpub=[];
  var totallocalvariables=[]; //stores all the local variables(from public and private mthods/content)
  var localvariableusage=[];
  var usagelocals=[];

   if(typeof(pubmethodcontent) === 'undefined' || pubmethodcontent == null)
    {
       var a61=0;     
    }
    else if(typeof(pubmethodcontent) !== 'undefined' || pubmethodcontent != null) 
    {
      
      //string the public method content
          var stringPublic=pubmethodcontent.toString();

          //create a regex to check for any matching local variable
          localpub=stringPublic.match(/(\$)(?!this)(\w+)+/g);

          if(localpub!=null)
          {
            var locale=localpub.filter(function (item,pos){
                               return localpub.indexOf(item)==pos;
                             });  
          locale.forEach(function(lc){

             var rlocale=lc.replace(/(\s*)(\$)|(\=)|(this)+/g,""); 
             var localclassusage=fctns.match(new RegExp(rlocale,"g"));
             //push all the local variables class usage
             localvariableusage.push(localclassusage);
              totallocalvariables.push(rlocale);

             if(localvariableusage!=null)
             {
               
                localvariableusage.forEach(function(lvv)
                {
          
                 for(w0=0;w0<lvv.length;w0++)
                 {
                    usagelocals.push(lvv[w0]);
                 }

                });

             }

             else if(localvariableusage==null)
             {

               localvariableusage.length=0;

             }         

             
          });

          localvariableusage.forEach(function(lvv){
          
           for(w0=0;w0<lvv.length;w0++)
           {
              usagelocals.push(lvv[w0]);
           }

          });

          }
          else if(localpub==null)
          {

               localvariableusage.length=0;

          }  
          

      //loop through the public methods
      for(pm=0;pm<pubmethodcontent.length;++pm)
      {
          pubmthd.push(pubmethodcontent[pm]);            
      }


          if(typeof(totalpublicpushed)=== 'undefined' || totalpublicpushed == null)
          {
              //anything....(;
          }

          
          //if public variables exist  
          else if(typeof(totalpublicpushed) !== 'undefined' || totalpublicpushed != null)
           {  
             //console.log(totalpublicvariables);             
             for(pub1= 0; pub1<totalpublicpushed.length; pub1++)
               {
                    var rypub=totalpublicpushed[pub1];                    

                    var npub1=rypub.replace(/(public)\s+(\w*?)+/,"");
                    var npub2=npub1.replace(/(\;)+/,"");
                    var npub3=npub2.replace(/(\$)+/,"");
                    var npub4=npub3.replace(/(\=)(\w+)(\[)(\])+/,""); 
                    var npub5=npub4.replace(/[(][)](\w+)+/,""); 
                    var npub6=(npub5.match(/(\w+)+/g)); 

                    //get vl2
                    var nn1=rypub.replace(/(public)\s+(\w*?)+/,"");
                    var nn2=nn1.replace(/(\;)+/,"");
                    var nn4=nn2.replace(/(\=)(\w+)(\[)(\])+/,"");
                    var nn5=nn4.replace(/([(][)])+/,"");
                    var nn6=nn5.match(/(\$\w+)+/g);
                    
                    
                                     
                    for (rypub1= 0; rypub1<npub6.length; ++rypub1)
                        {            
                           pbv.push(npub6[rypub1]);               
                        } 
                    //store with $
                    for (var x1= 0; x1<nn6.length; ++x1)
                        {            
                           pbx.push(nn6[x1]);               
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
                            
                            w_1+=kzy.length; 
                            ytt.push(kzy);

                           }     
                           else if(kzy==null)
                           {
                            w_1+=0;
                           }                                                                  
                           
                      }           
                }
                
                totalpublicoccurrence.length+=w_1; 

                //look for variables only declared within the public methods
                var pubspecialvariable=pubmthd.toString().match(/(\$)(\w+)+/g);
                //filter repititions
                if(pubspecialvariable!=null)
                {
                  var filterpubspecial=pubspecialvariable.filter(function (item,pos){
                         return pubspecialvariable.indexOf(item)==pos;
                       });


                  //filter the existing variables to give the remainder local variables
                   arraydifference=arrayDiff(filterpubspecial,ytt);
                  

                } 
                else if(pubspecialvariable==null)
                {
                   console.log("Locally declared public variables in public methods=0");
                }            
            }



            if(typeof(totalprivatespushed) === 'undefined' || totalprivatespushed == null)
            {
              
            }
            else if(typeof(totalprivatespushed) !== 'undefined' || totalprivatespushed != null)
            {

              
              for(pbb1= 0; pbb1<totalprivatespushed.length; ++pbb1)
               {  
                    var rb=totalprivatespushed[pbb1];
                    
                    var rbx=rb.replace(/(private)\s+(\w*?)+/,"");
                    var rbxaa=rbx.replace(/(protected)\s+(\w*?)+/,"");
                    var rbx1=rbxaa.replace(/(\=)(.*)(\;)+/,"");
                    var rbx2=rbx1.replace(/(\$)+/,"");
                    var rbx3=rbx2.replace(/(\=)(\w+)(\[)(\])+/,"");
                    var rbx4=rbx3.replace(/[(][)](\w+)+/,""); 
                    var rbx5=(rbx4.match(/(\w+)+/g)); 
                                                                             
                    for (ryab1= 0; ryab1<rbx5.length; ++ryab1)
                        {            
                          prv.push(rbx5[ryab1]);               
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
                            
                            w_2+=k.length; 
                            ytt.push(k);

                           }     
                           else if(k==null)
                           {
                            w_2+=0;
                           }                                        
                              

                    }                             
              }
              totalpublicoccurrence.length+=w_2;  

               //look for variables only declared within the public methods
                var pubspecialvariable2=pubmthd.toString().match(/(\$)(\w+)+/g);
                //filter repititions
                if(pubspecialvariable2!=null)
                {
                  var filterpubspecial2=pubspecialvariable2.filter(function (item,pos){
                         return pubspecialvariable2.indexOf(item)==pos;
                       });
                  //filter the existing variables to give the remainder local variables
                   arraydifference2=arrayDiff(filterpubspecial2,ytt);                  

                } 
                else if(pubspecialvariable2==null)
                {
                   console.log("Locally declared total variables in public  methods=0");
                }              

            }
    } 

  var prmethodcontent=fctns.match(/(private|protected)\s+(\w+)\s+(\w+)(\()(((\$*)(\s+)(\w+)?(\,)?)*|((\$)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
  
  var w_3=0;
  var w_4=0;
  var localpub1=[];
  var totallocalvariables1=[]; //stores all the local variables(from public and private mthods/content)
  var localvariableusage1=[];
  var usagelocals1=[];

  if(typeof(prmethodcontent) === 'undefined' || prmethodcontent == null)
    {
        var a61=0;       
    }
   else if(typeof(prmethodcontent) !== 'undefined' || prmethodcontent != null) 
    {
      
      //string the public method content
          var stringPublic1=prmethodcontent.toString();

          //create a regex to check for any matching local variable
          localpub1=stringPublic1.match(/(\$)(?!this)(\w+)+/g);
          var locale1=localpub1.filter(function (item,pos){
                               return localpub1.indexOf(item)==pos;
                             });  
          locale1.forEach(function(lc1){

             var rlocale1=lc1.replace(/(\$)|(\=)+/g,""); 
             var localclassusage1=fctns.match(new RegExp(rlocale1,"g"));
             //push all the local variables class usage
             localvariableusage1.push(localclassusage1);
             totallocalvariables1.push(rlocale1);
             
             if(localvariableusage1!=null)
             {
                
                localvariableusage1.forEach(function(lvv1)
                {
          
                 for(w10=0;w10<lvv1.length;w10++)
                 {
                    usagelocals1.push(lvv1[w10]);
                 }

                });

             }

             else if(localvariableusage1==null)
             {

               localvariableusage1.length=0;

             }               
          });
 
          

      //loop through the private methods
      for(prm=0;prm<prmethodcontent.length;++prm)
      {
          prmthd.push(prmethodcontent[prm]);            
      }
          if(typeof(totalpublicpushed)=== 'undefined' || totalpublicpushed == null)
          {
              //anything....(;
          }
          //if public variables exist  
          else if(typeof(totalpublicvariables) !== 'undefined' || totalpublicpushed != null)
           {            
             for(paba1= 0; paba1<totalpublicpushed.length; ++paba1)
               {
                    var xyz=totalpublicpushed[paba1];

                    var xyz1=xyz.replace(/(private|protected|public)\s+(\w*?)+/,"");
                    var xyz2=xyz1.replace(/(\;)+/,"");
                    var xyz3=xyz2.replace(/(\$)+/,"");
                    var xyz4=xyz3.replace(/(\=)(\w+)(\[)(\])+/,"");
                    var xyz5=xyz4.replace(/[(][)](\w+)+/,""); 
                    var xyz6=(xyz5.match(/(\w+)+/g));  
                  
                    for (paba12= 0; paba12<xyz6.length; ++paba12)
                        {            
                           pbv.push(xyz6[paba12]);               
                        }  
               }
               //loop through private methods matching public variables occurrence
               

                for(zaba1=0;zaba1<prmthd.length;++zaba1)
                {
                   for(waba1=0;waba1<pbv.length;++waba1)
                      {    
                           var kazay=String(prmthd[zaba1]).match(new RegExp(pbv[waba1],"g"));
                           if(kazay== null)
                            {
                              w_3+=0;
                            }

                           else if(kazay!= null)
                            {
                              w_3+=kazay.length;
                              gh.push(kazay);
                            }           
                      }           
                }
                totalprivateoccurrence.length+=w_3;  
                //look for variables only declared within the public methods
                var prspecialvariable3=prmthd.toString().match(/(\$)(\w+)+/g);
                //filter repititions
                if(prspecialvariable3!=null)
                {
                  var filterprspecial3=prspecialvariable3.filter(function (item,pos){
                         return prspecialvariable3.indexOf(item)==pos;
                       });


                  //filter the existing variables to give the remainder local variables
                   arraydifference3=arrayDiff(filterprspecial3,gh);
                   

                } 
                else if(prspecialvariable3==null)
                {
                   console.log("Locally declared variables in private methods=0");
                }            
             

            }



            if(typeof(totalprivatespushed) === 'undefined' || totalprivatespushed == null)
            {

              
            }

            else if(typeof(totalprivatespushed) !== 'undefined' || totalprivatespushed != null)
            {              
              for(pabb1= 0; pabb1<totalprivatespushed.length; ++pabb1)
               {
                    var rab=totalprivatespushed[pabb1];
                    var rbxa=rab.replace(/(public)\s+(\w*?)+/,"");
                    var rbxa1=rbxa.replace(/(\;)+/,"");
                    var rbxa2=rbxa1.replace(/(\$)+/,"");
                    var rbxa3=rbxa2.replace(/(\=)(\w+)(\[)(\])+/,"");
                    var rbxa4=rbxa3.replace(/[(][)](\w+)+/,""); 
                    var rbxa5=(rbxa4.match(/(\w+)+/g));  
                   
                                        
                    for (ryaba1= 0; ryaba1<rbxa5.length; ++ryaba1)
                        {            
                           prv.push(rbxa5[ryaba1]);               
                        }  
               }
              //loop through the public methods matching private variables occurrence
              
              for(zipa=0;zipa<pubmthd.length;++zipa)
              {
                  for(wiia=0;wiia<prv.length;++wiia)
                    {    
                         
                         var kaaa=String(prmthd[zipa]).match(new RegExp(prv[wiia],"g"));
                          if(kaaa== null)
                            {
                              w_4+=0;
                            }
                          else if(kaaa!= null)
                            {
                              w_4+=kaaa.length;
                              ytt.push(kaaa);
                            }                                   
                    }                             
              }
              totalpublicoccurrence.length+=w_4;  

              //look for variables only declared within the public methods
                var prspecialvariable4=prmthd.toString().match(/(\$)(\w+)+/g);
                //filter repititions
                if(prspecialvariable4!=null)
                {
                  var filterprspecial4=prspecialvariable4.filter(function (item,pos){
                         return prspecialvariable4.indexOf(item)==pos;
                       });


                  //filter the existing variables to give the remainder local variables
                   arraydifference4=arrayDiff(filterprspecial4,ytt);                   

                } 
                else if(prspecialvariable4==null)
                {
                   console.log("Locally declared variables in private methods=0");
                }     
                           
            }

    }
            //check the difference betwen the four results
            var publics=[];
            var privates=[];
            var dff=[];

            publics=arrayDiff(tpublicvs,arraydifference2);
            private=arrayDiff(tprivatevs,arraydifference4);
         





 //////////////////////////////////////////////////////////////////////REGEX FOR METHOD CALLS////////////////////////////////////////////////////////////////////////////////////////////
 // var mthdcall=fctns.match(/((\w+)(\:\:)(\w+)(\()(\))(\;))|((\-\>)(\w+)(\()(\)))|((\-\>)(\w+)(\()(\w+)*(\)))+/g);
 var ttlmethods=new Array(); //total method occurrences
 var prttlarray=[]; //private method occurrences
 var pttlarray=[]; //public method occurrences

    
     if(PM!=null)
     {
      ttlmethods=PM;
      for (var hg=0;hg<ttlmethods.length;hg++)
       {
          var xf=ttlmethods[hg];
          var xf1=xf.replace(/\s+/g,"");
          var xf2=fctns.match(new RegExp(xf1,"g"));
           for(piu=0;piu<xf2.length;piu++)
           {
             pttlarray.push(xf2[piu]);
           }

       }   
     }
     else if(PRM!=null)
     {
       ttlmethods=PRM;
       for (var hg=0;hg<ttlmethods.length;hg++)
       {
          var xf=ttlmethods[hg];
          var xf1=xf.replace(/\s+/g,"");
           var xf2=fctns.match(new RegExp(xf1,"g"));
           for(piu=0;piu<xf2.length;piu++)
           {
             prttlarray.push(xf2[piu]);
           }

       }   
      }
      else if(PM==null && PRM==null)
       {
         ttlmethods==null;
         if(ttlmethods==null)
         {
           ttlmethods.length=0;
           pttlarray.length=0;
           prttlarray.length=0;
         }
          
       }
        else if(PM==null)
       {
         ttlmethods==null;
         if(ttlmethods==null)
         {
           ttlmethods.length=0;
           pttlarray.length=0;
         
         }
          
       }
        else if(PRM==null)
       {
         ttlmethods==null;
         if(ttlmethods==null)
         {
           ttlmethods.length=0;
           prttlarray.length=0;
         }
          
       }
 
        var publicvapp=ytt.length;
        var publicmthdcalls=pttlarray.length;
        var ptotals=publicvapp+publicmthdcalls;

        var privatevapp=gh.length;
        var privatemthdcalls=prttlarray.length;
        var prtotals=privatevapp+privatemthdcalls;
        
        finalpublicv=[];
        finalprivatev=[];
        combinedvariables=[];
        filterlocaltotals=[];
        finalpublic=[];//for declared public variable
        finalprivate=[];//for declared private variable
        globaltotals=[];//totalpublicprivates

        //combine local variables 
        if(totallocalvariables!=null)
        {
          var stringedPublics=totallocalvariables.toString();
          var trimpublics=stringedPublics.replace(/public|(\$)|(\=)(.*)+/g,"");
          finalpublicv=trimpublics.split(",");         
        }
        
        if(totallocalvariables1!=null)
        {
          var stringedPrivate=totallocalvariables1.toString();
          var trimprivate=stringedPrivate.replace(/private|protected|(\$)|(\=)(.*)+/g,"");
          finalprivatev=trimprivate.split(",");         
        }
        //combine the two arrays
        if(totallocalvariables!=null && totallocalvariables1!=null)
        {
          combinedvariables=finalpublicv.concat(finalprivatev);
          //remove any empty array
          var trimmedcombined=combinedvariables.toString();
           //remove the last , from the trimmed
          var tr2=trimmedcombined.substring(0, trimmedcombined.length - +(trimmedcombined.lastIndexOf(',')==trimmedcombined.length-1));
          var tr=tr2.replace(/\s+/g,"").split(",");
          //remove all the repeats returning all the local variables in the class
          filterlocaltotals=tr.filter(function (item,pos){
                         return tr.indexOf(item)==pos;
                       }); 

        
        }
           
        ////////////////////////----------------------------/////////////////////////////////
        //calculating the values of COH
       var totaloccurences=ytt.length+gh.length;
       var totalmethods=PM.length+PRM.length;
       var totalattributes=PA.length+PRA.length;

       var LCOM5=((totaloccurences-(totalattributes*totalmethods))/(totalattributes-(totalattributes*totalmethods)));
       alertValue+="\nLCOM5 value= "+LCOM5;
       console.log("LCOM5 value= "+LCOM5);

       var COH=1-((1-(1/totalattributes))*LCOM5);
       if(COH=1)
       {
         var COH1=(totaloccurences)/(totalattributes*totalmethods);
         alertValue+="\nCOH value= "+COH1;
         console.log("COH value= "+COH1);
       }
       else
       {
        alertValue+="\nCOH value= "+COH1;
        console.log("COH value= "+COH);
       }
       

        //calculating the final metric values

        var TPC=(PA.length+PRA.length)*PM.length; //total expected public occurence
        var TPRC=(PA.length+PRA.length)*PRM.length; //total expected private occurence
        var PC=0; //public occurrence
        var PRC=0; //private occurence
        var sccm=0; //sccm metric


        if(typeof(totalpublicoccurrence.length) === 'undefined' || totalpublicoccurrence.length == null) 
        {
          PC+=0;
          PRC+=totalprivateoccurrence.length/TPRC;
          sccm=PC+PRC;
          alertValue+="\nSCCM value= "+sccm;
          console.log("SCCM value= "+sccm);
        }
        else if((typeof(totalpublicoccurrence.length) !== 'undefined' || totalpublicoccurrence.length != null) || (typeof(totalprivateoccurrence.length) !== 'undefined' || totalprivateoccurrence.length != null))
        {
          if(totalprivateoccurrence.length==0 && totalpublicoccurrence.length!=0)
          {
            PRC+=0;
            PC+=totalpublicoccurrence.length/TPC;
            sccm=PC+PRC;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else if(totalpublicoccurrence.length==0 && totalprivateoccurrence.length!=0)
          {
            PC+=0;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm=PC+PRC;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);

          }
          else if(totalprivateoccurrence.length==0 && totalpublicoccurrence.length==0)
          {
             PC+=0;
             PRC+=0;
             sccm=PC+PRC;
             alertValue+="\nSCCM value= "+sccm;
             console.log("SCCM value= "+sccm);
          }
          else if(totalprivateoccurrence.length!=0 && totalpublicoccurrence.length!=0)
          {
            PC+=totalpublicoccurrence.length/TPC;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm=PC+PRC;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
            var COH1=(totaloccurences)/(totalattributes*totalmethods);
             alertValue+="\nCOH value= "+COH1;
            console.log(COH1);
          }          
         
        }
        else if(typeof(totalprivateoccurrence.length) === 'undefined' || totalprivateoccurrence.length == null) 
        {
          if(totalprivateoccurrence.length==0 && totalprivateoccurrence.length==0)
          {
            PC+=0;
            PRC+=0;
            sccm=PC+PRC;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
             PRC+=0;
             PC+=totalpublicoccurrence.length/TPC;
             sccm=PC+PRC;
             alertValue+="\nSCCM value= "+sccm;
             console.log("SCCM value= "+sccm);

          }
         
        }  
      
        console.log("PO= "+ptotals);//+pttlarray.length);
        alertValue+="\nPO value= "+ptotals;
         alertValue+="\nPRO value= "+prtotals;
        console.log("PRO= "+prtotals);        

        /*console.log("PM="+PM.length);
        console.log("PRM="+PRM.length);*/
        var ppy=filterlocaltotals.length;
         alertValue+="\nLocal variables= "+ppy;
        console.log("Local Variable="+ppy);
        //console.log(filterlocaltotals);
       
        //console.log("Public method calls="+pttlarray.length);
        //console.log("Public method calls="+prttlarray.length);

        if(finalpublic.length==null||finalprivate.length==null||ptotals==0||prtotals==0||PM.length==null||PRM.length==null||filterlocaltotals.length==null||pttlarray.length==null||prttlarray.length==null)
        {
          finalpublic.length=1;
          finalprivate.length=1;
          ptotals=1;
          prtotals=1;
          PM.length=1;
          PRM.length=1;
          filterlocaltotals.length=1;
          pttlarray.length=1;
          prttlarray.length=1;
        }

       /*console.log("*******************local variables in the class******************");
                   console.log("Local Variables ="+totallocalvariables1.length+totallocalvariables.length);*/

      //console.log("LA usage: "+usagelocals.length+usagelocals1.length);
       var meanvalue;
       var lcohesion;
       if(ppy==0)
       {
        meanvalue=0;

        //console.log("Local Cohesion="+meanvalue);
       }
       else if(ppy>0 &&(usagelocals.length+usagelocals1.length)!=0)
       {

          meanvalue=ppy/(usagelocals.length+usagelocals1.length);
          lcohesion=1-meanvalue;
          //console.log("Local Cohesion="+lcohesion);
          
        
       }
       else if(ppy>0 &&(usagelocals.length+usagelocals1.length)==0)
       {
         meanvalue=0;
        // console.log("Local Cohesion="+meanvalue);          
        
       }

      var COH1=(totaloccurences)/(totalattributes*totalmethods);

          //  console.log(COH1);

          alert(alertValue);

                          
}
