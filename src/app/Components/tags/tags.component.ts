import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TagService } from '../../Services/tag/tag.service';
import { NbDialogService } from '@nebular/theme';
import { AddTagDialogComponent } from './add-tag-dialog/add-tag-dialog.component';
import { createTagDTO } from '../../Models/tag/createTag-dto';
import { ConfirmModalComponent } from '../../admin/dashboard/status-card/confirm-modal/confirm-modal.component';

@Component({
  selector: 'ngx-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  organization_id: string = environment.ORGANIZATION_ID;
  tags: any;

  constructor(private tagService: TagService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.tagService.getTags(this.organization_id).subscribe(response =>{
      this.tags = response;
    });
  }

  addTag(){
    this.dialogService.open(AddTagDialogComponent,
      {
        context:{
        }
      }).onClose.subscribe((formData) => {
        if(formData){
          const createTagDto = new createTagDTO();
          createTagDto.name = formData.name;
          createTagDto.description = formData.description;
          createTagDto.system = formData.system;
          createTagDto.unique = formData.unique;
          createTagDto.type = 6;
          console.log(createTagDto);
          this.tagService.createTag(this.organization_id, createTagDto).subscribe((response) =>{
            this.tags.push(response);
          })
        }
      })
  }

  deleteTag(tag: any){
    this.dialogService.open(ConfirmModalComponent,
      {
        context: {
          content: `Êtes-vous sûr de vouloir supprimer le label ${tag.name} ?`,
          Action: 'Supprimer',
          headerIcon: 'fa-exclamation',
        },
      }
    ).onClose.subscribe((formData) => {
      if(formData) {
        this.tagService.deleteTeg(this.organization_id, tag.tag_id)
        .subscribe(response => {
          this.deleteTagFromList(tag.tag_id);
        });
      }
    })
  }

    /**
   * delete a tag from the array of tags (mainly implemented for performing delete operations to make objects up to date in client side)
   */
    deleteTagFromList(tag_id: string){
      this.tags = this.tags.filter(tag => tag.tag_id !== tag_id);
    }

}
