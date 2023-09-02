import { useEffect } from "react";
import "./App.css";
import { useGlobalContext } from "./context.jsx";
import { FaCartPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";
function App() {
  const {
    state,
    removeItem,
    increaseAmount,
    decreaseAmount,
    totalPrice,
    setTotalPrice,
  } = useGlobalContext();
  console.log(state.data);

  useEffect(() => {
    setTotalPrice(0);
    state.data.map((item) => {
      setTotalPrice((old) => {
        return old + Number(parseFloat(item.price)) * item.amount;
      });
      return;
    });
    console.log(state);
  }, [state.counter]);

  /*
  const increasecounter = () => {
    setcounter((old) => {
      const newCounter = old + 1;
      return newCounter;
    });
  };
  const decreasecounter = () => {
    setcounter((old) => {
      if (old == 0) {
        return old;
      }
      const newCounter = old - 1;
      return newCounter;
    });
  };
  */
  return (
    <main>
      <nav>
        <div className="nav-header">
          <h3>Shopping Cart</h3>
          <div className="cart-icon">
            <button>
              <FaCartPlus></FaCartPlus>
            </button>
            <span>{state.counter}</span>
          </div>
        </div>
      </nav>
      <section className="main-section">
        <h2>Choose Your Page Items</h2>

        <div className="items-container">
          {state.data.map((item) => {
            return (
              <div className="item-container" key={item.id}>
                <div className="item-details">
                  <img src={item.img} alt="" />
                  <div className="info">
                    <h3 className="title">{item.title}</h3>
                    <h3 className="price">{item.price}</h3>
                    <button
                      onClick={() => {
                        removeItem(item.id);
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className="controlers">
                  <button
                    className="up"
                    onClick={() => {
                      increaseAmount(item.id);
                    }}
                  >
                    <FaChevronUp></FaChevronUp>
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className="down"
                    onClick={() => {
                      decreaseAmount(item.id);
                    }}
                  >
                    <FaChevronDown></FaChevronDown>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
      <div className="total-price">
        <p>Total price</p>
        <span>{totalPrice}</span>
      </div>
    </main>
  );
}

export default App;
