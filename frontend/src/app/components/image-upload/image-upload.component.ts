import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { addIcons } from 'ionicons';
import {
 cloudUploadOutline, 
 trashOutline, 
 imagesOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule, IonCard, IonCardContent, IonIcon, 
    IonList, IonItem, IonThumbnail, IonLabel, IonButton
  ]
})
export class ImageUploadComponent {
  isDragging = false;
  selectedFiles: File[] = [];
  previews: { url: string; name: string; size: number }[] = [];

  constructor(private http: HttpClient) {
    addIcons({ cloudUploadOutline, trashOutline, imagesOutline });
  }

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
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.handleFiles(event.target.files);
    }
  }

  private handleFiles(fileList: FileList) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    Array.from(fileList).forEach(file => {
      if (allowedTypes.includes(file.type)) {
        this.selectedFiles.push(file);
        
        const reader = new FileReader();
        reader.onload = () => {
          this.previews.push({
            url: reader.result as string,
            name: file.name,
            size: file.size
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previews.splice(index, 1);
  }

  clearAll() {
    this.selectedFiles = [];
    this.previews = [];
  }

  uploadImages() {
    console.log("Hi");
    if (this.selectedFiles.length === 0) return;

    console.log("Trying to upload file(s)");

    const formData = new FormData();

    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    this.http.post('http://localhost:3000/api/upload', formData).subscribe({
      next: (res) => console.log('Upload successful', res),
      error: (err) => console.error('Upload failed', err)
    });
  }
}