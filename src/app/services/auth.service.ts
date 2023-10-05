import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user') || '');

    return user;
  }

 loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(true);
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) {
  
  }

  checkForLoggedInUser(){
    let user = localStorage.getItem('user');
    if(user){
      this.loggedIn.next(true);
    } else{
      this.loggedIn.next(false);
    }
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.loggedIn.next(true);

        localStorage.setItem('user', JSON.stringify(result.user));

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
  }

  // Sign up with email/password & Send email verfificaiton when new user sign up
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

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
 // Sign in with Google

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

}
