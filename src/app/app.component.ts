import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;
  expried!: boolean;
  x:any;
  constructor(private loading: LoadingService) {
  }


  ngOnInit(): void {
    localStorage.setItem('lang', 'en');
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loading.isLoading.subscribe(isLoading => {
          setTimeout(() => {
              this.isLoading = isLoading;
          });
      });

      // Set the date we're counting down to
    var countDownDate = new Date("nov 8, 2023 20:00:00").getTime();

    let that = this;
    // Update the count down every 1 second
    this.x = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in an element with id="demo"
      document.getElementById("demo")!.innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(that.x);
        document.getElementById("demo")!.innerHTML = "EXPIRED";
        that.expried = true;
      }
    }, 1000);
  }




}
