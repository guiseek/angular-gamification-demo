import { Component } from '@angular/core';
import { GamificationService } from 'angular-gamification'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  public user;
  public progress;
  constructor(public gamification: GamificationService) {
    this.user = {
      name: 'Gui',
      points: 0,
      level: {}
    };
    this.progress = {
      max: 0,
      value: 0
    };
    this.initGamefication();
  }
  initGamefication() {
    console.log('gamification: ', this.gamification);
    this.gamification.addBreakpoint(100, () => {
      console.log('breakpoint 100 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(200, () => {
      console.log('breakpoint 200 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(300, () => {
      console.log('breakpoint 300 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(300, () => {
      console.log('breakpoint 400 callback: ', this.gamification.getPoints());
    });

    let component = this.gamification.addComponent(400, () => {
      console.info('component update callback');
      let points = this.gamification.getPoints();
      this.gamification.getLevelByPoints(points);
      this.user.points = points;
      this.user.level = this.gamification.getLevel();
      this.progress.value = points;
    }, () => {
      console.log('component 400 start callback');
      this.progress.max = 400;
      this.user.level = this.gamification.getLevel();
    });
    this.gamification.addMission('add', 50, () => {
      console.log('add mission start');
    }, () => {
      console.log('add mission achieve: ', this.gamification.getPoints());
    });
    this.gamification.addMission('save', 30, () => {
      console.log('save mission start');
    }, () => {
      console.log('save mission achieve: ', this.gamification.getPoints());
    });
    this.gamification.addMission('delete', 10, () => {
      console.log('delete mission start');
    }, () => {
      console.log('delete mission achieve: ', this.gamification.getPoints());
    });
  }
}
