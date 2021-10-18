import React, { useState } from "react";
import { db } from "../firebase/config";

export const useFireStore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    // condition
    /*
    {
        fieldName: 'abc',
        operator: '==',
        compareValue: 'abc'
    }
    */
    if (condition) {
      if (!condition.compareValue || condition.compareValue.lenght) {
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribed = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribed;
  }, [collection, condition]);

  return documents;
};

export default useFireStore;
