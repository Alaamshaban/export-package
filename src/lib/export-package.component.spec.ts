import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLibraryComponent } from './export-package.component';

describe('ExportLibraryComponent', () => {
  let component: ExportLibraryComponent;
  let fixture: ComponentFixture<ExportLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
