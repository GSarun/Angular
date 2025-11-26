import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Settings</h3>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="speechRate">
            Speech Speed ({{ speechRate }}x)
          </label>
          <input 
            type="range" 
            id="speechRate" 
            min="0.5" 
            max="2.0" 
            step="0.1"
            [(ngModel)]="speechRate"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          >
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>Slow (0.5x)</span>
            <span>Normal (1.0x)</span>
            <span>Fast (2.0x)</span>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button 
            (click)="onCancel()"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            (click)="onSave()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  `
})
export class SettingsDialogComponent {
    @Input() speechRate: number = 1.0;
    @Output() save = new EventEmitter<number>();
    @Output() cancel = new EventEmitter<void>();

    onSave() {
        this.save.emit(this.speechRate);
    }

    onCancel() {
        this.cancel.emit();
    }
}
