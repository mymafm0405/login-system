import { Component, Input } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() message = 'Are you sure want to delete?';
  @Input() post: Post;
  loading = false;

  constructor(private storageServ: StorageService) {}

  onClose() {
    this.storageServ.showModal.next({ show: false, post: null });
  }

  onConfirm() {
    this.loading = true;
    this.storageServ.deletePost(this.post.id).subscribe(() => {
      this.storageServ.showModal.next({ show: false, post: null });
      this.loading = false;
    });
  }
}
