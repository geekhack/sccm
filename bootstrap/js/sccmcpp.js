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
          var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.java)$/;
          var regex2 = /^([a-zA-Z0-9\s_\\.\-:])+(.php)$/;
          var regex3 = /^([a-zA-Z0-9\s_\\.\-:])+(.js)$/;
          var regex4 = /^([a-zA-Z0-9\s_\\.\-:])+(.h|.cpp)$/;
          var m=(f.name).match(regex);
          var m1=(f.name).match(regex2);
          var m2=(f.name).match(regex3); 
          var m3=(f.name).match(regex4);

          if(m||m1||m2||m3)
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

  //check if a class haxs any methods in it
  var publicmethod=new Array();

  var any_method=fctns.match(/((\w+)(\:\:)(\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))|((\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))+/g);
  var mtch_main=fctns.match(/((main)[()][)](\{)(\w*)(.+?)(\}))+/g);

   alertValue="**WELCOME TO SCCM SOFTWARE-C++**";
   alertValue+="\n**Developer: Rafael Wanjiku--@geekhack(Github Account)**";

   console.log("******************WELCOME TO SCCM SOFTWARE*******************"); 
     console.log("******************Developer: Rafael Wanjiku--@geekhack(Github Account)********************");
     //console.log("************Accessed on"+Date()+"*****************");
     console.log("******************************************************************************************"); 

  if(mtch_main!=null)
  {
    var main_string=mtch_main.toString();

     //create a remove array item method to delete the main mathod item from the list of items in the array

      Array.prototype.remove = function() 
      {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length)
        {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1)
             {
                this.splice(ax, 1);
             }
        }
        return this;
      };
      any_method.remove(main_string);//remove the main method from among the list of the methods
  }
  
  
 //if there exist any method whether private or public

  if(any_method!=null)
  {
     //check for the public  
      var pbcontent=fctns.match(/(public)(\:)(.*?)(private|(\}\;))+/g);
      
        if(pbcontent!=null)
        {
           
            //push the pbcontent and anymethod

            var fx=pbcontent.toString();
            var xcpb=fx.replace(/(public)(\:)+/,"");
            var rp=xcpb.replace(/(private|(\}\;))+/,"");
            var pmth=rp.match(/(\w+)\s+(\w+)(\()(((\s+)(\w+)?(\,)?)*|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);  
            //another type of public method
            var ty=fctns.match(/(\w+)\s+(\w+)(\:)(\:)(\w+)(\()((\w+)\s+(\w+)(\,)?)*(\))(\{)(\w*)(.+?)(\})+/g);
            
            publicmethod.push(pmth);
            publicmethod.push(ty);

             
            if(publicmethod==null)
            {
              totalpublicmethods=0;
              PM.length=totalpublicmethods;
              alertValue+="\nPM= "+PM.length;

              console.log("PM= "+PM.length);

            }
            else if(publicmethod!=null)
            {              

               PM.length=publicmethod.length; 
               alertValue+="\nPM= "+PM.length;   
               console.log("PM= "+PM.length); 
            } 
        }

       //gets the private methods in a class
       //capture everything within two blocks
        var prcontent=fctns.match(/(private)(\:)(.*?)(public|(\}\;))+/g);
                
        if(prcontent!=null)
        {
          
          var fx1=prcontent.toString();
          var xcpb1=fx1.replace(/(private)(\:)+/,"");
          var rp1=xcpb1.replace(/(public|(\}\;))+/,"");
          var privatemethod=rp1.match(/(\w+)\s+(\w+)(\()(((\s+)(\w+)?(\,)?)*|((\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\})+/g);
          

          if(privatemethod==null)
          {
            totalprivatemethods=0;
            PRM.length=totalprivatemethods;
            alertValue+="\nPRM= "+PRM.length;
            console.log("PRM= "+PRM.length);
          }
          else if(privatemethod!=null)
          {  
             totalprivatemethods=privatemethod;
             PRM.length=totalprivatemethods.length;
             alertValue+="\nPRM= "+PRM.length;
             console.log("PRM= "+PRM.length); 
          }
        } 
        else if(pbcontent==null || prcontent==null)
        {  
          PM.length=any_method.length; //gives the total methods within the class
          PRM.length=0;
          alertValue+="\nPM= "+PM.length;
          alertValue+="\nPRM= "+PRM.length;
          console.log("PM= "+PM.length);
          console.log("PRM= "+PRM.length);
        }

  }

  else if(any_method==null)
  {
            totalpublicmethods=0;
            totalprivatemethods=0;
            PM.length=0;
            PRM.length=0;
            alertValue+="\nPM= "+PM.length;
            alertValue+="\nPRM= "+PRM.length;
            console.log("PM= "+PM.length);
            console.log("PRM= "+PRM.length);
  }       
  /////////////////////////////////////////////////////////////////////////REGEX FOR VARIABLE///////////////////////////////////////////////////////////////////////////////////////////////
  var p9=new Array();
  var rl=new Array();
  var totalpublicvariables=new Array();


  //get any variable listed in the class
  var p_p=fctns.match(/((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w*?)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\()(\))(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w*?)(\[)(\w*?)(\])(\;))+/g);
  var p3=fctns.match(/(\w+)(\.)(\w+)(\=)+/g);
  var p6=fctns.match(/(\w+)(\=)\s*(\w+)+/g);
  //var vb2=fctns.match(/((int|float|char|string|double|float|bool|void|decltype)?\s+(\w+)(((\,)?(\w+))*)(\;))+/g);

  if(p6!=null)
  {
      var p00=p6.filter(function (item,pos){
                               return p6.indexOf(item)==pos;
                             });
      for(_e=0;_e<p00.length;_e++)
      {
        var tx=p00[_e];
        var tx1=tx.replace(/(\=)(\w+)+/,"");
        var tx2=tx1.replace(/\s+/g,"");
        var tx3=tx2.replace(/(\[)(\w+)(\])+/,"");
        rl.push(tx3);
        
      }
  }

  if(p_p!=null)
  { 
    var p2=p_p.filter(function (item,pos){
                             return p_p.indexOf(item)==pos;
                           });
    for(_w=0;_w<p2.length;_w++)
    {
      var tii=p2[_w];  
      var tii1=tii.replace(/(int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)+/,"");  
      var tii2=tii1.replace(/((\=)(\w+))+/,"");
      var tii3=tii2.replace(/(\;)+/,"");
      var tii4=tii3.replace(/\s+/g,"");
      var tx3=tii4.replace(/(\[)(\w+)(\])+/,"");
      rl.push(tx3);
    } 
  }
  if(p3!=null)
  { 
      //remove all the repeats
      var p4=p3.filter(function (item,pos){
                               return p3.indexOf(item)==pos;
                             });
      for(_o=0;_o<p4.length;_o++)
      {
        var ti=p4[_o];
        var ti1=ti.replace(/(\w+)(\.)+/,"");
        var ti2=ti1.replace(/(\=)+/,"");
        var ti3=ti2.replace(/\s+/g,"");
        var tx3=ti3.replace(/(\[)(\w+)(\])+/,"");
        rl.push(tx3);
      }  
  }
  var p1=rl.filter(function (item,pos){
                           return rl.indexOf(item)==pos;
                         });  

  if(p1!=null)
  {   
      //public variables
      var catchpublicsv=fctns.match(/(public)(\:).+?(?=(public|private))+/g);
      //another way to capture a variable in c++
     
      var vb2=fctns.match(/((int|float|char|string|double|float|bool|void|decltype)?\s+(\w+)(((\,)?(\w+))*)(\;))+/g);
      

      if(catchpublicsv!=null)
      {
          var cpublic=catchpublicsv.toString();
          var trimpublics=cpublic.replace(/(public)(\:)+/,"");

          var pubvariable=trimpublics.match(/((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w*?)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\()(\))(\;))| ((int|float|char|string|double|float|bool|void|decltype)?\s+(\w+)(((\,)?(\w+))*)(\;))+/g);
               

          if(pubvariable==null && vb2==null)
          {
              totalpublicvariables.length=0;
              //totalpublicvariables.length==0;
              PA.length=totalpublicvariables.length;
              alertValue+="\nPA= "+PA.length;
              console.log("PA= "+PA.length);
          }         
          else if(pubvariable!=null && vb2==null)
          {
            
            totalpublicvariables=pubvariable;
            PA.length=totalpublicvariables.length;  
             console.log(totalpublicvariables); 
             alertValue+="\nPA= "+PA.length;         
            console.log("PA= "+PA.length); 
          } 
          else if(pubvariable==null && vb2!=null)
          {
            var gi=vb2.toString();
            var gg=gi.replace(/int|float|char|string|double|float|bool|void|decltype+/,"");
            var gi1=gg.replace(/(\;)+/,"");
            var gi2=gi1.replace(/\s+/g,"").split(",");
            
            totalpublicvariables=gi2;            
            PA.length=totalpublicvariables.length;  
             console.log(totalpublicvariables); 
             alertValue+="\nPA= "+PA.length;         
            console.log("PA= "+PA.length); 

          }
          else if(pubvariable!=null && vb2!=null)
          {
            var gi=vb2.toString();
            var gg=gi.replace(/int|float|char|string|double|float|bool|void|decltype+/,"");
            var gi1=gg.replace(/(\;)+/,"");
            var gi2=gi1.replace(/\s+/g,"").split(",");

            totalpublicvariables=pubvariable.concat(gi2);

            console.log(totalpublicvariables);

            PA.length=totalpublicvariables.length;
            alertValue+="\nPA= "+PA.length;            
            console.log("PA= "+PA.length); 

          }         
      }  
      else if(vb2!=null)
      {
            var gi=vb2.toString();
            var gg=gi.replace(/int|float|char|string|double|float|bool|void|decltype+/,"");
            var gi1=gg.replace(/(\;)+/,"");
            var gi2=gi1.replace(/\s+/g,"").split(",");

            totalpublicvariables=gi2;
           // console.log(totalpublicvariables);

            PA.length=totalpublicvariables.length; 
            alertValue+="\nPA= "+PA.length;           
            console.log("PA= "+PA.length); 

      }    
      //private variables
      var catchprivatesv=fctns.match(/(private|protected)(\:).+?(?=(public|private|protected))+/g);

      if(catchprivatesv!=null)
      {
          var cprivate=catchprivatesv.toString();
          var trimprivates=cprivate.replace(/(private|protected)(\:)+/,"");

           var prvariable=trimprivates.match(/((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w*?)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\()(\))(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w+)*(\=)(\w+)(\()(\))(\;))|((int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)\s+(\w*?)(\[)(\w*?)(\])(\;))+/g);
           var htr=trimprivates.match(/(\w+)(\.)(\w+)(\=)+/g);  
           

          if(prvariable==null)
          {
              totalprivatevariables=0;
              PRA.length=totalprivatevariables.length;
              alertValue+="\nPRA= "+PRA.length;
              console.log("PRA= "+PRA.length);
          }         
          else if(prvariable!=null)
          {
            totalprivatevariables=prvariable;
            PRA.length=totalprivatevariables.length;
            alertValue+="\nPRA= "+PRA.length;
            console.log("PRA= "+PRA.length); 
          }          
      }
      else if(catchprivatesv==null || catchpublicsv==null)
      {
            totalpublicvariables=p1;

            PA.length=totalpublicvariables.length;
            totalprivatevariables=0;
            PRA.length=0;
            alertValue+="\nPRA= "+PRA.length;
            console.log("PRA= "+PRA.length);
      }
  }

  else if(p1==null)
  {
    totalprivatevariables=0;
    totalpublicvariables=0;
    PA.length=0;
    PRA.length=0;
    alertValue+="\nPA= "+PA.length;
    alertValue+="\nPRA= "+PRA.length;
    console.log("PA= "+PA.length);
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
  var ytt=new Array();
  var gh=new Array();
  var pubmethodcontent=fctns.match(/((\w+)(\:\:)(\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))|((\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))+/g);
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
          localpub=stringPublic.match(/(int|float|char|string|double|float|bool|void|decltype)\s+(\w+)(\=)+/g);

          if(localpub!=null)
          {
              var locale=localpub.filter(function (item,pos){
                               return localpub.indexOf(item)==pos;
                             });  
              locale.forEach(function(lc){

                 var rlocale=lc.replace(/(\s*)(int|float|char|string|double|float|bool|void|decltype)|(\=)+/g,""); 
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
          if(typeof(totalpublicvariables)=== 'undefined' || totalpublicvariables == null)
          {
              //anything....(;
                //console.log(totalpublicvariables);
          }


          
          //if public variables exist  
          else if(typeof(totalpublicvariables) !== 'undefined' || totalpublicvariables != null)
           {  
             
             
             //console.log(totalpublicvariables);             
             for(pub1= 0; pub1<totalpublicvariables.length; pub1++)
               {  
                    var rypub=totalpublicvariables[pub1];  

                    var npub1=rypub.replace(/(int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)+/,"");

                    var npub3=npub1.replace(/(\[)(\w)*(\])+/,"");
                    var npub4=npub3.replace(/(\=)(\w+)+/,""); 
                    var npub5=npub4.replace(/(\;)+/,""); 
                    var tx_2=npub5.replace(/\s+/g,""); 
                    var npub6=(tx_2.match(/(\w+)+/g)); 

                    for (rypub1= 0; rypub1<npub6.length; ++rypub1)
                        {            
                            pbv.push(npub6[rypub1]);               
                        }                   
               }
               //filter the array to remove any duplicates if any from the array
               var filteredpvariables=pbv.filter(function (item,pos){
                         return pbv.indexOf(item)==pos;
                       });
               

               if(filteredpvariables.length==0)
              {
                 var u3=0;

                 //totalpublicoccurrence.length+=u3; 
                 

              }
              else if(filteredpvariables.length>0)
              {

                    //loop through public methods matching public variables occurrence          
                   for(za1=0;za1<pubmthd.length;++za1)
                    {
                       for(wa1=0;wa1<filteredpvariables.length;++wa1)
                          {   
                             
                               var kzy=pubmthd[za1].match(new RegExp(filteredpvariables[wa1],"g"));
                                                          
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
                     var xi=w_1;
                    
                    totalpublicoccurrence.length+=xi; 
                                       
                  }                           
            }

            if(typeof(totalprivatevariables) === 'undefined' || totalprivatevariables == null)
            {
              
            }
            else if(typeof(totalprivatevariables) !== 'undefined' || totalprivatevariables != null)
            {

              
              for(pbb1= 0; pbb1<totalprivatevariables.length; ++pbb1)
               {  
                    var rb=totalprivatevariables[pbb1];
                    
                    var rbb1=rb.replace(/(int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)+/,"");

                    var rbb2=rbb1.replace(/(\[)(\w)*(\])+/,"");
                    var rbb3=rbb2.replace(/(\=)(\w+)+/,""); 
                    var rbb4=rbb3.replace(/(\;)+/,"");
                    var tx1=rbb4.replace(/\s+/g,"");  
                    var rbb5=(tx1.match(/(\w+)+/g));                     
                                                           
                    for (ryab1= 0; ryab1<rbb5.length; ++ryab1)
                        {            
                          prv.push(rbb5[ryab1]);               
                        }  
               }
               //filter the array to remove any duplicates if any from the array
               var filteredprvariables=prv.filter(function (item,pos){
                         return prv.indexOf(item)==pos;
                       });

              if(filteredprvariables.length==0)
              {

                var u1=0;
                totalprivateoccurrence.length=0;
                
               
              }
              else if(filteredprvariables.length>0)
              {
                //loop through the public methods matching private variables occurrence
              
              for(zip=0;zip<pubmthd.length;++zip)
              {
                  for(wii=0;wii<filteredprvariables.length;++wii)
                    {    
                         var k=String(pubmthd[zip]).match(new RegExp(filteredprvariables[wii],"g"));
                         
                                                      
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
              
              totalpublicoccurrence.length+=w_2-PRA.length;  


              }                          

            }
    } 

//check if there is any private content in the code
//if there is no private method then prmethodcontent=0
if(prcontent!=null)
{
 var prmethodcontent=fctns.match(/((\w+)(\:\:)(\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))|((\w+)(\()(((\w*)(\s+)(\w+)?(\,)?)*|((\w)(\w+)((\,)?)*))(\))(\{)(\w*)(.+?)(\}))+/g);
 
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
          localpub1=stringPublic1.match(/(int|float|char|string|double|float|bool|void|decltype)\s+(\w+)(\=)+/g);

          if(localpub1!=null)
          {

              var locale1=localpub1.filter(function (item,pos){
                               return localpub1.indexOf(item)==pos;
                             });  
              locale1.forEach(function(lc1){

                 var rlocale1=lc1.replace(/(\s*)(int|float|char|string|double|float|bool|void|decltype)|(\=)+/g,""); 
                 var localclassusage1=fctns.match(new RegExp(rlocale1,"g"));
                 //push all the local variables class usage
                 localvariableusage1.push(localclassusage1);

                 totallocalvariables1.push(rlocale1);

                 
              });

              localvariableusage1.forEach(function(lvv1){
              
               for(w10=0;w10<lvv1.length;w10++)
               {
                  usagelocals1.push(lvv1[w10]);
               }

              });
          }
          else if(localpub1==null)
          {
             localvariableusage1.length
          }
    
      //loop through the private methods
      for(prm=0;prm<prmethodcontent.length;++prm)
      {
          prmthd.push(prmethodcontent[prm]);            
      }
          if(typeof(totalpublicvariables)=== 'undefined' || totalpublicvariables == null)
          {
              //anything....(;
          }
          //if public variables exist  
          else if(typeof(totalpublicvariables) !== 'undefined' || totalpublicvariables != null)
           {            
             for(paba1= 0; paba1<totalpublicvariables.length; ++paba1)
               {
                    var xyz=totalpublicvariables[paba1];
                    var xyz1=xyz.replace(/(int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)+/,"");
                    var xyz2=xyz1.replace(/(\[)(\w)*(\])+/,"");
                    var xyz3=xyz2.replace(/(\=)(\w+)+/,""); 
                    var xyz4=xyz3.replace(/(\;)+/,"");
                    var tx4=xyz4.replace(/\s+/g,""); 
                    var xyz5=(tx4.match(/(\w+)+/g));   
                   

                    for (paba12= 0; paba12<xyz5.length; ++paba12)
                        {            
                           pbv.push(xyz5[paba12]);               
                        }  
               }
                var filteredpvariables=pbv.filter(function (item,pos){
                         return pbv.indexOf(item)==pos;
                       });

              if(filteredpvariables.length==0)
              {
                 var u7=0;                  

              }
              else if(filteredpvariables.length>0)
              {
                   //loop through private methods matching public variables occurrence
                 
                  for(zaba1=0;zaba1<prmthd.length;++zaba1)
                  {
                     for(waba1=0;waba1<filteredpvariables.length;++waba1)
                        {    
                             var kazay=String(prmthd[zaba1]).match(new RegExp(filteredpvariables[waba1],"g"));
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
              }                                       

            }

            if(typeof(totalprivatevariables) === 'undefined' || totalprivatevariables == null)
            {
              
            }
            else if(typeof(totalprivatevariables) !== 'undefined' || totalprivatevariables != null)
            {              
              for(pabb1= 0; pabb1<totalprivatevariables.length; ++pabb1)
               {
                    var rab=totalprivatevariables[pabb1];
                    var rabx=rab.replace(/(int|float|char|string|char16_t|char32_t|wchar_t|(signed char)|(signed short int)|(signed int)|(signed long int)|(signed long long int)|(unsigned char)|(unsigned short int)|(unsigned int)|(unsigned long int)|(unsigned long long int)|double|(long double)|bool|void|decltype)+/,"");
                    var rabx1=rabx.replace(/(\[)(\w)*(\])+/,"");
                    var rabx2=rabx1.replace(/(\=)(\w+)+/,""); 
                    var rabx3=rabx2.replace(/(\;)+/,""); 
                    var tx9=rabx3.replace(/\s+/g,""); 
                    var rabx4=(tx9.match(/(\w+)+/g));   
                   
                   
                                        
                    for (ryaba1= 0; ryaba1<rabx4.length; ++ryaba1)
                        {            
                           prv.push(rabx4[ryaba1]);               
                        }  
               }
                var filteredprvariables=prv.filter(function (item,pos){
                         return prv.indexOf(item)==pos;
                       });


              if(filteredprvariables.length==0)
              {
                 var u8=0;

                 
              }
              else if(filteredprvariables.length>0)
              {
                    //loop through the public methods matching private variables occurrence                    
                    for(zipa=0;zipa<pubmthd.length;++zipa)
                    {
                        for(wiia=0;wiia<filteredprvariables.length;++wiia)
                          {    
                               var kaaa=String(pubmthd[zipa]).match(new RegExp(filteredprvariables[wiia],"g"));
                                if(kaaa== null)
                                  {
                                    w_4+=0;
                                  }
                                else if(kaaa!= null)
                                  {
                                    w_4+=kaaa.length;
                                    gh.push(kaaa);
                                  }                                   
                          }                             
                    }
                    

                    totalpublicoccurrence.length+=w_4-PRA.length;  
                           
            }

         }
        }
      }
      //if there is no any private content within the code then private occurence is 0
      else if(prcontent==null)
      {
        totalprivateoccurrence.length=0;

      }
  //////////////////////////////////////////////////////////////////////REGEX FOR METHOD CALLS////////////////////////////////////////////////////////////////////////////////////////////
  
 // var mthdcall=fctns.match(/((\w+)(\:\:)(\w+)(\()(\))(\;))|((\w+)(\()(\))(\;))|((\w+)(\()(\w+)*(\))(\;))+/g);
 var mthdcall=fctns.match(/((\w+)(\()(\))(\;))|((\.)?(\w+)(\()(\s+(\w+))?(\,)?(\s+(\w+))*?(\)))|((\-\>)(\w+)(\()(\)))+/g);//|((\w+)(\()(\))(\;))|((\w+)(\()(\w+)*(\))(\;))|((\-\>)(\w+)(\()(\)))+/g);
  
  //search for the method names thoughout the class
  var wq=0;
  var pl=0; 
  //check availability of method calls
  if(typeof(mthdcall) === 'undefined' || mthdcall == null)
    {
      PI.length=0;
      PRI.length=0;
      //console.log(PI.length+PRI.length+" method calls found");
    }
    else if(typeof(mthdcall) !== 'undefined' || mthdcall != null) 
    {
            //get the actual name of the method via splicing it
              var mthcalls=new Array();  
              //iterate through the items to get the variable name
              for (cl = 0; cl<mthdcall.length; ++cl)
               {
                var call=mthdcall[cl];    
                var x=call.replace(/(\()((\w+)?)(\))+/,"");
                var splicedcall=x.replace(/(\.)/,"");
                var splicedcalx=splicedcall.replace(/\s+/g,"");
                var splicedcal2=splicedcalx.replace(/(main)/g,"");
                mthcalls.push(splicedcal2);
               } 
             
    ////////////////////////////////////////////////appearance of a method call within any given method (private|public)////////////////////////////////////////////////////////////////////
            if(typeof(totalpublicmethods) === 'undefined' || totalpublicmethods == null) 
            {
                 PI.length=0;
                 PRI.length=0;
            }
            else if(typeof(totalpublicmethods) !== 'undefined' || totalpublicmethods != null) 
            { 
                    var hu=0;
                    for(t=0;t<pubmthd.length;++t)
                    {
                        for(lq=0;lq<mthcalls.length;++lq)
                          {    
                               
                              var ky=String(pubmthd[t]).match(new RegExp(mthcalls[lq],"g"));
                                                                                  
                              if(typeof(ky) === 'undefined' || ky == null) 
                                  {
                                       PI.length=hu;                                       
                                  }
                               else if(typeof(ky) !== 'undefined' || ky != null)
                                 {
                                      hu+=ky.length;                                     
                                 }                                                                                                      
                          }                             
                    }

                

                    if(mthcalls.length>hu)
                    {
                      PI.length=0;
                      totalpublicoccurrence.length+=PI.length;
                    } 
                    else if(hu>mthcalls.length)
                    {
                     wq+=hu-mthcalls.length;
                     PI.length=wq;
                     totalpublicoccurrence.length+=PI.length;
                    }                   
                                        
            } 
            else if(typeof(totalprivatemethods)!=='undefined' || totalprivatemethods !=null)
            {
               
                    var hi=0;
                    for(t1=0;t1<prmthd.length;++t1)
                    {
                       for(lq1=0;lq1<mthcalls.length;++lq1)
                          {    
                            
                               var ky1=String(prmthd[t1]).match(new RegExp(mthcalls[lq1],"g"));
                               if(typeof(ky1) === 'undefined' || ky1 == null) 
                                  {
                                       PRI.length=hi;                                      
                                  }
                               else if(typeof(ky1) !== 'undefined' || ky1 != null)
                                 {
                                   hi+=ky1.length;                                   
                                 }                                          
                          }           
                    }
                   
                    if(mthcalls.length>hi)
                    {
                      PRI.length=0;
                      totalprivateoccurrence.length+=PRI.length;
                    } 
                    else if(hi>mthcalls.length)
                    {
                     pl+=hi-mthcalls.length;
                     PRI.length=pl;
                     totalprivateoccurrence.length+=PRI.length;
                    }      

            }
      }
       
       alertValue+="\nPO= "+totalpublicoccurrence.length;
       alertValue+="\nPRO= "+totalprivateoccurrence.length;

      console.log("Total public occurrence(PO)= "+totalpublicoccurrence.length);
      console.log("Total private occurrence(PRO)= "+totalprivateoccurrence.length);   
         

    

                
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

          filterlocaltotals=finalpublicv.filter(function (item,pos){
                         return finalpublicv.indexOf(item)==pos;
                       }); 

         
        }
        
        if(totallocalvariables1!=null)
        {
          var stringedPrivate=totallocalvariables1.toString();
          var trimprivate=stringedPrivate.replace(/private|protected|(\$)|(\=)(.*)+/g,"");
          finalprivatev=trimprivate.split(",");  
          filterlocaltotals=finalprivatev.filter(function (item,pos){
                         return finalprivatev.indexOf(item)==pos;
                       }); 

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
        var ppy=filterlocaltotals.length;
        console.log("Local Variable="+ppy);
        alertValue+="\nLocal Variable="+ppy;
       


       //calculating the values of COH
       var totaloccurences=ytt.length+gh.length;
       var totalmethods=PM.length+PRM.length;
       var totalattributes=PA.length+PRA.length;

     
       console.log("*****************************************************************");

       var LCOM5=((totaloccurences-(totalattributes*totalmethods))/(totalattributes-(totalattributes*totalmethods)));
       console.log("**************************************************");
       
       console.log("LCOM5 value= "+LCOM5);
       alertValue+="\nLCOM5 value= "+LCOM5;

       console.log("**************************************************");
       var COH=1-((1-(1/totalattributes))*LCOM5);
       console.log("**************************************************");
       if(COH=1)
       {
         var COH1=(totaloccurences)/(totalattributes*totalmethods);
         console.log("COH value= "+COH1);
         //alertValue+="\nLCOM5 value= "+LCOM5;
       }
       else
       {
        //alertValue+="\nLCOM5 value= "+LCOM5;
        console.log("COH value= "+COH);
       }
       

       console.log("**************************************************");



        ////////////////////////----------------------------/////////////////////////////////
        //calculating the final metric values

        var TPC=(PA.length+PRA.length)*PM.length;
        var TPRC=(PA.length+PRA.length)*PRM.length;
        var PC=0;
        var PRC=0;
        var sccm=0;

        if(typeof(totalpublicoccurrence.length) === 'undefined' || totalpublicoccurrence.length == null) 
        {
          PC+=0;
          PRC+=totalprivateoccurrence.length/TPRC;
          sccm+=PC+PRC;
          if(sccm>1){
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
            alertValue+="\nSCCM value= "+sccm;
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
            if(sccm>1){
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }     
          }
          else if(totalpublicoccurrence.length==0 && totalprivateoccurrence.length!=0)
          {
            PC+=0;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm+=PC+PRC;
           if(sccm>1){
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }     

          }
          else if(totalprivateoccurrence.length==0 && totalpublicoccurrence.length==0)
          {
             PC+=0;
             PRC+=0;
             sccm+=PC+PRC;
            if(sccm>1){
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }     
          }
          else
          {
            PC+=totalpublicoccurrence.length/TPC;
            PRC+=totalprivateoccurrence.length/TPRC;
            sccm+=PC+PRC;
            if(sccm>1){
            
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
            alertValue+="\nSCCM value= "+sccm;
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
            if(sccm>1){
            
            sccm=1;
            alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
             alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }     
          }
          else
          {
             PRC+=0;
             PC+=totalpublicoccurrence.length/TPC;
             sccm+=PC+PRC;
             if(sccm>1){
             sccm=1;
              alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }
          else
          {
             alertValue+="\nSCCM value= "+sccm;
            console.log("SCCM value= "+sccm);
          }     
          }
         
        }
       var meanvalue;
       var lcohesion;
       if(ppy==0)
       {
        meanvalue=0;

        //console.log("Local Cohesion="+meanvalue);
       }  
       else if(usagelocals!==null && usagelocals1==null)
        {
           //console.log("LA usage: "+usagelocals.length);

           if(ppy>0&&(usagelocals.length)!=0)
             {
                meanvalue=ppy/(usagelocals.length);
                lcohesion=1-meanvalue;
                //console.log("Local Cohesion="+lcohesion);                
              
             }
             else if(ppy>0 &&(usagelocals.length)==0)
             {
               meanvalue=0;
               //console.log("Local Cohesion="+meanvalue);          
              
             }           
         
        } 
        else if(usagelocals1!==null)
        {
           //console.log("LA usage: "+usagelocals1.length);

           if(ppy>0 &&(usagelocals1.length)!=0)
             {
                meanvalue=ppy/(usagelocals1.length);
                lcohesion=1-meanvalue;
               // console.log("Local Cohesion="+lcohesion);                
              
             }
             else if(ppy>0 &&(usagelocals1.length)==0)
             {
               meanvalue=0;
               //console.log("Local Cohesion="+meanvalue);          
              
             }        
        }
        else if(usagelocals!==null&&usagelocals1!==null)
        {
          //console.log("LA usage: "+usagelocals.length+usagelocals1.length);

          if(ppy>0 &&(usagelocals.length+usagelocals1.length)!=0)
           {

              meanvalue=ppy/(usagelocals.length+usagelocals1.length);
              lcohesion=1-meanvalue;
              //console.log("Local Cohesion="+lcohesion);              
            
           }
           else if(ppy>0 &&(usagelocals.length+usagelocals1.length)==0)
           {
             meanvalue=0;
             //console.log("Local Cohesion="+meanvalue);          
            
           }
          
      
        }     
        
    alert(alertValue);
  }                        

