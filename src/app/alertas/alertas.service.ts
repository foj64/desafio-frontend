import {Injectable, SystemJsNgModuleLoader} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { Alerta } from "./alerta/alerta.model"
import { DE_API } from "../app.api"
import { Observable } from 'rxjs';

@Injectable()
export class AlertasService {
    
    constructor(private http: HttpClient){}

    alertas(searchPontoDeVenda?: string, searchTipo?: string): Observable<Alerta[]> {
        let params: HttpParams = undefined
        if (searchPontoDeVenda || searchTipo){
            params = new HttpParams().append('pontoDeVenda', searchPontoDeVenda)
                                     .append('tipo', searchTipo)
            //params = new HttpParams().append('tipo', searchCategoria)
            console.log(params)
            return this.http.get<Alerta[]>(`${DE_API}/alertas/pesquisar`, {params: params})

        } else {
            return this.http.get<Alerta[]>(`${DE_API}/alertas`, {params: params})
        }
    }

    alertaById(id: string): Observable<Alerta>{
        return this.http.get<Alerta>(`${DE_API}/alertas/${id}`)
    }

  //  menuOfAlerta(id: string): Observable<MenuItem[]>{
  //      return this.http.get<MenuItem[]>(`${DE_API}/alertas/${id}/menu`)
   // }
}