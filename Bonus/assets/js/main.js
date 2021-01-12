/* 
Istruzioni:
Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali. 
Servendoci di Vue JS stampiamo tutto a schermo.
In questo momento non è importante la parte grafica.
Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.
Chiamata: https://flynn.boolean.careers/exercises/api/array/music
Layout base:
https://bitbucket.org/booleancareers/ex-dischi-musicali-layout 
*/


$(document).ready(function() {
	let appCd = new Vue ({
		el:'#appCd',
		data: {
			listaDischi: null,
			genere: null,
			key:"All",
		},
		methods: {
			getCollection() {
				axios
				.get('https://flynn.boolean.careers/exercises/api/array/music')
				.then(resp => {
					let dischi = resp.data.response;//percorso in cui reperire gli "oggetti" di interesse
					this.genere = [...new Set(dischi.map(item => item.genre))];//genero automaticamente i generi musicali, essendo una API un elemento aggiornato da utente terzo la dove venisse implementato un nuovo genere esso verrebbe automaticamente integrato e l'app aggiornata
					if (this.key === "All" ) {
						this.listaDischi = dischi;
					}else{
						this.listaDischi = dischi.filter((disco) => disco.genre === this.key);//mi restituisce un array filtrato
					}
				})
				.catch(error => {
            console.log(error);
        });
			}
		},
		mounted() {
			this.getCollection();
		}
	});
});