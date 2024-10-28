import { Component, OnInit } from '@angular/core';
import { Serie } from './serie';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html'
})
export class SerieComponent implements OnInit {

  series: Array<Serie> = [];
  seasons: number = 0;
  totalSeries: number = 0;


  ngOnInit(): void{
    this.getSeries();
  }
  

  constructor(private serieService: SerieService) { 
    
  }


  getSeries(){
    const tabla = document.getElementById('tablaSeries') as HTMLTableElement;
    this.serieService.getSeries().subscribe(series => {
      console.log(series);
      this.series = series;
      this.totalSeries = series.length;
      series.forEach(serie => {
        const tbody = tabla.querySelector('tbody') as HTMLTableSectionElement;
        const fila = this.crearSerie(serie);
        tbody.appendChild(fila);
        this.seasons = this.seasons + serie.seasons;
      });
      const p = document.getElementById("average") as HTMLParagraphElement;
      const average = document.createTextNode("Seasons average: " + (this.seasons/this.totalSeries).toFixed());
      p.appendChild(average);
    });  
  }
  

  crearSerie(serie: Serie){
    const fila = document.createElement('tr');
    const id = document.createElement('td');
    const name = document.createElement('td');
    const channel = document.createElement('td');
    const seasons = document.createElement('td');

    id.textContent = serie.id.toFixed();
    name.textContent = serie.name;
    channel.textContent = serie.channel;
    seasons.textContent = serie.seasons.toFixed()

    fila.appendChild(id);
    fila.appendChild(name);
    fila.appendChild(channel);
    fila.appendChild(seasons);

    fila.addEventListener('click', () => {
        
        const image = document.getElementById("cardSerieImage") as HTMLImageElement;
        const name = document.getElementById("cardSerieTitle") as HTMLTitleElement;
        const desc = document.getElementById("cardSerieDesc") as HTMLParagraphElement;
        const link = document.getElementById("cardSerieLink") as HTMLLinkElement;
        image.src = serie.poster;
        console.log(serie.description)
        name.textContent = serie.name;
        desc.textContent = serie.description;
        link.href = serie.webpage;
        link.textContent = serie.webpage;
        const card = document.getElementById("card");
        if (card) {
            card.style.visibility = "visible";
        }
    })

    return fila;
  }
}
