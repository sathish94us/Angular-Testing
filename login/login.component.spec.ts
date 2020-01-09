import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginButton;
  let emailEle;
  let passwordEle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginButton = fixture.debugElement.query(By.css('button'));
    emailEle= fixture.debugElement.query(By.css('input[type=email]'));
    passwordEle= fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

  it('setting enabled false --->> disables the login button', () => {
    // testing input props
    component.enabled = false;
    fixture.detectChanges();
    expect(loginButton.nativeElement.disabled).toBeTruthy();
  });

  it("Entering email and password emits loggedin event", () => {
    let user;
    emailEle.nativeElement.value = "test@example.com";
    passwordEle.nativeElement.value = "123456";
    // testing output props
    component.loggedIn.subscribe((value) => user = value);
    loginButton.triggerEventHandler('click', null);
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("123456");
  })
});
