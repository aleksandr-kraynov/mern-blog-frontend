import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe,} from "./redux/slices/auth";
import { FormFeedback } from "./components/FormFeedback";

function App() {
  const dispatch = useDispatch();

  const [showFormFeedback, setShowFormFeedback] = useState(false);

  const handleCloseFormFeedback = () => {
    setShowFormFeedback(false)
  }

  useEffect(() => {
    dispatch(fetchAuthMe());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header setShowFormFeedback={setShowFormFeedback}/>
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:id' element={<FullPost />} />
          <Route path='/post/:id/edit' element={<AddPost />} />
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
