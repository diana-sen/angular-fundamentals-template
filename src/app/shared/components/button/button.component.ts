import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    // Use the names for the inputs `buttonText` and `iconName`.
    @Input() buttonText = '';
    @Input() iconName: any;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
