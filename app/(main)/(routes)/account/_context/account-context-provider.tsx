'use client'

import React, { useState } from "react";
import Context from "./account-context";

const AccountContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageUrl, setImageUrl] = useState();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);

  const [fullName, setFullName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [username, setUsername] = useState('');
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  return (
    <Context.Provider value={{
      imageUrl, setImageUrl,
      isUpdatingImage, setIsUpdatingImage,
      fullName, setFullName,
      isUpdatingName, setIsUpdatingName,
      username, setUsername,
      isUpdatingUsername, setIsUpdatingUsername,
    }}>
      {children}
    </Context.Provider>
  );
};

export default AccountContextProvider;