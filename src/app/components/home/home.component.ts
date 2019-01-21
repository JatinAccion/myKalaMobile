import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CoreService } from '../../services/core.service';
import { SearchDataModal } from '../../models/searchData.modal';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoaderData, LoaderService } from '../../services/loader.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService, Ng4LoadingSpinnerComponent } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  loader: boolean;
  tiles: any;
  carousalItems = [];
  searchData = [];
  s3 = environment.s3;
  placeIconsUrl: string = "mykala-dev-images/product/Places/icon_";
  placeImageUrl: string = "mykala-dev-images/product/Places/";
  categoryImageUrl: string = "mykala-dev-images/product/Places/";
  userResponse = { place: [], type: [], category: [], subcategory: [], subType: {} };
  response: any;
  breadCrums = [];
  customers: any = [];
  template: string = `<img src="./assets/images/kalaLoader.svg" class="custom-spinner-template" alt="Kala Loader">`;
  productAvailabilityModal = {};
  availableProducts = [];
  selectionLevel: number = 1;
  navigateToPlace: boolean = false;

  constructor(private routerOutlet: RouterOutlet, private router: Router, private homeService: HomeService, public core: CoreService, public loaderService: LoaderService, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.ng4LoadingSpinnerService.show();
    this.core.searchMsgToggle();
    this.core.checkIfLoggedOut(); /*** If User Logged Out*/
    localStorage.removeItem('GetOfferStep_1');
    localStorage.removeItem('GetOfferStep_2');
    localStorage.removeItem('GetOfferStep_3');
    localStorage.removeItem('GetOfferStep_4');
    localStorage.removeItem('esKeyword');
    localStorage.removeItem('GetOfferStep_2Request');
    localStorage.removeItem("getOffers");
    this.core.hide();
    this.core.pageLabel();
    this.getPlace();
    this.core.LoungeShowHide();
    document.getElementsByClassName("optionalFooter")[0] != undefined ? document.getElementsByClassName("optionalFooter")[0].classList.remove("optionalFooter") : {};
    this.core.footerSwap();
    this.core.resetAllConvoFlags();
    this.core.searchBar = "";
    this.core.IsElasticSearch = false;
    this.ng4LoadingSpinnerService.hide();
    this.core.isSearchWithoutSuggestion = false;
    setTimeout(() => {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#23130f';
    }, 100);
  }

  ngOnDestroy() {
    document.getElementsByTagName('body')[0].style.backgroundColor = '';
  }

  //Get All Places
  getPlace() {
    this.loader = true;
    this.homeService.getTilesPlace().subscribe(res => {
      this.loader = false;
      for (var i = 0; i < res.length; i++) this.searchData.push(new SearchDataModal(res[i].placeId, res[i].placeName, res[i].placeName, "1", `${this.s3}${this.placeImageUrl}${res[i].placeName}_mobile.png`, `${this.s3}${this.placeIconsUrl}${res[i].placeName}.png`));
      this.carousalItems = this.searchData;
      this.tiles = this.searchData;
      this.searchData.forEach((item) => {
        if (item.name == 'Home & Garden') item.orderNo = 1;
        else if (item.name == 'Pets') item.orderNo = 2;
        else if (item.name == 'Sports & Fitness') item.orderNo = 3;
        else if (item.name == 'Electronics') item.orderNo = 4;
        else if (item.name == 'Travel') item.orderNo = 5;
        else if (item.name == 'Kids') item.orderNo = 6;
        else if (item.name == 'Health & Beauty') item.orderNo = 7;
        else if (item.name == 'Fashion & Apparel') item.orderNo = 8;
        else if (item.name == 'Tools & Hardware') item.orderNo = 9;
        else item.orderNo = 10;
      });
      this.searchData.sort((a, b) => a.orderNo - b.orderNo);
      /*Product Availability*/
      this.productAvailabilityModal = { levelName: null, levelId: null, levelCount: this.selectionLevel };
      this.homeService.productAvailability(this.productAvailabilityModal).subscribe((res) => {
        this.availableProducts = res.filter(item => item.level = this.selectionLevel);
        this.modifySearchData();
      }, (err) => {
        console.log("Error From Product Availability");
      });
      /*Product Availability*/
      this.ng4LoadingSpinnerService.hide();
    });
  }

  tileSelected(tile, IsBc) {
    this.ng4LoadingSpinnerService.show();
    if (tile.hasOwnProperty("tile") == true) var tile = tile['tile'];
    else var tile = tile;
    if (tile == undefined) this.breadCrums = [];
    for (var i = 0; i < this.breadCrums.length; i++) {
      let bc = this.breadCrums[i];
      if (bc.id == tile.id) this.breadCrums.splice(i + 1, 1);
    }
    if (IsBc == undefined) this.breadCrums.push(tile);
    this.searchData = [];

    //Get Category
    if (tile && tile.level == "1") {
      this.navigateToPlace = true;
      this.selectionLevel = 2;
      this.loader = true;
      this.userResponse.place = tile;
      this.homeService.getTilesCategory(tile.id).subscribe((res) => {
        this.loader = false;
        for (var i = 0; i < res.length; i++) this.searchData.push(new SearchDataModal(res[i].categoryId, res[i].categoryName, res[i].categoryName, "2", `${this.s3}${this.categoryImageUrl}${tile.name}/${res[i].categoryName}.jpg`));
        this.tiles = this.searchData;
        /*Product Availability*/
        this.productAvailabilityModal = { levelName: tile.name, levelId: tile.id, levelCount: this.selectionLevel };
        this.homeService.productAvailability(this.productAvailabilityModal).subscribe((res) => {
          this.availableProducts = res.filter(item => item.level = this.selectionLevel);
          this.modifySearchData();
        }, (err) => {
          console.log("Error From Product Availability");
        });
        /*Product Availability*/
        this.ng4LoadingSpinnerService.hide();
      });
    }
    //Get Sub Category
    else if (tile && tile.level == "2") {
      this.userResponse.category = tile;
      window.localStorage['levelSelections'] = JSON.stringify(this.userResponse);
      if (this.routerOutlet.isActivated) this.routerOutlet.deactivate();
      this.core.IsBrowseProduct = true;
      this.router.navigateByUrl('/search-result');
      this.ng4LoadingSpinnerService.hide();
    }
    //Get Place
    else { this.selectionLevel = 1; this.getPlace(); this.ng4LoadingSpinnerService.hide(); }
  }

  modifySearchData() {
    let getLevelBasedData = this.availableProducts.filter(item => item.level == this.selectionLevel);
    for (let i = 0; i < getLevelBasedData.length; i++) {
      for (let j = 0; j < this.searchData.length; j++) {
        if (getLevelBasedData[i].name == this.searchData[j].name && getLevelBasedData[i].level === parseInt(this.searchData[j].level)) {
          this.searchData[j].isProductAvailable = true;
          break;
        }
      }
    }
  }

  reloadPlaces() {
    this.navigateToPlace = false;
    this.selectionLevel = 1;
    this.searchData = [];
    this.getPlace();
  }
}
