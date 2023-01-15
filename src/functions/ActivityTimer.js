import db from '../firebase/firebase'

export default class ActivityTimer {

   static timeoutInMiliseconds = 60000;
   static timeoutId; 
  
   static resetTimer = (user, setInactivePointer, timeOutPointer) => { 
        window.clearTimeout(timeOutPointer);

        this.startTimer(user, setInactivePointer);
    }
        
   static startTimer = (user, setInactivePointer) => { 
          db.collection('users').doc(user.id).set({
            online: true
        }, { merge: true });

          this.timeoutId = window.setTimeout(setInactivePointer, this.timeoutInMiliseconds);
    }
        
   static setInactive = (user) => {
          db.collection('users').doc(user.id).set({
            online: false
        }, { merge: true });
    }
       
   static setupTimers = (user) => {
          this.resetTimerPointer = (setInactivePointer, timeOutPointer) => this.resetTimer(user, setInactivePointer, timeOutPointer);
          this.setInactivePointer= () => this.setInactive(user);
          this.timeOutPointer = () => this.timeoutId;
          this.eventListeners(user, this.resetTimerPointer, this.setInactivePointer, this.timeOutPointer);
   }

   static eventListeners = (user, resetTimerPointer, setInactivePointer, timeOutPointer) => {
       this.documentEventListeners(resetTimerPointer, setInactivePointer, timeOutPointer);
       this.windowEventListener(user);
   } 

   static documentEventListeners = (resetTimerPointer, setInactivePointer, timeOutPointer) => {
        document.addEventListener("mousemove", () => resetTimerPointer(setInactivePointer, timeOutPointer) , false);
        document.addEventListener("mousedown", () => resetTimerPointer(setInactivePointer, timeOutPointer) , false);
        document.addEventListener("keypress",  () => resetTimerPointer(setInactivePointer, timeOutPointer) , false);
        document.addEventListener("touchmove", () => resetTimerPointer(setInactivePointer, timeOutPointer) , false);
    }

    static windowEventListener = (user) => {
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
        db.collection('users').doc(user.id).set({
            online: false
        }, { merge: true });
            return null
        });
    }
  }