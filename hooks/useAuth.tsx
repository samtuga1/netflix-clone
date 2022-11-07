import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/router'
  import { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth } from '../firebase';

function useAuth() {
    const [user, setUser] = useState();
  return user;
}

export default useAuth