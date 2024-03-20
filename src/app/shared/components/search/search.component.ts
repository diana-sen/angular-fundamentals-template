import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder = '';
  @Output() search = new EventEmitter<string>();
  @ViewChild("searchForm") public searchForm!: NgForm;
  searchText = '';

  public onSubmit(searchItem: any): void{
    console.log("Search item");
    console.log(searchItem);

  }

  public emitSubmitEvent(event: any): void{
    this.searchForm.ngSubmit.emit(this.searchText);
  }

}

