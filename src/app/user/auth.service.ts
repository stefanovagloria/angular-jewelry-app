import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, ReplaySubject, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  user: User | undefined;

  get isLoggedIn(): boolean{
    return !!this.user;
  }

  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) {

    try {
      const lsUser = localStorage.getItem('user') || '';

      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }

   
  } // Sign in with email/password

  SignIn(email: string, password: string) {
    return this.afAuth

      .signInWithEmailAndPassword(email, password)

      .then((result) => {
        console.log(result.user);
        this.SetUserData(result.user)
        this.loggedIn.next(true);
        localStorage.setItem('user', (JSON.stringify(result.user)));

        this.router.navigate(['/']);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })

      .catch((error) => {
        window.alert(error.message);
      });
  } // Sign up with email/password

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign

        up and returns promise */

        this.SendVerificationMail();

        this.SetUserData(result.user);
      })

      .catch((error) => {
        window.alert(error.message);
      });
  } // Send email verfificaiton when new user sign up

  SendVerificationMail() {
    return this.afAuth.currentUser

      .then((u: any) => u.sendEmailVerification())

      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  } // Reset Forggot password

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth

      .sendPasswordResetEmail(passwordResetEmail)

      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })

      .catch((error) => {
        window.alert(error);
      });
  } // Returns true when user is looged in and email is verified

  get isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

   return user !== null  ? true : false;
  } // Sign in with Google

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  } // Auth logic to run auth providers

  AuthLogin(provider: any) {
    return this.afAuth

      .signInWithPopup(provider)

      .then((result) => {
        this.router.navigate(['/']);

        this.SetUserData(result.user);
      })

      .catch((error) => {
        window.alert(error);
      });
  } /* Setting up user data when sign in with username/password,

  sign up with username/password and sign in with social auth  

  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  SetUserData(user: any) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,

      email: user.email,

      displayName: user.displayName,

      photoURL: user.photoURL,

      emailVerified: user.emailVerified,
    };

  

    return userRef.set(userData, {
      merge: true,
    });
  } // Sign out

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');

      this.loggedIn.next(false);
      this.router.navigate(['/']);
    });
  }

  loginStatusChange(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
