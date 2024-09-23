import { Controller, Get, Param, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { title } from 'process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello(@Query('bgColor') bgColor: string = "white") {
    return {
      bgColor: bgColor,
      message: this.appService.getHello()
    };
  }

  #books = [
    {
      title: "qqqqqqqqqqqq",
      isbn: "1"
    }, {
      title: "wwwwwwwwwwwwwwwwww",
      isbn: "2"
    }, {
      title: "eeeeeeeee",
      isbn: "3"
    }
  ]

  @Get('book/:isbn')
  @Render('book')
  getBooksByIsbn(@Param('isbn') isbn: string) {
    return this.#books.find(b => b.isbn == isbn)
  }


  @Get('books')
  @Render('books')
  getBooks() {
    return {
      message: this.#books
    }
  }


  @Get('books/:searchkey')
  @Render('books')
  getSearchedBooks(@Param('searchkey') searchkey:string) {
    return {
      message: this.#books.filter(x=> x.title.indexOf(searchkey))
    }
  }
}
