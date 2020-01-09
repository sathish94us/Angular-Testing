import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DefaultPipe } from './default.pipe';
import { AuthService } from './auth.service';
import { By } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { LoginComponent } from './login/login.component';

class MockedService {
  authenticated = false;

  isAuthenticated() {
    return 'Mocked';
  }
}

describe('AppComponent', () => {
  let authService: AuthService;
  let appComponent: AppComponent
  beforeEach(async(() => {
    authService = new AuthService();
    appComponent = new AppComponent(authService);
    // appComponent = new AppComponent(mockedSerice);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        DefaultPipe,
        LoginComponent
      ],
    }).compileComponents();
  }));

  afterEach(() => {
    localStorage.removeItem("token");
    authService = null;
    appComponent = null;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'unit-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('unit-testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('unit-testing app is running!');
  });

  // it("should return true if token exists", () => {
  //   localStorage.setItem("token", "1234");
  //   expect(authService.isAuthenticated()).toBeTruthy();
  // });

  // it("should return false if token does notexists", () => {
  //   expect(authService.isAuthenticated()).toBeFalsy();
  // });

  // Spyon implementation
  // it("should return true if user is not authenticated", () => {
  //   spyOn(authService, 'isAuthenticated').and.returnValue(true);
  //   let needsLogin = appComponent.needsLogin();
  //   expect(needsLogin).toBeTruthy();
  //   expect(authService.isAuthenticated).toHaveBeenCalled();
  // });

  // it("should return false if token does notexists", () => {
  //   spyOn(authService, 'isAuthenticated').and.returnValue(false);
  //   let needsLogin = appComponent.needsLogin();
  //   expect(needsLogin).toBeFalsy();
  //   expect(authService.isAuthenticated).toHaveBeenCalled();
  // });

  // Testbed implementation
  it("should return true if user is not authenticated", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    authService = null;
    authService = TestBed.get(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    let needsLogin = app.needsLogin();
    expect(needsLogin).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it("should return false if token does notexists", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    authService = null;
    authService = TestBed.get(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    let needsLogin = app.needsLogin();
    expect(needsLogin).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  // Change detection
  it("detect changes for login", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let el = fixture.debugElement.query(By.css('pre'));
    authService = null;
    authService = TestBed.get(AuthService);
    let textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe('');
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    app.needsLogin();
    fixture.detectChanges();
    textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe("Logout");
  })

  it("detect changes for login", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let el = fixture.debugElement.query(By.css('pre'));
    authService = null;
    authService = TestBed.get(AuthService);
    let textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe('');
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    app.needsLogin();
    fixture.detectChanges();
    textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe("Login");
  })

  // Asynchrnous function testing
  it("async jasmin way", (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let el = fixture.debugElement.query(By.css('article'));
    authService = null;
    authService = TestBed.get(AuthService);
    let textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe('');
    let spy = spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
    app.ngOnInit();
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      textContent = el.nativeElement.textContent.trim();
      expect(textContent).toBe("Logout");
      done();
    })
  })

  // Asynchrnous function testing
  it("async angular way", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let el = fixture.debugElement.query(By.css('article'));
    authService = null;
    authService = TestBed.get(AuthService);
    let textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe('');
    let spy = spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(false));
    app.ngOnInit();
    fixture.whenStable().then(() => { // response will be coming only if all promises are resolved
      fixture.detectChanges();
      textContent = el.nativeElement.textContent.trim();
      expect(textContent).toBe("Login");
    })
  }));

  // Asynchrnous function testing
  it("async angular way", fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let el = fixture.debugElement.query(By.css('article'));
    authService = null;
    authService = TestBed.get(AuthService);
    let textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe('');
    let spy = spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
    app.ngOnInit();
    tick(); // waiting for all promises to be resolved and blocks the code
    fixture.detectChanges();
    textContent = el.nativeElement.textContent.trim();
    expect(textContent).toBe("Logout");
  }));

  it("checking dependency injection", () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        providers: [
          {
            provide: AuthService, useClass: MockedService
          }
        ]
      }
    });
    let fixture = TestBed.createComponent(AppComponent);
    let testBedService = TestBed.get(AuthService);
    let componentService = fixture.debugElement.injector.get(AuthService);
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(testBedService);
    });
  });

  // it("component service should be instance of mockedauth service", () => {
  //   TestBed.overrideComponent(AppComponent, {
  //     set: {
  //       providers: [
  //         {
  //           provide: AuthService, useClass: MockedService
  //         }
  //       ]
  //     }
  //   });
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let componentService = fixture.debugElement.injector.get(AuthService);
  //   expect(componentService instanceof MockedService).toBeTruthy();
  // });
});
