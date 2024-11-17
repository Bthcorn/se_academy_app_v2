import React, {useEffect, useState} from 'react'
import {Config} from "../../components/config"
import axios from 'axios';
import UserTable from '../../components/admin-userboard/usertable';

export default function Users() {
  const [users, setUsers] = useState([]);
  
  // Try to fetch all users from the API
  useEffect(() => {
    const fetch_users = async () => {
      try {
        const response = await axios.get(Config.API_URL + `/user/get_all`, {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },

      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  fetch_users();
  }, []);

  return (
    <div className="p-6 w-full">
      <UserTable users={users} />
    </div>
  );
}
