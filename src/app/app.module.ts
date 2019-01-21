import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxRangeSliderModule, DxNumberBoxModule } from 'devextreme-angular';
import { SidebarModule } from 'ng-sidebar';
import { ReversePipe } from './pipes/reverse.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TilesComponent } from './components/home/tiles/tiles.component';
import { BrowseProductComponent } from './components/browse-product/browse-product.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { HomeService } from './services/home.service';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { AuthService } from './services/auth.service';
import { CoreService } from './services/core.service';
import { BreadcrumsComponent } from './components/home/breadcrums/breadcrums.component';
import { NgbDateFRParserFormatter } from './common/ngb-date-fr-parser-formatter';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { GetOfferComponent } from './components/get-offer/get-offer.component';
import { ViewProductService } from './services/viewProduct.service';
import { SubMenusComponent } from './components/sub-menus/sub-menus.component';
import { MyNewsAlertsComponent } from './components/my-news-alerts/my-news-alerts.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { FieldErrorDisplayComponent } from './common/field-error-display/field-error-display.component';
import { InputMaskDirective } from './common/input-mask.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService, LoaderData } from './services/loader.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LocalStorageService } from './services/LocalStorage.service';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { StatusComponent } from './components/status/status.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { MyOrdersService } from './services/myorder.service';
import { ProfileInfoService } from './services/profile-info.service';
import { JoinKalaService } from './services/join-kala.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { MyAccountService } from './services/myAccount.service';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { TrackOrderService } from './services/trackOrder.service';
import { MyoffersComponent } from './components/myoffers/myoffers.component';
import { MyOffersService } from './services/myOffer.service';
import { ElasticSearchResult } from './components/elastic-search-result/elastic-search-result.component';
import { GetOfferService } from './services/getOffer.service';
import { ForgotPasswordService } from './services/forgotPassword.service';
import { LeaveReviewComponent } from './components/leave-review/leave-review.component';
import { MyReviewService } from './services/review.service';
import { ConsumerInterestService } from './services/consumer-interest.service';
import { MyAlertsService } from './services/MyNewsAlertsService';
import { MyCartService } from './services/mycart.service';
import { ViewOfferComponent } from './components/view-offer/view-offer.component';
import { ViewOfferService } from './services/viewOffer.service';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ElasticSearchBarComponent } from './components/elastic-search-bar/elastic-search-bar.component';
import { SwipeSliderComponent } from './swipe-slider/swipe-slider.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { MailEntryModule } from './components/mail-entry/mail-entry.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TilesComponent,
    BrowseProductComponent,
    MycartComponent,
    ViewProductComponent,
    BreadcrumsComponent,
    ReversePipe,
    SearchResultComponent,
    GetOfferComponent,
    SubMenusComponent,
    MyNewsAlertsComponent,
    MyaccountComponent,
    FieldErrorDisplayComponent,
    InputMaskDirective,
    LoaderComponent,
    LogoutComponent,
    LoginComponent,
    StatusComponent,
    MyordersComponent,
    CheckoutComponent,
    TrackOrderComponent,
    MyoffersComponent,
    ElasticSearchResult,
    LeaveReviewComponent,
    ViewOfferComponent,
    ElasticSearchBarComponent,
    SwipeSliderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DxRangeSliderModule,
    DxNumberBoxModule,
    Angular2FontawesomeModule,
    CreditCardDirectivesModule,
    SwiperModule,
    MailEntryModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    HomeService,
    CoreService,
    LoaderService,
    LocalStorageService,
    LoaderData,
    ViewProductService,
    ProfileInfoService,
    JoinKalaService,
    CheckoutService,
    MyAccountService,
    TrackOrderService,
    MyOffersService,
    GetOfferService,
    ForgotPasswordService,
    MyReviewService,
    MyOrdersService,
    MyAlertsService,
    ConsumerInterestService,
    MyCartService,
    ViewOfferService,
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateFRParserFormatter
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    HomeComponent
  ]
})
export class AppModule { }
