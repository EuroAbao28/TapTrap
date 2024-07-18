import axios from "axios";
import { useState } from "react";
import { leaderboardAPI } from "../utils/APIRoutes";

const useAddEntry = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addEntryFunction = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(leaderboardAPI, data);

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error.response.data.message;
    }
  };

  return { addEntryFunction, isLoading };
};

export default useAddEntry;
