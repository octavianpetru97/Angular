import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { City } from 'src/models/city';
import { Event } from 'src/models/event';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { AddEvent, EditEvent } from '../state/actions/event.actions';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit
{

  eventForm: FormGroup;
  title = 'Create';
  eventId: number;
  errorMessage: any;
  cityList: City[];
  public progress: number;
  public message: string;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _eventService: EventService, private _router: Router,
    private store: Store<AppState>, private http: HttpClient) {
    if (this._avRoute.snapshot.params['id']) {
      this.eventId = this._avRoute.snapshot.params['id'];
    }

    this.eventForm = this._fb.group({
      eventId: 0,
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

   upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

     const uploadReq = new HttpRequest('POST', 'api/Event', formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });


  }


  ngOnInit() {
    this._eventService.getCityList().subscribe(
      (data: City[]) => this.cityList = data
    );

    if (this.eventId > 0) {
      this.title = 'Edit';
      this._eventService.getEventById(this.eventId)
        .subscribe((response: Event) => {
          this.eventForm.setValue(response);
        }, error => console.error(error));
    }
  }

  save() {

    if (!this.eventForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.store.dispatch(AddEvent({ event: this.eventForm.value }));
    } else if (this.title === 'Edit') {
      this.store.dispatch(EditEvent({ event: this.eventForm.value }));
    }
  }

  cancel() {
    this._router.navigate(['/fetch-event']);
  }
 

  get name() { return this.eventForm.get('name'); }
  get description() { return this.eventForm.get('description'); }
  get date() { return this.eventForm.get('date'); }
  get city() { return this.eventForm.get('city'); }
  get photo() { return this.eventForm.get('photo'); }
}
