import { AfterViewInit, Component, ElementRef, EventEmitter, Input, input, Output, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?'; //Outras maneiras de declarar os input e output ao invez de variable = input()
  @Input() isVisible: boolean = true;
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
    this.isVisible = false; 
  }

  cancel() {
    this.canceled.emit();
    this.isVisible = false; 
  }
  
}
