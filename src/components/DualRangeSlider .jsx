import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import {  setCurrentPage } from "../store/slices/Product";
import { useNavigate } from "react-router-dom";

const DualRangeSlider = () => {
  const { maxPrice } = useSelector((state) => state.product);
  const [range1, setRange1] = useState([0, maxPrice ? maxPrice : 9000000]);
  const dispatch = useDispatch();
  const handleRange1Change = (value) => {
    setRange1(value);
  };
  useEffect(() => {
  }, []);
  const navigate = useNavigate();

  let timeId = 0;

  useEffect(() => {
    timeId = setTimeout(() => {
      dispatch(setCurrentPage(1));

      const currentSearchParams = new URLSearchParams(window.location.search);
      currentSearchParams.set("from_price", `${range1[0]}`);
      currentSearchParams.set("to_price", `${range1[1]}`);
      const newQueryString = currentSearchParams.toString();
      const newUrl = `${window.location.pathname}?${newQueryString}`;
      navigate(newUrl);
    }, 500);

    return () => clearTimeout(timeId);
  }, [range1]);

  return (
    <div className="w-[200px] cursor-pointer">
      <div className="justify-between mb-[10px] flex">
        <span className="text-[#e53854]">от {range1[0]} сом</span>
        <span className="text-[#e53854]">до {range1[1]} сом</span>
      </div>
      <Slider
        min={0}
        max={+maxPrice}
        range
        value={range1}
        onChange={handleRange1Change}
      />
    </div>
  );
};

export default DualRangeSlider;
