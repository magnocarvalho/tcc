import { Observable } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage';

export class Upload {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;
}
