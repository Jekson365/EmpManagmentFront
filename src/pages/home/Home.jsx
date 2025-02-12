import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../App";

function Home() {
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return <div>Home</div>;
}

export default Home;
