import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }

  enviarPOST(cJson:any){
    let petPost = JSON.stringify(cJson);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        // this.responseText;
      }
    });

    xhr.open("POST", "http://localhost/proyectoIngWeb/backend/api.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(petPost);

    return xhr.responseText;
  }

  obtenerListas():string{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    

    xhr.open("GET", "http://localhost/proyectoIngWeb/backend/api.php?action=datos", false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

    return xhr.responseText;    
  }
}
