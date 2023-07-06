import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:               new FormControl(''),
    superhero:        new FormControl('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService ) {
  }
  ngOnInit() {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroById( id )),
    ).subscribe( hero => {
      if ( !hero) return this.router.navigateByUrl('/')
      this.heroForm.reset( hero );
      return ;
    })
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;

  }
  onSubmit(): void {
    if ( this.heroForm.invalid ) return;
    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
        //   TODO: mostrar snackbar
        });
      return;
    }
    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
      //   TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
      })
  }

}
