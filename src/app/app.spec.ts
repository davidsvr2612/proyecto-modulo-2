import { TestBed } from '@angular/core/testing';
import { AppModule } from './app-module';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should keep the project title', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance.title).toBe('ProyectoModulo2');
  });

  it('should render the navbar and the footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.textContent).toContain('Gohome');
    expect(compiled.querySelector('footer')?.textContent).toContain('Gohome');
  });
});
