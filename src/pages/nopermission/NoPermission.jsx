import React, {
  useEffect
} from 'react';
import { login } from '../../api/login';

export default function NoPermission (props) {
  
  useEffect(async () => {
    const res = await login("admin", "admin");
    console.log(res);
  }, []);

  return (
    <div>
      NoPermission
    </div>
  )
}