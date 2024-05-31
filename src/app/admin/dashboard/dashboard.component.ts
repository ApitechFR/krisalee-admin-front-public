import {Component, OnDestroy} from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-admin-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  template: "<router-outlet></router-outlet>"
})
export class DashboardComponent implements OnDestroy
{
  private alive = true;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  email = environment.ADMIN_APITECH_EMAIL;

  welcomeStatusCard: CardSettings =
  {
    title: 'SI de Secours',
    iconClass: 'nb-danger',
    type: 'primary',
  };

  emergencyStatusCard: CardSettings =
  {
    title: 'SI de Secours',
    iconClass: 'nb-danger',
    type: 'danger',
  };

  serviceStatusCard: CardSettings =
  {
    title: 'SI de Secours',
    iconClass: 'nb-danger',
    type: 'success',
  };

  welcomeModeDetails =
  {
    type: 'primary',
    content: "Le paramétrage de votre cocon de survie vous permettra de gérer vos services et données essentiels, vos utilisateurs mais aussi les labels : <br>\
    <br>\
    <strong>&emsp;Source</strong> : sauvegarde initiale/de référence<br> <strong>&emsp;A valider</strong> : lors des mises à jour de produits ou de données<br> <strong>&emsp;Prod</strong> : sauvegarde choisie pour le démarrage du SI de secours) pour une gestion optimale de vos services."
  }
  emergencyModeDetails =
  {
    type: 'danger',
    content: "<strong>Démarrer en mode survie <span>&#9888;</span></strong><br><br> \
    Implique le lancement de la gestion de la crise, il fait office d'un bouton rouge de lancement et enverra les SMS à tous vos utilisateurs pour accéder au SI de survie."
  }
  servicesModeDetails =
  {
    type: 'secondary',
    content: "<i class='fas fa-dot-circle'></i>&emsp;Via la page <strong>Services</strong> , les applications essentielles de communication lors d'une gestion de crise (mails, messagerie instantanée, stockage de documents, site internet, ...). Démarrez ou arrêtez individuellement vos services dès maintenant.<br><br>\
    <i class='fas fa-dot-circle'></i>&emsp;Via la page <strong>Connecteurs</strong> , les modules externes additionnels de vos applications (import des utilisateurs, import des documents, alerte des utilisateurs, renouvellements SSL).<br><br>\
    <i class='fas fa-dot-circle'></i>&emsp;Via la page <strong>Utilisateurs</strong> , vous pourrez suivre le déploiement et vous assurer que vos utilisateurs ont le moyen de se connecter, mais aussi faire des tests de mise en situation sur une cible restreinte.<br><br>"
  }
/*
  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };
  */

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router)
  {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    /*
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
      */
  }

  ngOnDestroy()
  {
    this.alive = false;
    this.themeSubscription.unsubscribe();
  }
}