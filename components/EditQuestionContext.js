import React, { createContext, useState } from 'react';

const EditQuestionContext = createContext();

export const EditQuestionProvider = ({ children }) => {
  const [onSave, setOnSave] = useState(null);

  return (
    <EditQuestionContext.Provider value={{ onSave, setOnSave }}>
      {children}
    </EditQuestionContext.Provider>
  );
};

export default EditQuestionContext;
