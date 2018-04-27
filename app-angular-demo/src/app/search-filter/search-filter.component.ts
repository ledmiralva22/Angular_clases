import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticlesService } from '../shared/articles.service';
import { Article } from '../_models/article.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  constructor(private articleService:ArticlesService) { }

  @Output() onChange : EventEmitter<Article[]> = new EventEmitter();

  ngOnInit() {
    this.orderList("id");
  }

  orderList(orderParam?: string){
    let articles : Article[];
    let order : string;
    switch(orderParam){
      case "votes": order = "desc"; break;
      case "title": order = "asc"; break;
    }

    this.articleService.getOrderedList(orderParam, order).subscribe(
      result => {
        articles = result;
        this.onChange.emit(articles);
        return articles;
      }, err => {
        console.log("error");
      }, () => {
        console.log("finished");
      }
    );

    return articles;
  }
}
