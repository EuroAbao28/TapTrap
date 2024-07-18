import React, { useState } from "react";
import DivParent from "../components/DivParent";
import DivCentered from "../components/DivCentered";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi";
import { MdInfoOutline } from "react-icons/md";
import classnames from "classnames";
import { LuX, LuCheck, LuPencil } from "react-icons/lu";
import { useUserContext } from "../contexts/UserContextProvider";

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useUserContext();

  const [usernameCopy, setUsernameCopy] = useState(user.username);
  const [genderCopy, setGenderCopy] = useState(user.gender);

  const [isEditMode, setisEditMode] = useState(false);

  const handleEditMode = () => {
    setisEditMode(!isEditMode);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setisEditMode(false);

    // reset to orig base on the localStorage
    setUsernameCopy(user.username);
  };

  const handleChangeUsername = (e) => {
    setUsernameCopy(e.target.value);
  };

  const handleChangeGender = () => {
    setGenderCopy((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("User updated");

    if (!usernameCopy) return;

    updateUser({
      ...user,
      username: usernameCopy,
      gender: genderCopy,
    });

    // turn off the edit mode
    setisEditMode(false);
  };

  return (
    <DivParent>
      <DivCentered>
        <Header>
          <h1 className="text-xl font-semibold tracking-wider">My Profile</h1>
          {!isEditMode ? (
            <div
              onClick={handleEditMode}
              className="p-2 ml-auto text-xl rounded-full cursor-pointer hover:bg-white/10 active:scale-95">
              <LuPencil />
            </div>
          ) : (
            <>
              <div
                onClick={handleCancelEdit}
                className="p-2 ml-auto text-xl rounded-full cursor-pointer hover:bg-white/10 hover:text-white active:scale-95">
                <LuX />
              </div>
              <div
                onClick={handleSave}
                className="p-2 text-xl rounded-full cursor-pointer hover:text-white hover:bg-white/10 active:scale-95">
                <LuCheck />
              </div>
            </>
          )}
        </Header>

        <div
          className={classnames(
            "  px-2 transition-all text-sm flex gap-2 items-center overflow-hidden text-orange-500",
            {
              "h-4 mt-2": isEditMode,
              "h-0": !isEditMode,
            }
          )}>
          <MdInfoOutline />
          Edit mode
        </div>

        <main className="mt-4">
          {isEditMode ? (
            <form onSubmit={handleSave} className="flex gap-2">
              <div
                onClick={handleChangeGender}
                className="flex items-center justify-center text-xl transition-all rounded-md cursor-pointer active:scale-90 active:bg-black/30 w-14 outline outline-1 bg-black/20 outline-white/15 aspect-square">
                {genderCopy ? (
                  <PiGenderMaleBold className="text-blue-500 " />
                ) : (
                  <PiGenderFemaleBold className="text-red-500 " />
                )}
              </div>
              <input
                type="text"
                placeholder="Username"
                value={usernameCopy}
                onChange={handleChangeUsername}
                required
                minLength={5}
                maxLength={15}
                className="w-full px-4 rounded-md outline outline-1 outline-white/15 bg-black/20"
              />
            </form>
          ) : (
            <div className="flex gap-2">
              <div className="flex items-center justify-center text-xl rounded-md w-14 outline outline-1 bg-black/20 outline-white/15 aspect-square">
                {user.gender ? (
                  <PiGenderMaleBold className="text-blue-500 " />
                ) : (
                  <PiGenderFemaleBold className="text-red-500 " />
                )}
              </div>
              <div className="flex items-center w-full px-4 rounded-md outline outline-1 outline-white/15 bg-black/20">
                {user.username}
              </div>
            </div>
          )}
        </main>
      </DivCentered>
    </DivParent>
  );
}

export default Profile;
