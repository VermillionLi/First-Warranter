import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
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
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  cloudUploadOutline, 
  trashOutline, 
  imagesOutline 
} from 'ionicons/icons';
import { JSDocComment } from '@angular/compiler';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule, IonCard, IonCardContent, IonIcon, 
    IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonSpinner
  ]
})
export class ImageUploadComponent {
  isDragging = false;
  isUploading = false;
  errorMessage: string | null = null;
  selectedFiles: File[] = [];
  previews: { url: string; name: string; size: number }[] = [];

  constructor(private http: HttpClient) {
    addIcons({ alertCircleOutline, cloudUploadOutline, trashOutline, imagesOutline });
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
    this.errorMessage = null;
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
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;
    this.errorMessage = null;

    const formData = new FormData();

    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    type uploadResponse = {
        message: string;
        count: number;
        model_response: string;
    }

    this.http.post<uploadResponse>(`${environment.api_url}/api/upload`, formData).subscribe({
      next: (res) => {
        const parsedResponse = JSON.parse(res.model_response);
        console.log(`${res.count} files uploaded. Response:`, parsedResponse);
        this.isUploading = false;
        this.clearAll();
      },
      error: (err) => {
        console.error('Upload failed', err)
        this.isUploading = false;
        this.errorMessage = 'Upload failed. Please check your connection or server status.';
      }
    });
  }
}