import React from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AuthProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] =
    React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState("");

  const {
    user: { uid },
  } = React.useContext(AuthContext);
  /*
          {
            name: 'room name',
            description: 'mo ta',
            members: [uid1, uid2]
          }
        */

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFireStore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFireStore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
