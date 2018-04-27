import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Article } from '../_models/article.model';
import { ArticlesService } from '../shared/articles.service';
import { Observer } from 'rxjs/Observer';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[];
  @Input() searchFilter: SearchFilterComponent;

  constructor(private articleService:ArticlesService) { 
  }

  ngOnInit() {
    this.searchFilter.onChange.subscribe(
      result => this.articles = result
    );
  }

  sortingByPoints(){
    return this.articles.sort((a:Article, b:Article)=> b.votes - a.votes);
  }
  loadList(){
    this.articleService.getList().subscribe(
      result=>{
        this.articles= result;
      },err=>{
        console.log("error");
      },
      ()=>{
        console.log("finished");
      }
    );
  }
}
