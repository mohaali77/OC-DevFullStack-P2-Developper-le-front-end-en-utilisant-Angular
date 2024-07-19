import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailsComponent, NotFoundComponent, HeaderComponent, PieChartComponent, LineChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
