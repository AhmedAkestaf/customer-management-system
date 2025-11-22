import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        NavbarComponent,
        SidebarComponent
    ],
    template: `
    <div class="main-layout">
      <app-navbar></app-navbar>
      
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <app-sidebar></app-sidebar>
        </mat-sidenav>
        
        <mat-sidenav-content class="main-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
    styles: [`
    .main-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .sidenav-container {
      flex: 1;
      overflow: hidden;
    }

    .sidenav {
      width: 250px;
    }

    .main-content {
      padding: 24px;
      background-color: #f5f5f5;
      overflow: auto;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    private toggleListener: any;

    ngOnInit(): void {
        this.toggleListener = (event: Event) => {
            // Handle sidebar toggle from navbar
        };
        window.addEventListener('toggleSidebar', this.toggleListener);
    }

    ngOnDestroy(): void {
        window.removeEventListener('toggleSidebar', this.toggleListener);
    }
}
