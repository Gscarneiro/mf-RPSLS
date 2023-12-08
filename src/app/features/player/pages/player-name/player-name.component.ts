import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Urls } from 'src/app/constants/urls';
import { Player } from 'src/app/models/Player';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.css'],
})
export class PlayerNameComponent {
  playerForm: FormGroup = new FormGroup({});

  @Output() onUserSubmited = new EventEmitter<Player>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.createForm(new Player());
  }

  createForm(player: Player) {
    this.playerForm = this.formBuilder.group({
      name: [player.name, [Validators.required]],
    });
  }

  get registerFormControl() {
    return this.playerForm.controls;
  }

  get getName() {
    return this.playerForm.get('name');
  }

  submit() {
    this.apiService
      .post(
        Urls.player.root,
        {},
        {
          name: this.playerForm.value.name,
        }
      )
      .subscribe((data) => {
        var player = Object.assign(new Player(), data);
        this.onUserSubmited.emit(player);
      });
  }
}
