import React, { useState } from "react";
import OneCart from "../components/OneCart";
import { useDispatch, useSelector } from "react-redux";
import { removeCarts } from "../store/slices/Cart";
import Purchase from "../components/Purchase";
import { Link } from "react-router-dom";

import CartImage from "../components/CartImage";
const Cart = () => {
  const [radio, setRadio] = useState(false);
  const user = localStorage.getItem("user");
  const [orderState, setorderState] = useState(false);
  const [notUser, setnotUser] = useState(false);
  const [success, setSuccess] = useState(false);
  const data = useSelector((state) => state.cart.data);
  const [id, setid] = useState(radio ? data?.map((item) => item.id) : []);
  const dispach = useDispatch();
  const deletCard = () => {
    setRadio(!radio);
    radio ? setid([]) : setid(data?.map((item) => item.id));
  };

  const click = () => {
    if (user) setorderState(true);
    else setnotUser(true);
  };

  return (
    <>
      <div
        className="mt-4 flex-1 border flex flex-col rounded-[20px] border-[#e53854]  max-w-[1200px] xl:mx-auto mx-4 xl:w-full"
        style={{ position: "relative" }}
      >
        {data.length ? (
          <div className="Cart  flex-1 flex py-5  max-w-[1200px] mx-auto w-full justify-between px-[15px]">
            <div className="left w-[62%]   sm:px-5   ">
              <div className="flex justify-between items-end">
                <h3 className="pb-1 text-3xl text-[#e53854] relative">
                  Карзина{" "}
                  <span className="absolute left-[105%] text-[#b2b4bc] top-[-10px] text-xl text-[#]">
                    {data?.length}
                  </span>
                </h3>
                <div className=" flex gap-4 items-center">
                  <span
                    onClick={() => {
                      dispach(removeCarts({ id }));
                      setRadio(false);
                    }}
                    className="material-symbols-outlined text-2xl text-[#b2b4bc]"
                  >
                    delete
                  </span>
                  <span
                    onClick={() => deletCard()}
                    className={`${
                      radio ? "bg-[#e53854]" : null
                    }  w-6 h-6 rounded-[35%] border border-[#e53854] block `}
                  ></span>
                </div>
              </div>
              <div className="Cart__cards">
                {data.map((item) => (
                  <OneCart key={item.id} setid={setid} item={item} />
                ))}
              </div>
            </div>
            <div className="right flex gap-4 flex-col w-[36%] border  border-[#e53854] py-5  rounded-[20px] px-5 ">
              <div className="w-full gap-[20px] flex flex-col px-5">
                <span className="text-[#e53854] font-bold md:text-2xl">
                  <span className="md:text-3xl text-[#b2b4bc]">Цена: </span>
                  {data.reduce(
                    (acc, item) => (acc += +item.price * item.count),
                    0
                  )}
                  {"$"}
                </span>
                <button
                  onClick={() => click()}
                  className="border  hover:bg-[#e53854] w-full py-[10px] border-[#e53854] rounded-[320px] text-[#b2b4bc] font-medium"
                >
                  Заказать
                </button>
              </div>

              <CartImage />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex max-w-[1200px] mx-auto mt-[100px] w-full justify-center px-[15px]">
            <div className="text-center">
              <span className="material-symbols-outlined text-[#e53854] text-[100px]">
                add_shopping_cart
              </span>
              <h1 className="text-3xl text-[#e53854] font-medium">
                Нет товаров в корзине!
              </h1>
            </div>
          </div>
        )}

        {notUser && (
          <div className="absolute top-0 left-0 px-4 w-full h-[100vh] justify-center mt-[200px] flex">
            <div className="max-w-[380px] w-full p-4 flex justify-center items-center  h-[100px] bg-[#24253c] rounded-[24px]">
              <h3 className="text-[#b2b4bc] text-xl text-center font-medium">
                для заказа вам необходимо{" "}
                <Link
                  to="/registration"
                  className="text-[#e53854] font-thin underline"
                >
                  Регистрация
                </Link>{" "}
                или{" "}
                <Link
                  to="/login"
                  className="text-[#e53854] font-thin underline"
                >
                  войти
                </Link>
              </h3>
            </div>
          </div>
        )}
      </div>
      {orderState ? (
        <Purchase
          success={success}
          setSuccess={setSuccess}
          setorderState={setorderState}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
