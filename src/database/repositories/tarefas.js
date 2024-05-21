import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const tarefasRef = collection(db, "tarefas");

export const novaTarefa = async (tarefa) => {
  try {
    const docRef = await addDoc(tarefasRef, tarefa);
    console.log("Document written with ID: ", docRef.id);
    //TODO
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const listarTarefasPorUsuario = async (usuario) => {
  let tarefas = [];
  try {
    const q = query(tarefasRef, where("owner", "==", usuario.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tarefas.push({...doc.data(), id: doc.id});
    });
    //TODO
  } catch (e) {
    console.error("Error fetching documents: ", e);
  } finally {
    return tarefas;
  }
};

export const listarTarefasCompartilhadas = async (usuario) => {
  let tarefas = [];
  try {
    const q = query(tarefasRef, where('share', 'array-contains', usuario.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tarefas.push({...doc.data(), id: doc.id});
    });
    //TODO
  } catch (e) {
    console.error("Error fetching documents: ", e);
  } finally {
    return tarefas;
  }
};
