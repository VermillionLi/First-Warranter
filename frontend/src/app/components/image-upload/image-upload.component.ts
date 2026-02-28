import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonList, 
  IonItem, 
  IonThumbnail, 
  IonLabel, 
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  imports: [
    CommonModule, 
    IonCard, 
    IonCardContent, 
    IonIcon, 
    IonList, 
    IonItem, 
    IonThumbnail, 
    IonLabel, 
    IonButton
  ]
})
export class ImageUploadComponent {
  isDragging = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image (PNG or JPG).');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    // TODO: send image to backend
  }

  clearSelection() {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
