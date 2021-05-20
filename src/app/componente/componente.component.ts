import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.scss']
})
export class ComponenteComponent implements OnInit {

  editValue:any = "";
  editValueList = "";
  semaforo:FormGroup;
  titulo:any;
  estado:any;
  id:any;
  listId:any;
  idN:any = -1;
  descripcion:any;

  lista:Array<Object>=[];
  lista2:Array<String>=[];
  lista3:Array<String>=[];

  lista1A:Array<String>=[];


  constructor(public fb:FormBuilder, private servicio:DatosService) {
      this.semaforo=this.fb.group({
        titulo:['',Validators.required],
        estado:['',Validators.required],
        descripcion:['',Validators.required],
        i:[''],
        id:[],
      });
   }

  ngOnInit(): void {
    this.titulo=this.semaforo.get("titulo") as FormGroup;
    this.estado=this.semaforo.get("estado") as FormGroup;
    this.id=this.semaforo.get("id") as FormGroup;
    this.descripcion=this.semaforo.get("descripcion") as FormGroup;


    //obtener datos

    //rellenar listas
    let respuestaAPI =  this.servicio.obtenerListas();
    let objListas = JSON.parse(respuestaAPI);
    console.log(objListas);
    for(let i = 0; i < objListas.length ; i++){
      console.log(objListas[i].titulo + ": " +objListas[i].descripcion);
      if (objListas[i].estado == "Iniciada"){
        this.lista.push(objListas[i].titulo + ": " +objListas[i].descripcion);
      }else if(objListas[i].estado == "EnProceso"){
        this.lista2.push(objListas[i].titulo + ": " + objListas[i].descripcion);
      }else if(objListas[i].estado == "Terminada"){
        this.lista3.push(objListas[i].titulo + ": " + objListas[i].descripcion);
      }
    }
  }

  crear(idN:number){
    let cJson = {
      "action" : "datos",
      "titulo" : this.titulo.value,
      "descripcion": this.descripcion.value,
      "estado": this.estado.value
    }

    console.log(this.servicio.enviarPOST(cJson));

    if(idN == -1){
      if(this.estado.value == "Iniciada"){
        this.lista.push(this.titulo.value + ":\n" + this.descripcion.value);
      }else if(this.estado.value == "EnProceso"){
        this.lista2.push(this.titulo.value + ":\n" + this.descripcion.value);
      }else if(this.estado.value == "Terminada"){
        this.lista3.push(this.titulo.value + ":\n" + this.descripcion.value);
      }
    }else{
      this.lista[idN] = this.titulo.value;
    }
    this.semaforo.reset();
  }

  Eliminar(){
      let cJson = {
        "action" : "eliminarDato",
        "titulo" : this.titulo.value,
        "descripcion": this.descripcion.value,
        "estado": this.estado.value
      }
  
      console.log(this.servicio.enviarPOST(cJson));

      this.lista.forEach((item,index)=>{
        if(this.titulo.value==item || this.descripcion.value==item) this.lista.splice(index,1);
      });
      this.lista2.forEach((item,index)=>{
        if(this.titulo.value==item || this.descripcion.value==item) this.lista.splice(index,1);
      });
      this.lista3.forEach((item,index)=>{
        if(this.titulo.value==item || this.descripcion.value==item) this.lista.splice(index,1);
      });
  }

  valor(){
    return this.editValue;
  }

  valorLista(){
    return this.editValueList;
  }

  edit(i:any, j:any){
    this.editValue = i;
    this.editValueList = j;
  }

  obtenerT(){
    if (this.lista[this.editValue] == null){
      return "";
    }
    return this.lista[this.editValue];
  }

  mostrar(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "http://localhost/proyectoIngWeb/backend/api.php?action=datos");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();
  }
}
