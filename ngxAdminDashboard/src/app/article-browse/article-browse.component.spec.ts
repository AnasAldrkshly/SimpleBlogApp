import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBrowseComponent } from './article-browse.component';

describe('ArticleBrowseComponent', () => {
  let component: ArticleBrowseComponent;
  let fixture: ComponentFixture<ArticleBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
