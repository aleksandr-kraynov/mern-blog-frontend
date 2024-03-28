import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { FormFeedback } from "./components/FormFeedback";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [showFormFeedback, setShowFormFeedback] = useState(false);

  const handleCloseFormFeedback = () => {
    setShowFormFeedback(false)
  }

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header setShowFormFeedback={setShowFormFeedback}/>
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
        {showFormFeedback &&
          <FormFeedback
            showFormFeedback={showFormFeedback}
            handleCloseFormFeedback={handleCloseFormFeedback}
          />
        }
      </Container>
    </>
  );
}

export default App;
