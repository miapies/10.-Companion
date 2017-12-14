import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  taxistas: any[];
  taxistaSeleccionado: any = {};

  siguiendo = false;

  lat: number;
  lng: number;

  constructor(private db: AngularFireDatabase) {

    this.db.list('usuarios').snapshotChanges()
      .subscribe(datos => {
        this.taxistas = [];
        datos.forEach((taxista: any) => {
          const $key = taxista.payload.key;
          const data = { $key, ...taxista.payload.val() };
          this.taxistas.push(data);
        });

        console.log(this.taxistas);

        if (this.siguiendo) {
          // Si estoy siguiendo a alguien
          this.taxistas.forEach(taxista => {
            if (taxista.$key === this.taxistaSeleccionado.$key) {
              console.log(taxista);

              this.lat = taxista.lat;
              this.lng = taxista.lng;
            }
          });
        }

      });

  }

  seguir_taxista(taxista: any) {
    this.lat = taxista.lat;
    this.lng = taxista.lng;

    this.siguiendo = true;

    this.taxistaSeleccionado = taxista;
  }

  dejar_seguir() {
    this.siguiendo = false;
    this.taxistaSeleccionado = {};
  }

}
