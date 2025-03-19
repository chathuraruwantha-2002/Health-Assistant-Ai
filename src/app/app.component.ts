import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HealthcareChatComponent } from "./pages/healthcare-chat/healthcare-chat.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, HealthcareChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Health-Assistant-Ai';

  ngOnInit(): void {
    initFlowbite();
  }
}