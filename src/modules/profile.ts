import { ref, get, DataSnapshot } from "firebase/database";
import { db } from "./firebaseApp";
import { logOut } from "./logout";
import { deleteProfile } from "./deleteUser";
(() => {
  let usernameID = sessionStorage.getItem("user");
  let target = sessionStorage.getItem("targetUser");
  let test = target === null ? usernameID : target;
  const dbRef = ref(db, `/users/userInfo/${test.toLowerCase()}`);
  get(dbRef).then((snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      const { username, bio, gender, profilePic } = snapshot.val();
      const img: HTMLInputElement = document.querySelector("#ProfileP");
      switch(profilePic){
        case "1": 
        img.src = new URL('../img/bild1.png', import.meta.url);
        break; 
        case "2": 
        img.src = new URL('../img/bild2.png', import.meta.url);
        break; 
        case "3": 
        img.src = new URL('../img/bild3.png', import.meta.url);
        break; 

        default: return null
      }

      const namn: HTMLElement = document.querySelector("#UsernameID");
      const genders: HTMLElement = document.querySelector("#genderID");
      const bios: HTMLElement = document.querySelector("#bioID");

      bios.innerText = bio;
      genders.innerText = gender;
      namn.innerText = username;
      sessionStorage.removeItem("targetUser");
    }
  });
})();

deleteProfile();
logOut();
