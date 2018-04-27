import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/articles.service';
import { Article } from '../_models/article.model';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  article: Article;
  constructor(private articleService:ArticlesService, private router: Router) {
    this.article = new Article("","",0);
   }

  ngOnInit() {
  }

  saveArticle(){
    this.articleService.saveArticle(this.article).subscribe(
      result => {
        this.router.navigate(['']);
      }, err => {
        console.log("error");
      }, () => {
        console.log("finish");
      }
    );
  }

}
