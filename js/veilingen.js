function eventesten(){
                fetch("https://localhost:7252/api/Veiling")
                .then (r => r.json())
                .then (d => verwerkencsharp(d))
            }

            //function doen(data){
               // console.log(data);
                //document.getElementById("doen").innerHTML=data.Duratie;
                //document.getElementById("doen").innerHTML=data.LaatsteBod;
                //document.getElementById("doen").innerHTML=data.MinimumBod;
                //for(var x =0; x < data.length; x++){
                    //document.getElementById("doen").innerHTML +=data[x].Duratie+"<br>-";
                    //document.getElementById("doen").innerHTML +=data[x].LaatsteBod+"<br>-";
                    //document.getElementById("doen").innerHTML +=data[x].MinimumBod+"<br>-";
                //}

                
            //}
                
            function verwerkencsharp(data){
                document.getElementById("csharpuitkomst").innerHTML = "";
                for(let x =0; x < data.length; x++){
                    document.getElementById("csharpuitkomst").innerHTML += data[x].duratie + "<br>";
                }
            }

function Toevoegen(){
    console.log("Voeg toe")
    var veiling ={}
    veiling.Duratie= document.getElementById("InvoerDuratie").value;
    veiling.OpeningsBod= document.getElementById("InvoerOpeningsbod").value;
    veiling.MinimumBod= document.getElementById("InvoerMinimumbod").value;

    var veilingjson= JSON.stringify(veiling);
    console.log(veilingjson);
    fetch("https://localhost:7252/api/Veiling", {
        method:"POST",
        headers:{
            "Content-Type": 'application/json'
        },
        body: veilingjson
    })


}