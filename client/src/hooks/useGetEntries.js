import axios from "axios";
import { useState } from "react";
import { leaderboardAPI } from "../utils/APIRoutes";

const useGetEntries = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addEntriesFunction = async (mode) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${leaderboardAPI}/${mode}`);

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error.response.data.message;
    }
  };

  return { addEntriesFunction, isLoading };
};

export default useGetEntries;
