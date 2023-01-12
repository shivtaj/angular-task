import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCvKxVf1m4H8dSMAbR1IAG6WfGd46PdQoc",
//   authDomain: "angular-task-a78dc.firebaseapp.com",
//   projectId: "angular-task-a78dc",
//   storageBucket: "angular-task-a78dc.appspot.com",
//   messagingSenderId: "126443583245",
//   appId: "1:126443583245:web:6d8d23eb05829525d7e244",
//   measurementId: "G-D2SJGJ5VW8"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // token: string;
  // username: string;
  isLoggedIn: boolean = false;

  constructor(private router: Router,
    public firebaseAuth : AngularFireAuth) { }

    async signin(email: string, password: string){
      await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res =>{
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
    }
    async register(email: string, password: string){
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res =>{
        console.log(res)
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
    }

    logOut(){
      this.firebaseAuth.signOut()
      localStorage.removeItem('user')
    }
 
  // registerUSer(email: string, password: string, username: string) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .catch(
  //     error => console.log(error)
  //     )
  // }

  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //     response => {
  //       this.router.navigate(["/"]);
  //     }
  //     )
  //     .catch(
  //     error => console.log(error)
  //     );
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.username = firebase.auth().currentUser.email;
  //       firebase
  //         .auth()
  //         .currentUser.getIdToken()
  //         .then((tkn: string) => (this.token = tkn));
  //     } else {
  //       console.warn("onAuthStatusChnaged => no user");
  //     }
  //   });
  // }
//  logout() {
//     firebase
//       .auth()
//       .signOut()
//       .then(response => this.router.navigate(["/"]));
//     this.token = null;
//   }
//   getToken() {
//     return this.token;
//   }
//   isAunthenticated() {
//     return this.token != null;
//   }
//   getUserDetails() {
//     return this.username;

//   }
}