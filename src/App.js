// import MainScreen from "./components/MainScreen";

import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./redux/reducers/sessionToken";
import QuizScreen from "./components/QuizScreen";

const categoryAPI = "https://opentdb.com/api_category.php";
const tokenAPI = "https://opentdb.com/api_token.php?command=request";

function App() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const removeSelection = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    const getCategories = () => {
      fetch(categoryAPI, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCategories(data.trivia_categories);
        });
    };
    getCategories();

    const getToken = () => {
      fetch(tokenAPI, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(setToken(data.token));
        });
    };

    if (!token) {
      getToken();
    }
  }, []);

  if (!selectedCategory) {
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {categories.map((e) => {
            return (
              <button
                style={{ padding: 20, flex: 1, cursor: "pointer" }}
                onClick={() => {
                  setSelectedCategory(e.id);
                }}
                key={e.id}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <QuizScreen
      category={selectedCategory}
      close={removeSelection}
    ></QuizScreen>
  );
}

export default App;
