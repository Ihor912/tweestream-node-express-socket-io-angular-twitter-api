import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: {
            setDefaultLang: jest.fn(),
            use: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            events: of(),
          },
        },
      ],
      imports: [RouterModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
